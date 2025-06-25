

//const {extractText} = require('./Plagiarism-checker-server.js');

//const http = require('http');
import http from 'http';
//const formidable = require('formidable');
//import formidable from 'formidable';
import * as formidable from 'formidable';
//const fs = require('fs');
import fs from 'fs';
//import pdf from 'pdf-parse';
//const path = require('path');
import path from 'path';
//const { showPdf} = require('./Resume-Analyzer.js');
import { showPdf, extractTextPDF } from './Resume-Analyzer.js';
import { AI_Resume_Analyzer } from './ai-bot-analyzer.js';

// import {AI_Resume_Analyzer} from './ai-bot-analyzer.js';

import { fileURLToPath } from 'url';

http.createServer((req, res) => { 

    /*
    if(req.method == 'GET' && req.url.startsWith('/js/'))
    {
        const filePath = path.join(__dirname, req.url);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
                return;
            }
            else {
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
            }
        });
        return;
    }

    */

    if(req.method == 'GET')
    {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        fs.readFile(path.join(__dirname, 'public', 'Resume-Analyzer.html'), (err, data) => 
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
                res.end(JSON.stringify({error: 'Error parsing the form data.'}));
                return;
            }

            //const file = files.file;

            const file = Array.isArray(files.file) ? files.file[0] : files.file; 

            if (!fs.existsSync(file.filepath)) {
                console.error("File does not exist at the temporary path:", file.filepath);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(JSON.stringify({error: 'File upload failed.'}));
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

                const extractText = await extractTextPDF(file.filepath);
                const show_pdf = await showPdf(file.filepath);
                const displayAI = await AI_Resume_Analyzer(extractText);
            
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ show_pdf, displayAI }));
                
            } catch (error) {
                if(!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end(JSON.stringify({error: error.message}));
                }
            }
        });
    }
}).listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});


//----------------------------------

/*
                const pdfBuffer = fs.readFileSync(file.filepath);
                const pdfData = await pdf(pdfBuffer);
                const show_pdf = await showPdf(file.filepath);
                const displayAI = await AI_Resume_Analyzer(pdfData.text);
                */
                //console.log("AI Analysis Result: ", displayAI);
                //console.log("PDF content: ", show_pdf);
                //console.log("Extracted text:", extractedText);
                /*
                if (!show_pdf.length) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({show_pdf: show_pdf}));
                    return;
                }
                */

                //console.log("Sending results: ", {show_pdf: show_pdf});
                /*
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ show_pdf: show_pdf, displayAI: displayAI}));
                return;
                */

