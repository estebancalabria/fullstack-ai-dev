# Clase Veintitres - 27 de Mayo del 2026

# Repaso

* Ejemplo usando API Key y Python
  * Recreamos un Chat Tipo ChatGPT con Base de Datos SQLITE para almacenar las conversaciones y Groq.
  * Hicimos una aventura interactiva tipo Elige tu propia aventura.
  * Laberinto Ascii que te podias mover

# Colab de la clase

> https://colab.research.google.com/drive/1ulS2YPAMZLH_xRIBaj4ElfBVQi2QY0oD?usp=sharing

* Tanbien sacamos una api key en
  * https://console.groq.com/

# IA y Python

## Enunciado

* Vamos a generar una interfaz conversacional para interacturar con lenguaje natural con nuestra base de datos

### Paso 1 : Crear la base datos dado el Script en la primer celda de Colab

* Script de la base de datos esta en : https://github.com/estebancalabria/fullstack-ai-dev/tree/main/clases/clase-veinte

```python
import sqlite3

if os.path.exists("universidad.db"):
    os.remove("universidad.db")

conn = sqlite3.connect("universidad.db")
cursor = conn.cursor()

cursor.executescript("""
CREATE TABLE Alumno (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo_documento   TEXT    NOT NULL,
    documento        TEXT    NOT NULL,
    nombre           TEXT    NOT NULL,
    apellido         TEXT    NOT NULL,
    pais             TEXT    NOT NULL DEFAULT 'Argentina',
    fecha_nacimiento TEXT    NOT NULL,
    CONSTRAINT ck_tipo_documento CHECK (
        tipo_documento IN ('DNI', 'PASAPORTE', 'CUIT', 'LE', 'LC', 'CDI')
    ),
    CONSTRAINT ck_documento CHECK (
        LENGTH(TRIM(documento)) BETWEEN 6 AND 20
    ),
    CONSTRAINT ck_nombre CHECK (
        LENGTH(TRIM(nombre)) BETWEEN 2 AND 100
    ),
    CONSTRAINT ck_apellido CHECK (
        LENGTH(TRIM(apellido)) BETWEEN 2 AND 100
    ),
    CONSTRAINT ck_fecha_nacimiento CHECK (
        fecha_nacimiento GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'
        AND SUBSTR(fecha_nacimiento, 1, 4) BETWEEN '1900' AND '2100'
        AND SUBSTR(fecha_nacimiento, 6, 2) BETWEEN '01' AND '12'
        AND SUBSTR(fecha_nacimiento, 9, 2) BETWEEN '01' AND '31'
    ),
    CONSTRAINT uq_tipo_documento UNIQUE (tipo_documento, documento)
);

CREATE TABLE Curso (
    id          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    nombre      TEXT    NOT NULL CHECK (LENGTH(TRIM(nombre)) > 0)
                                 CHECK (nombre GLOB '[A-Za-z0-9 ]*'),
    codigo      TEXT    NOT NULL UNIQUE
                                 CHECK (LENGTH(TRIM(codigo)) BETWEEN 3 AND 20)
                                 CHECK (codigo GLOB '[A-Za-z0-9-_]*'),
    cantidad_clases INTEGER NOT NULL CHECK (cantidad_clases BETWEEN 1 AND 100),
    horas_por_clase REAL    NOT NULL CHECK (horas_por_clase BETWEEN 0.5 AND 8),
    tema        TEXT    NOT NULL CHECK (LENGTH(TRIM(tema)) > 0)
                                 CHECK (tema IN ('Programacion', 'Base de Datos', 'Redes', 'Matematica', 'Sistemas', 'General')),
    min_alumnos INTEGER NOT NULL DEFAULT 5  CHECK (min_alumnos >= 1),
    max_alumnos INTEGER NOT NULL DEFAULT 30 CHECK (max_alumnos BETWEEN 1 AND 100),
    descripcion TEXT,
    nivel       TEXT    NOT NULL DEFAULT 'basico' CHECK (nivel IN ('basico', 'intermedio', 'avanzado')),
    activo      INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
    fecha_creacion      TEXT NOT NULL DEFAULT (datetime('now')),
    fecha_actualizacion TEXT,
    CONSTRAINT ck_rango_alumnos CHECK (min_alumnos <= max_alumnos)
);

CREATE TABLE Comision (
    id           INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    codigo       INTEGER NOT NULL UNIQUE,
    id_curso     INTEGER NOT NULL REFERENCES Curso(id),
    fecha_inicio TEXT    NOT NULL CHECK (DATE(fecha_inicio) IS NOT NULL AND DATE(fecha_inicio) = fecha_inicio),
    fecha_fin    TEXT    NOT NULL CHECK (DATE(fecha_fin) IS NOT NULL AND DATE(fecha_fin) = fecha_fin AND fecha_fin >= fecha_inicio),
    modalidad    TEXT    NOT NULL CHECK (modalidad IN ('Presencial', 'Virtual', 'Asincronico', 'Hibrida')),
    activo       INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1))
);

CREATE TABLE Clase (
    id           INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_comision  INTEGER NOT NULL REFERENCES Comision(id) ON DELETE CASCADE,
    fecha        TEXT    NOT NULL CHECK (DATE(fecha) IS NOT NULL AND DATE(fecha) = fecha),
    hora_inicio  TEXT    NOT NULL CHECK (hora_inicio GLOB '[0-2][0-9]:[0-5][0-9]'),
    hora_fin     TEXT    NOT NULL CHECK (hora_fin GLOB '[0-2][0-9]:[0-5][0-9]' AND hora_fin > hora_inicio),
    descripcion  TEXT    NOT NULL DEFAULT '',
    estado       TEXT    NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'dictada', 'cancelada')),
    url_git      TEXT    NOT NULL DEFAULT ''
);

CREATE TABLE Inscripcion (
    id           INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    fecha        TEXT    NOT NULL CHECK (DATE(fecha) IS NOT NULL AND DATE(fecha) = fecha),
    id_alumno    INTEGER NOT NULL REFERENCES Alumno(id) ON DELETE CASCADE,
    id_comision  INTEGER NOT NULL REFERENCES Comision(id),
    CONSTRAINT uq_alumno_comision UNIQUE (id_alumno, id_comision)
);
""")

conn.commit()
print("✅ Base de datos 'universidad.db' creada con todas las tablas.")
cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
print("Tablas:", [t[0] for t in cursor.fetchall()])
```

