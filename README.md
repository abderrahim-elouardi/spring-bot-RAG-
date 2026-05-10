# 🍃 Science Media : Système RAG pour l'Écosystème Spring

Ce projet est une solution complète de **Retrieval-Augmented Generation (RAG)**. Il combine une application mobile moderne en **React Native** et un moteur d'intelligence artificielle sous **FastAPI** conçu pour fournir une assistance technique experte sur le framework Spring.

---

## 🏗️ Architecture du Système

Le projet est structuré de manière modulaire pour séparer l'interface utilisateur de la logique de traitement de données intensive.

### 1. Organisation des Répertoires
D'après l'arborescence du projet :
*   **`front-end/`** : Application mobile développée avec **Expo** et **React Native**. Elle gère l'interface de chat, les animations de bulles de message et le rendu Markdown.
*   **`rag system/`** : Le noyau d'intelligence artificielle contenant le pipeline ETL et le serveur API.

### 2. Focus sur le Core RAG (`rag system/`)
Le backend est divisé en composants spécialisés pour le traitement du langage naturel :
*   **`api/`** : Exposition des services via FastAPI (Uvicorn).
*   **`data_pipeline/`** : Scripts chargés de transformer la documentation brute en "chunks" utilisables.
*   **`retriver/`** : Implémentation de la recherche de similarité.
*   **`vectore_store3/`** : Base de données ChromaDB stockant les vecteurs de la documentation Spring.
*   **`llm/`** : Connecteur vers **DeepSeek-v4** via OpenRouter pour la synthèse finale des réponses.

---

## 🧠 Fonctionnement du Pipeline RAG

Le système suit un processus rigoureux pour garantir la précision technique :

1.  **Indexation** : La documentation Spring est découpée et transformée en vecteurs via le modèle `all-MiniLM-L6-v2`.
2.  **Retrieval (Récupération)** : Le système cherche les 5 segments les plus proches (Top-K: 5) en utilisant la **Similarité Cosinus**.
3.  **Augmentation** : La question utilisateur est combinée aux segments récupérés dans un prompt structuré.
4.  **Génération** : Le modèle **DeepSeek-v4-flash** génère une réponse basée uniquement sur les documents fournis via OpenRouter.

---

## ⚙️ Spécifications de Configuration

Les hyperparamètres suivants sont définis pour optimiser la performance et la précision :

*   **Collection Name** : `my_collection_spring_bot`
*   **Embedding Model** : `all-MiniLM-L6-v2`
*   **Vector Store** : `vectore_store3`
*   **LLM Model** : `deepseek/deepseek-v4-flash` (via OpenRouter)
*   **Retriever Settings** : `top_k: 5`, `distance_metric: cosine`, `fetch_k: 20`

---

## 🛠️ Guide de Lancement Pas à Pas

### 1. Prérequis
*   Python 3.10+ avec environnement virtuel (`.venv`).
*   Node.js & npm pour le mobile.
*   **Expo Go** installé sur votre téléphone (Redmi).
*   Clé API OpenRouter configurée.

### 2. Lancement du Backend (RAG Engine)
```bash
cd "rag system"
# Activer l'environnement virtuel (Windows)
.venv\Scripts\activate
# Installer les dépendances
pip install -r requirements.txt
# Démarrer le serveur
uvicorn api.api:app --reload --host 0.0.0.0 --port 8000
