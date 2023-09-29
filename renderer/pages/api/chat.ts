// ./app/api/chat/route.ts
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import OpenAI from 'openai';

import { OpenAIStream, StreamingTextResponse } from "ai";
import { z } from "zod";
import { formSchema } from "../create";
import { NextApiRequest, NextApiResponse } from "next";


// TODO: Add your better system prompt here
const systemPrompt = {
  role: "system",
  content: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.`,
} as const;

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: "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"
});
const openai2 = new OpenAI({
  apiKey: "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"
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // Extract the `prompt` from the body of the request
  // console.log(req.body)


  const { messages } = (await JSON.parse(req.body)) as {
    messages: { content: string; role: ChatCompletionRequestMessageRoleEnum }[];
  };
  // console.log(messages)
  // return res.status(200).json({ message: messages });

  const lastMessage = messages.pop();

  const values = JSON.parse(lastMessage!.content) as z.infer<typeof formSchema>;

  const prompt = `
    Sales Description Request
  Representing Realtor/Agency: Ascend Realtors

  Using the provided information, craft a compelling sales description for the property. Ensure the content is divided into three main sections:

  1. Standard Description: Introduce the property with an engaging tone. Highlight its age, size, and any special architectural features that would appeal to a potential buyer. Make sure to touch upon the property's condition, history, and any unique selling points.

  2. Property Features: Describe the property's layout in a way that allows potential buyers to visualize living there. Emphasize functional and aesthetic aspects, detailing the flow from one room to another, and highlight any recent renovations, bespoke features, or technological integrations. Also, mention any additional structures, such as garages or sheds, and their current condition.

  3. Location Description: Convey the advantages of the property's location. Discuss proximity to essential services, local attractions, geographical features, and the overall ambiance of the neighborhood. If the area has any historical or cultural significance, use this to enhance the appeal.


  Inputs:
  - Property address: ${values.address}
  - Year of Construction: ${values.yearOfConstruction}
  - Size of the Property (in acres): ${values.sizeOfProperty}
  - Size of the Home (in square meters): ${values.sizeOfHome}
  - Number of Bed rooms: ${values.numberOfBedRooms}
  - Number of Bath rooms: ${values.numberOfBathRooms}
  - Architectural Style: ${values.architecturalStyle}
  - Outbuildings: ${values.outbuildings}
  - Nearby Amenities: ${values.nearbyAmenities}
  - Local Attractions: ${values.localAttractions}
  - Geographical Features: ${values.geographicalFeatures}
  - Interior Details: ${values.interiorFeatures}
  - Unique Selling Points: ${values.uniqueSellingPoints}
  `;

  if (!lastMessage) {
    throw new Error("No messages provided");
  }

  // Ask OpenAI for a streaming chat completion given the prompt
  // const response = await openai.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   stream: false,
  //   messages: [
  //     systemPrompt,
  //     {
  //       role: "user",
  //       content: prompt,
  //     },
  //   ],
  // });



  const response2 = await openai2.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: false,
    messages: [
      systemPrompt,
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  // const stream2 = OpenAIStream(response2);


  // Convert the response into a friendly text-stream
  // const stream = await OpenAIStream(response);
  // Respond with the stream
  // console.log(values)
  // console.log("----------------------")
  // console.log(prompt)
  // console.log("----------------------")
  // // console.log(stream2)
  // console.log("----------------------")
  // console.log(response2)
  // return new StreamingTextResponse(stream);
  // return new StreamingTextResponse(stream2);

  return res.status(200).json({ message: { content: "slightly kaj kore", response: response2.choices[0].message } });
}