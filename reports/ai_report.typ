#set par(justify: true)
#show link: underline
#import "@preview/codly:1.0.0": *
#import "@preview/codly-languages:0.1.0": *

#show: codly-init
#codly(
  languages: codly-languages,
  zebra-fill: none,
  number-format: it => text(fill: luma(200), str(it)),
)

= AI Usage in the Project

- https://eduardz1.github.io/La-Nuit-de-L-Info/

In our submission, AI is primarily utilized through the "Know More" button, available after each question related to pollution in the environment, particularly in oceans. This feature submits a query to Gemini using a custom prompt to retrieve detailed information on the topic.

For future improvements, we propose integrating a chatbot to address user questions that may arise after completing the "game."

We also utilized AI (suno.ai) to generate the gingle for the podcast.


== Relevant Code Implementation

The implementation relies on the NPM package `@google/generative-ai` to access the Gemini APIs. This approach simplifies the content creation process by shifting the responsibility from developers to generative AI, making the solution both efficient and scalable.

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
```

```javascript
const [loading, setLoading] = useState(false);
const [aiResponse, setResponse] = useState("");

async function aiRun(query) {
  setLoading(true);

  try {
    const result = await model.generateContent(query);
    const response = result.response;
    const text = response.text();
    setResponse(text);
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
}

const handleGeminiQuery = (query) => {
  setPromptButtonFirstQuestion(true);
  aiRun(query);
};
```
== Accessibility Enhancements with AI

To make our podcasts more accessible, subtitles were generated using OpenAI Whisper, a state-of-the-art automatic speech recognition (ASR) tool. Due to performance constraints, we opted for the small model instead of more resource-intensive alternatives.

Also, this document was collaboratively written with the assistance of a large language model (LLM).