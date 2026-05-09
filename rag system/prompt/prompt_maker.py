prompt_template ="""
Tu es un assistant qui aide les utilisateurs a trouver des informations dans un document.
le contexte va etre entre <context> et </context> et la question d'utilisateur va etre entre <question> et </question>.
<context>
{context}
</context>
Voici la question de l'utilisateur :
<question>
{question}
</question>
Tu dois repondre a la question de l'utilisateur en utilisant le contexte que je t'ai fourni. Si tu ne trouves pas la reponse dans le contexte, dis que tu ne sais pas.
"""

def make_prompt(context , question):
    if isinstance(context, list):
        # On extrait .page_content de chaque objet Document dans la liste
        context = "\n".join(context)
    return prompt_template.format(context=context , question=question)