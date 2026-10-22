
const OLLAMA_URL = "http://localhost:11434/api/chat";
const OLLAMA_MODEL = "qwen2.5:3b";

const askOllama = async (systemPrompt, userPrompt) => {
    const response = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: OLLAMA_MODEL,
            stream: false,
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ]
        })
    });

    if (!response.ok) {
        throw new Error(`Ollama returned HTTP ${response.status}`);
    }

    const result = await response.json();

    return result.message?.content?.trim() ||
        "I couldn't generate a response. Please try again.";
};

const generateResponse = async (command, toolName, data) => {
    if (toolName === "guidance") {
        try {
            return await askOllama(
                `You are EduSync AI, an educational ERP assistant.
Give clear, beginner-friendly, step-by-step instructions.
Do not claim you performed an action.
If the exact ERP interface is unknown, explain that the steps are general.`,
                command
            );
        } catch (error) {
            console.error("Ollama guidance error:", error.message);

            return "I couldn't connect to the local AI service. Please ensure Ollama is running.";
        }
    }

    if (toolName === "general_question") {
        try {
            return await askOllama(
                `You are EduSync AI.
Answer the user's question accurately and clearly.
Do not invent ERP records or claim to have accessed live database data.`,
                command
            );
        } catch (error) {
            console.error("Ollama general-question error:", error.message);

            return "I couldn't connect to the local AI service. Please ensure Ollama is running.";
        }
    }

    if (!Array.isArray(data) || data.length === 0) {
        return "No records found for your request.";
    }

    if (toolName === "get_module_records") {
        try {
            const safeData = data.slice(0, 50).map((record) => {
                const item = { ...record };

                delete item.password;
                delete item.fileUrl;
                delete item.__v;

                return item;
            });

            return await askOllama(
                `You are EduSync AI, an educational ERP assistant.
Answer using only the supplied database records.
Never invent or alter record values.
Use readable lists for multiple records.
If only some records are supplied, do not claim they are the complete dataset.`,
                `User request: ${command}

Database records:
${JSON.stringify(safeData, null, 2)}`
            );
        } catch (error) {
            console.error("Ollama record-response error:", error.message);

            return `Found ${data.length} record(s). See the returned data for details.`;
        }
    }

    return `Found ${data.length} record(s).`;
};

module.exports = {
    generateResponse
};
