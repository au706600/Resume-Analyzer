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

/*

function convertToVector(wordFreqMap, allWords)
{
    return allWords.map(word => wordFreqMap.get(word) || 0);
}

*/

function calcTF(word, text)
{
    const wordFreqMap = frequencyCounts(text);

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

    const totalWords = text.split(/\W+/).length;
    const result = (wordFreqMap.get(word) || 0) / totalWords;
    return result;
}

function calcIDF(word, texts)
{
    const total_number_of_documents = texts.length;
    const total_number_of_documents_with_word = texts.filter(text => {
        const normalized_text = typeof text === 'object' ? JSON.stringify(text) : text.toLowerCase();
        return normalized_text.includes(word);
    }).length;

    const Idf = Math.log((total_number_of_documents + 1) / (total_number_of_documents_with_word + 1));
    return Idf;
}
    /*
    const total_number_of_documents = texts.length;
    const total_number_of_documents_with_word = texts.filter(text => {
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
        text.toLowerCase().includes(word)}).length;
    const Idf = Math.log((total_number_of_documents + 1) / (total_number_of_documents_with_word + 1));
    return Idf;
    */

/*
function stemWord(word)
{
    word.toLowerCase().replace(/(ing|ed|s)$/, '');
}
*/

function calcTFIDF(allWords, text, texts)
{
    return Array.from(allWords).map(word => calcTF(word, text) * calcIDF(word, texts));
    /*
    const wordFreqMap = frequencyCounts(text);
    const tf = convertToVector(wordFreqMap, allWords);
    const idf = allWords.map(word => calcIDF(word, texts));
    const tfidf = tf.map((tfvalue, i) => tfvalue * idf[i]);
    return tfidf;
    */
}

function cosineSimilarity(vec1, vec2)
{
    var dotProduct = 0;
    var normA = 0;
    var normB = 0;

    for(var i = 0; i < vec1.length; i++)
    {
        dotProduct += vec1[i] * vec2[i];
        normA += vec1[i] * vec1[i];
        normB += vec2[i] * vec2[i];
    }

    normA = Math.sqrt(normA);

    normB = Math.sqrt(normB);

    var result = dotProduct / (normA * normB);

    return result;
}

/*

function Testing()
{
    const texts = 
    [
        "The quick dog jumps over the lazy dog",
        "The quick brown cat jumps over the lazy dog",
        "The fastest cheetah ran very fast today",
        "The fastest cheetah ran very fast today",
        "The sleepy dog jumps over the lazy dog",
    ]

    const vocabulary = buildVocabulary(texts);

    // Building test case 1

    const vector1 = calcTFIDF(vocabulary, texts[0], texts);
    const vector2 = calcTFIDF(vocabulary, texts[1], texts);
    console.log("Cosinesimilarity for test case 1: ", cosineSimilarity(vector1, vector2));

    // Building test case 2

    const vector3 = calcTFIDF(vocabulary, texts[2], texts);
    const vector4 = calcTFIDF(vocabulary, texts[3], texts);
    console.log("Cosinesimilarity for test case 2: ", cosineSimilarity(vector3, vector4));

    // Building test case 3

    const vector5 = calcTFIDF(vocabulary, texts[0], texts);
    const vector6 = calcTFIDF(vocabulary, texts[4], texts);
    console.log("Cosinesimilarity for test case 3: ", cosineSimilarity(vector5, vector6));
}

Testing();

*/

//----------------------------------------

const Fs = require('fs');
const pdf = require('pdf-parse');
//const scrapingBee = require('scrapingbee');

// This section extracts text from a pdf file

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

//----------------------------------------

function randomSegmentsFromTextPdf(array_of_contents)
{
    //const Splitting = array_of_contents.split(/(?<=[.!?])\s+/);
    let Rand = Math.floor(Math.random() * array_of_contents.length);
    let randomTextSegments = array_of_contents[Rand];
    return randomTextSegments;
}

/*

function foo(y)
{
    alert(y);
}

function bar(func)
{
    func();
}

bar(function(){foo("Hello world")});

*/

// Extract Ingeniørvidenskabernes videnskabsteori og etik - aflevering 1.pdf located at Dokumenter
//extractText("C:\\Users\\MR201\\OneDrive\\Dokumenter\\Ingeniørvidenskabernes videnskabsteori og etik - aflevering 1.pdf");

//-----------------------------------------------

// This section returns url links based on user google search input. 

const axios = require('axios');
require('dotenv').config();

function getUserAgent()
{
    const agents = ["Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36"];
    const randomInd = Math.floor(Math.random() * agents.length);
    return agents[randomInd];
}

