let url = "https://rickandmortyapi.com/api/character"

//La llamada a la API se hace de manera asíncrona, pero el bucle for se ejecuta inmediatamente
// En javascript esto se llama una promesa
fetch(url)
    .then(respuesta => respuesta.json())
    .then(personajes => {
        console.log(JSON.stringify(personajes, null, 4))
    })


for (let i = 0; i < 500; i++) {
    console.log("Esto funciona mientras se hace la llamda a la api")
}