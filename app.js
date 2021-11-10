const express = require('express');
const multer  = require('multer');
const sharp   = require('sharp');
const fs      = require('fs');

const storageStrategy = multer.memoryStorage();
const upload = multer({ storage: storageStrategy });
const app = express();

var products = [
    { id: 0, name: 'Sabritas 45grs', price: 11.00}
  , { id: 1, name: 'Ruffles 45grs', price: 10.00}
  , { id: 2, name: 'Cheetos Bolita 30grs', price: 8.50}
  , { id: 3, name: 'Sabritas Adobas 45grs', price: 10.50}
  , { id: 4, name: 'Rancheritos 30grs', price: 6.50}
  , { id: 5, name: 'Fritos 35grs', price: 8.00}      
];


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

app.post('/products', (req, res) => {
    res.json(products);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

