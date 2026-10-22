
const llmTools = require("./llmTools");

const mockLLM = async (command) => {
    console.log("Available AI tools:", llmTools.map((tool) => tool.name));

    const text = command.toLowerCase().trim();

    const studentId =
        command.match(/\b\d{6}[A-Za-z]{3}\d{3}\b/i)?.[0];

    const guidancePatterns = [
        /^how do i\b/,
        /^how can i\b/,
        /^how to\b/,
        /^guide me\b/,
        /^help me\b/,
        /^explain how\b/,
        /^steps to\b/,
        /^what should i do\b/
    ];

    if (guidancePatterns.some((pattern) => pattern.test(text))) {
        return {
            intent: "guidance",
            params: { question: command }
        };
    }

    if (
        text.includes("what is ") ||
        text.startsWith("explain ") ||
        text.startsWith("why ")
    ) {
        return {
            intent: "general_question",
            params: { question: command }
        };
    }

    const modulePatterns = [
        { module: "eventRegistrations", words: ["event registration", "event registrations", "registrations", "registration list"] },
        { module: "hostelAllocations", words: ["hostel allocation", "hostel allocations"] },
        { module: "hostelRooms", words: ["hostel room", "hostel rooms", "room availability"] },
        { module: "libraryIssues", words: ["library issue", "library issues", "issued books", "borrowed books"] },
        { module: "libraryBooks", words: ["library book", "library books", "books in library"] },
        { module: "announcements", words: ["announcement", "announcements"] },
        { module: "attendance", words: ["attendance", "absent", "present"] },
        { module: "complaints", words: ["complaint", "complaints"] },
        { module: "courses", words: ["course list", "courses", "course details"] },
        { module: "departments", words: ["department", "departments"] },
        { module: "documents", words: ["document", "documents", "uploaded files"] },
        { module: "enrollments", words: ["enrollment", "enrollments", "enrolment", "admission list"] },
        { module: "events", words: ["event", "events", "upcoming event"] },
        { module: "exams", words: ["exam", "exams", "exam schedule"] },
        { module: "faculty", words: ["faculty", "faculties", "teacher", "teachers"] },
        { module: "fees", words: ["fee", "fees", "payment status", "overdue payment"] },
        { module: "feedback", words: ["feedback", "ratings"] },
        { module: "hostels", words: ["hostel", "hostels"] },
        { module: "leaves", words: ["leave", "leaves", "leave request"] },
        { module: "notifications", words: ["notification", "notifications"] },
        { module: "payroll", words: ["payroll", "salary", "salaries"] },
        { module: "results", words: ["result", "results", "marks", "grade", "grades"] },
        { module: "students", words: ["student", "students", "class list"] },
        { module: "subjects", words: ["subject", "subjects"] },
        { module: "timetable", words: ["timetable", "time table", "class schedule", "class timings"] },
        { module: "users", words: ["user list", "users", "user accounts"] }
    ];

    const matched = modulePatterns.find((item) =>
        item.words.some((word) => text.includes(word))
    );

    if (!matched) {
        return {
            intent: "general_question",
            params: { question: command }
        };
    }

    const filters = {};

    if (studentId) {
        filters.studentId = studentId;
    }

    const dayMatch = text.match(
        /\b(monday|tuesday|wednesday|thursday|friday|saturday)\b/i
    );

    if (dayMatch) {
        filters.day =
            dayMatch[0].charAt(0).toUpperCase() +
            dayMatch[0].slice(1).toLowerCase();
    }

    const statusMatch = text.match(
        /\b(pending|paid|overdue|active|completed|cancelled|cancelled|approved|rejected|resolved|published|upcoming|ongoing|returned|issued|registered|attended|absent|present)\b/i
    );

    if (statusMatch) {
        const status = statusMatch[0].toLowerCase();
        filters.status = status.charAt(0).toUpperCase() + status.slice(1);
    }

    const eventId = command.match(/\bEVT[-_]?\w+\b/i)?.[0];
    if (eventId && matched.module === "eventRegistrations") {
        filters.eventId = eventId;
    }

    const courseId = command.match(/\bCOURSE[-_]?\w+\b/i)?.[0];
    if (courseId && matched.module === "timetable") {
        filters.courseId = courseId;
    }

    return {
        intent: "get_module_records",
        params: {
            module: matched.module,
            filters
        }
    };
};

module.exports = {
    mockLLM
};