## Paso 2 : Cargarle datos de ejemplo

* Los datos de ejemplo los sacamos de aca : https://github.com/estebancalabria/fullstack-ai-dev/tree/main/clases/clase-veinte

```python
# =========================
# CARGA DE DATOS DE EJEMPLO
# =========================

cursor.executescript("""

-- =====================
-- ALUMNOS
-- =====================

INSERT INTO Alumno
(tipo_documento, documento, nombre, apellido, pais, fecha_nacimiento)
VALUES
('DNI', '40111222', 'Carla', 'Zarate', 'Argentina', '1996-08-14'),
('DNI', '38999111', 'Lucia', 'Fernandez', 'Argentina', '1994-02-10'),
('DNI', '41222333', 'Matias', 'Lopez', 'Argentina', '1998-11-22'),
('PASAPORTE', 'AB123456', 'Emily', 'Johnson', 'Estados Unidos', '1997-05-01'),
('DNI', '37777111', 'Santiago', 'Ruiz', 'Argentina', '1993-07-19'),
('DNI', '42222999', 'Camila', 'Martinez', 'Argentina', '2000-12-03'),
('DNI', '35555111', 'Tomas', 'Gomez', 'Argentina', '1992-09-15'),
('DNI', '43333111', 'Valentina', 'Suarez', 'Argentina', '2001-04-08'),
('PASAPORTE', 'ZX998877', 'Akira', 'Tanaka', 'Japon', '1995-01-30'),
('DNI', '39999444', 'Agustin', 'Perez', 'Argentina', '1996-06-25');

-- =====================
-- CURSOS
-- =====================

INSERT INTO Curso
(nombre, codigo, cantidad_clases, horas_por_clase, tema,
 min_alumnos, max_alumnos, descripcion, nivel)
VALUES

(
'Desarrollo Backend con .NET',
'NET2026',
24,
3,
'Programacion',
5,
35,
'API REST, Entity Framework, SQL Server y arquitectura multicapa.',
'intermedio'
),

(
'Hacking Etico y Pentesting',
'HACK01',
18,
4,
'Sistemas',
5,
20,
'Analisis de vulnerabilidades, redes y seguridad ofensiva.',
'avanzado'
),

(
'SQL para Data Analytics',
'SQLDATA',
16,
2,
'Base de Datos',
5,
40,
'Consultas SQL, joins, subqueries y dashboards.',
'basico'
),

(
'Administracion Linux',
'LINUX01',
20,
3,
'Sistemas',
5,
25,
'Terminal, permisos, servidores y automatizacion.',
'intermedio'
),

(
'Redes y Ciberseguridad',
'RED2026',
22,
3,
'Redes',
8,
30,
'Modelo OSI, TCP/IP, routers y defensa de red.',
'intermedio'
),

(
'Algebra para Programadores',
'MATE01',
14,
2,
'Matematica',
5,
50,
'Logica, algebra y pensamiento computacional.',
'basico'
),

(
'Introduccion a IA Generativa',
'IA2026',
12,
2,
'General',
10,
100,
'Prompt engineering, LLMs y automatizacion con IA.',
'basico'
);

-- =====================
-- COMISIONES
-- =====================

INSERT INTO Comision
(codigo, id_curso, fecha_inicio, fecha_fin, modalidad, activo)
VALUES

(1001, 1, '2026-03-01', '2026-06-01', 'Virtual', 1),
(1002, 1, '2026-08-01', '2026-11-01', 'Hibrida', 1),

(2001, 2, '2026-04-10', '2026-07-10', 'Presencial', 1),

(3001, 3, '2026-02-15', '2026-05-15', 'Virtual', 0),

(4001, 4, '2026-03-20', '2026-07-20', 'Asincronico', 1),

(5001, 5, '2026-05-01', '2026-09-01', 'Hibrida', 1),

(6001, 6, '2026-03-05', '2026-05-30', 'Virtual', 1),

(7001, 7, '2026-06-01', '2026-08-15', 'Virtual', 1);

-- =====================
-- CLASES
-- =====================

INSERT INTO Clase
(id_comision, fecha, hora_inicio, hora_fin,
 descripcion, estado, url_git)
VALUES

(1, '2026-03-03', '18:00', '21:00',
'Introduccion a APIs REST', 'dictada',
'https://github.com/universidad/backend-clase1'),

(1, '2026-03-10', '18:00', '21:00',
'Entity Framework y migraciones', 'dictada',
'https://github.com/universidad/backend-clase2'),

(1, '2026-03-17', '18:00', '21:00',
'JWT y autenticacion', 'cancelada',
''),

(2, '2026-08-05', '19:00', '22:00',
'Arquitectura limpia en .NET', 'pendiente',
''),

(3, '2026-04-15', '17:00', '21:00',
'Escaneo de puertos y Nmap', 'dictada',
'https://github.com/universidad/pentest1'),

(3, '2026-04-22', '17:00', '21:00',
'Explotacion de vulnerabilidades', 'pendiente',
''),

(5, '2026-05-03', '18:00', '21:00',
'Modelo OSI y protocolos', 'dictada',
'https://github.com/universidad/redes1'),

(7, '2026-06-05', '19:00', '21:00',
'Prompt Engineering', 'pendiente',
'');

-- =====================
-- INSCRIPCIONES
-- =====================

INSERT INTO Inscripcion
(fecha, id_alumno, id_comision)
VALUES

('2026-02-20', 1, 1),
('2026-02-20', 2, 1),
('2026-02-21', 3, 1),

('2026-04-01', 4, 3),
('2026-04-01', 5, 3),

('2026-03-01', 6, 5),
('2026-03-01', 7, 5),

('2026-05-20', 8, 7),
('2026-05-20', 9, 7),
('2026-05-20', 10, 7);

""")

conn.commit()

print("✅ Datos de ejemplo cargados correctamente")
```

