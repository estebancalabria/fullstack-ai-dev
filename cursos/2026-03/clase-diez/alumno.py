
# Definición de la clase Alumno
class Alumno:
    _ultimo_id = 0

    def __init__(self, id, nombre, apellido, cantidad_cursos):
        self.validar_datos(nombre, apellido, cantidad_cursos)

        self.id = id
        self.nombre = nombre.strip()
        self.apellido = apellido.strip()
        self.cantidad_cursos = cantidad_cursos

        if id > Alumno._ultimo_id:
            Alumno._ultimo_id = id

    @classmethod
    def generar_id(cls):
        cls._ultimo_id += 1
        return cls._ultimo_id

    @staticmethod
    def validar_datos(nombre, apellido, cantidad_cursos):
        if not nombre or not nombre.strip():
            raise ValueError("El nombre no puede estar vacío")

        if not apellido or not apellido.strip():
            raise ValueError("El apellido no puede estar vacío")

        if not isinstance(cantidad_cursos, int):
            raise ValueError("La cantidad de cursos debe ser un número entero")

        if cantidad_cursos < 0:
            raise ValueError("La cantidad de cursos no puede ser negativa")

    def actualizar_datos(self, nombre, apellido, cantidad_cursos):
        self.validar_datos(nombre, apellido, cantidad_cursos)
        self.nombre = nombre.strip()
        self.apellido = apellido.strip()
        self.cantidad_cursos = cantidad_cursos

    def __str__(self):
        return f"Alumno({self.id}): {self.nombre} {self.apellido}, Cursos: {self.cantidad_cursos}"