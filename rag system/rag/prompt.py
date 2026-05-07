from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ("system",
     "You are a Spring Boot expert assistant.\n"
     "Answer the user's question using only the context provided below.\n"
     "If the answer is not in the context, say: "
     "\"I don't have enough information to answer that.\"\n"
     "Be concise and precise."),
    ("human", "Context:\n{context}\n\nQuestion: {question}"),
])