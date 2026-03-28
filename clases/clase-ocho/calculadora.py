"""
Operaciones aritméticas básicas con validación estricta de tipos y rangos.
"""

from __future__ import annotations

import math
from typing import Final

# Constante matemática π (pi)
PI: Final[float] = math.pi

Number = int | float


def _es_numero_valido(valor: object) -> bool:
    """True si es int o float (incluye bool: se trata como 0 o 1 en las operaciones)."""
    return isinstance(valor, (int, float))


def _validar_operando(nombre: str, valor: object) -> None:
    if not _es_numero_valido(valor):
        tipo = type(valor).__name__
        raise TypeError(
            f"{nombre} debe ser int o float; recibido: {tipo!r}."
        )
    if isinstance(valor, float) and not math.isfinite(valor):
        raise ValueError(
            f"{nombre} no puede ser NaN ni infinito; use valores finitos."
        )


def _comprobar_resultado_finito(resultado: float, operacion: str) -> float:
    if not math.isfinite(resultado):
        raise OverflowError(
            f"El resultado de {operacion} no es representable como número finito "
            "(desbordamiento u operación inválida)."
        )
    return resultado


def sumar(a: Number, b: Number) -> float:
    """
    Devuelve la suma de a y b.

    Valida tipos (``int`` / ``float``; ``bool`` cuenta como 0 o 1), rechaza NaN/inf
    en operandos float y comprueba que el resultado sea finito.
    """
    _validar_operando("a", a)
    _validar_operando("b", b)
    r = float(a) + float(b)
    return _comprobar_resultado_finito(r, "sumar")


def restar(a: Number, b: Number) -> float:
    """
    Devuelve la resta a - b.

    Mismas validaciones que ``sumar``.
    """
    _validar_operando("a", a)
    _validar_operando("b", b)
    r = float(a) - float(b)
    return _comprobar_resultado_finito(r, "restar")


def multiplicar(a: Number, b: Number) -> float:
    """
    Devuelve el producto de a y b.

    Mismas validaciones que ``sumar``; detecta desbordamiento en el producto.
    """
    _validar_operando("a", a)
    _validar_operando("b", b)
    r = float(a) * float(b)
    return _comprobar_resultado_finito(r, "multiplicar")


def dividir(a: Number, b: Number) -> float:
    """
    Devuelve el cociente a / b.

    No permite divisor cero ni operandos no finitos; el resultado debe ser finito.
    """
    _validar_operando("a", a)
    _validar_operando("b", b)
    if float(b) == 0.0:
        raise ZeroDivisionError("No se puede dividir por cero (el divisor b es 0).")
    r = float(a) / float(b)
    return _comprobar_resultado_finito(r, "dividir")
