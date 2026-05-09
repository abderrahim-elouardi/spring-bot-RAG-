from .vector_store_engin import vectorstore
import yaml 
from pathlib import Path

# --- 1. IDENTIFICATION DE LA RACINE DU PROJET ---
# On prend le dossier de ce fichier et on remonte d'un cran pour arriver à "rag system"
# .parent de 'retriver' -> 'rag system'
ROOT_DIR = Path(__file__).resolve().parent.parent

# --- 2. CHEMINS ABSOLUS ---
CONFIG_PATH = ROOT_DIR / "config" / "config.yaml"


# Charger le fichier
with open(CONFIG_PATH, "r") as f:
    config = yaml.safe_load(f)


retriever = vectorstore.as_retriever(
    search_type="similarity",#pour le type de recherche que je veux faire, ici on utilise la recherche similarity qui est une recherche qui prend en compte la similarite entre les chunks et la question pour retourner les chunks les plus pertinents.
    search_kwargs={"k": config["retriever"]["top_k"]}#pour le nombre de chunks que je veux recuperer pour chaque question.
)

def retreive_chunks(question):
    return retriever.invoke(question)


print(config["retriever"]["top_k"])

print(retreive_chunks("how to start building a spring app"))