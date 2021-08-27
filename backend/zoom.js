class Zoom {

    async init(link, name) {
        this.link = link;
        this.name = name;
        console.log("Joined meeting " + link + " with name " + name);
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
                    names: [
                        "Name 1",
                        "Name 2"
                    ]
                },
                {
                    question: 2,
                    names: [
                        "Name 3"
                    ]
                }
            ]
        };
    }

    async launchPoll(question, options) {
        console.log("Launching poll with question " + question + "and options " + options);
    }

    async getResults() {
        return {
            options: [
                {
                    option: "True",
                    names: [
                        "Student A",
                        "Student B"
                    ]
                },
                {
                    option: "False",
                    names: [
                        "Student C"
                    ]
                }
            ]
        };
    }

    async closePoll() {
        return {
            options: [
                {
                    option: "True",
                    names: [
                        "Student A",
                        "Student B"
                    ]
                },
                {
                    option: "False",
                    names: [
                        "Student C"
                    ]
                }
            ]
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

module.exports = {Zoom};