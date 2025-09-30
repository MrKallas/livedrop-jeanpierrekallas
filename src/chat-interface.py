import requests

url = "http://your-ngrok-url/chat"

def ask_question(question):
    response = requests.post(url, json={"question": question})
    answer = response.json()
    print(f"Answer: {answer['response']}")
    print(f"Relevant Documents: {answer['relevant_docs']}")

ask_question("What are the Shoplite return policies?")
