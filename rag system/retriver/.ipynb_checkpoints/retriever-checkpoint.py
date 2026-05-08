from langchain_ollama import OllamaEmbeddings
from langchain_chroma import Chroma

_COLLECTIONS = {
    "data_access": ("spring_data_access", "../vector_store/chroma_db/data_access"),
    "security":    ("spring_security",    "../vector_store/chroma_db/security"),
    "docs":          ("docs","../vector_store2")
}

_embeddings = OllamaEmbeddings(model="nomic-embed-text")


def get_context(prompt: str, k: int = 5) -> str:
    """Search all ChromaDB collections and return the top-k chunks across all of them.

    Args:
        prompt: The user question.
        k:      Total number of chunks to return across all collections.

    Returns:
        A formatted string with the top-k chunks, ready to inject into an LLM prompt.
    """
    all_results = []

    for collection_name, persist_dir in _COLLECTIONS.values():
        store = Chroma(
            collection_name=collection_name,
            persist_directory=persist_dir,
            embedding_function=_embeddings,
        )
        results = store.similarity_search_with_score(prompt, k=k)
        all_results.extend(results)

    # Sort by score ascending (lower = more similar in Chroma's L2 distance)
    all_results.sort(key=lambda x: x[1])

    context_parts = []
    for i, (doc, _) in enumerate(all_results[:k], 1):
        title = doc.metadata.get("title", "Unknown")
        source = doc.metadata.get("source", "")
        context_parts.append(
            f"[{i}] {title}\n"
            f"Source: {source}\n"
            f"{doc.page_content}"
        )

    return "\n\n---\n\n".join(context_parts)