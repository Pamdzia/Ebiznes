import streamlit as st
import requests
import random

openings = [
    "Hi there! How can I assist you today?",
    "Hello! What can I help you with?",
    "Greetings! How can I be of service?",
    "Hey! What do you need help with?",
    "Good day! How can I assist you?"
]

closings = [
    "Thank you for chatting! Have a great day!",
    "Goodbye! Feel free to ask if you have more questions.",
    "Thanks for the conversation! Take care!",
    "It was nice talking to you! Bye!",
    "Hope I was able to help! See you next time!"
]

st.title('Chat with AI')


if 'opening' not in st.session_state:
    st.session_state.opening = random.choice(openings)

st.write(st.session_state.opening)

user_input = st.text_input("Type your question here:")

if st.button('Send'):
    if user_input:

        response = requests.post('http://localhost:5000/chat', json={'content': user_input})

        if response.status_code == 200:
            response_content = response.json().get('response', 'No response')
            st.text_area("Response:", value=response_content, height=300)
            st.write(random.choice(closings))
        else:
            st.error("Failed to get response from the server.")
    else:
        st.error("Please enter a question.")
