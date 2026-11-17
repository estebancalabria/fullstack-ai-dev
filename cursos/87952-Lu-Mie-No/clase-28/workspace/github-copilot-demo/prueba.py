

"""
Funcion viena de referencia como esta antes.Ignorar. 
Esta mal. No usa los skills

def calcular_promedio(numeros):
	if not numeros:
		raise ValueError("La lista no puede estar vacía")
	return sum(numeros) / len(numeros)
"""


def calcular_promedio(numeros: list[int | float]) -> float:
    """Calcula el promedio de una lista de números."""
    if not isinstance(numeros, list):
        raise TypeError("El argumento debe ser una lista")
    if not numeros:
        raise ValueError("La lista no puede estar vacía")
    if any(
        not isinstance(numero, (int, float)) or isinstance(numero, bool)
        for numero in numeros
    ):
        raise TypeError("Todos los elementos deben ser números")

    return sum(numeros) / len(numeros)



