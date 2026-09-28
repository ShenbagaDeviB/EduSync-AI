const { runAgent } = require("./agentController");

const processAICommand = async (command) => {
    return await runAgent(command);
};

module.exports = {
    processAICommand
};