## Paso 3. Creacion del system prompt

* Vamos a crear en python una variable system prompt que corresponda a un agente que solo responda SQL sobre la estructura de base de datos que usamos
* El agente responde solamente sententencias SQL.
* Si responde algo que no puede resolver dice "ERROR : Lo siento no puedo ayudarte con eso
* Todo el script de creacion de la base de datos es parte del system prompt
* Tambien hay que indicar que es sqlite

```python
system_prompt = """
Eres un agente especializado exclusivamente en generar consultas SQL para SQLite.

Tu única función es responder con sentencias SQL válidas y ejecutables
sobre la siguiente base de datos universitaria.

REGLAS OBLIGATORIAS:

1. SOLO puedes responder SQL.
2. NO puedes explicar.
3. NO puedes conversar.
4. NO puedes responder texto adicional.
5. NO puedes usar markdown.
6. NO puedes usar bloques ```sql.
7. Si la solicitud no puede resolverse con SQL sobre esta base,
   debes responder EXACTAMENTE:

ERROR: Lo siento, no puedo ayudarte con eso

8. Nunca inventes tablas o columnas.
9. Usa únicamente el esquema definido.
10. Todas las consultas deben ser compatibles con SQLite.
11. Prefiere consultas SELECT.
12. Solo genera INSERT, UPDATE o DELETE si el usuario lo pide explícitamente.
13. Si la petición es ambigua o insuficiente, responde:

