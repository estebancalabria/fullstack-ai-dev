
from flask import Flask
 
app = Flask(__name__)
 
@app.route("/")
def hola_mundo():
    return "<h1>¡Hola, Mundo!</h1>"

@app.route("/secreto")
def secreto():
    return "¡Este es un mensaje secreto!"
 
app.run(debug=True)