const executeTool = require("./toolExecutor");
const aiTools = require("./aiTools");

const {
    getStudents,
    getAttendance,
    getResults,
    getFeeStatus,
    getSubjectResults
} = require("./aiToolFunctions");

const processAICommand = async (command) => {
    console.log(
        "Available AI tools:",
        Object.keys(aiTools)
    );

    const lowerCommand = command.toLowerCase();

    // Student-specific results
    if (lowerCommand.includes("results for student")) {
        const studentId =
            command.match(/\b[A-Za-z]+\d+\b/)?.[0];

        if (!studentId) {
            return {
                success: false,
                message: "Please provide a valid student ID"
            };
        }

        const results = await executeTool(
            "get_subject_results",
            { studentId }
        );

        return {
            success: true,
            tool: "get_subject_results",
            data: results
        };
    }

    // All students
    if (lowerCommand.includes("student")) {
        const students =
            await executeTool("get_students");

        return {
            success: true,
            tool: "get_students",
            data: students
        };
    }

    // Attendance
    if (lowerCommand.includes("attendance")) {
        const attendance =
            await executeTool("get_attendance");

        return {
            success: true,
            tool: "get_attendance",
            data: attendance
        };
    }

    // All results
    if (lowerCommand.includes("result")) {
        const results =
            await executeTool("get_results");

        return {
            success: true,
            tool: "get_results",
            data: results
        };
    }

    // Fee status
    if (lowerCommand.includes("fee")) {
        const fees =
            await executeTool("get_fee_status");

        return {
            success: true,
            tool: "get_fee_status",
            data: fees
        };
    }

    return {
        success: true,
        message: `AI received your command: ${command}`
    };
};

module.exports = {
    processAICommand,
    getStudents,
    getAttendance,
    getResults,
    getFeeStatus,
    getSubjectResults
};