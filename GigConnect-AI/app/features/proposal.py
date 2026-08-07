from app.llm import llm

from app.prompts.proposal_prompt import proposal_prompt

from app.tools.freelancer_tool import get_freelancer
from app.tools.job_details_tool import get_job_details


def generate_proposal(user_id, job_id):

    if user_id is None:
        return "Freelancer id is required."

    if job_id is None:
        return "Job id is required."

    freelancer = get_freelancer(user_id)

    if freelancer is None:
        return "Unable to fetch freelancer details."

    job = get_job_details(job_id)

    if job is None:
        return "Unable to fetch job details."

    chain = proposal_prompt | llm

    response = chain.invoke(
        {
            "profession": freelancer["profession"],
            "skills": freelancer["skills"],
            "experience": freelancer["experience"],
            "title": job["title"],
            "description": job["description"],
            "budget": job["budget"],
            "company": job["companyName"]
        }
    )

    return response.content