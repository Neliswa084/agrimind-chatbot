const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY;

const SYSTEM_PROMPT = `You are AgriMind, a friendly agricultural AI assistant 
helping South African farmers. Answer questions about farming, crop diseases, 
soil health, planting seasons and weather. Keep responses concise and practical. 
Use simple language a farmer can understand.`;

export async function askGemini(question) {
  const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: SYSTEM_PROMPT + '\n\nUser question: ' + question }
            ]
          }
        ]
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.error?.message || 'Gemini API error');
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ||
    'Sorry, I could not get a response. Please try again.';
}