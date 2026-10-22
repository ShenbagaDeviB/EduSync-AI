
const detectIntent = require("./aiDecisionEngine").detectIntent;
const executeTool = require("./toolExecutor");
const { generateResponse } = require("./aiResponseGenerator");

const runAgent = async (command, userContext = {}) => {
    const decision = await detectIntent(command);

    console.log("AI Agent Decision:", decision);

    if (
        !decision ||
        typeof decision.intent !== "string"
    ) {
        return {
            success: false,
            message: "I could not understand the request."
        };
    }

    if (
        decision.intent === "guidance" ||
        decision.intent === "general_question"
    ) {
        const message = await generateResponse(
            command,
            decision.intent,
            []
        );

        return {
            success: true,
            intent: decision.intent,
            message
        };
    }

    try {
        const data = await executeTool(
            decision.intent,
            decision.params || {},
            userContext.role
        );

        const message = await generateResponse(
            command,
            decision.intent,
            data
        );

        return {
            success: true,
            intent: decision.intent,
            tool: decision.intent,
            data,
            message
        };
    } catch (error) {
        console.error("AI tool execution error:", error.message);

        return {
            success: false,
            intent: decision.intent,
            message: error.message.includes("permission")
                ? error.message
                : "I could not retrieve those records. Please check the requested module and try again."
        };
    }
};

module.exports = {
    runAgent
};
