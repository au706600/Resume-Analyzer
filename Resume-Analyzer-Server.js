

//const {extractText} = require('./Plagiarism-checker-server.js');
const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const { showPdf} = require('./Resume-Analyzer.js');
//const {compareLocal_with_online} = require('./Plagiarism-checker-server.js');

http.createServer((req, res) => {
    if(req.method == 'GET')
    {
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
                const show_pdf = await showPdf(file.filepath);
                //console.log("Extracted text:", extractedText);
                if (!show_pdf.length) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify([]));
                    return;
                }

               // console.log("Results: ", results);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ show_pdf: show_pdf }));
                return;
                
            } catch (error) {
                if(!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error processing the uploaded file.');
                }
            }
        });
    }
}).listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});


