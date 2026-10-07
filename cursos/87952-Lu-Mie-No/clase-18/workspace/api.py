from datetime import date

from flask import Flask, jsonify, request

from models.alumno import Alumno
from services.alumno_service import AlumnoService


app = Flask(__name__)


@app.get("/alumnos")
def obtener_alumnos():
    servicio = AlumnoService()
    alumnos = servicio.obtener_alumnos()

    return jsonify([
        {
            "legajo": alumno.legajo,
            "nombre": alumno.nombre,
            "apellido": alumno.apellido,
            "fechaDeNacimiento": alumno.fecha_de_nacimiento.isoformat()
        }
        for alumno in alumnos
    ])


@app.get("/alumnos/<int:legajo>")
def obtener_alumno(legajo):
    servicio = AlumnoService()
    alumno = servicio.obtener_alumno_por_legajo(legajo)

    if alumno is None:
        return jsonify({
            "error": "Alumno no encontrado"
        }), 404

    return jsonify({
        "legajo": alumno.legajo,
        "nombre": alumno.nombre,
        "apellido": alumno.apellido,
        "fechaDeNacimiento": alumno.fecha_de_nacimiento.isoformat()
    })


@app.post("/alumnos")
def agregar_alumno():
    datos = request.get_json()

    alumno = Alumno(
        datos["legajo"],
        datos["nombre"],
        datos["apellido"],
        date.fromisoformat(datos["fechaDeNacimiento"])
    )

    servicio = AlumnoService()
    try:
        servicio.agregar_alumno(alumno)
    except ValueError as error:
        return jsonify({
            "error": str(error)
        }), 409

    return jsonify({
        "legajo": alumno.legajo,
        "nombre": alumno.nombre,
        "apellido": alumno.apellido,
        "fechaDeNacimiento": alumno.fecha_de_nacimiento.isoformat()
    }), 201


if __name__ == "__main__":
    app.run(debug=True)