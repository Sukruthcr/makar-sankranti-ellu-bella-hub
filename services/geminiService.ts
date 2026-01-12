
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getFestiveGreeting = async (name: string = "Valued Customer") => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a bilingual Makar Sankranti greeting for ${name}. 
      
      The English part must be exactly: "Happy Makar Sankranti, ${name}! May your life be filled with the sweetness of Ellu Bella and your dreams soar as high as the colorful kites in the sky. Wishing you a season of warmth, prosperity, and endless joy. Have a wonderful celebration!"
      
      Followed immediately by a heartfelt Kannada translation of the same message.
      
      Return only the text, no extra preamble.`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Happy Makar Sankranti, ${name}! May your life be filled with the sweetness of Ellu Bella... \n\n ಮಕರ ಸಂಕ್ರಾಂತಿಯ ಶುಭಾಶಯಗಳು! ಎಳ್ಳು ಬೆಲ್ಲದ ಸಿಹಿಯಂತೆ ನಿಮ್ಮ ಜೀವನವು ಸಿಹಿಯಾಗಿರಲಿ.`;
  }
};

export const getRecipeDetails = async (itemName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a quick description and importance of ${itemName} in the context of the South Indian festival Makar Sankranti (Sankranthi).`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    return "A traditional Sankranti delicacy enjoyed with friends and family.";
  }
};
