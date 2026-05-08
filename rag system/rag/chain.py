from langchain_core.output_parsers import StrOutputParser

from retriver.retriever import get_context
from rag.prompt import prompt
from llm.llm import llm

_parser = StrOutputParser()


def ask(question: str, k: int = 3) -> str:
    """Run the full RAG pipeline and return the LLM answer.

    Args:
        question: The user question.
        k:        Number of context chunks to retrieve.

    Returns:
        The LLM-generated answer as a plain string.
    """
    context = get_context(question, k=k)
    return (prompt | llm | _parser).invoke({"context": context, "question": question})