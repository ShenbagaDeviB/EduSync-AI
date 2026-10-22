const aiResponseSchema = {
    intent: [
        "get_students",
        "get_attendance",
        "get_results",
        "get_fee_status",
        "get_subject_results",
        "guidance",
        "general_question",
        "unknown"
    ],
    params: {}
};

module.exports = aiResponseSchema;