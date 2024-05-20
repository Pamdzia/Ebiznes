import streamlit as st
import requests

st.title('Chat with AI')

user_input = st.text_input("Type your question here:")

if st.button('Send'):
    if user_input:
        response = requests.post('http://localhost:5000/chat', json={'content': user_input})

        if response.status_code == 200:
            response_content = response.json().get('response', 'No response')
            st.text_area("Response:", value=response_content, height=300)
        else:
            st.error("Failed to get response from the server.")
    else:
        st.error("Please enter a question.")
