
from dataclasses import dataclass
from datetime import date


@dataclass(frozen=True)
class Alumno:
    _legajo: int
    _nombre: str
    _apellido: str
    _fecha_de_nacimiento: date

    def __post_init__(self):
        if self._legajo <= 0:
            raise ValueError("El legajo debe ser mayor que 0.")

        self._validar_nombre(self._nombre, "nombre")
        self._validar_nombre(self._apellido, "apellido")

        if self._fecha_de_nacimiento > date.today():
            raise ValueError("La fecha de nacimiento no puede ser futura.")

    @staticmethod
    def _validar_nombre(valor: str, campo: str):
        if not valor:
            raise ValueError(f"El {campo} no puede estar vacío.")

        if not valor.isalpha():
            raise ValueError(
                f"El {campo} no puede contener espacios ni números."
            )

        if not valor[0].isupper():
            raise ValueError(
                f"El {campo} debe comenzar con mayúscula."
            )

    @property
    def legajo(self) -> int:
        return self._legajo

    @property
    def nombre(self) -> str:
        return self._nombre

    @property
    def apellido(self) -> str:
        return self._apellido

    @property
    def fecha_de_nacimiento(self) -> date:
        return self._fecha_de_nacimiento