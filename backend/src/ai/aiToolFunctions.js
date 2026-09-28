const Student = require("../models/Student");
const Attendance = require("../models/Attendance");
const Result = require("../models/Result");
const Fee = require("../models/Fee");

const getStudents = async () => {
    const students = await Student.find().select(
        "studentId name email department course year"
    );

    return students;
};

const getAttendance = async () => {
    const attendance = await Attendance.find();

    return attendance;
};

const getResults = async () => {
    const results = await Result.find().select(
        "resultId studentId examId marksObtained grade"
    );

    return results;
};

const getSubjectResults = async (studentId) => {
    const results = await Result.find({ studentId }).select(
        "resultId studentId examId marksObtained grade"
    );

    return results;
};

const getFeeStatus = async () => {
    const fees = await Fee.find().select(
        "feeId studentId amount dueDate status"
    );

    return fees;
};

module.exports = {
    getStudents,
    getAttendance,
    getResults,
    getSubjectResults,
    getFeeStatus
};