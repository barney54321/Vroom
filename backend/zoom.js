require("chromedriver");
const webdriver = require("selenium-webdriver");
const { By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
var Mutex = require('async-mutex').Mutex; 
const translate = require('@vitalets/google-translate-api');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

class Zoom {

    constructor() {
        this.run = true;
        this.messageIDs = [];
        this.poll = {};
        this.progress = {};
        this.nowResponse = "Listen";
        this.attendResponse = "https://bit.ly/3yt84NP"
    }
    
    async init(link, name) {
        this.link = link.replace("/j/", "/wc/join/");
        this.name = name;

        var options = new chrome.Options();
        options.addArguments("--mute-audio");
        // options.addArguments("--headless");

        var builder = new webdriver.Builder();
        builder.forBrowser("chrome");
        builder.setChromeOptions(options);

        this.driver = builder.build();

        // Go to join page
        await this.driver.get(this.link);

        // Fill in name input field
        let nameField = await this.driver.findElement(By.id("inputname"));
        await nameField.sendKeys("Vroom");

        // Wait for button to be pressable
        await sleep(1000);

        // Press button (obscured by annoying div so using js)
        await this.driver.executeScript(
            "document.getElementById('joinBtn').click()"
        );

        // Get the chat button
        let chatButton = await this.driver.findElement(
            By.className("footer-button__chat-icon")
        );

        // Wait a bit more for everything to load
        await sleep(5000);

        await chatButton.click();

        await sleep(1);

        this.chatField = await this.driver.findElement(
            By.className("chat-box__chat-textarea window-content-bottom")
        );
        this.recipientButton = await this.driver.findElement(
            By.id("chatReceiverMenu")
        );

        this.monitor();

        console.log("Joined meeting " + this.link + " with name " + name);
    }

    async leave() {
        // Stop running
        this.run = false;

        // Press more options button
        await this.driver.executeScript(
            "document.getElementById('moreButton').click()"
        );

        // Get the span
        let leaveSpan = await this.driver.findElement(
            By.className("more-button__leave-menu")
        );
        // Get the parent
        let leaveSpanParent = await leaveSpan.findElement(By.xpath(".."));
        // Click the parent
        await leaveSpanParent.click();

        // Wait a moment
        await sleep(1);

        // Click leave meeting button
        let leaveMeetingButton = await this.driver.findElement(
            By.className(
                "zmu-btn leave-meeting-options__btn leave-meeting-options__btn--default leave-meeting-options__btn--danger zmu-btn--default zmu-btn__outline--white"
            )
        );
        await leaveMeetingButton.click();

        console.log("Left meeting");
    }

    async editName(name) {
        this.name = name;
        console.log("Name is now " + this.name);
    }

    async getProgress() {
        return this.progress;
    }

    async launchPoll(question, options) {
        this.poll = {};
        this.poll["question"] = question;

        let optionList = [];

        for (let i = 0; i < options.length; i++) {
            let option = {
                option: options[i] + "",
                names: []
            }
            optionList.push(option);
        }

        this.poll["options"] = optionList;

        console.log("Launched poll " + JSON.stringify(this.poll));

        let message = question;

        let letters = ["A", "B", "C", "D", "E"];

        for (let i = 0; i < options.length; i++) {
            message = message + " ";
            message = message + "Send !vote " + letters[i] + " to vote for '" + options[i] + "'."; 
        }

        await this.sendMessage("Everyone", message);
    }

    async getResults() {
        return this.poll;
    }

    async closePoll() {
        return this.poll;
    }

    async startPlan(plan) {
        console.log("Plan started: " + plan);
    }

    async stopPlan() {
        console.log("Plan stopped");
    }

    async updateCommands(commands) {
        console.log("Updated following commands " + JSON.stringify(commands));
        for (let i = 0; i < commands.length; i++) {
            let commandItem = commands[i];
            if (commandItem.command === "now") {
                this.nowResponse = commandItem.response;
            } else if (commandItem.command === "attend") {
                this.attendResponse = commandItem.response;
            }
        }
    }

    async sendMessage(receiver, message) {
        await this.recipientButton.click();

        // Get scrollbar
        let scrollbar = await this.driver.findElement(
            By.className("chat-receiver-list__scrollbar")
        );

        // Get list item children
        let recipientList = await scrollbar.findElements(By.css("a"));

        if (receiver === "Everyone") {
            // Click the first option (appears to always be Everyone)
            await recipientList[0].click();
        } else if (receiver === "Host") {
            // Click 2nd person in list (appears to always be host)
            await recipientList[1].click();
        } else {
            // Find person in list
            for (let i = 1; i < recipientList.length; i++) {
                let recipient = recipientList[i];
                let text = await recipient.getText();

                if (text.replace("(Host)", "") === receiver) {
                    await recipient.click();
                    break;
                }
            }
        }

        await sleep(0.4);

        await this.chatField.sendKeys(message);
        await this.chatField.sendKeys("\n");
    }

    async readMessages() {
        let bigChatDiv = await this.driver.findElement(By.id("chat-list-content"));

        let listDivs;

        try {
            listDivs = await bigChatDiv.findElement(By.className("ReactVirtualized__Grid__innerScrollContainer"));
        } catch (error) {
            return [];
        }

        let res = [];
        let lastSender = "Me";
        let lastRecipient = "Me";
        let lastTime = null;

        // Each div stores message and possibly header
        let divs = await listDivs.findElements(By.xpath("*"));

        for (let i = 0; i < divs.length; i++) {
            // For some reason doing this works but using divs[i] doesn't
            let div = (await listDivs.findElements(By.xpath("*")))[i];

            let children = await div.findElements(By.xpath("*"));

            if (children.length === 2) {
                // New name
                let headerDiv = children[0];

                // There are 4~5 spans in the header (sender, "to", receiver, ?, "Privately")
                let headerName = await headerDiv.findElement(webdriver.By.className("chat-item__left-container"));
                let headerSpan = await headerDiv.findElement(webdriver.By.className("chat-item__chat-info-time-stamp"));

                let headerNameSpans = await headerName.findElements(By.css("span"));

                lastSender = await (await headerNameSpans[0]).getText();
                lastRecipient = await (await headerNameSpans[2]).getText();
                lastTime = await this.driver.executeScript("return arguments[0].innerHTML", headerSpan);
            }

            let messageHalf = children[children.length - 1];

            let innerMessageDiv = messageHalf;
            let messageHalfClass = await messageHalf.getAttribute("class");

            if (messageHalfClass !== "chat-message__container") {
                innerMessageDiv = await messageHalf.findElement(webdriver.By.className("chat-message__container"));
            }

            let innerMessage = await innerMessageDiv.findElement(webdriver.By.xpath("*"));

            let messageText = await innerMessage.getText();
            let messageID = await innerMessage.getId();

            let message = {
                id: messageID,
                text: messageText,
                sender: lastSender,
                recipient: lastRecipient,
                time: lastTime
            }

            res.push(message);
        }

        return res;
    }

    async monitor() {
        console.log("Monitoring chat");

        while (this.run) {
            await this.processMessages();
            await sleep(1000);
        }
    }

    async processMessages() {
        let newMessages = await this.readMessages();

        for (let i = 0; i < newMessages.length; i++) {
            // Using dodgy method to overcome weird memory issues
            let message = JSON.parse(JSON.stringify(newMessages[i]));

            if (this.messageIDs.includes(message.id)) {
                continue;
            }

            this.messageIDs.push(message.id);

            if (message.sender !== "Me") {
                await this.handleMessage(message);
            }
        }
    }

    async handleMessage(message) {
        if (message.text.charAt(0) !== "!") {
            return;
        }

        let splits = message.text.split(" ");

        if (splits[0] === "!vote") {
            await this.vote(message);
        } else if (splits[0] === "!translate") {
            await this.translator(message);  
        } else if (splits[0] === "!anon") {
            await this.anon(message);
        } else if (splits[0] === "!slower") {
            await this.slower(message);
        } else if (splits[0] === "!faster") {
            await this.faster(message);
        } else if (splits[0] === "!now") {
            await this.now(message);
        } else if (splits[0] === "!attend") {
            await this.attend(message);
        } else {
            console.log("Yes");
        }
    }

    async vote(message) {
        let splits = message.text.split(" ");

        if (splits.length === 1) {
            await this.sendMessage(message.sender, "Make sure you specify what you're voting for!");
            return;
        }

        let letters = ["A", "B", "C", "D", "E"];

        let vote = splits[1];

        if (!letters.slice(0, this.poll.options.length).includes(vote)) {
            await this.sendMessage(message.sender, "Option not available. Try voting again");
            return;
        }

        let optionIndex = letters.indexOf(vote);

        // Remove current student vote
        for (let i = 0; i < this.poll.options.length; i++) {
            this.poll.options[i].names = this.poll.options[i].names.filter(item => item !== message.sender);
        }

        // Add vote
        this.poll.options[optionIndex].names.push(message.sender);
    }

    async translator(message) {
        let text = message.text.substring(11);
        let res = await translate(text, {to: "en"});
        await this.sendMessage(message.sender, res.text);
    }

    async anon(message) {
        await this.sendMessage("Everyone", message.text.substring(6));
    }

    async slower(message) {
        await this.sendMessage(this.name, message.sender + " wants you to go slower");
    }

    async faster(message) {
        await this.sendMessage(this.name, message.sender + " wants you to go faster");
    }

    async now(message) {
        await this.sendMessage(message.sender, this.nowResponse);
    }

    async attend(message) {
        await this.sendMessage(message.sender, this.attendResponse);
    }

}

module.exports = { Zoom };

// async function test() {
//     let zoom = new Zoom();
//     await zoom.init("https://uni-sydney.zoom.us/j/87089283654", "Vroom");
//     await sleep(2);
//     // await zoom.leave();
//     // await zoom.sendMessage("Samantha Millett", "1");
//     // await zoom.sendMessage("Lilian Hunt", "2");
//     // await zoom.sendMessage("Host", "3");
//     // await zoom.sendMessage("Everyone", "4");
//     // await zoom.sendMessage("Everyone", "5");
//     // let messages = await zoom.readMessages();
//     // console.log(messages);
//     sleep(100000);
// }

// test();
