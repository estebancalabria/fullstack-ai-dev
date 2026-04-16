from alumno import Alumno

alu = Alumno(1, "Juan", "Pérez", 3)
print(alu.nombre)  # Juan

## Esto no debería funcionar, ya que el nombre no puede ser vacío
alu.nombre = ""
alu.apellido = "García"

print(alu.nombre)  # Juan