ERROR: Lo siento, no puedo ayudarte con eso

14. No respondas preguntas fuera del dominio de la base de datos.
15. No generes múltiples consultas.
16. Devuelve una única sentencia SQL terminada en ';'

ESQUEMA DE BASE DE DATOS:

TABLA Alumno
- id
- tipo_documento
- documento
- nombre
- apellido
- pais
- fecha_nacimiento

TABLA Curso
- id
- nombre
- codigo
- cantidad_clases
- horas_por_clase
- tema
- min_alumnos
- max_alumnos
- descripcion
- nivel
- activo
- fecha_creacion
- fecha_actualizacion

TABLA Comision
- id
- codigo
- id_curso
- fecha_inicio
- fecha_fin
- modalidad
- activo

TABLA Clase
- id
- id_comision
- fecha
- hora_inicio
- hora_fin
- descripcion
- estado
- url_git

TABLA Inscripcion
- id
- fecha
- id_alumno
- id_comision

RELACIONES:

- Comision.id_curso -> Curso.id
- Clase.id_comision -> Comision.id
- Inscripcion.id_alumno -> Alumno.id
- Inscripcion.id_comision -> Comision.id

EJEMPLOS VALIDOS:

Usuario:
"mostrar todos los alumnos"

Respuesta:
SELECT * FROM Alumno;

Usuario:
"cursos activos"

Respuesta:
SELECT * FROM Curso WHERE activo = 1;

Usuario:
"alumnos inscriptos en java"

Respuesta:
SELECT a.*
FROM Alumno a
JOIN Inscripcion i ON i.id_alumno = a.id
JOIN Comision co ON co.id = i.id_comision
JOIN Curso c ON c.id = co.id_curso
WHERE c.nombre LIKE '%Java%';

EJEMPLOS INVALIDOS:

Usuario:
"quien gano el mundial"

Respuesta:
ERROR: Lo siento, no puedo ayudarte con eso

Usuario:
"explicame que hace esta query"

