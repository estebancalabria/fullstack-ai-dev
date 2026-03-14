# Clase Cuatro - 13 de Marzo 2026

# Repaso

* Python
  * En python las variables son objetos
  * Built-Function
    * isinstance : te permite preguntar si una variable/objeto pertenece a un determinado tipo de datos
    * dir : listaba los metodos de un objeto
    * id : ver la identidad (posicion de memoria) de un objeto
    * type
    * input
    * print
  * Funciones asociadas al tipo de la variable
    * str
      * replace
      * upper
    * Operadores
      * ==
      * is
  * liberias
    * tkinter
    * pygame
    * mencionado pandas
* Entornos Virtuales
  * Crear un entorno virtual
    * python -m venv (nombre del entorno)
    * Crea una carpeta con el (nombre del entorno)
  * Activamos el entorno
    * (nombre del entorno)\Scripts\activate 
    
# Colab del dia

> https://colab.research.google.com/drive/17opYvjJLX9Ue20LdEk9ZeIP7JwNivULy?usp=sharing

# Listas

## Operaciones Basicas con Listas
  
```python
lista = [1,5,3,4,5,6]

# Pueden tener varios tipos de datos mezclados
#lista = [1,5,3,4,5,6, "Hola"] 

print(lista)
print(type(lista))
print(dir(lista))

#Recorro la lista
for elemento in lista:
    print(elemento)

#Agrego elemento a una lista
lista.append(7)
print(lista)

#Agrego elemento a una lista concatenando listas
lista = lista + [8]
print(lista)
```

## Acceder a elementos puntuales en una lista

```python
lista = [1,2,3,4,5,6,7]

print(f"La lista es {lista}")

#El primer elemento de una lista es el que tiene el indice 0, igual que c, java
primer_elemento = lista[0]
print(f"Primer Elemento (indice 0) {primer_elemento}")

#Tercer elemento
tercer_elemento = lista[2]
print(tercer_elemento)

#Longitud Lista
longitud_lista = len(lista)
print(f" Longutud Lista {longitud_lista}")

#Uttimo Elemento de la lista
ultimo_elemento = lista[longitud_lista - 1]
print(f"Ultimo Elemento {ultimo_elemento}")

#Alternativamente, esto es algo exclusivo de python
ultimo_elemento = lista[-1]
print(f"Ultimo Elemento {ultimo_elemento}")

#try: --- PuedeFallar:
try:
   #Si me voy de rango me tira un error/excepcion llamada IndexError
   print(f"Me voy de rango {lista[100000]}")
except IndexError as e:
#except IndexError as e
  print("Quise acceder a la lista con un indice muy trande y me voy de rango")
```

## Modificar la lista con sus metodos

* Metodos de la lista
 * append
 * remove
 * pop
 * insert


```python
lista = [100,2,3,4,5,6,7]

print(f"La lista es {lista}")

#Modifico
lista[0] = 1
print(f"La lista modificada es {lista} su id {id(lista)}")

# Agrego un elemento
lista.append(8)
print(f"La lista modificada es {lista} su id {id(lista)}")

# Inserto un elemento en la lista
lista.insert(0, -500)
print(f"La lista modificada es {lista} su id {id(lista)}")  

# Remover el primer valor que coincida (Solo uno)
# lista.append(-500) <<< Probar con esto para ver que es solo uno
lista.remove(-500)
print(f"La lista modificada es {lista} su id {id(lista)}")  

# Eliminar por posicion
lista.pop(0)  # Elimino el primero indicando el indice
print(f"La lista modificada es {lista} su id {id(lista)}")
```

# Manejo de listas e identidad

* Mira el siguiente ejemplo
```python
lista = [1,2,3]
print (f"La lista es {lista} su id {id(lista)}")

lista.append(4)
print (f"La lista es {lista} su id {id(lista)}")

# De esta manera estoy creadno una lista nueva
# En memoria tengo la lista vieja [1,2,3,4]
# En memoria tengo la lista nueva [1,2,3,4,5]
# Creamos una copia de la lista
# Para listas grandes hay que tener cuidado porque estamos duplicando el uso de memoria
lista = lista + [5]
print (f"La lista es {lista} su id {id(lista)}")
```

