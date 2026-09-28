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

    return {
        success: true,
        intent: decision.intent,
        tool: decision.intent,
        data
    };
};

module.exports = {
    runAgent
};