async function getUrl(searchTerm)
{
    //const searchTerm = "about chess"; 
    //const apiKey = 'AIzaSyBdJt0lUY7iwLJp4H32HjialC8sug1AyJc';
    //const data_id = '22dcbb9650058493c';
    const urls = [];

    const response = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${process.env.apiKey}&cx=${process.env.data_id}&q=${encodeURIComponent(searchTerm)}`, {
        headers: {
            'User-Agent': getUserAgent()
        }
    })
        
        response.data.items.map(item => urls.push(item.link));

        // Normally, we could use page rank or similar to get top 5 most relevant links, but in this scenario, 
        // we go with just retrieving the first 5 links. 
        console.log(urls.slice(0,5));
        return urls.slice(0,5);
    
}

//------------------------------------------


// API KEY for scraping: X2ETC4FW2CU2YTHMYJKI5G19F6NZOS8MLMJ70NH3NJ54DYX1U42QT16UDKNQU0MQ4MAO7YGT75LJJ3B2

// Web scraping: https://serpapi.com/blog/scrape-google-search-in-nodejs/

// This section scrapes the content from a website and returns the content as a string.

const scrapingBee = require('scrapingbee');
const {htmlToText} = require('html-to-text');
const _ = require('lodash');
const { promises } = require('dns');

async function get(url)
{
    const clientScraping = new scrapingBee.ScrapingBeeClient(process.env.scrapingBeeClient_id);
    const response = await clientScraping.get({
        url: url, 
        params: {
            'return_page_source': true,          
        },
    });
   // return response
   var decoder = new TextDecoder();
   var text = decoder.decode(response.data);
   let textContent = htmlToText(text);
   textContent = textContent.replace(/\s+/g, ' ').trim();
   let array_of_words = textContent.split(/(?<=[.!?])\s+/);
   array_of_words = array_of_words.map(word => word.trim()).filter(Boolean); 
   //console.log(array_of_words);
   return array_of_words;

 //  let random = Math.floor(Math.random() * array_of_words.length);
 //  array_of_words = array_of_words[random];
 //  return array_of_words;
}

//get("https://www.quicksprout.com/examples-of-html-websites/");

//-------------------------------------------

async function searchContentAfterSearch(array_of_contents)
{
    let segmentsFromPdf = randomSegmentsFromTextPdf(array_of_contents);
    let urls = await getUrl(segmentsFromPdf);

    //let content = await get(urls);

    let contents_from_url = await Promise.all(urls.map(url => get(url).then(content => content.join(' '))));

    /*
    let contents_from_url = [];

    for(let i = 0; i < urls.length; i++)
    {
        let content = await get(urls[i]);
        contents_from_url.push(content);
    }
    */
    return contents_from_url;
}

//-------------------------------------------

async function compareLocal_with_online(localText, searchTerm)
{
    let contentSearch = await searchContentAfterSearch(searchTerm);

    // Use of spread operator to combine two arrays.
    let dictionary = buildVocabulary([...localText, ...contentSearch.flat()]);

    let convertToVector = calcTFIDF(dictionary, localText.join(' '), [...localText, ...contentSearch.flat()]);

    /*
    let mapToVector = contentSearch.map(content => {
        const vector = calcTFIDF(dictionary, content, [...localText, ...contentSearch]);
        return cosineSimilarity(convertToVector, vector);
    });
    */

    
    const results = contentSearch.map(content => {
        const vector = calcTFIDF(dictionary, content.join(' '), [...localText, ...contentSearch.flat()]);
        return {
            similarity: cosineSimilarity(convertToVector, vector), 
            content: content.join(' ')
        };
    });
    

    /*
    const results = mapToVector.map((scores, index) => ({
        onlineSource: index + 1, 
        similarityScore: scores
    }));
    */

    return results;
}

/*
async function compareLocal_with_online(localTextArray, fullText) {
    console.log('Comparing text:', fullText.slice(0, 500)); // Debug log for text being sent for comparison

    try {
        let contentSearch = await searchContentAfterSearch(searchTerm);

        // Use of spread operator to combine two arrays.
        let dictionary = buildVocabulary([...localText, ...contentSearch.flat()]);

        let convertToVector = calcTFIDF(dictionary, localText.join(' '), [...localText, ...contentSearch.flat()]);
        
        let mapToVector = contentSearch.map(content => {
            const vector = calcTFIDF(dictionary, content, [...localText, ...contentSearch]);
            return cosineSimilarity(convertToVector, vector);
        });

        const results = contentSearch.map(content => {
            const vector = calcTFIDF(dictionary, content.join(' '), [...localText, ...contentSearch.flat()]);
            return {
                similarity: cosineSimilarity(convertToVector, vector), 
                content: content.join(' ')
            };
        });

        const results_p = mapToVector.map((scores, index) => () => {[
            { content: 'https://faktalink.dk/titelliste/2-verdenskrig', similarity: 0.85 } // Example data
        ]});

        console.log('Comparison results:', results_p); // Debug log the results
        return results;
    } catch (error) {
        console.error('Error in compareLocal_with_online:', error);
        throw error; // Let the server handle it
    }
}
*/

module.exports = { extractText, compareLocal_with_online };

//export default compareLocal_with_online;

/*
// Old version
async function compareLocal_with_online(filePath, url)
{
    let extract_text_from_file = await extractText(filePath);
    let extract_text_from_url = await get(url);

  //  let contentSearch = await searchContentAfterSearch(extract_text_from_file);

   // console.log("Text from file: ", extract_text_from_file);
   // console.log("Text from URL: ", extract_text_from_url);

    let dictionary = buildVocabulary([extract_text_from_file, extract_text_from_url]);
   // console.log("Vocabulary: ", dictionary);

    let vector1 = calcTFIDF(dictionary, extract_text_from_file, [extract_text_from_file, extract_text_from_url]);
    let vector2 = calcTFIDF(dictionary, extract_text_from_url, [extract_text_from_file, extract_text_from_url]);

   // console.log("Vector 1: ", vector1);
   // console.log("Vector 2: ", vector2);

    let similarity = cosineSimilarity(vector1, vector2);
   // console.log("Similarity: ", similarity);

    return similarity;
}
*/

//compareLocal_with_online("C:\\Users\\MR201\\OneDrive\\Dokumenter\\Ingeniørvidenskabernes videnskabsteori og etik - aflevering 1.pdf", "https://www.quicksprout.com/examples-of-html-websites/");
/*

get('https://www.quicksprout.com/examples-of-html-websites/').then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    let textContent = htmlToText(text);
    textContent = textContent.replace(/\s+/g, ' ').trim();
    //const array_of_words = textContent.split(/[.!?]/);
    let array_of_words = textContent.split(/(?<=[.!?])\s+/);
    array_of_words = array_of_words.map(word => word.trim()).filter(Boolean);
    console.log(array_of_words);

    let random = Math.floor(Math.random() * array_of_words.length);
    array_of_words = array_of_words[random];
    console.log(array_of_words);
    
}).catch(function (error) {
    console.log(error);
});

*/


// Using data id: 22dcbb9650058493c
// Using API-key: AIzaSyBdJt0lUY7iwLJp4H32HjialC8sug1AyJc
// googleapis/customsearch: https://developers.google.com/custom-search/v1/overview


//-----------------------------

/*

const axios = require('axios');
const cheerio = require('cheerio');

function getUserAgent()
{
    const agents = ["Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36"];
    const randomInd = Math.floor(Math.random() * agents.length);
    return agents[randomInd];
}

async function getUrl()
{
    //const urls = [];
    const searchTerm = "history about cheese";
    await axios.get(`https://www.google.com/search?q=${searchTerm}`, {
        headers: {
            'User-Agent': getUserAgent()
        }
    }).then((response) => 
    { 
        
        const $ = cheerio.load(response.data);
        const getUrls = $('a[href^="/url?q="]').map((index, element) => {
        
            const url = $(element).attr('href');
            const match = url ? url.match(/\/url\?q=([^&]*)/) : null;
            if(match && match[1])
            {7
                return decodeURIComponent(match[1]);
            }
        }).toArray();
        //console.log(getUrls);
        const cleanurls = getUrls.filter(Boolean);
        console.log(cleanurls);
    }).catch((error) => 
    {
        console.log(error);
    })
    
}

getUrl();

*/

//--------------------

/*
<script async src="https://cse.google.com/cse.js?cx=22dcbb9650058493c">
</script>
<div class="gcse-search"></div>
*/

//--------------------

/*
const axios = require('axios');

async function getUrl() {
    const searchTerm = "history about cheese";
    const apiKey = 'f2454aa3cc73b484702e131f2253f01a83923b5802f39270bfe32a6f949ea041';

    try {
        const response = await axios.get(`https://serpapi.com/search.json?q=${encodeURIComponent(searchTerm)}&api_key=${apiKey}`);
        const urls = response.data.organic_results.map(result => result.link);
        
        console.log("Extracted URLs:", urls);
    } catch (error) {
        console.error("Error fetching URLs:", error);
    }
}

getUrl();

*/










