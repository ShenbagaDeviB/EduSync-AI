const processAICommand = async (command) => {
  return {
    success: true,
    message: `AI received your command: ${command}`
  };
};

module.exports = {
  processAICommand
};