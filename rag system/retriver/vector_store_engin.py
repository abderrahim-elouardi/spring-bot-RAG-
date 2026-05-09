from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
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


embeddings = HuggingFaceEmbeddings(model_name=config["embedding_model"])

vectorstore = Chroma(
    embedding_function=embeddings, 
    collection_name=config["collection_name"],
    persist_directory= str(ROOT_DIR / config["persistence_directory"])
)



print(str(ROOT_DIR / config["persistence_directory"]))
print(str(ROOT_DIR / "config" / "config.yaml"))
print(f"Nombre d'éléments dans la collection : {vectorstore._collection.count()}")