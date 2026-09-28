const {
    getStudents,
    getAttendance,
    getResults,
    getFeeStatus,
    getSubjectResults
} = require("./aiToolFunctions");

const executeTool = async (toolName, params = {}) => {
    switch (toolName) {
        case "get_students":
            return await getStudents();

        case "get_attendance":
            return await getAttendance();

        case "get_results":
            return await getResults();

        case "get_fee_status":
            return await getFeeStatus();

        case "get_subject_results":
            return await getSubjectResults(params.studentId);

        default:
            throw new Error(`Unknown AI tool: ${toolName}`);
    }
};

module.exports = executeTool;