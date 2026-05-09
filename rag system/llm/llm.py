from openai import AsyncOpenAI  # Modification : Import asynchrone
from IPython.display import Markdown
import yaml 
from pathlib import Path

# --- 1. IDENTIFICATION DE LA RACINE DU PROJET ---
ROOT_DIR = Path(__file__).resolve().parent.parent

# --- 2. CHEMINS ABSOLUS ---
CONFIG_PATH = ROOT_DIR / "config" / "config.yaml"
KEY_PATH = ROOT_DIR / "config" / "key.yaml"

# Charger le fichier
with open(CONFIG_PATH, "r") as f:
    config = yaml.safe_load(f)
with open(KEY_PATH, "r") as f:
    key_config = yaml.safe_load(f)

# Configuration du client pour OpenRouter (Utilisation de AsyncOpenAI)
client = AsyncOpenAI(
  base_url=config["openrouterGeneratingModelApi"],
  api_key=key_config["openrouterGeneratingModelKay"],
)

async def generate_response(prompt): # Modification : Ajout de async
    response = ""

    # Envoi de la requête avec streaming (Ajout de await)
    stream = await client.chat.completions.create(
    model=config["openrouterGeneratingModelName"],
    messages=[
        {
        "role": "user",
        "content": prompt
        }
    ],
    stream=True,
    stream_options={"include_usage": True} 
    )

    async for chunk in stream: # Modification : Utilisation de async for
        # Vérification du contenu (le texte généré)
        if chunk.choices and chunk.choices[0].delta.content:
            content = chunk.choices[0].delta.content
            response += content

    return response