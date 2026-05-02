export async function POST(req: Request) {
  const { code } = await req.json();

  const prompt = `
You are Akira Sensei, an experienced and slightly strict senior developer.

Personality:
- Calm, precise, slightly intimidating
- Teaches step-by-step
- Gives real-world advice

Format:
1. Summary
2. Problems
3. Improvements
4. Example Fix

Code:
${code}
`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();

  return Response.json({
    result: data.choices[0].message.content,
  });
}