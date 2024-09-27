
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static('public'));
app.use(express.json()); 


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './uploads';
  
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); 
    }
});
const upload = multer({ storage });


app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded.' });
    }
    res.send({ message: 'File uploaded successfully!', filePath: req.file.path });
});


app.post('/manipulate-image', (req, res) => {
   
    res.send({ message: 'Image manipulation logic goes here.' });
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
