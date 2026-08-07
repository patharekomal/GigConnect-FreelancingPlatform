import requests

SPRING_BOOT_URL = "http://localhost:8080/ai/freelancer"


def get_freelancer(user_id):

    try:

        response = requests.get(f"{SPRING_BOOT_URL}/{user_id}")

        response.raise_for_status()

        return response.json()

    except Exception as e:

        print("Error fetching freelancer:", e)

        return None