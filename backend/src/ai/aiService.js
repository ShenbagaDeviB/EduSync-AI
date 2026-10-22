
const { runAgent } = require("./agentController");

const processAICommand = async (command, userContext = {}) => {
    if (typeof command !== "string" || !command.trim()) {
        throw new Error("Command is required.");
    }

    return await runAgent(command.trim(), userContext);
};

module.exports = {
    processAICommand
};
