const express = require("express");
const cors = require("cors");

const port = 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
});

/*
    JOIN - POST
    Send JSON body with url and name: {url: "zoom.com", name: "Teaching Assistant"}
    Returns 200 on success, 400 on failure
*/
app.post("/join", (req, res) => {
    let body = req.body;
    let url = body.url;
    let name = body.name;
    console.log(url + " " + name);
    res.sendStatus(200);
});

/*
    LEAVE - POST
    No request body
    Returns 200 on success, 400 on failure
*/
app.post("/leave", (req, res) => {
    res.sendStatus(200);
});

/*
    EDITNAME - POST
    Send JSON body with new name: {name: "Vroom"}
    Returns 200 on success, 400 on failure
*/
app.post("/editname", (req, res) => {
    let body = req.body;
    let name = body.name;
    console.log(name);
    res.sendStatus(200);
});

/*
    GETPROGRESS - GET
    Returns progress of students: {questions: [{question: 1, names: ["Name 1", "Name 2"]}, {question: 2, names: ["Name 3"]}]}
*/
app.get("/getprogress", (req, res) => {
    let obj = {
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
    res.send(obj);
});

/*
    LAUNCHPOLL - POST
    Send JSON body with question and options: {question: "1+1=2", options: ["True", "False"]}
    Returns 200 on success, 400 on failure
*/
app.post("/launchpoll", (req, res) => {
    let body = req.body;
    let question = body.question;
    let options = body.options;
    console.log(question + " " + options);
    res.sendStatus(200);
});

/*
    RESULTS - GET
    Returns results from students: {options: [{option: "True", names: ["Student A", "Student B"]}, {option: "False", names: ["Student C"]}]}
*/
app.get("/results", (req, res) => {
    let obj = {
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
    res.send(obj);
});

/*
    CLOSEPOLL - POST
    No body required
    Returns results in same format as /RESULTS
*/
app.post("/closepoll", (req, res) => {
    let obj = {
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
    res.send(obj);
});

/*
    STARTPLAN - POST
    Send JSON body with sections: {sections: [{sectionTitle: "Revision", sectionTime: 10, sectionDesc: "Revision for last week"}]}
    Returns 200 on success, 400 on failure
*/
app.post("/startplan", (req, res) => {
    let body = req.body;
    let sections = body.sections;
    console.log(sections);
    res.sendStatus(200);
});

/*
    STOPPLAN - POST
    No body required
    Returns 200 on success, 400 on failure
*/
app.post("/stopplan", (req, res) => {
    console.log("Ended plan");
    res.sendStatus(200);
});

/*
    UPDATECOMMANDS - POST
    Send JSON body with new commands: {commands: [{command: "now", response: "Questions"}, {command: "attend", response: "bitly.qwerty"}]}
    Returns 200 on success, 400 on failure
*/
app.post("/updatecommands", (req, res) => {
    let body = req.body;
    let commands = body.commands;
    console.log(commands);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});