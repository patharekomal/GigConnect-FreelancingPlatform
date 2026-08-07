import requests

SPRING_BOOT_URL = "http://localhost:8080/ai/job"


def get_job_details(job_id):

    try:

        response = requests.get(f"{SPRING_BOOT_URL}/{job_id}")

        response.raise_for_status()

        return response.json()

    except Exception as e:

        print("Error fetching job:", e)

        return None