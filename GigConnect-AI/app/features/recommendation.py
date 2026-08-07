from app.llm import llm
from app.prompts.recommendation_prompt import recommendation_prompt

from app.tools.job_tool import get_available_jobs
from app.tools.freelancer_tool import get_freelancer


def recommend_jobs(user_id):

    if user_id is None:
        return "Freelancer id is required."

    freelancer = get_freelancer(user_id)

    if freelancer is None:
        return "Unable to fetch freelancer profile."

    jobs = get_available_jobs()

    chain = recommendation_prompt | llm

    response = chain.invoke(
        {
            "profession": freelancer["profession"],
            "skills": freelancer["skills"],
            "experience": freelancer["experience"],
            "jobs": jobs
        }
    )

    return response.content