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
        this.poll = null;
        this.lastTimeStamp = null;
        this.progress = {
            questions: []
        };
        this.nowResponse = "Listen";
        this.attendResponse = "https://bit.ly/3yt84NP";

        // Locks
        this.pollLock = new Mutex();
    }
    
    async init(link, name) {
        this.link = link.replace("/j/", "/wc/join/");
        this.name = name;

        var options = new chrome.Options();
        options.addArguments("--mute-audio");
        options.addArguments("--headless");
        options.addArguments("--log-level=3");

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
        try {
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

            this.driver.close();
        } catch (error) {
            // Try again but sleep
            await sleep(100);
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

            this.driver.close();
        }
    }

    async editName(name) {
        this.name = name;
        console.log("Name is now " + this.name);
    }

    async getProgress() {
        return this.progress;
    }

    async launchPoll(question, options) {
        await this.pollLock.runExclusive(async () => {
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
        });

        let message = question;

        let letters = ["A", "B", "C", "D", "E"];

        for (let i = 0; i < options.length; i++) {
            message = message + " ";
            message = message + "Send !vote " + letters[i] + " to vote for '" + options[i] + "'."; 
        }

        await this.sendMessage("Everyone", message);
    }

    async getResults() {
        return await this.pollLock.runExclusive(async () => {
            return this.poll;
        });
    }

    async closePoll() {
        return await this.pollLock.runExclusive(async () => {
            return this.poll;
        });
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

        try {
            await this.recipientButton.click();
        } catch (error) {
            await this.resetChatWindow();
            await this.recipientButton.click();
        }

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

    async resetChatWindow() {
        // Get the chat button
        let chatButton = await this.driver.findElement(By.className("footer-button__chat-icon"));

        // Wait a bit more for everything to load
        await sleep(10);

        await chatButton.click();

        await sleep(1);

        this.chatField = await this.driver.findElement(By.className("chat-box__chat-textarea window-content-bottom"));
        this.recipientButton = await this.driver.findElement(By.id("chatReceiverMenu"));
    }

    async readMessages() {

        let bigChatDiv;

        try {
            bigChatDiv = await this.driver.findElement(By.id("chat-list-content"));
        } catch (error) {
            await this.resetChatWindow();
            bigChatDiv = await this.driver.findElement(By.id("chat-list-content"));
        }

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
        let lastTimeNum = 0;

        // Each div stores message and possibly header
        let divs = await listDivs.findElements(By.xpath("*"));

        for (let i = 0; i < divs.length; i++) {
            try {
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

                    let hours = parseInt(lastTime.substring(0, 2));
                    let minutes = parseInt(lastTime.substring(3, 5));
                    let am = lastTime.includes("AM");

                    lastTimeNum = hours * 60 + minutes;
                    
                    if (!am) {
                        lastTimeNum += 12 * 60;
                    }
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
                    time: lastTime,
                    timeNum: lastTimeNum
                }

                res.push(message);

            } catch (error) {
                // Stuff went wrong
                continue;
            }
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

            if (this.messageIDs.includes(message.id) || message.timeNum < this.lastTimeStamp) {
                continue;
            }

            this.messageIDs.push(message.id);

            this.lastTimeStamp = message.timeNum;

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
        } else if (splits[0] === "!help") {
            await this.help(message);
        } else if (splits[0] === "!commands") {
            await this.listCommands(message);
        } else if (splits[0] === "!progress") {
            await this.updateProgress(message);
        } else {
            await this.sendMessage(message.sender, "Unknown command");
        }
    }

    async vote(message) {
        if (this.poll == null) {
            await this.sendMessage(message.sender, "There are no active polls");
            return;
        }

        let splits = message.text.split(" ");

        if (splits.length === 1) {
            await this.sendMessage(message.sender, "Make sure you specify what you're voting for!");
            return;
        }

        let letters = ["A", "B", "C", "D", "E"];

        let vote = splits[1];

        // Lock the poll
        await this.pollLock.runExclusive(async () => {

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

        });
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

    async help(message) {
        await this.sendMessage(this.name, message.sender + " wants help for " + message.text.substring(6));
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

    async listCommands(message) {
        await this.sendMessage(message.sender, "!now - Find out what's happening now");
        await this.sendMessage(message.sender, "!progress Q1 - Update which question you are up to");
        await this.sendMessage(message.sender, "!attend - Get the attendance link");
        await this.sendMessage(message.sender, "!help Q1 - Ask for help for a specific question");
        await this.sendMessage(message.sender, "!slower - Get the tutor to slow down");
        await this.sendMessage(message.sender, "!faster - Get the tutor to go faster");
        await this.sendMessage(message.sender, "!anon [message] - Send an anonymous message to the class");
        await this.sendMessage(message.sender, "!translate [text] - Translate text to English");
        await this.sendMessage(message.sender, "!commands - See this list again");
    }

    async updateProgress(message) {
        let splits = message.text.split(" ");

        if (splits.length === 1) {
            await this.sendMessage(message.sender, "Make sure you specify what question you're up to");
            return;
        }

        let question = splits[1];
        question = question.replace("Q", "");

        if (isNaN(question)) {
            await this.sendMessage(message.sender, "Question should be a number (e.g. Q4)");
            return;
        }

        let questionNumber = parseInt(question);

        // Remove current student progress
        for (let i = 0; i < this.progress.questions.length; i++) {
            this.progress.questions[i].names = this.progress.questions[i].names.filter(item => item !== message.sender);
        }

        // Set progress
        for (let i = 0; i < this.progress.questions.length; i++) {
            if (this.progress.questions[i].question === questionNumber) {
                this.progress.questions[i].names.push(message.sender);
                return;
            }
        }

        // Question doesn't exist
        this.progress.questions.push({
            question: parseInt(question),
            names: [message.sender]
        });
    }
}

module.exports = { Zoom };