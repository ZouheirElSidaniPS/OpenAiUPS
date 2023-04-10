const { Configuration, OpenAIApi } = require("openai");
var fs = require('fs');
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

async function testCompletion() {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Tell me a knock knock joke",
        // length of response 
        max_tokens: 50,
        //closer to 1 is more creative
        temperature: 0
      });

      console.log("\n**************************** Basic Prompt UseCase ****************************\n")
      console.log("Prompt: Tell me a knock knock joke\n");
    console.log("OPENAPI Output: " + response.data.choices[0].text);
  }

// Can produce desired output but no log of changed output
// Need secondary code to run through changes and produce the differences 
async function testAutoCorrect(){
  const response = await openai.createEdit({
    model: "text-davinci-edit-001",
    input: "The computter was nit workin today",
    instruction: "Fix all spelling mistakes",
    n: 1,
    temperature: 0.1

  });
  console.log("\n**************************** Spell Check Prompt given Instruction ****************************\n")
  console.log("Input: The computter was nit workin today\n")
  console.log("Instruction: Fix all spelling mistakes\n")
  console.log("OPENAPI Output: \n \n" + response.data.choices[0].text);
}

  async function testUniqueGreeting() {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "I am a customer at ups, I have 3 packages beging deleivered tomorrow and its christmas."+
        "Write me a personalized about the previous sentence.",
        // length of response 
        max_tokens: 75,
        //closer to 2 is more creative
        temperature: .8
      });

      console.log("**************************** Generate Unique Greeting from given information ****************************\n")
      console.log("Prompt: I work and live in new york city. I work for a consulting company called publicis sapient."+
      " I like ping pong. Write me a personalized greeting.\n")
      console.log("OPENAPI Output: " + response.data.choices[0].text);
  }

async function testImage(){
  const response = await openai.createImage({
    prompt: "Cartoon United Parcel Service delivery guy during Christmas at a porch with UPS logo",
    n: 2,
    size: "1024x1024",
    response_format: "url",
  });

  console.log("\n**************************** Generate Image from Prompt ****************************\n")
  console.log("Prompt: Cartoon United Parcel Service delivery guy during Christmas at a porch with UPS logo\n")
  console.log("First Image \n")
  console.log("OPENAPI Output: \n" +  response.data.data[0].url);
  console.log("\nSecond Image \n")
  console.log("OPENAPI Output: \n" +  response.data.data[0].url + "\n");
}

// Can solve simple problems very quickly, more complex ones creates many more errors 
async function testCodeGeneration() {
  const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Write a nodejs function that uses the openai API using the completion function with the text-davinci-003 model.",
      // length of response 
      max_tokens: 300,
      //closer to 2 is more creative
      temperature: .8
    });

    const response2 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Write a python function that prints out numbers 1 through 10",
      // length of response 
      max_tokens: 100,
      //closer to 2 is more creative
      temperature: .8
    });
    console.log("**************************** Generate Code from Prompt ****************************\n")
    console.log("Prompt: Write a nodejs function that uses the openai API using the completion function with the text-davinci-003 model.");
  console.log("OPENAPI Output: " + response.data.choices[0].text);
  console.log("\nPrompt: Write a python function that prints out numbers 1 through 10\n\n");
  console.log("OPENAPI Output: " +  response2.data.choices[0].text + "\n");
}
const axios = require('axios');

async function generateSEORecommendations(url) {  
  const response1 = await axios.get(url);

  const response = await openai.createCompletion({

    model: "text-davinci-003",

    prompt: `Generate SEO recommendations for ${url}.`,

    // length of response

    max_tokens: 300,

    //closer to 1 is more creative

    temperature: 0

        });

  console.log("**************************** Generate SEO Recommendations from URL ****************************\n")
  console.log("Prompt: Generate SEO recommendations for https://www.ups.com/us/en/Home.page");
  console.log("\nOPENAPI Output: " + response.data.choices[0].text +"\n");
}

const url = "https://www.ups.com/us/en/Home.page";

async function runFunctions(){
  await testCompletion();
await testAutoCorrect();
await testUniqueGreeting()
await testImage();
await testCodeGeneration();
await generateSEORecommendations(url);
}

runFunctions();