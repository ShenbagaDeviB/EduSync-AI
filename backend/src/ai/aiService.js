const Student = require("../models/Student");

const getStudents = async () => {
    const students = await Student.find().select(
        "studentId name email department course year"
    );

    return students;
};

const Attendance = require("../models/Attendance");

const getAttendance = async () => {
    const attendance = await Attendance.find();

    return attendance;
};

const processAICommand = async (command) => {
    if (command.toLowerCase().includes("student")) {
        const students = await getStudents();

        return {
            success: true,
            tool: "get_students",
            data: students
        };
    }

    if (command.toLowerCase().includes("attendance")) {
        const attendance = await getAttendance();

        return {
            success: true,
            tool: "get_attendance",
            data: attendance
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
  getAttendance
};