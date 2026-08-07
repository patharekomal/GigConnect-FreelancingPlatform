from pathlib import Path

KNOWLEDGE_FOLDER = Path(__file__).parent.parent / "knowledge"


def load_knowledge():

    knowledge = ""

    for file in KNOWLEDGE_FOLDER.glob("*.txt"):

        with open(file, "r", encoding="utf-8") as f:

            knowledge += f.read()

            knowledge += "\n\n"

    return knowledge