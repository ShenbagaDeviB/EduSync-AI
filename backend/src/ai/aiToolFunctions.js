
const Announcement = require("../models/Announcement");
const Attendance = require("../models/Attendance");
const Complaint = require("../models/Complaint");
const Course = require("../models/Course");
const Department = require("../models/Department");
const Document = require("../models/Document");
const Enrollment = require("../models/Enrollment");
const Event = require("../models/Event");
const EventRegistration = require("../models/EventRegistration");
const Exam = require("../models/Exam");
const Faculty = require("../models/Faculty");
const Fee = require("../models/Fee");
const Feedback = require("../models/Feedback");
const Hostel = require("../models/Hostel");
const HostelAllocation = require("../models/HostelAllocation");
const HostelRoom = require("../models/HostelRoom");
const Leave = require("../models/Leave");
const LibraryBook = require("../models/LibraryBook");
const LibraryIssue = require("../models/LibraryIssue");
const Notification = require("../models/Notification");
const Payroll = require("../models/Payroll");
const Result = require("../models/Result");
const Student = require("../models/Student");
const Subject = require("../models/Subject");
const Timetable = require("../models/Timetable");
const User = require("../models/User");

const moduleRegistry = {
    announcements: {
        model: Announcement,
        fields: "announcementId title message postedBy targetAudience publishDate expiryDate status"
    },
    attendance: {
        model: Attendance,
        fields: "studentId subjectId date status"
    },
    complaints: {
        model: Complaint,
        fields: "complaintId submittedBy category subject description priority status resolution submittedAt resolvedAt",
        adminOnly: true
    },
    courses: {
        model: Course,
        fields: "courseId courseName department duration description"
    },
    departments: {
        model: Department,
        fields: "departmentId name code description headFacultyId"
    },
    documents: {
        model: Document,
        fields: "documentId ownerId documentType documentName uploadedAt status",
        adminOnly: true
    },
    enrollments: {
        model: Enrollment,
        fields: "enrollmentId studentId courseId departmentId academicYear semester enrollmentDate status"
    },
    events: {
        model: Event,
        fields: "eventId title description eventType venue startDate endDate organizerId status"
    },
    eventRegistrations: {
        model: EventRegistration,
        fields: "registrationId eventId participantId participantType registrationDate status"
    },
    exams: {
        model: Exam,
        fields: "examId examName subjectId examDate maxMarks"
    },
    faculty: {
        model: Faculty,
        fields: "facultyId name email department designation"
    },
    fees: {
        model: Fee,
        fields: "feeId studentId amount dueDate status"
    },
    feedback: {
        model: Feedback,
        fields: "feedbackId submittedBy category subject message rating status submittedAt",
        adminOnly: true
    },
    hostels: {
        model: Hostel,
        fields: "hostelId hostelName hostelType address totalRooms totalCapacity wardenName contactNumber status"
    },
    hostelAllocations: {
        model: HostelAllocation,
        fields: "allocationId studentId hostelId roomId allocationDate vacateDate status"
    },
    hostelRooms: {
        model: HostelRoom,
        fields: "roomId hostelId roomNumber floor roomType capacity occupied status"
    },
    leaves: {
        model: Leave,
        fields: "leaveId facultyId leaveType startDate endDate reason status approvedBy",
        adminOnly: true
    },
    libraryBooks: {
        model: LibraryBook,
        fields: "bookId title author isbn category totalCopies availableCopies"
    },
    libraryIssues: {
        model: LibraryIssue,
        fields: "issueId bookId studentId issueDate dueDate returnDate status"
    },
    notifications: {
        model: Notification,
        fields: "notificationId recipientId title message type isRead createdAt",
        adminOnly: true
    },
    payroll: {
        model: Payroll,
        fields: "payrollId facultyId month year basicSalary allowances deductions netSalary paymentStatus paymentDate",
        adminOnly: true
    },
    results: {
        model: Result,
        fields: "resultId studentId examId marksObtained grade"
    },
    students: {
        model: Student,
        fields: "studentId name email department course year"
    },
    subjects: {
        model: Subject,
        fields: "subjectId subjectName courseId semester credits"
    },
    timetable: {
        model: Timetable,
        fields: "timetableId courseId subjectId facultyId day startTime endTime room"
    },
    users: {
        model: User,
        fields: "name email role",
        adminOnly: true
    }
};

