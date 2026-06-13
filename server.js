require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // if your index.html is inside /public

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({ reply: "Message is required" });
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        const response = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4.1-mini",
                input: [
                    { role: "system", content: "Reply short and fast." },
                    { role: "user", content: userMessage }
                ],
                max_output_tokens: 150,
                temperature: 0.7
            }),
            signal: controller.signal
        });

        clearTimeout(timeout);

        const data = await response.json();

        if (!response.ok) {
            console.error("API Error:", data);
            return res.status(response.status).json({ reply: "API Error" });
        }

        const aiReply = data.output_text || "No response";

        res.json({ reply: aiReply });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ reply: "Request failed or timed out" });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Fast AI Server running at http://localhost:${PORT}`);
});