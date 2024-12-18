//const {cosineSimilarity} = require('./Plagiarism-checker-server.js');

/*
const check_plagi_btn = document.querySelector('.button1');
var text_area = document.querySelector('.textarea');
var file = document.getElementById('file');
*/

//const {extractText} = require('./Plagiarism-checker-server.js');
const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const { extractText, compareLocal_with_online } = require('./Plagiarism-checker-server.js');
//const {compareLocal_with_online} = require('./Plagiarism-checker-server.js');

/*
check_plagi_btn.addEventListener('click', () => 
{  
    //text_area.value += "Hello, How are you\n";
    if(file.files.length > 0)
    {
        const filepath = file.files[0];
        const formData = new FormData();
        formData.append('file', filepath);

        const object = {
            method: 'POST', 
            body: formData
        };
        fetch('http://localhost:3000', object).then(response => response.text()).then(data => {
            text_area.value = data;
        })
    }
});

*/

http.createServer((req, res) => {
    if(req.method == 'GET')
    {
        fs.readFile(path.join(__dirname, 'Plagiarism-checker.html'), (err, data) => 
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

            console.log("Uploaded file path:", file.filepath);

            try {
                console.log("Received file:", file.filepath);
                console.log("File properties: ", {
                    filepath: file.filepath,
                    originalFilename: file.originalFilename,
                    mimetype: file.mimetype
                });
                const extractedText = await extractText(file.filepath);
                console.log("Extracted text:", extractedText);
                if (!extractedText.length) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify([]));
                    return;
                }

                const results = await compareLocal_with_online(
                    extractedText,
                    extractedText.join(' ')
                );
                console.log("Results: ", results);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({extractedText: extractedText.join('\n'), results}));
                /*
                const results = [
                    { content: 'Dummy URL content', similarity: 0.75 },
                    { content: 'Another dummy content', similarity: 0.65 }
                ];
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(results));
                */
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error processing the uploaded file.');
            }
        });
    }
}).listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});



