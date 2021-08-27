const express = require("express");
const cors = require("cors");

const port = 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});