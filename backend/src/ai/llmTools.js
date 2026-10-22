
const modules = [
    "announcements",
    "attendance",
    "complaints",
    "courses",
    "departments",
    "documents",
    "enrollments",
    "events",
    "eventRegistrations",
    "exams",
    "faculty",
    "fees",
    "feedback",
    "hostels",
    "hostelAllocations",
    "hostelRooms",
    "leaves",
    "libraryBooks",
    "libraryIssues",
    "notifications",
    "payroll",
    "results",
    "students",
    "subjects",
    "timetable",
    "users"
];

const llmTools = [
    {
        name: "get_module_records",
        description:
            "Retrieve existing records from one EduERP module. Use this for requests for actual ERP data, lists, statuses, schedules, and records. Never invent database results.",
        parameters: {
            type: "object",
            properties: {
                module: {
                    type: "string",
                    enum: modules,
                    description: "The ERP module to query."
                },
                filters: {
                    type: "object",
                    properties: {
                        studentId: { type: "string" },
                        status: { type: "string" },
                        courseId: { type: "string" },
                        day: { type: "string" },
                        eventId: { type: "string" },
                        participantId: { type: "string" },
                        facultyId: { type: "string" },
                        departmentId: { type: "string" },
                        academicYear: { type: "string" },
                        semester: { type: "number" },
                        examId: { type: "string" },
                        subjectId: { type: "string" },
                        bookId: { type: "string" },
                        hostelId: { type: "string" },
                        roomId: { type: "string" },
                        recipientId: { type: "string" },
                        category: { type: "string" },
                        paymentStatus: { type: "string" },
                        year: { type: "number" },
                        month: { type: "string" },
                        isRead: { type: "boolean" },
                        title: { type: "string" },
                        name: { type: "string" },
                        courseName: { type: "string" },
                        eventType: { type: "string" },
                        leaveType: { type: "string" },
                        priority: { type: "string" },
                        targetAudience: { type: "string" },
                        role: { type: "string" }
                    },
                    additionalProperties: false
                }
            },
            required: ["module", "filters"],
            additionalProperties: false
        }
    }
];

module.exports = llmTools;
