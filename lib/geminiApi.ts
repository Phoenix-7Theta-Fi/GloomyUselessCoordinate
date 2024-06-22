import axios from 'axios';

const geminiApiKey = process.env.GEMINI_API_KEY!;
const geminiApiUrl = 'https://api.google.com/gemini/v1';

export const getDiagnosis = async (symptoms: string) => {
  const response = await axios.post(
    `${geminiApiUrl}/diagnose`,
    { symptoms },
    {
      headers: { Authorization: `Bearer ${geminiApiKey}` },
    }
  );
  return response.data;
};
