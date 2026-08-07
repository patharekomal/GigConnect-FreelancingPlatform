from app.llm import llm

from app.prompts.platform_prompt import platform_prompt
from app.utils.knowledge_loader import load_knowledge


def platform_guide(question):

    knowledge = load_knowledge()

    chain = platform_prompt | llm

    response = chain.invoke(
        {
            "question": question,
            "knowledge": knowledge
        }
    )

    return response.content