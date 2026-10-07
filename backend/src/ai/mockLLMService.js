const llmTools = require("./llmTools");
const aiResponseSchema = require("./aiResponseSchema");
const mockLLM = async (command) => {
    console.log(
        "Available LLM tools:",
        llmTools.map((tool) => tool.name)
    );
    const text = command.toLowerCase();

    if (text.includes("attendance")) {
        const studentId =
            command.match(/\b\d+[A-Za-z]+\d+\b/i)?.[0];

        return {
            intent: "get_attendance",
            params: studentId ? { studentId } : {}
        };
    }

    if (text.includes("fee")) {
        return {
            intent: "get_fee_status",
            params: {}
        };
    }

    if (text.includes("result")) {
        const studentId =
            command.match(/\b\d+[A-Za-z]+\d+\b/i)?.[0];

        if (studentId) {
            return {
                intent: "get_subject_results",
                params: { studentId }
            };
        }

        return {
            intent: "get_results",
            params: {}
        };
    }

    if (text.includes("student")) {
        return {
            intent: "get_students",
            params: {}
        };
    }

    return {
        intent: "unknown",
        params: {}
    };
};

module.exports = {
    mockLLM
};