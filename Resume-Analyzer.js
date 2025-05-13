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
    //const pdf = require('pdf-parse');

    // This section should display the pdf file

    /*

    let pdfjsLib = (async () => {
        try{
            const Module = await import('pdfjs-lib/legacy/build/pdf.js');
            console.log("Successful!");
            return Module.default;
        }
        catch (error)
        {
            console.error("Error importing pdfjs-dist:", error);
            throw error;
        }
    })();

    */

    async function showPdf(filePath)
    {
        //const pdfjslib = await pdfjsLib;
        const dataBuffer = Fs.readFileSync(filePath);

        console.log("PDF loaded successfully!");

        /*

        const pages = data_promise.numPages;
        let map = [];

        for(let i = 1; i <= pages; i++)
        {
            const textContent = await data_promise.getPage(i).then(page => page.getTextContent());
            const pageText = textContent.items.map(item => item.str).join(' ');
            map.push(pageText);
            //map.push(`Page ${i}: ${pageText}`);

        }
        console.log("Extracted text from PDF: ", map);
        return map;

        */

        return dataBuffer.toString('base64');
        
    }

    module.exports = {showPdf};

//------------------------------

// Named entity recognition should be used for extracting the different titles of resumes

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











