const { detectIntent } = require("./aiDecisionEngine");
const executeTool = require("./toolExecutor");

const processAICommand = async (command) => {
    const decision = detectIntent(command);

    console.log("AI Decision:", decision);
    if (decision.intent !== "unknown") {
        const data = await executeTool(
            decision.intent,
            decision.params
        );

        return {
            success: true,
            tool: decision.intent,
            data
        };
    }
    
    return {
        success: true,
        message: `AI received your command: ${command}`
    };
};

module.exports = {
    processAICommand
};