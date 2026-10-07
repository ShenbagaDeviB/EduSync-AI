require("dotenv").config();

const openai = require("../config/openai");

const testLLM = async () => {
    try {
        const response = await openai.responses.create({
            model: "gpt-6-luna",
            input: "Return only this JSON: {\"status\":\"working\"}"
        });

        console.log("LLM Response:");
        console.log(response.output_text);

    } catch (error) {
        console.error("LLM Test Failed:", error.message);
    }
};

testLLM();