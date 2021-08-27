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

app.listen(port, () => {
    console.log("Listening on port " + port);
});