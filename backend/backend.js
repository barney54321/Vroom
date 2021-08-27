const express = require("express");
const cors = require("cors");
const {Dummy} = require("./dummy");

const port = 8000;

const app = express();

app.use(cors());
app.use(express.json());

var zoom;

zoom = new Dummy();

/*
    JOIN - POST
    Send JSON body with url and name: {url: "zoom.com", name: "Teaching Assistant"}
    Returns 200 on success, 400 on failure
*/
app.post("/join", async (req, res) => {
    let body = req.body;
    let url = body.url;
    let name = body.name;
    zoom = await zoom.init(url, name);
    res.sendStatus(200);
});

/*
    LEAVE - POST
    No request body
    Returns 200 on success, 400 on failure
*/
app.post("/leave", async (req, res) => {
    await zoom.leave();
    res.sendStatus(200);
});

/*
    EDITNAME - POST
    Send JSON body with new name: {name: "Vroom"}
    Returns 200 on success, 400 on failure
*/
app.post("/editname", async (req, res) => {
    let body = req.body;
    let name = body.name;
    await zoom.editName(name);
    res.sendStatus(200);
});

/*
    GETPROGRESS - GET
    Returns progress of students: {questions: [{question: 1, names: ["Name 1", "Name 2"]}, {question: 2, names: ["Name 3"]}]}
*/
app.get("/getprogress", async (req, res) => {
    let progress = await zoom.getProgress();
    res.send(progress);
});

/*
    LAUNCHPOLL - POST
    Send JSON body with question and options: {question: "1+1=2", options: ["True", "False"]}
    Returns 200 on success, 400 on failure
*/
app.post("/launchpoll", async (req, res) => {
    let body = req.body;
    let question = body.question;
    let options = body.options;
    await zoom.launchPoll(question, options);
    res.sendStatus(200);
});

/*
    RESULTS - GET
    Returns results from students: {options: [{option: "True", names: ["Student A", "Student B"]}, {option: "False", names: ["Student C"]}]}
*/
app.get("/results", async (req, res) => {
    let results = await zoom.getResults();
    res.send(results);
});

/*
    CLOSEPOLL - POST
    No body required
    Returns results in same format as /RESULTS
*/
app.post("/closepoll", async (req, res) => {
    let results = await zoom.closePoll();
    res.send(results);
});

/*
    STARTPLAN - POST
    Send JSON body with sections: {sections: [{sectionTitle: "Revision", sectionTime: 10, sectionDesc: "Revision for last week"}]}
    Returns 200 on success, 400 on failure
*/
app.post("/startplan", async (req, res) => {
    let body = req.body;
    let sections = body.sections;
    await zoom.startPlan(sections);
    res.sendStatus(200);
});

/*
    STOPPLAN - POST
    No body required
    Returns 200 on success, 400 on failure
*/
app.post("/stopplan", async (req, res) => {
    await zoom.stopPlan();
    res.sendStatus(200);
});

/*
    UPDATECOMMANDS - POST
    Send JSON body with new commands: {commands: [{command: "now", response: "Questions"}, {command: "attend", response: "bitly.qwerty"}]}
    Returns 200 on success, 400 on failure
*/
app.post("/updatecommands", async (req, res) => {
    let body = req.body;
    let commands = body.commands;
    await zoom.updateCommands(commands);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});