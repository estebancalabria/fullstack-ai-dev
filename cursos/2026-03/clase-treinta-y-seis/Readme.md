# Clase Treinta y Seis - 10 de Julio del 2026

# Repaso

* Tool Use
  * Definir una Tool y especificarla en un diccionario para informala a un LLM
  * Despues el LLM nos avisa si desea utilizar la tool
  * Ejercicio del API del clima
      * Una funcion en python que devolvia un clima al azar
      * Utilizando una api para consultar el clima en tiempo real
  * Ejercicio con Multi-Tools
      * Aplicacion de Reserva de turnos
* Generacion de Imagenes en Colab

---

# Estrategias integradas y nube

* Nube (cloud computing)
  * Entorno donde podes alquilar recursos (de almacenamiento, de computo, de red, de IA) para pagar por su uso cuando lo necesito y no tener la infraestructura localmente (on-premise)
  * En genral se utilizan para hacer despliegue de la aplicacion
  * Los proveedores cloud construyen infraestructura (datacenters) distruibuidos geograficamente por todo el mundo para ofrecer alta disponibilidad y proteccion contra desastres

 <img width="779" height="393" alt="image" src="https://github.com/user-attachments/assets/fd3da737-664f-4372-b226-2b346513a660" />
     

* Nubes Conocida
  * Aws (Amazon)
  * Google Cloud (Google)
  * Azure (Microsoft)

## Microsoft Azure

* Video de Tour en un Datacenter
  * https://www.youtube.com/watch?v=80aK2_iwMOs&t=4s&pp=ygUVYXp1cmUgZGF0YWNlbnRlciB0b3Vy
 
* Se accede mediante
  * https://portal.azure.com/#home
  * Abrirlo en una ventana de incognito (el profe te va a dar un usuario temporal)

* Para conocer Azure
  * Creamos un Resource Group
  * Creamos un Stroage Account (s3 bucket en aws)
  * Subimos una imagen

* PRogramamos un notebook en python (como hicimos con Colab)
 * Creamos un workspace de ML
 * Solicitamos capacidad de computo
 * Ejecutamos un notebook en python
 * Conocimos la libreria MatPlotLib!

```
import matplotlib.pyplot as plt

# Datos inventados
meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"]
ventas = [120, 150, 170, 160, 210, 250]
costos = [80, 95, 100, 110, 130, 150]
productos = ["Notebook", "Mouse", "Teclado", "Monitor"]
cantidad = [40, 120, 75, 30]

# -----------------------------
# Gráfico de líneas
# -----------------------------
plt.figure(figsize=(8,4))
plt.plot(meses, ventas, marker="o", label="Ventas")
plt.plot(meses, costos, marker="s", label="Costos")
plt.title("Ventas y Costos por Mes")
plt.xlabel("Mes")
plt.ylabel("Miles de $")
plt.grid(True)
plt.legend()
plt.show()

# -----------------------------
# Barras
# -----------------------------
plt.figure(figsize=(8,4))
plt.bar(productos, cantidad)
plt.title("Productos Vendidos")
plt.xlabel("Producto")
plt.ylabel("Cantidad")
plt.show()

# -----------------------------
# Barras horizontales
# -----------------------------
plt.figure(figsize=(8,4))
plt.barh(productos, cantidad)
plt.title("Productos Vendidos")
plt.xlabel("Cantidad")
plt.show()

# -----------------------------
# Histograma
# -----------------------------
edades = [22,25,27,30,31,32,34,35,36,38,39,40,41,42,43,45,46,47,49,50]

plt.figure(figsize=(8,4))
plt.hist(edades, bins=6)
plt.title("Distribución de Edades")
plt.xlabel("Edad")
plt.ylabel("Frecuencia")
plt.show()

# -----------------------------
# Scatter Plot
# -----------------------------
horas_estudio = [1,2,3,4,5,6,7,8]
nota = [2,3,4,5,6,7,8,9]

plt.figure(figsize=(8,4))
plt.scatter(horas_estudio, nota, s=100)
plt.title("Horas de Estudio vs Nota")
plt.xlabel("Horas")
plt.ylabel("Nota")
plt.grid(True)
plt.show()

# -----------------------------
# Pie Chart
# -----------------------------
plt.figure(figsize=(6,6))
plt.pie(cantidad, labels=productos, autopct="%1.1f%%", startangle=90)
plt.title("Participación por Producto")
plt.show()

# -----------------------------
# Área
# -----------------------------
plt.figure(figsize=(8,4))
plt.fill_between(meses, ventas)
plt.title("Área de Ventas")
plt.xlabel("Mes")
plt.ylabel("Ventas")
plt.show()

# -----------------------------
# Boxplot
# -----------------------------
sueldos = [1200,1300,1250,1400,1450,1500,1600,1650,1700,3000]

plt.figure(figsize=(6,4))
plt.boxplot(sueldos)
plt.title("Distribución de Sueldos")
plt.ylabel("USD")
plt.show()

# -----------------------------
# Stem Plot
# -----------------------------
plt.figure(figsize=(8,4))
plt.stem(range(len(ventas)), ventas)
plt.title("Stem Plot de Ventas")
plt.xlabel("Mes")
plt.ylabel("Ventas")
plt.show()
```

