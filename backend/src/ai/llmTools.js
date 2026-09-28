const llmTools = [
    {
        name: "get_students",
        description: "Get student information",
        parameters: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "get_attendance",
        description: "Get attendance information",
        parameters: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "get_results",
        description: "Get student result information",
        parameters: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "get_fee_status",
        description: "Get student fee status",
        parameters: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "get_subject_results",
        description: "Get results for a specific student",
        parameters: {
            type: "object",
            properties: {
                studentId: {
                    type: "string",
                    description: "The unique student ID"
                }
            },
            required: ["studentId"]
        }
    }
];

module.exports = llmTools;