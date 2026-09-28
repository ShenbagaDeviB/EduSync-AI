const detectIntent = require("./aiDecisionEngine").detectIntent;
const executeTool = require("./toolExecutor");

const runAgent = async (command) => {
    const decision = await detectIntent(command);
    console.log("AI Agent Decision:", decision);

    if (decision.intent === "unknown") {
        return {
            success: false,
            message: "I could not understand the requested action."
        };
    }

    const data = await executeTool(
        decision.intent,
        decision.params
    );
    console.log("AI Tool Result:", data);

    return {
        success: true,
        intent: decision.intent,
        tool: decision.intent,
        data,
        message: data.length
            ? "Here is the requested information."
            : "No records found."
    };
};

module.exports = {
    runAgent
};