require("chromedriver");
const webdriver = require("selenium-webdriver");
const { By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

class Zoom {

    constructor() {
        this.run = true;
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
        return {
            questions: [
                {
                    question: 1,
                    names: ["Name 1", "Name 2"],
                },
                {
                    question: 2,
                    names: ["Name 3"],
                },
            ],
        };
    }

    async launchPoll(question, options) {
        console.log(
            "Launching poll with question " +
                question +
                "and options " +
                options
        );
    }

    async getResults() {
        return {
            options: [
                {
                    option: "True",
                    names: ["Student A", "Student B"],
                },
                {
                    option: "False",
                    names: ["Student C"],
                },
            ],
        };
    }

    async closePoll() {
        return {
            options: [
                {
                    option: "True",
                    names: ["Student A", "Student B"],
                },
                {
                    option: "False",
                    names: ["Student C"],
                },
            ],
        };
    }

    async startPlan(plan) {
        console.log("Plan started: " + plan);
    }

    async stopPlan() {
        console.log("Plan stopped");
    }

    async updateCommands(commands) {
        console.log("Updated following commands " + JSON.stringify(commands));
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
            for (let i = 2; i < recipientList.length; i++) {
                let recipient = recipientList[i];
                let text = await recipient.getText();

                if (text === receiver) {
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
            let messages = await this.readMessages();
            console.log(messages);
            await sleep(1000);
        }
    }
}

module.exports = { Zoom };

// async function test() {
//     let zoom = new Zoom();
//     await zoom.init("https://uni-sydney.zoom.us/j/83168226455", "Vroom");
//     await sleep(2);
//     // await zoom.leave();
//     // await zoom.sendMessage("Samantha Millett", "1");
//     // await zoom.sendMessage("Lilian Hunt", "2");
//     // await zoom.sendMessage("Host", "3");
//     // await zoom.sendMessage("Everyone", "4");
//     // await zoom.sendMessage("Everyone", "5");
//     // let messages = await zoom.readMessages();
//     // console.log(messages);
//     // sleep(100000);
// }

// test();
