const { readJson, WriteJson, writejson } = require("./fsUtils");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { body, validationResult } = require('express-validator');



const app = express();
app.use(cors());


const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (_, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage });

app.use(express.json())

app.use((req, _, next) => {
    console.log(req.url, req.method, req.body);
    next();
});

//======================Validation Chains======================

const nameValidation = (tag) => body(tag).trim().notEmpty().isAlpha()
const mailValidation = (tag) => body(tag).isEmail()
//======================Json File Path======================

const dataPath = "./data.json"

//======================Typical get Data Api======================
app.get("/api/data", (req, res) => {
    readJson(dataPath).then(data => {
        console.log(data)
        res.json({ success: true, result: data })
    }).catch(err => res.json({ success: false, error: err }))
})

//======================recive and add Data (POST)======================

app.post("/api/data", upload.none(), nameValidation("firstName"), nameValidation("lastName"), nameValidation("message"), body("email").isEmail(), (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const validationErrors = result.array()
        res.json({ success: false, error: "Your Data is not Valid", details: validationErrors })
        return
    }
    const newMessage = req.body
    newMessage.id = Date.now()
    readJson(dataPath).then(data => [newMessage, ...data]).then(data => writejson(dataPath, data)).then(data => res.json({ success: true, result: data })).catch(err => res.json({ success: false, error: err }));
})

//============================ 404 ===========================

app.use((req, res) => {
    res.status(404).json({ success: false, error: "Page not Found" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("APP RUNNING at port " + PORT));
