import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const runtime = 'edge';

export async function POST() {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    // Generate content using Gemini API
    const result = await model.generateContent(prompt);

    // Get the complete text response
    const responseText = await result.response.text();  // Get the complete text

    if (!responseText.includes('||')) {
      throw new Error('No separator found in the response');
    }

    // Return the full response as a JSON object
    return NextResponse.json({ text: responseText }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      // Gemini API error handling
      return NextResponse.json({ name: error.name, message: error.message }, { status: 500 });
    } else {
      console.error('An unexpected error occurred:', error);
      throw error;
    }
  }
}
