from alumno import Alumno

alu = Alumno(1, "Juan", "Pérez", 3)
print(alu)  # Juan

#Aca usa el Repr
print(f"Alumno: {alu!r}")  # Alumno: Juan