const { mockLLM } = require("./mockLLMService");

const detectIntent = async (command) => {
    const decision = await mockLLM(command);

    if (!decision || typeof decision.intent !== "string") {
        return {
            intent: "unknown",
            params: {}
        };
    }

    return {
        intent: decision.intent,
        params: decision.params || {}
    };
};

module.exports = {
    detectIntent
};