
const { mockLLM } = require("./mockLLMService");
const llmTools = require("./llmTools");

const OLLAMA_URL = "http://localhost:11434/api/chat";
const OLLAMA_MODEL = "qwen2.5:3b";

const detectIntent = async (command) => {
    try {
        const response = await fetch(OLLAMA_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: OLLAMA_MODEL,
                stream: false,
                format: "json",
                messages: [
                    {
                        role: "system",
                        content: `
You are the decision engine for EduSync, an Educational ERP system.

Available tools:
${JSON.stringify(llmTools)}

Return only a JSON object in this format:
{
  "intent": "get_module_records",
  "params": {
    "module": "students",
    "filters": {}
  }
}

For guidance:
{
  "intent": "guidance",
  "params": {"question": "user question"}
}

For general questions:
{
  "intent": "general_question",
  "params": {"question": "user question"}
}

Rules:
- Use get_module_records for requests to retrieve actual ERP records.
- Select only a module available in the tool definition.
- Add filters only when the user clearly provides filter values.
- For general questions and how-to guidance, do not retrieve records.
- Never invent database records.
- Return valid JSON only.
                        `
                    },
                    {
                        role: "user",
                        content: command
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`Ollama returned HTTP ${response.status}`);
        }

        const result = await response.json();
        const decision = JSON.parse(result.message?.content || "{}");

        const validIntents = [
            "get_module_records",
            "guidance",
            "general_question"
        ];

        if (!validIntents.includes(decision.intent)) {
            throw new Error("Ollama returned an unsupported intent.");
        }

        if (
            decision.intent === "get_module_records" &&
            (
                typeof decision.params?.module !== "string" ||
                typeof decision.params?.filters !== "object" ||
                decision.params.filters === null ||
                Array.isArray(decision.params.filters)
            )
        ) {
            throw new Error("Ollama returned invalid tool parameters.");
        }

        console.log("Using Ollama decision engine:", decision);

        return {
            intent: decision.intent,
            params: decision.params || {}
        };
    } catch (error) {
        console.error(
            "Ollama decision failed; using mock fallback:",
            error.message
        );

        const fallbackDecision = await mockLLM(command);

        if (
            !fallbackDecision ||
            typeof fallbackDecision.intent !== "string"
        ) {
            return {
                intent: "unknown",
                params: {}
            };
        }

        return {
            intent: fallbackDecision.intent,
            params: fallbackDecision.params || {}
        };
    }
};

module.exports = {
    detectIntent
};
