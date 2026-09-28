const { processAICommand } = require("../ai/aiService");

const processCommand = async (req, res) => {
  try {
    const { command } = req.body;

    if (!command) {
      return res.status(400).json({
        message: "Command is required"
      });
    }

    const result = await processAICommand(command);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "AI processing failed"
    });
  }
};

module.exports = {
  processCommand
};