const moduleAliases = {
    announcement: "announcements",
    announcements: "announcements",
    attendance: "attendance",
    complaint: "complaints",
    complaints: "complaints",
    course: "courses",
    courses: "courses",
    department: "departments",
    departments: "departments",
    document: "documents",
    documents: "documents",
    enrollment: "enrollments",
    enrollments: "enrollments",
    event: "events",
    events: "events",
    eventregistration: "eventRegistrations",
    eventregistrations: "eventRegistrations",
    registration: "eventRegistrations",
    registrations: "eventRegistrations",
    exam: "exams",
    exams: "exams",
    faculty: "faculty",
    faculties: "faculty",
    fee: "fees",
    fees: "fees",
    feedback: "feedback",
    hostel: "hostels",
    hostels: "hostels",
    hostelallocation: "hostelAllocations",
    hostelallocations: "hostelAllocations",
    hostelroom: "hostelRooms",
    hostelrooms: "hostelRooms",
    leave: "leaves",
    leaves: "leaves",
    librarybook: "libraryBooks",
    librarybooks: "libraryBooks",
    libraryissue: "libraryIssues",
    libraryissues: "libraryIssues",
    notification: "notifications",
    notifications: "notifications",
    payroll: "payroll",
    result: "results",
    results: "results",
    student: "students",
    students: "students",
    subject: "subjects",
    subjects: "subjects",
    timetable: "timetable",
    timetables: "timetable",
    user: "users",
    users: "users"
};

const allowedFilterFields = [
    "studentId",
    "status",
    "courseId",
    "day",
    "eventId",
    "participantId",
    "participantType",
    "facultyId",
    "departmentId",
    "academicYear",
    "semester",
    "examId",
    "subjectId",
    "bookId",
    "hostelId",
    "roomId",
    "ownerId",
    "recipientId",
    "submittedBy",
    "category",
    "paymentStatus",
    "year",
    "month",
    "isRead",
    "title",
    "name",
    "courseName",
    "eventType",
    "leaveType",
    "priority",
    "targetAudience",
    "documentType",
    "participantType",
    "registrationId",
    "enrollmentId",
    "announcementId",
    "complaintId",
    "feedbackId",
    "feeId",
    "resultId",
    "examName",
    "subjectName",
    "subjectId",
    "department",
    "code",
    "designation",
    "hostelType",
    "roomType",
    "bookId",
    "isbn",
    "author",
    "availableCopies",
    "issueId",
    "allocationId",
    "payrollId",
    "notificationId",
    "type",
    "role",
    "email"
];

const normalizeModule = (moduleName) => {
    const key = String(moduleName || "")
        .replace(/[^a-zA-Z]/g, "")
        .toLowerCase();

    return moduleAliases[key] || null;
};

const getModuleRecords = async (
    moduleName,
    filters = {},
    userRole = null
) => {
    const moduleKey = normalizeModule(moduleName);
    const config = moduleRegistry[moduleKey];

    if (!config) {
        throw new Error("Unsupported ERP module.");
    }

    const role = String(userRole || "").toLowerCase();

    if (config.adminOnly && role !== "admin") {
        throw new Error(
            "You do not have permission to access this ERP module."
        );
    }

    const query = {};

    for (const [field, value] of Object.entries(filters || {})) {
        if (
            !allowedFilterFields.includes(field) ||
            value === undefined ||
            value === null ||
            !config.model.schema.path(field)
        ) {
            continue;
        }

        if (
            typeof value !== "string" &&
            typeof value !== "number" &&
            typeof value !== "boolean"
        ) {
            continue;
        }

        query[field] = value;
    }

    return await config.model
        .find(query)
        .select(config.fields)
        .limit(100)
        .lean();
};

module.exports = {
    getModuleRecords,
    moduleRegistry
};
