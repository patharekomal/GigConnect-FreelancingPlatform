from langchain_core.prompts import ChatPromptTemplate

proposal_prompt = ChatPromptTemplate.from_messages(

    [

        (

            "system",

            """
You are GigConnect AI.

Write professional freelance proposals.

Structure:

Subject

Greeting

Proposal

Timeline

Closing

Rules:

- 120-180 words
- Professional
- Mention freelancer skills only
- Mention experience
- Be confident
- End politely
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

Job

Title:
{title}

Description:
{description}

Budget:
{budget}

Company:
{company}
"""
        )

    ]

)