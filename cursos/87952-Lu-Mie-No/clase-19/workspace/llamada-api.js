let url = "https://rickandmortyapi.com/api/character"

//No va a seguir con la siguiente línea hasta que se resuelva la promesa
let respuesta = await fetch(url)

let personajes = await respuesta.json()

console.log(JSON.stringify(personajes, null, 4))