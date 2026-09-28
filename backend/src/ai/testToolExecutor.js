const executeTool = require("./toolExecutor");

const test = async () => {
    const students = await executeTool("get_students");

    console.log("Tool Executor Result:");
    console.log(students);
};

test();