* Otro ejemplo donde se ve mas claro

```python
# Esto pasa porque las listas son Mutables

#Carla : en java a=new Persona() en python a = Persona()

lista1 = [1,2,3]  #Es como si hiciera un new en otro lenguaje
lista2 = lista1   #Es el mismo obejeto que puedo llamar como lista1 o lista2

print(id(lista1))
print(id(lista2))

# Es indistinto hacerle un append a cualquiera de las dos
lista2.append(4)
print(lista1)

#Si nececesito una copia
lista3 = lista2.copy()  #Ahora lista3 es u nuevo objeto con la copia
print(id(lista2))
print(id(lista3))

```

## Creacion listas con elementos repetidos

```python
#Forma 1, crear una lista con 20 elementos con un for
lista = []
#Ojo con el range que no incluye e ultimo elemento
# Un rango es una secuencia consecutiva de numeros range(1,6) -> (1,2,3,4,5)
for _ in range(1,6): 
    #Esta instruccion se ejecuta 5 veces
    lista.append(10) 
print(lista)

# En vez de hacer todo el choclo anterior python me permite hacer lo siguiente
lista_facil = [10] * 5
print(lista_facil)
```

## Operador Slicing

* Sintaxis
  * [inicio:fin]
    * [1:3]
    * [:3]   que es lo mismo que [0:3]
    * [3:]   del indice 3 al final
  * [inicio:fin:salto]

```python
lista = [1,2,3,4,5]
# Como en los rangos el indice final no se incluye
copia = lista[0:2]

#[inicio..fin] donde incluye inicio y excluye el fin

print(copia)

#Del segundo al cuarto (indice 3) 
copia = lista[1:4]
print(copia)

#Puedo omitir el primero
copia = lista[:4]
print(copia)

#Puedo omitir el ultimo
copia = lista[1:]
print(copia)
```

* Ejemplo de slicing con el paramerro de salto

```python
#El operador de slice con los 3 parametros
#[inicio:fin:salto]
lista = [1,2,3,4,5,6,7,8,9,10]

#Sin omitir ningun parametro
copia = lista[0:10:2]
print(copia)

#Omito el segundo parametro el de fin 
otra_copia = lista [0::2]
print(otra_copia)

#Omito el inicio y el fin
otra_copia_mas = lista[::2]
print(otra_copia_mas)

#Si quiero [2,4,6,8,10]
mas_copias = lista[1::2] #Desde el indice 1 hasta el final saltando cada 2
print(mas_copias)

#Si quiero [10,9,8,7,6,5,4,3,2,1]
uff_cuantas_copias = lista[::-1]
print(uff_cuantas_copias)

#Si quiero [9,7,5,3,1]
otra = lista[8::-2]
print(otra)

otra_mas = lista[-2::-2]
print(otra_mas)
```

# Recursos para practicar Python

> https://www.hackerrank.com/domains/python

# Tipos de Aplicacione en Python

* Existen dos terminales en la compu (CLI): cmd y powershell
  * cmd es clasico, de toda la vida
  * powershell es mas moderno, tiene mas comados per mas restricciones de permisos
 
* Vamos a generar una aplicacion multi plataforma utilizando la libreria kivy (Esta no viene con python com tkinter)
* A Claude le digo : "haceme un ejemplo en python de una aplicacion multi-plataforma con la libreria kivy. Un codigo no muy extenso."
  
