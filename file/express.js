const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const app = express();
const upload = multer();

app.post('/convert', upload.single('file'), async (req, res) => {
    const format = req.body.format;
    const buffer = req.file.buffer;

    try {
        const convertedBuffer = await sharp(buffer)
            .toFormat(format)
            .toBuffer();

        res.type(`image/${format}`);
        res.send(convertedBuffer);
    } catch (error) {
        res.status(500).send('Conversion failed.');
    }
});
