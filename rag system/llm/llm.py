from langchain_ollama import ChatOllama
from openai import AsyncOpenAI
import yaml
import yaml

llm = ChatOllama(model="deepseek-r1", temperature=0)

file_path = "..\\config\\setting.yaml"
key_path = ["llm", "key"]
with open(file_path, 'r', encoding='utf-8') as f:
    data = yaml.safe_load(f)
    # Navigation dynamique dans les clés
    # Si key_path est ["vector_store", "path"]
    key = data.get("llm", {}).get("key", "Clé introuvable")
    client = AsyncOpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=key,
    )