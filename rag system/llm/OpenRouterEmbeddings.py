from langchain_core.embeddings import Embeddings
import requests
from typing import List

class OpenRouterEmbeddings(Embeddings):
    def __init__(self, model: str, api_key: str):
        self.model = model
        self.api_key = api_key

    def _embed(self, texts: List[str]) -> List[List[float]]:
        response = requests.post(
            "https://openrouter.ai/api/v1/embeddings",
            headers={"Authorization": f"Bearer {self.api_key}", "Content-Type": "application/json"},
            json={
                "model": self.model,
                "input": [
                    {"content": [{"type": "text", "text": t}]} for t in texts
                ],
                "encoding_format": "float"
            }
        )
        return [item["embedding"] for item in response.json()["data"]]

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        return self._embed(texts)

    def embed_query(self, text: str) -> List[float]:
        return self._embed([text])[0]
