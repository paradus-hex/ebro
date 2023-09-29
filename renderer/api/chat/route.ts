// ./app/api/chat/route.ts
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { z } from "zod";
import { formSchema } from "../../pages/create";


// TODO: Add your better system prompt here
const systemPrompt = {
  role: "system",
  content: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.`,
} as const;

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = (await req.json()) as {
    messages: { content: string; role: ChatCompletionRequestMessageRoleEnum }[];
  };
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
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      systemPrompt,
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}