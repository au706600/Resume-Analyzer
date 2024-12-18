const scrapingBee = require('scrapingbee');
const {htmlToText} = require('html-to-text');
const _ = require('lodash');

async function get(url)
{
    const clientScraping = new scrapingBee.ScrapingBeeClient("X2ETC4FW2CU2YTHMYJKI5G19F6NZOS8MLMJ70NH3NJ54DYX1U42QT16UDKNQU0MQ4MAO7YGT75LJJ3B2");
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
   console.log(array_of_words);
   return array_of_words;

 //  let random = Math.floor(Math.random() * array_of_words.length);
 //  array_of_words = array_of_words[random];
 //  return array_of_words;
}

get("https://www.quicksprout.com/examples-of-html-websites/");