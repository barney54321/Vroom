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

app.listen(port, () => {
    console.log("Listening on port " + port);
});