//const {cosineSimilarity} = require('./Plagiarism-checker-server.js');
// x
// r

/*
// Using express.js
//require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const iconv = require('iconv-lite');
const { extractText, compareLocal_with_online } = require('./Plagiarism-checker-server.js');
const { error } = require('console');
const app = express();
const port = 3000;
*/
/*
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    }, 
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`);
    }
});
*/
/*
const storage = multer.memoryStorage();

const upload = multer({ storage });

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Plagiarism-checker.html'));
});

const sanitizeFileName = (fileName) => {
    return fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
}

app.post('/plagiarism', upload.single('file'), async (req, res) => {
    try{
        const fileName = iconv.decode(Buffer.from(req.file.originalname, 'binary'), 'utf-8');
        //console.log(req.file);
        console.log("File name: ", fileName);
        const sanitizeFilename = sanitizeFileName(fileName);
        console.log("Sanitized filename: ", sanitizeFilename);
        //console.log("File name: ", fileName);
        //const filePath = req.file.path;
        const fileBuffer = req.file.buffer;
        const searchTerm = req.body.searchTerm;
        const localText = await extractText(fileBuffer);
        console.log(localText);
        const Compare = await compareLocal_with_online(localText, searchTerm);
        console.log(Compare);
        //fs.unlinkSync(filePath);
        res.status(200).json({success: true, extractedText: localText, Compare});
    } catch (error)
    {
        res.status(500).json({success: false, error: error.message});
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
*/


//const {extractText} = require('./Plagiarism-checker-server.js');
const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const { extractText, compareLocal_with_online } = require('./Resume-Analyzer.js');
//const {compareLocal_with_online} = require('./Plagiarism-checker-server.js');

http.createServer((req, res) => {
    if(req.method == 'GET')
    {
        fs.readFile(path.join(__dirname, 'public', 'Plagiarism-checker.html'), (err, data) => 
        {
            res.writeHead(200, {'Content-type':'text/html'});
            res.end(data);
        })
    }
    else if (req.method == 'POST') {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Error parsing the form data.');
                return;
            }

            //const file = files.file;

            const file = Array.isArray(files.file) ? files.file[0] : files.file;

            if (!fs.existsSync(file.filepath)) {
                console.error("File does not exist at the temporary path:", file.filepath);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('File upload failed.');
                return;
            }

            //console.log("Uploaded file path:", file.filepath);

            try {
                console.log("Received file:", file.filepath);
                console.log("File properties: ", {
                    filepath: file.filepath,
                    originalFilename: file.originalFilename,
                    mimetype: file.mimetype
                });
                const extractedText = await extractText(file.filepath);
                //console.log("Extracted text:", extractedText);
                if (!extractedText.length) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify([]));
                    return;
                }

                const results = await compareLocal_with_online(
                    extractedText,
                    extractedText.join(' ')
                );
               // console.log("Results: ", results);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({extractedText: extractedText.join('\n'), results}));
                
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error processing the uploaded file.');
            }
        });
    }
}).listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});


