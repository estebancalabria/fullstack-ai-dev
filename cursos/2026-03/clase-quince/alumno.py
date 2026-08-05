class Alumno:
    def __init__(
        self,
        nombre: str,
        apellido: str,
        cantidad_cursos: int,
    ) -> None:
        """Alumno nuevo: el id lo asigna la base al insertar (permanece None hasta persistir)."""
        self._id: int | None = None
        self._nombre = self._validar_nombre(nombre)
        self._apellido = self._validar_apellido(apellido)
        self._cantidad_cursos = self._validar_cantidad_cursos(cantidad_cursos)

    @classmethod
    def validar_campos(
        cls, nombre: str, apellido: str, cantidad_cursos: int
    ) -> tuple[str, str, int]:
        """Valida datos sin asignar id (útil antes de persistir en base de datos)."""
        inst = cls.__new__(cls)
        return (
            inst._validar_nombre(nombre),
            inst._validar_apellido(apellido),
            inst._validar_cantidad_cursos(cantidad_cursos),
        )

    @classmethod
    def desde_persistencia(
        cls,
        id_alumno: int,
        nombre: str,
        apellido: str,
        cantidad_cursos: int,
    ) -> "Alumno":
        """Reconstruye un alumno desde fila de base de datos (id asignado por SQLite)."""
        inst = cls.__new__(cls)
        inst._id = id_alumno
        inst._nombre = inst._validar_nombre(nombre)
        inst._apellido = inst._validar_apellido(apellido)
        inst._cantidad_cursos = inst._validar_cantidad_cursos(cantidad_cursos)
        return inst

    @property
    def id(self) -> int | None:
        return self._id

    @property
    def nombre(self) -> str:
        return self._nombre

    @nombre.setter
    def nombre(self, nuevo_nombre: str) -> None:
        self._nombre = self._validar_nombre(nuevo_nombre)

    @property
    def apellido(self) -> str:
        return self._apellido

    @apellido.setter
    def apellido(self, nuevo_apellido: str) -> None:
        self._apellido = self._validar_apellido(nuevo_apellido)

    @property
    def cantidad_cursos(self) -> int:
        return self._cantidad_cursos

    @cantidad_cursos.setter
    def cantidad_cursos(self, nueva_cantidad: int) -> None:
        self._cantidad_cursos = self._validar_cantidad_cursos(nueva_cantidad)

    def incrementar_cursos(self, cantidad: int = 1) -> None:
        if not isinstance(cantidad, int):
            raise TypeError("La cantidad a incrementar debe ser un entero.")
        if cantidad <= 0:
            raise ValueError("La cantidad a incrementar debe ser mayor a cero.")
        self._cantidad_cursos += cantidad

    def actualizar_datos(self, nombre: str, apellido: str, cantidad_cursos: int) -> None:
        self.nombre = nombre
        self.apellido = apellido
        self.cantidad_cursos = cantidad_cursos

    def _validar_nombre(self, nombre: str) -> str:
        if not isinstance(nombre, str):
            raise TypeError("El nombre debe ser un texto.")
        nombre_limpio = nombre.strip()
        if not nombre_limpio:
            raise ValueError("El nombre no puede estar vacio.")
        return nombre_limpio

    def _validar_apellido(self, apellido: str) -> str:
        if not isinstance(apellido, str):
            raise TypeError("El apellido debe ser un texto.")
        apellido_limpio = apellido.strip()
        if not apellido_limpio:
            raise ValueError("El apellido no puede estar vacio.")
        return apellido_limpio

    def _validar_cantidad_cursos(self, cantidad_cursos: int) -> int:
        if not isinstance(cantidad_cursos, int):
            raise TypeError("La cantidad de cursos debe ser un entero.")
        if cantidad_cursos < 0:
            raise ValueError("La cantidad de cursos no puede ser negativa.")
        return cantidad_cursos

    def __str__(self) -> str:
        return f"{self._nombre} {self._apellido}"

    def __repr__(self) -> str:
        return f"---{self._nombre} {self._apellido}---"