Respuesta:
ERROR: Lo siento, no puedo ayudarte con eso
"""
```

## Paso 4: Mostrar resultado de consulta

* Crear una funcion def mostrar_resultado_consulta(consulta) que reciba una consulta ejecuta (dataset/resultset) y lo muestre como gusten
 * Como tabla, como lista de bullets, como le parezca mejor
* Probar hacer una consulta del tipo select * from alumnos y la muestre usando esa funcion

```python
# =========================
# PASO 4 - MOSTRAR RESULTADOS
# =========================

def mostrar_resultado_consulta(consulta):
    conn = sqlite3.connect("universidad.db")
    cursor = conn.cursor()
    try:
        # Ejecutar consulta
        cursor.execute(consulta)

        # Obtener columnas
        columnas = [columna[0] for columna in cursor.description]

        # Obtener filas
        filas = cursor.fetchall()

        # Validar si hay resultados
        if len(filas) == 0:
            print("⚠️ La consulta no devolvió resultados")
            return

        # Mostrar encabezados
        print(" | ".join(columnas))
        print("-" * 80)

        # Mostrar filas
        for fila in filas:
            print(" | ".join(str(valor) for valor in fila))

    except Exception as e:
        print("❌ Error al ejecutar la consulta")
        print(e)


# =========================
# PRUEBA
# =========================

consulta = "SELECT * FROM Alumno"

mostrar_resultado_consulta(consulta)
```

## Paso 5. Generar un agente

* Vamos a generar un agente que:
 * Me cuente cual es su objetivo (Bienvenidos al agente conversacional del siste universitario...)
 * Me pida la api key
 * Que me pregunte que quiero saber
* Que muestre el la respuesta del agente (EL SQL generado)

```python
# =========================
# PASO 5 - GENERAR AGENTE
# =========================

from groq import Groq
from getpass import getpass
from IPython.display import display, Markdown

print("🎓 Bienvenidos al agente conversacional del sistema universitario")
print("Este agente convierte preguntas en lenguaje natural a consultas SQL para SQLite.")
print("Solo responderá consultas SQL sobre la base de datos universidad.db.")
print()

api_key = getpass("Ingresá tu API Key de Groq: ")

client = Groq(api_key=api_key)

pregunta_usuario = input("¿Qué querés saber sobre la base de datos universitaria?: ")

respuesta = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {
            "role": "system",
            "content": system_prompt
        },
        {
            "role": "user",
            "content": pregunta_usuario
        }
    ],
    temperature=0
)

sql_generado = respuesta.choices[0].message.content.strip()

print("\n🧠 SQL generado por el agente:")
print(sql_generado)
```

# Paso 6 : Ahora el agente me devuelve SQL y lo ejecuto.

* Si me devuelve un SELECT. Lo ejecuto y muestro el resultado usando la funcion mostrar_resultado_consulta
* Si es un insert/update/delete directamente lo ejecuto y digo que se realizao ok
* Modificar el agente anterior

```python
# =========================
# PASO 6 - GENERAR AGENTE
# =========================

from groq import Groq
from getpass import getpass
from IPython.display import display, Markdown

print("🎓 Bienvenidos al agente conversacional del sistema universitario")
print("Este agente convierte preguntas en lenguaje natural a consultas SQL para SQLite.")
print("Solo responderá consultas SQL sobre la base de datos universidad.db.")
print()

api_key = getpass("Ingresá tu API Key de Groq: ")

client = Groq(api_key=api_key)

pregunta_usuario = input("¿Qué querés saber sobre la base de datos universitaria?: ")

respuesta = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {
            "role": "system",
            "content": system_prompt
        },
        {
            "role": "user",
            "content": pregunta_usuario
        }
    ],
    temperature=0
)

sql_generado = respuesta.choices[0].message.content.strip()

print("\n🧠 SQL generado por el agente:")
print(sql_generado)

#Si el SQL Generado comienza con SELECT
if sql_generado.startswith("SELECT"):
    print("\n🧠 SQL generado por el agente:")
    mostrar_resultado_consulta(sql_generado)

# Si es insert. update o delete
elif sql_generado.startswith("INSERT") or sql_generado.startswith("UPDATE") or sql_generado.startswith("DELETE"):
    #Lo ejecuto
    conn = sqlite3.connect("universidad.db")
    cursor = conn.cursor()
    
    cursor.execute(sql_generado)
    conn.commit()
    print("\n✅ Operacion exitosa")
    

```
