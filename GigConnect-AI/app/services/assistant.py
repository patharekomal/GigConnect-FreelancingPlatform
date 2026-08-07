from app.features.platform_guide import platform_guide
from app.features.recommendation import recommend_jobs
from app.features.proposal import generate_proposal

RECOMMEND_KEYWORDS = [
    "recommend",
    "suggest",
    "job for me",
    "matching jobs"
]

PROPOSAL_KEYWORDS = [
    "proposal",
    "generate proposal",
    "write proposal"
]


def get_ai_response(user_message, user_id=None, job_id=None):

    text = user_message.lower()

    if any(k in text for k in PROPOSAL_KEYWORDS):
        return generate_proposal(user_id, job_id)

    if any(k in text for k in RECOMMEND_KEYWORDS):
        return recommend_jobs(user_id)

    return platform_guide(user_message)