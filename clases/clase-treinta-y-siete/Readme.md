# Clase Treinta y Siete - 15 de Julio del 2026

> [!NOTE]
> Hoy Argentina finalista ganando 2 a 1 a Inglaterra en una remontada historica

# Repaso

* Cloud Computing
  * Mini
      * Heroku : https://www.heroku.com/
  * Microsoft Azure
      * Tour por los datacenters:
        * https://www.youtube.com/watch?v=80aK2_iwMOs&t=4s&pp=ygUVYXp1cmUgZGF0YWNlbnRlciB0b3Vy
  * AWS
  * Google Cloud
  * Oracle Cloud
* Azure
  * Computer Vision
    * Entrenamos un modelo de ML
  * Mahine Learning Studio
    * Creamos un entorno para programar similar al google Colab
* Graficos con MatPlotLib

---

## Google Colab de la Clase

* https://colab.research.google.com/drive/1ZekFpkbPFLtVCqHz0PsYHwO6yx8EFQGa?usp=sharing

---

# MatPlot Lib

* URL
  * https://matplotlib.org/
  * https://matplotlib.org/stable/gallery/index
* Todos estos graficos los podemos usar en google colab

* Esta bueno para pedirle a la IA que genere el codigo

```
Dame el codigo en python para generar un grafico en matplotlib donde se vea un histograma donde se hagan 1000 tiradas de 2 dados de 1 a 6, se calcule la suma y luego se arme un histograma con los resultados
```

* Codigo en python que me devuelve la IA

```
import numpy as np
import matplotlib.pyplot as plt

# Simular 1000 tiradas de 2 dados
np.random.seed(42)  # opcional, para reproducibilidad
dado1 = np.random.randint(1, 7, size=1000)
dado2 = np.random.randint(1, 7, size=1000)
sumas = dado1 + dado2

# Crear histograma
plt.figure(figsize=(10, 6))
bins = np.arange(1.5, 14.5, 1)  # bins centrados en cada suma posible (2 a 13)
plt.hist(sumas, bins=bins, edgecolor='black', rwidth=0.8)

plt.title('Histograma de la suma de 2 dados (1000 tiradas)')
plt.xlabel('Suma de los dados')
plt.ylabel('Frecuencia')
plt.xticks(range(2, 13))
plt.grid(axis='y', alpha=0.3)

plt.show()
```

* Genero este grafico

```
import numpy as np
import matplotlib.pyplot as plt

# Simular 1000 tiradas de 2 dados
np.random.seed(42)  # opcional, para reproducibilidad
dado1 = np.random.randint(1, 7, size=1000)
dado2 = np.random.randint(1, 7, size=1000)
sumas = dado1 + dado2

# Crear histograma
plt.figure(figsize=(10, 6))
bins = np.arange(1.5, 14.5, 1)  # bins centrados en cada suma posible (2 a 13)
plt.hist(sumas, bins=bins, edgecolor='black', rwidth=0.8)

plt.title('Histograma de la suma de 2 dados (1000 tiradas)')
plt.xlabel('Suma de los dados')
plt.ylabel('Frecuencia')
plt.xticks(range(2, 13))
plt.grid(axis='y', alpha=0.3)

plt.show()
```

---

# Text to Speech

