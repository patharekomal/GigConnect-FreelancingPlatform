from app.agent.graph import agent

response = agent.invoke(
    {
        "messages": [
            {
                "role": "user",
                "content": "How do I post a job?"
            }
        ]
    }
)

print(response["messages"][-1].content)