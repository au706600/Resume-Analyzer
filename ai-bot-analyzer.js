
// Jamesjaxccbhfdbfhdsbfbdshff

// Hugging-face API key: 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

//const client = new OpenAI();
//import {pipeline} from '@huggingface/transformers';

/*
async function code()
{
    const translater = await pipeline('text-generation', 'Xenova/distilgpt2', {
        dtype: 'fp32'
    });

    const prompt = "Q:What is an apple?\nA:"

    const response = await translater(prompt, {
        max_new_tokens: 100,
        temperature: 0.7,
        top_k: 50,
        top_p: 0.95,
        repetition_penalty: 1.2
    });

    console.log(response[0].generated_text);

    //--------------------------------------------

    const Poet = await pipeline('text2text-generation', 'Xenova/LaMini-Flan-T5-783M',{
        dtype: 'fp32',
        quantized: true
    });

    const result = await Poet("Write me a poem about cheese", {
        max_new_tokens: 200,
        temperature: 0.9,
        repetition_penalty: 2.0,
        no_repeat_ngram_size: 3,
    });

    console.log(result[0].generated_text);

    //--------------------------------------------

    const model = await pipeline("text-generation", "onnx-community/Qwen2.5-Coder-0.5B-Instruct", {
        dtype: "q4"
    });

    const message = [{
        role: "user", 
        content: "Write a quick sort algorithm in javascript",
    }];

    const result = await model(message, {
        max_new_tokens: 200, 
        temperature: 0.3, 
        repetition_penalty: 2.0, 
        no_repeat_ngram_size: 3,
        //do_sample: false, 
        //streamer: streamer
    });

    console.log(result[0].generated_text.find((msg) => msg.role === "assistant").content);

}

*/

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

// Bot
import { InferenceClient } from "@huggingface/inference";
import {dotenv} from 'dotenv';
dotenv.config();

export async function AI_Resume_Analyzer(resume)
{
    const client = new InferenceClient(process.env.apiKey);

    const chatCompletion = await client.chatCompletion({
        provider: "novita", 
        model: "deepseek-ai/DeepSeek-V3-0324",
        messages: [{
            role: "user", 
            content: `Analyze each section of the resume and provide feedback and suggestions for improvement. Resume: ${resume}`,
        },],
    });

    return chatCompletion.choices[0].message.content;
}
