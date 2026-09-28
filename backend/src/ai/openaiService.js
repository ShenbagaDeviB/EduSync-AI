const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const askAI = async (prompt) => {
    const response = await client.responses.create({
        model: "gpt-5.6-luna",
        input: prompt
    });

    return response.output_text;
};

module.exports = {
    askAI
};