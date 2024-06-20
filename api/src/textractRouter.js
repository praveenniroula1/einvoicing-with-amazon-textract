import express from "express";
import multer from "multer";
import fs from "fs";
import textract from "../src/awsConfig.js";

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = file.path;

    const params = {
        Document: {
            Bytes: fs.readFileSync(filePath)
        },
        FeatureTypes: ["TABLES", "FORMS"]
    };

    textract.analyzeDocument(params, (err, data) => {
        // Delete the file after processing regardless of success or failure
        fs.unlinkSync(filePath);

        if (err) {
            console.error('Error analyzing document:', err);
            return res.status(500).json({ error: 'Analyze document failed.' });
        } else {
            return res.json(data);
        }
    });
});

export default router; 
