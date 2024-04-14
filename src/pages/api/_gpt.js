const OpenAI = require("openai");

const configuration = {
  apiKey: process.env.OPENAI_API_KEY, 
};
const openai = new OpenAI(configuration);

export async function runGPT(model, markdown, instructions) {
  const systemPrompt = `
  You are a helpful assistant reformat, clean, edit the markdown content. Below are the instructions to follow:
  ${instructions}
  
  Apply the instructions on user-provided markdown below and provide the array of string replacement operations required. Do note that changes are applied sequentially.
  
  Give your changes in JSON format: { "changeList": [{originalText: "SOMETHING HERE", changedTo: "WILL BE CHANGED TO THIS"}] }
  
  If your change is an addition, the originalText will be any lines before or after the addition, and the changedTo will be the addition itself along with the included before/after lines.

  MAKE SURE THE "originalText" PART IS EXACTLY AS IT APPEARS IN THE MARKDOWN OTHERWISE IT WILL NOT BE REPLACED.
  `;

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
    // console.log("out from gpt", response.choices[0].message)
    const parsedResponse = JSON.parse(response.choices[0].message.content);

    // apply the changes
    const changeList = parsedResponse.changeList;
    let output = markdown;
    changeList.forEach(change => {
      output = output.replace(change.originalText, change.changedTo);
    });

    return {content: output, changes: changeList};
  } catch (error) {
    console.error("Error calling the OpenAI API:", error);
    throw error;
  }
}

// Example usage:
// runGPT('gpt-3.5-turbo-0125', 'Who won the world series in 2020?')
//   .then(output => console.log(output))
//   .catch(error => console.error(error));