```python
from kivy.app import App
from kivy.uix.gridlayout import GridLayout
from kivy.uix.button import Button
from kivy.uix.textinput import TextInput
from kivy.uix.boxlayout import BoxLayout


class Calculadora(BoxLayout):
    def __init__(self, **kwargs):
        super().__init__(orientation="vertical", padding=10, spacing=8, **kwargs)

        # Pantalla
        self.pantalla = TextInput(
            font_size=36,
            readonly=True,
            halign="right",
            size_hint_y=0.25,
            background_color=(0.15, 0.15, 0.15, 1),
            foreground_color=(1, 1, 1, 1),
        )
        self.add_widget(self.pantalla)

        # Botones
        botones = [
            ["7", "8", "9", "/"],
            ["4", "5", "6", "*"],
            ["1", "2", "3", "-"],
            ["C", "0", "=", "+"],
        ]

        grid = GridLayout(cols=4, spacing=6)
        for fila in botones:
            for label in fila:
                btn = Button(
                    text=label,
                    font_size=24,
                    background_color=self._color(label),
                    background_normal="",
                )
                btn.bind(on_press=self.al_presionar)
                grid.add_widget(btn)

        self.add_widget(grid)

    def _color(self, label):
        if label == "=":
            return (0.2, 0.7, 0.4, 1)
        if label == "C":
            return (0.8, 0.3, 0.3, 1)
        if label in "/*-+":
            return (0.3, 0.5, 0.8, 1)
        return (0.25, 0.25, 0.25, 1)

    def al_presionar(self, boton):
        texto = boton.text
        if texto == "C":
            self.pantalla.text = ""
        elif texto == "=":
            try:
                self.pantalla.text = str(eval(self.pantalla.text))
            except Exception:
                self.pantalla.text = "Error"
        else:
            self.pantalla.text += texto


class CalculadoraApp(App):
    def build(self):
        self.title = "Calculadora Kivy"
        return Calculadora()


if __name__ == "__main__":
    CalculadoraApp().run()
```

* Cuando lo ejecuta hago esto me tira que no tengo el modulo de Kivy
```
C:\Cursos\fullstack-ai-dev\clases\clase-cuatro>python kivy-demo.py
Traceback (most recent call last):
  File "C:\Cursos\fullstack-ai-dev\clases\clase-cuatro\kivy-demo.py", line 1, in <module>
    from kivy.app import App
ModuleNotFoundError: No module named 'kivy'
```

* Voy a crear un entorno virtual e instalo kyvu

```
Microsoft Windows [Version 10.0.26200.8037]
(c) Microsoft Corporation. All rights reserved.

WARNING: Package(s) not found: kivy

C:\Cursos\fullstack-ai-dev\clases\clase-cuatro>python kivy-demo.py
Traceback (most recent call last):
  File "C:\Cursos\fullstack-ai-dev\clases\clase-cuatro\kivy-demo.py", line 1, in <module>     
    from kivy.app import App
ModuleNotFoundError: No module named 'kivy'

C:\Cursos\fullstack-ai-dev\clases\clase-cuatro>python -m venv entorno-virtual

C:\Cursos\fullstack-ai-dev\clases\clase-cuatro>entorno-virtual\Scripts\activate

(entorno-virtual) C:\Cursos\fullstack-ai-dev\clases\clase-cuatro>deactivate
C:\Cursos\fullstack-ai-dev\clases\clase-cuatro>entorno-virtual\Scripts\activate

(entorno-virtual) C:\Cursos\fullstack-ai-dev\clases\clase-cuatro>pip install kivy
Collecting kivy
  Using cached Kivy-2.3.1-cp311-cp311-win_amd64.whl (4.6 MB)
Collecting Kivy-Garden>=0.1.4
  Using cached Kivy_Garden-0.1.5-py3-none-any.whl (4.6 kB)
Collecting docutils
  Downloading docutils-0.22.4-py3-none-any.whl (633 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 633.2/633.2 kB 6.7 MB/s eta 0:00:00
Collecting pygments
  Using cached pygments-2.19.2-py3-none-any.whl (1.2 MB)
Collecting requests
  Using cached requests-2.32.5-py3-none-any.whl (64 kB)
Collecting filetype
  Using cached filetype-1.2.0-py2.py3-none-any.whl (19 kB)
Collecting kivy-deps.angle~=0.4.0
  Using cached kivy_deps.angle-0.4.0-cp311-cp311-win_amd64.whl (5.1 MB)
Collecting kivy-deps.sdl2~=0.8.0
  Using cached kivy_deps.sdl2-0.8.0-cp311-cp311-win_amd64.whl (4.2 MB)
Collecting kivy-deps.glew~=0.3.1
  Using cached kivy_deps.glew-0.3.1-cp311-cp311-win_amd64.whl (123 kB)
Collecting pypiwin32
  Using cached pypiwin32-223-py3-none-any.whl (1.7 kB)
Collecting pywin32>=223
  Using cached pywin32-311-cp311-cp311-win_amd64.whl (9.5 MB)
Collecting charset_normalizer<4,>=2
  Downloading charset_normalizer-3.4.5-cp311-cp311-win_amd64.whl (142 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 142.4/142.4 kB ? eta 0:00:00
Collecting idna<4,>=2.5
  Using cached idna-3.11-py3-none-any.whl (71 kB)
Collecting urllib3<3,>=1.21.1
  Using cached urllib3-2.6.3-py3-none-any.whl (131 kB)
Collecting certifi>=2017.4.17
  Using cached certifi-2026.2.25-py3-none-any.whl (153 kB)
Installing collected packages: pywin32, kivy-deps.sdl2, kivy-deps.glew, kivy-deps.angle, filetype, urllib3, pypiwin32, pygments, idna, docutils, charset_normalizer, certifi, requests, Kivy-Garden, kivy
Successfully installed Kivy-Garden-0.1.5 certifi-2026.2.25 charset_normalizer-3.4.5 docutils-0.22.4 filetype-1.2.0 idna-3.11 kivy-2.3.1 kivy-deps.angle-0.4.0 kivy-deps.glew-0.3.1 kivy-deps.sdl2-0.8.0 pygments-2.19.2 pypiwin32-223 pywin32-311 requests-2.32.5 urllib3-2.6.3

[notice] A new release of pip available: 22.3.1 -> 26.0.1
[notice] To update, run: python.exe -m pip install --upgrade pip

(entorno-virtual) C:\Cursos\fullstack-ai-dev\clases\clase-cuatro>   
```

