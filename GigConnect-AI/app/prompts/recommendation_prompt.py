from langchain_core.prompts import ChatPromptTemplate

recommendation_prompt = ChatPromptTemplate.from_messages(

    [

        (

            "system",

            """
You are GigConnect AI.

You are an expert AI career advisor.

Your task is to recommend ONLY the top 3 most suitable jobs.

For every recommendation provide:

1. Job Title
2. Company Name
3. Budget
4. Match Percentage
5. Matching Skills
6. Why it is recommended

Rules:

- Match skills carefully.
- Never recommend unrelated jobs.
- Keep explanations concise.
- Output in proper Markdown.
"""
        ),

        (

            "human",

            """
Freelancer

Profession:
{profession}

Skills:
{skills}

Experience:
{experience}

Available Jobs

{jobs}
"""
        )

    ]

)