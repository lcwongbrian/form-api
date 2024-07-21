const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnector = require("./modules/dbConnector");

dotenv.config();
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const run = async () => {
    try {
        await dbConnector.connect();
        app.listen(HTTP_PORT, () => {
            console.log(`app listening on: ${HTTP_PORT}`);
        });
    } catch(err) {
        console.log(`unable to start server: ${err}`);
        process.exit();
    }    
};

app.get("/form", async (req, res) => {
    try {
        const data = await dbConnector.getAllForm();
        res.json(data); 
    } catch (msg) {
        res.status(404).json({ error: msg });
    }
});

app.get("/form/:id", async (req, res) => {
    try {
        const data = await dbConnector.getFormById(req.params.id);
        res.json(data); 
    } catch (msg) {
        res.status(404).json({ error: msg });
    }
});

app.post("/form", async (req, res) => {
    try {
        const data = await dbConnector.createForm(req.body);
        res.json(data); 
    } catch (msg) {
        res.status(404).json({ error: msg });
    }
});

app.put("/form/:id", async (req, res) => {
    try {
        const data = await dbConnector.editFormById(req.params.id, req.body);
        res.json(data); 
    } catch (msg) {
        res.status(404).json({ error: msg });
    }
});

run();