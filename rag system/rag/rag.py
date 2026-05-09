from retriver.retriver import retreive_chunks
from prompt.prompt_maker import make_prompt
from llm.llm import generate_response

async def rag(question):
    retreived_chunks = retreive_chunks(question)
    prompt = make_prompt([doc.page_content for doc in retreived_chunks] , question)
    response = await generate_response(prompt)
    return response