// Exercise 1: Rewrite and Optimize a Vague Prompt

// Three critical issues with “Write something about productivity tips”:
// 1. It gives no brand voice or context, so the result may not sound like FlowNest.
// 2. It does not identify the intended audience, so the advice may feel irrelevant.
// 3. It does not specify LinkedIn-friendly structure or engagement goals, such as a
//    strong opening, readable formatting, or a call to action.

const rewrittenPrompt = `Act as FlowNest’s social media copywriter. Write a LinkedIn post
for busy professionals who want to focus better during their workday. Share 3 practical,
easy-to-try focus tips and naturally introduce FlowNest as a tool that can support a
calmer, more focused work routine. Use a warm, encouraging, professional tone; start with
an engaging hook, format the tips as bullet points, and end with a question or simple
call to action. Keep the post under 150 words and avoid unsupported claims.

Use this format and tone whenever we promote productivity tools on social media.`;

// The prompt uses role prompting, specific instructions, and clear tone/format/length
// constraints. Its final line makes the template reusable for future promotions.

// Exercise 2: Multi-Part Prompt for Quiz Generation

const quizGenerationPrompt = `Act as a friendly 7th-grade science teacher and learning
designer. Use only the article provided below to create an engaging science lesson for
students ages 11–13.

Article:
[Paste the volcanic eruptions article here]

Create the content in this order:
1. Begin with a slide titled “Volcanic Eruptions: Quick Review.” Summarize the article
   in exactly 2 short, simple bullet points. Include only its main ideas.
2. Create exactly 3 multiple-choice questions based on important facts or ideas in the
   article. Use simple vocabulary suitable for ages 11–13. Each question must have
   exactly 3 answer choices labeled A, B, and C: 1 correct answer and 2 believable but
   incorrect distractors. Do not make the correct answer obvious through wording or
   answer length.
3. Put each question on its own slide. Use a short slide title, one clearly worded
   question, and the A/B/C choices.
4. Finish with an “Answer Key” slide listing the correct letter and answer for each
   question, with a brief explanation supported by the article.

Use a friendly, encouraging tone and simple language throughout. Do not add facts that
are not in the article. If the article does not provide enough information for a valid
question, do not guess; choose another supported idea. Format the response as a
Google Slides-ready outline, with each slide labeled “Slide 1,” “Slide 2,” and so on,
and concise text that can be copied directly onto slides.`;

// Three ways this prompt improves on “Make a quiz for kids about this article”:
// 1. It specifies the grade and age range, vocabulary level, and friendly tone, making
//    the content better matched to the students.
// 2. It sets exact content requirements (2 summary bullets and 3 questions, each with
//    one correct answer and two distractors) and asks for an answer key.
// 3. It requires article-supported information and a slide-by-slide outline, reducing
//    invented or irrelevant material and making the result ready for Google Slides.

// Exercise 3: Add Context, Get Better Results

const missingContextTable = [
  {
    contextType: "Role",
    isMissing: "Yes",
    whatToAdd: "Ask the AI to act as a financial analyst who can explain key figures clearly.",
  },
  {
    contextType: "Audience",
    isMissing: "Yes",
    whatToAdd: "Specify that the audience is a non-technical executive team.",
  },
  {
    contextType: "Purpose",
    isMissing: "Yes",
    whatToAdd: "State that the summary is for a monthly finance update presentation.",
  },
  {
    contextType: "Input Source",
    isMissing: "Yes",
    whatToAdd: "Provide the report and instruct the AI to use its data, not outside assumptions.",
  },
  {
    contextType: "Format/Style",
    isMissing: "Yes",
    whatToAdd: "Request a concise, presentation-ready structure with key takeaways and supporting figures.",
  },
  {
    contextType: "Constraints",
    isMissing: "Yes",
    whatToAdd: "Limit the spoken summary to 3 minutes and flag figures or comparisons the report does not provide.",
  },
];

const financeSummaryPrompt = `Act as a financial analyst preparing a clear monthly finance
update for a non-technical executive team. Using only the report provided below, write a
spoken summary for a presentation that takes no more than 3 minutes.

Organize the summary into 3 key takeaways. For each takeaway, include the relevant
financial figure from the report, its reporting period, and a brief explanation of why
it matters. Highlight important changes or trends only when they are supported by
comparable figures in the report. End with one concise overall outlook based on the
report.

Use plain language and a professional, neutral tone. Do not invent numbers, causes, or
forecasts; clearly say when the report does not provide information needed for a
comparison. Keep the result concise and easy to read aloud.

Report:
[Paste the monthly finance report here]`;

