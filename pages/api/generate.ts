export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    const { prompt } = req.body;
  
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o"
          messages: [
            { role: 'system', content: 'You are CoachBricks, an enterprise training and enablement advisor. Provide clear, actionable, data-driven feedback with a friendly and strategic tone.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });
  
      const data = await response.json();
      return res.status(200).json({ result: data.choices[0].message.content.trim() });
    } catch (err) {
      console.error("API error:", err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
  