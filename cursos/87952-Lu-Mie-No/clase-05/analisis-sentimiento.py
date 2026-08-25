import os
os.environ["HF_HUB_CACHE"] = "./modelos"

from transformers import pipeline

classifier = pipeline("sentiment-analysis",
                      model="distilbert-base-uncased-finetuned-sst-2-english") 

frase = input("Ingrese una frase en inglés: ") 

#Quiero una nueva version donde el codigo se lo pregunto al usuario
result = classifier(frase)

print(result)