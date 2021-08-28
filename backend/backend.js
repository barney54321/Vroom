const express = require("express");
const cors = require("cors");
const {Dummy} = require("./dummy");
const {Zoom} = require("./zoom");
const args = process.argv[2];

const port = 8080;

const app = express();

app.use(cors());
app.use(express.json());

const zoom = args === "test" ? new Dummy() : new Zoom();

/*
    JOIN - POST
    Send JSON body with url and name: {url: "zoom.com", name: "Teaching Assistant"}
    Returns 200 on success, 400 on failure
*/
app.post("/join", async (req, res) => {
    try {
        let body = req.body;
        let url = body.url;
        let name = body.name;
        await zoom.init(url, name);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
});

/*
    LEAVE - POST
    No request body
    Returns 200 on success, 400 on failure
*/
app.post("/leave", async (req, res) => {
    try {
        await zoom.leave();
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
});

/*
    EDITNAME - POST
    Send JSON body with new name: {name: "Vroom"}
    Returns 200 on success, 400 on failure
*/
app.post("/editname", async (req, res) => {
    try {
        let body = req.body;
        let name = body.name;
        await zoom.editName(name);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
});

/*
    GETPROGRESS - GET
    Returns progress of students: {questions: [{question: 1, names: ["Name 1", "Name 2"]}, {question: 2, names: ["Name 3"]}]}
*/
app.get("/getprogress", async (req, res) => {
    try {
        let progress = await zoom.getProgress();
        res.send(progress);
    } catch (error) {
        res.sendStatus(400);
    }
});

/*
    LAUNCHPOLL - POST
    Send JSON body with question and options: {question: "1+1=2", options: ["True", "False"]}
    Returns 200 on success, 400 on failure
*/
app.post("/launchpoll", async (req, res) => {
    try {
        let body = req.body;
        let question = body.question;
        let options = body.options;
        await zoom.launchPoll(question, options);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
});

/*
    RESULTS - GET
    Returns results from students: {options: [{option: "True", names: ["Student A", "Student B"]}, {option: "False", names: ["Student C"]}]}
*/
app.get("/results", async (req, res) => {
    try {
        let results = await zoom.getResults();
        res.send(results);
    } catch (error) {
        res.sendStatus(400);
    }
});

/*
    CLOSEPOLL - POST
    No body required
    Returns results in same format as /RESULTS
*/
app.post("/closepoll", async (req, res) => {
    try {
        let results = await zoom.closePoll();
        res.send(results);
    } catch (error) {
        res.sendStatus(400);
    }
});

/*
    STARTPLAN - POST
    Send JSON body with sections: {sections: [{sectionTitle: "Revision", sectionTime: 10, sectionDesc: "Revision for last week"}]}
    Returns 200 on success, 400 on failure
*/
app.post("/startplan", async (req, res) => {
    try {
        let body = req.body;
        let sections = body.sections;
        await zoom.startPlan(sections);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
});

/*
    STOPPLAN - POST
    No body required
    Returns 200 on success, 400 on failure
*/
app.post("/stopplan", async (req, res) => {
    try {
        await zoom.stopPlan();
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
});

/*
    UPDATECOMMANDS - POST
    Send JSON body with new commands: {commands: [{command: "now", response: "Questions"}, {command: "attend", response: "bitly.qwerty"}]}
    Returns 200 on success, 400 on failure
*/
app.post("/updatecommands", async (req, res) => {
    try {
        let body = req.body;
        let commands = body.commands;
        await zoom.updateCommands(commands);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});