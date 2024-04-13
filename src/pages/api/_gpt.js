const OpenAI = require("openai");

const configuration = {
  apiKey: process.env.OPENAI_API_KEY, 
};
const openai = new OpenAI(configuration);

export async function runGPT(model, markdown, instructions) {
  const systemPrompt = `
  You are a helpful assistant to clean up the markdown content. Below are the instructions to follow:
  ${instructions}
  
  Apply the instructions on user-provided markdown below and provide the cleaned markdown content. Give your response in JSON format: { "content": "your response here" }`;

  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: markdown }
      ],
      response_format: { type: "json_object" } // This enables JSON mode
    });

    // Assuming the response is properly formatted as JSON, parse it
    console.log("out from gpt", response.choices[0].message)
    const parsedResponse = JSON.parse(response.choices[0].message.content);
    return parsedResponse;
  } catch (error) {
    console.error("Error calling the OpenAI API:", error);
    throw error;
  }
}

// Example usage:
// runGPT('gpt-3.5-turbo-0125', 'Who won the world series in 2020?')
//   .then(output => console.log(output))
//   .catch(error => console.error(error));