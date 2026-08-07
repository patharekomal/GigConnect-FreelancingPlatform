import requests

SPRING_BOOT_URL = "http://localhost:8080/ai/jobs"

def get_available_jobs():

    response = requests.get(SPRING_BOOT_URL)

    response.raise_for_status()

    jobs = response.json()

    text = ""

    for job in jobs:

        text += f"""
Title: {job['title']}
Description: {job['description']}
Budget: ₹{job['budget']}
Company: {job['companyName']}

"""

    return text