*  Ahora parado dentro del enrono virtual podes ejecutarlo

```
(entorno-virtual) C:\Cursos\fullstack-ai-dev\clases\clase-cuatro>python kivy-demo.py    
[INFO   ] [Logger      ] Record log in C:\Users\esteb\.kivy\logs\kivy_26-03-13_0.txt
[INFO   ] [deps        ] Successfully imported "kivy_deps.angle" 0.4.0
[INFO   ] [deps        ] Successfully imported "kivy_deps.glew" 0.3.1
[INFO   ] [deps        ] Successfully imported "kivy_deps.sdl2" 0.8.0
[INFO   ] [Kivy        ] v2.3.1
[INFO   ] [Kivy        ] Installed at "C:\Cursos\fullstack-ai-dev\clases\clase-cuatro\entorno-virtual\Lib\site-packages\kivy\__init__.py"
[INFO   ] [Python      ] v3.11.1 (tags/v3.11.1:a7a450f, Dec  6 2022, 19:58:39) [MSC v.1934 64 bit (AMD64)]
[INFO   ] [Python      ] Interpreter at "C:\Cursos\fullstack-ai-dev\clases\clase-cuatro\entorno-virtual\Scripts\python.exe"
[INFO   ] [Logger      ] Purge log fired. Processing...
[INFO   ] [Logger      ] Purge finished!
[INFO   ] [Factory     ] 195 symbols loaded
[INFO   ] [Image       ] Providers: img_tex, img_dds, img_sdl2 (img_pil, img_ffpyplayer ignored)
[INFO   ] [Text        ] Provider: sdl2
[INFO   ] [Window      ] Provider: sdl2
[INFO   ] [GL          ] Using the "OpenGL" graphics system
[INFO   ] [GL          ] GLEW initialization succeeded
[INFO   ] [GL          ] Backend used <glew>
[INFO   ] [GL          ] OpenGL version <b'4.6.0 - Build 30.0.101.1994'>
[INFO   ] [GL          ] OpenGL vendor <b'Intel'>
[INFO   ] [GL          ] OpenGL renderer <b'Intel(R) Iris(R) Xe Graphics'>
[INFO   ] [GL          ] OpenGL parsed version: 4, 6
[INFO   ] [GL          ] Shading version <b'4.60 - Build 30.0.101.1994'>
[INFO   ] [GL          ] Texture max size <16384>
[INFO   ] [GL          ] Texture max units <32>
[INFO   ] [Window      ] auto add sdl2 input provider
[INFO   ] [Window      ] virtual keyboard not allowed, single mode, not docked
[INFO   ] [Base        ] Start application main loop
[INFO   ] [GL          ] NPOT texture support is available
```
# Para la proxima

* Vamos a ver como trabajar con distintas versiones de python!!! Importante!
