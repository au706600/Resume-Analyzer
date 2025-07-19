
// Jamesjaxccbhfdbfhdsbfbdshff

//const client = new OpenAI();
//import {pipeline} from '@huggingface/transformers';



//-------------------------------------------------'

/*

import fetch from 'node-fetch';

async function getResponse()
{
    const response = await fetch("https://router.huggingface.co/novita/v3/openai/chat/completions", {
        method: "POST", 
        headers: {
            Authorization: "Bearer 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", 
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
            provider: "novita", 
            model: "meta-llama/Meta-Llama-3-8B-Instruct", 
            messages: [{
                role: "user",
                content: "How many 'G's in 'huggingface'?",
            },
        ],
        }),
    });

    console.log(await response.json());
}

async function main()
{
    try {
        await getResponse();
    } catch (error) {
        console.error("Error:", error);
    }
}

console.time("Execution Time");
main().then(() => {
    console.timeEnd("Execution Time");
});

*/

/*
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("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");

const chatCompletion = await client.chatCompletion({
    provider: "novita",
    model: "deepseek-ai/DeepSeek-V3-0324",
    messages: [
        {
            role: "user",
            content: "If I give you a resume, can you give feedback?",
        },
    ],
});

console.log(chatCompletion.choices[0].message.content);

*/

//-- https://huggingface.co/docs/inference-providers/index
//-- https://huggingface.co/docs/inference-providers/providers/novita


// Bot-Ai
import { InferenceClient } from "@huggingface/inference";
import dotenv from 'dotenv';
dotenv.config();

export async function AI_Resume_Analyzer(resume)
{

    if(!process.env.apiKey)
    {
        console.error("API key is not set in the environment variables.");
        throw new Error("API key is not set in the environment variables.");
    }
    
    const client = new InferenceClient(process.env.apiKey);

    const chatCompletion = await client.chatCompletion({
        provider: "novita",
        model: "deepseek-ai/DeepSeek-V3-0324",
        messages: [{
            role: "user",
            content: `
            Analyze the following resume and provide feedback and suggestions for improvement.
            Your feedback should be structured as the following:
            ---###Strengths)
            ---###Areas for Improvement)
            ---###Final Notes)
            Resume: ${resume}
                        `,
            }],
    });

    const message_content = chatCompletion.choices[0].message.content;

    const Regex = /---\s*[#*]*\s*(.+?)\)*\s*[:]*\s*\n([\s\S]*?)(?=---|$)/g;

    const map = new Map();

    for(const match of message_content.matchAll(Regex))
    {
        let title = match[1].trim();
        title = title.replace(/\*\*/g, '');

        let content = match[2].trim();
        content = content.replace(/\*\*/g, '');
        
        const bullet_points = content.split(/(?=\d+\.\s)/)
                                     .map(point => point.trim())
                                     .filter(Boolean);

        map.set(title, bullet_points);
    }
 
    return Object.fromEntries(map);
}








