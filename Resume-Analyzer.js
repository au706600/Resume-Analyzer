// node.js file
// https://stackoverflow.com/questions/51362252/javascript-cosine-similarity-function
// https://www.semrush.com/blog/tf-idf/
// https://gist.github.com/tomericco/14b5ceac90d6eed6f9ba6cb5305f8fab
// https://www.scrapingbee.com/documentation/#render_js
// https://app.scrapingbee.com/dashboard?account_created=True
// x
// ||

function buildVocabulary(texts)

{
    const allWordsset = new Set();

    texts.forEach(text => {
        if(typeof text === 'object')
        {
            if(Array.isArray(text))
            {
                text = text.join(' ');
            }

            else
            {
                text = JSON.stringify(text);
            }
        }
        text.split(/\W+/).forEach(word => {
            if(word)
            {
                allWordsset.add(word.toLowerCase());
            }
        });
    });

    return Array.from(allWordsset);
}

function frequencyCounts(text)
{
    const wordFreqMap = new Map();
    
    if(typeof text === 'object')
    {
        if(Array.isArray(text))
        {
            text = text.join(' ');
        }

        else
        {
            text = JSON.stringify(text);
        }
    }
    

    text.split(/\W+/).map(word => word.toLowerCase()).forEach(word => {
        if(word)
        {
            wordFreqMap.set(word, (wordFreqMap.get(word) || 0 ) + 1);
        } 
        
    });

    return wordFreqMap;
}



//----------------------------------------

const Fs = require('fs');
//const pdfjsLib = require('pdfjs-dist');
//const pdfjsLib = import('pdfjs-dist/build/pdf.js');
const pdf = require('pdf-parse');
//const scrapingBee = require('scrapingbee');

// This section should display the pdf file

let pdfjsLib = (async () => {
    try{
        const Module = await import('pdfjs-dist/legacy/build/pdf.js');
        console.log("Successful!");
        return Module;
    }
    catch (error)
    {
        console.error("Error importing pdfjs-dist:", error);
        throw error;
    }
});

async function showPdf(filePath)
{
    //const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.js');
    const pdfjslib = await pdfjsLib;
    const dataBuffer = Fs.readFileSync(filePath);
    
    const data_promise = await pdfjslib.getDocument({data: dataBuffer}).promise;
    console.log("PDF loaded successfully!");

    const pages = data_promise.numPages;
    let map = [];

    for(let i = 1; i <= pages; i++)
    {
        map.push({page: i});
        //const textContent = await page.getTextContent();
        //map.push(textContent.items.map(item => item.str).join(' '));
        
    }

    return map;
    
}

module.exports = {showPdf};

// This section extracts text from a pdf file

/*

async function extractText(filePath)
{
    //console.log('Extracting text from: ', filePath);
    const dataBuffer = Fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    let content = data.text;
    content = content.replace(/\s+/g, ' ').trim();
    let array_of_contents = content.split(/(?<=[.!?])\s+/);
    array_of_contents = array_of_contents.map(chunks => chunks.trim()).filter(Boolean); 
    //console.log('Extracted text: ', array_of_contents.text.slice(0, 500));
    return array_of_contents;
}



module.exports = {extractText};

*/











