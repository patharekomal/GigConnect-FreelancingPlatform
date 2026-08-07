from app.features.recommendation import recommend_jobs

def recommendation_tool(user_id: int):
    return recommend_jobs(user_id)