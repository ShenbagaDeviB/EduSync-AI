
const { processAICommand } = require("../ai/aiService");

const processCommand = async (req, res) => {
    try {
        const { command } = req.body;

        if (
            typeof command !== "string" ||
            !command.trim()
        ) {
            return res.status(400).json({
                message: "Command is required"
            });
        }

        const result = await processAICommand(
            command.trim(),
            {
                role: req.user?.role
            }
        );

        return res.json(result);
    } catch (error) {
        console.error("AI controller error:", error.message);

        return res.status(500).json({
            message: "AI processing failed"
        });
    }
};

module.exports = {
    processCommand
};
