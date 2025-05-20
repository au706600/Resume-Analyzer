const{OpenAI} = require("openai");

//const client = new OpenAI();

async function getResponse()
{

    const apiClient = new OpenAI({
        apiKey: "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",
    });

    
    const response = await apiClient.chat.completions.create({
        model: "gpt-4.1", 
        messages: [{
            role: "user", 
            content: "What is the latest news about AI?"
        }]
    });
    
    console.log(response.choices[0].message.content);
}

async function main()
{
    try {
        await getResponse();
    } catch (error) {
        console.error("Error:", error);
    }
}
