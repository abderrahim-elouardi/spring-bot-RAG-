from langchain_openai import ChatOpenAI
from pathlib import Path
import yaml

_ROOT = Path(__file__).parent.parent

with open(_ROOT / "config" / "setting.yaml") as f:
    key = yaml.safe_load(f)["llm"]["key"]

llm = ChatOpenAI(
    model="openai/gpt-oss-120b:free",
    openai_api_base="https://openrouter.ai/api/v1",
    openai_api_key=key,
    temperature=0,
)
