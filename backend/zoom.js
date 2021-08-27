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
        await this.driver.executeScript("document.getElementById('joinBtn').click()");

        // Get the chat button
        let chatButton = await this.driver.findElement(webdriver.By.className("footer-button__chat-icon"));

        // Wait a bit more for everything to load
        await sleep(5000);

        await chatButton.click();

        console.log("Joined meeting " + this.link + " with name " + name);
    }

    async leave() {
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
}

module.exports = { Zoom };

async function test() {
    let zoom = new Zoom();
    await zoom.init("https://uni-sydney.zoom.us/j/83168226455", "Vroom");
}

test();
