from app.features.proposal import generate_proposal

def proposal_tool(user_id: int, job_id: int):
    return generate_proposal(user_id, job_id)