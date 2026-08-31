# Clase Siete - 31 de Agosto del 2026

# Repaso

* Hablamos de LMStudio
* Python
  * Funciones Build-In
    * input
    * print
    * type
  * Tipos de Datos
    * Primitivos
      * float
      * str
      * int
      * bool
      * None
    * Collecciones
      * lista
      * tuplas
      * diccionario
        * Ejercicio de diccionario
      * rangos
      * set
  * Funciones
    * Tambien son un tipo de datos
* WebDev
  * JSON
 * IA
   * Modelos de HF
     * chronos-2

> Cuando quiero utilizar el modelo de HF tuve que usar numpy

---

# Python

## Colab de la Clase

* https://colab.research.google.com/drive/1TdThW9HVadxBmfv_yuGdd3XUStjyZuoz?usp=sharing

## Numpy

* Introduccion:
    * Python es un lenguaje Interpretado
    * Los leguajes interpretados son mas lentos que los lenguajes compilados
      * Los juegos como el GTA (que ahora se filtro) se hacen en lenguaje como C++ por lo general

<img width="486" height="286" alt="image" src="https://github.com/user-attachments/assets/b94280f1-7790-4c89-935f-0e21bf208703" />

    * Python es el lenguaje que mas se usa para la IA
    * LA IA necesita CAPACIDAD DE COMPUTO
    * Como es que la ia que necesita capacida de computo, se centra en procesar arreglas larguisimos, hacer operaciones de matrices gigantescas, usa python que es inrepretado?
          * La parte que usa mucho la CPU se hacen con librerias en C++ que estan super optimizadas, la parte generica del algotitmo esta en python

### Comparativa numpy vs array comunes

#### Sin Numpy

* Prompt
```
Quiero un programa en python que cree un vector de quince millones de elementos con valores aleatorios entre 1 y 10. Luego que lo recorra y a cada elemento le sume 10. Quiero que tomes el tiempo que tarda en recorrer el array y a cada elemento sumarle 10.
```


* Codigo
```
import random
import time

inicio_antes_crear_vector = time.perf_counter()

# Crear un vector de 1.000.000 de elementos
vector = [random.randint(1, 10) for _ in range(50_000_000)]

# Iniciar cronómetro
inicio = time.perf_counter()

# Recorrer el vector y sumar 10 a cada elemento
for i in range(len(vector)):
    vector[i] += 10

# Detener cronómetro
fin = time.perf_counter()

print(f"Tiempo recorrer vector: {fin - inicio:.6f} segundos")
print(f"Tiempo total crear y recorrer: {fin - inicio_antes_crear_vector:.6f} segundos")
```
* Resultado

```
Tiempo recorrer vector: 6.020812 segundos
Tiempo total crear y recorrer: 43.196821 segundos
```

#### Con Numpy

```
import numpy as np
import time

inicio_antes_crear_vector = time.perf_counter()

# Crear un array de 1.000.000 de elementos
vector = np.random.randint(1, 11, size=50_000_000)

# Iniciar cronómetro
inicio = time.perf_counter()

# Sumar 10 a todos los elementos
vector += 10

# Detener cronómetro
fin = time.perf_counter()

print(f"Tiempo recorrer vector: {fin - inicio:.6f} segundos")
print(f"Tiempo total crear y recorrer: {fin - inicio_antes_crear_vector:.6f} segundos")
```

* Resultado

```
Tiempo recorrer vector: 0.052077 segundos
Tiempo total crear y recorrer: 1.232392 segundos
```

---

### Observaciones del codigo generados

* Vemos como usa el _ para el separador de miles (15_000_000) para mayor legi ilidad
* Esto -> vector = [random.randint(1, 10) for _ in range(15_000_000)] se llama comprension de listas
*  for _ in range(10) -> el _ significa que hago una iteracion 9 veces pero no quiero usar ninguna variable para guardar el indice


        
# WebDev
