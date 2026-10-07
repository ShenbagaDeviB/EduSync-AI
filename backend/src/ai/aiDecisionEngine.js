const openai = require("../config/openai");
const { mockLLM } = require("./mockLLMService");
const llmTools = require("./llmTools");

const detectIntent = async (command) => {
    try {
        const tools = llmTools.map((tool) => ({
            type: "function",
            name: tool.name,
            description: tool.description,
            parameters: tool.parameters
        }));

        const response = await openai.responses.create({
            model: "gpt-6-luna",

            tools,

            tool_choice: "auto",

            input: [
                {
                    role: "system",
                    content: `
You are the AI decision engine for an Educational ERP system.

Choose the most appropriate tool for the user's command.

If the command does not match any available tool,
do not call a tool.

Available tools:
- get_students
- get_attendance
- get_results
- get_fee_status
- get_subject_results
                    `
                },
                {
                    role: "user",
                    content: command
                }
            ]
        });

        const toolCall = response.output.find(
            (item) => item.type === "function_call"
        );

        if (!toolCall) {
            return {
                intent: "unknown",
                params: {}
            };
        }

        const params = JSON.parse(toolCall.arguments || "{}");

        console.log("Using OpenAI tool calling");

        return {
            intent: toolCall.name,
            params
        };

    } catch (error) {
        console.log(
            "OpenAI unavailable. Using mock LLM fallback."
        );

        const fallbackDecision = await mockLLM(command);

        if (
            !fallbackDecision ||
            typeof fallbackDecision.intent !== "string"
        ) {
            return {
                intent: "unknown",
                params: {}
            };
        }

        return {
            intent: fallbackDecision.intent,
            params: fallbackDecision.params || {}
        };
    }
};

module.exports = {
    detectIntent
};