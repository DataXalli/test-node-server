const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const storageStrategy = multer.memoryStorage();
const upload = multer({ storage: storageStrategy });
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/imagen', upload.single('imagen'),async (req, res) => {
    const body = req.body;
    const imagen = req.file;
    const processedImage = await sharp(imagen.buffer).resize(300, 300,{
        fit: sharp.fit.contain,
        background: { r: 255, g: 255, b: 255, alpha: 0 }
    }).toBuffer();
    fs.writeFileSync(`./uploads/${body.nombre}.jpg`, processedImage);
    console.log(processedImage);
    res.send({resizedImage: processedImage});
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

