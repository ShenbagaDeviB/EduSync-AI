
const { getModuleRecords } = require("./aiToolFunctions");

const executeTool = async (
    toolName,
    params = {},
    userRole = null
) => {
    switch (toolName) {
        case "get_module_records":
            return await getModuleRecords(
                params.module,
                params.filters || {},
                userRole
            );

        default:
            throw new Error(`Unknown AI tool: ${toolName}`);
    }
};

module.exports = executeTool;