// Exercise 4: Match Prompt to Purpose

const customerSupportPrompt = `You are a customer support chatbot for an e-commerce
company. Help customers with orders, shipping, returns, refunds, and product questions.
Be polite, calm, and concise. Use only the information in the provided order details and
company policies. Never guess about order status, promise an exception, or request full
payment-card details. If information is missing, ask one clear follow-up question; if
you cannot resolve the issue, explain that a human support agent can help.

For every reply, use this structure:
1. Answer: Give the direct answer or briefly explain what is not yet known.
2. Next step: Provide the relevant action the customer can take, or ask one follow-up
   question.
3. Escalation: Include this only when a support agent is needed, and explain how to
   contact one using the provided support information.

Customer message:
[Paste the customer's message here]

Relevant order details and company policies:
[Paste verified details and policies here]`;

// Two features that make this a structured prompt:
// 1. It requires a fixed Answer / Next step / Escalation response format.
// 2. It defines what information to use and how to handle missing details or escalation.
//
// The structured style fits support because consistent, scannable replies help customers
// find answers and next steps. Exploratory brainstorming is unnecessary, conversational
// tone alone may omit important steps, and a purely functional prompt may feel impersonal.

// Exercise 5: Prompt Refinement Challenge – Control the Style, Structure, and Length

const pulseOneBlurbPrompt = `Write an email-campaign product blurb for the PulseOne Mini
smartwatch. Follow every requirement:
- Use a friendly, engaging tone.
- Output exactly 3 bullet points and no other text.
- Mention all three features: battery life, fitness tracking, and Bluetooth compatibility.
- Do not invent specifications or performance claims. No technical details have been
  provided, so mention each feature generally without giving numbers or unsupported
  benefits.
- Keep the entire response, including all bullet text, to 50 words maximum.

Before responding, check that there are exactly 3 bullets, all required features are
mentioned, and the total word count is 50 or fewer. Revise silently if needed.`;

const pulseOneBlurb = `- Make the most of your day with PulseOne Mini battery life.
- Keep up with your goals using easy-to-follow fitness tracking.
- Connect with Bluetooth-compatible devices and enjoy your day.`;

// Evaluation: The sample is 28 whitespace-separated words, uses exactly 3 bullets, mentions all three
// required features, and uses friendly language. The prompt forbids unsupported
// specifications and explicitly requires a word-count and content check.

// Exercise 6: Hallucination Spotting and Mitigation

const climateSummaryPrompt = `Summarize the provided peer-reviewed article about climate
change and marine biodiversity. Use only the text of the article below. Include only
claims, figures, dates, and projections explicitly stated in the article. Do not add
outside knowledge, assumptions, or conclusions.

For every factual statement, ensure it is supported by the article. Preserve the
article's meaning and uncertainty. If asked about a detail that the article does not
state, write: "The article does not provide this information." If a passage is unclear,
identify it as unclear rather than guessing. Do not include the claim that over 50% of
marine species are projected to go extinct by 2050 unless the article explicitly states
it.

Article:
[Paste the article here]`;

const verifiedClimateSummaryPrompt = `Summarize the provided peer-reviewed article about
climate change and marine biodiversity using only the text below.

Verification requirements:
- Only include claims explicitly stated in the article.
- Check each number, date, and projection against the article before including it.
- Do not infer or introduce outside facts.
- If uncertain or if the information is not available in the article, state:
  "The article does not provide this information."
- Keep the article's qualifications and uncertainty; do not present a possibility as a
  certainty.

Article:
[Paste the article here]`;

// Two mitigation strategies:
// 1. Restrict the source to the supplied article and prohibit outside facts or inference.
// 2. Require claim-by-claim verification and an explicit response when information is
//    uncertain or absent.
//
// Hallucinations are especially risky in healthcare, where invented medical facts can
// lead to harmful care decisions, and in legal work, where inaccurate law or case details
// can cause serious consequences for clients and proceedings.
