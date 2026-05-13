# Clase 19 - 13 de Mayo del 2026

# Repaso

* Base de Datos
  * Consultas
      * Subquerys o sub consultas
  * Relaciones entre Tablas
    * 1 a 1
    * 1 a N
    * Foreign Key (Clave Foranea)
      * Apunta ala Primary Key
  * Representacion Visual Base de Datos
    * DER
      * En Mermaid
  * Transacciones en Bases de Datos
      * Start Transaction
      * Commit
      * Rollback
  * Diseño de Bases de Datos  << Mucho muy importante
      * Consistencia
          * A nivel registro
          * A niver varias tablas
      * Normalizacion
        * Evitar redundancia
 
# Herramientas de IA para base de datos

Lo que hicimos la clase pasada

```
Un sistema que registra los alumnos de una comision educativa y los cursos que se pueden dictar. Cuando se decide dictar un curso se abre una comision
y cada comision tiene una serie de clases con su duracion y dia de cursada.
Por ahora solo eso.
```

## Database Build

> https://database.build/

 * UN llm convencional
     * Infiere la estructura de la base de datos a partir del contexto
     * No hay base de datos real de lado del LLM
* Database.build
    * Genera una base de dats postgres SQL
    * Posee una herramienta para que un LLM interacture con la base de datos

* Me creo este esquema

<img width="880" height="461" alt="image" src="https://github.com/user-attachments/assets/c42e3c1d-f3e8-496f-b849-10a697b48937" />

* LE vamos a pedir que agregue registros de ejemplos en todas las tablas

```
Agregarme registros de ejemplo en todas las tablas
```

* Generar consultas en SQL

```
select * from student
```

* Generar consultas SQL a partir de lenguaje natural

```
Queiro el query para darme una lista de alumnos que no esten inscriptos en ninguna comision
```

* Me devuelve el siguiente Query

```
SELECT s.id, s.name, s.email
FROM students s
LEFT JOIN student_commissions sc ON s.id = sc.student_id
WHERE sc.commission_id IS NULL;
```
* O bien

```
SELECT id, name, email
FROM students
WHERE id NOT IN (
    SELECT student_id
    FROM student_commissions
);
```

* Se animan a probar la herramienta

> Puntaje : 10 / 10

## Supabase

* Es un "database hosting" que permite tener una base de datos en internet.
  * Gratuita con limitacions o pagar si necesitamos mas espacio o capacidad de computo

## Pendiente

> [!NOTE]
> Luego vamos a migrar nuestra base de SQLite a Postgres SQL

---

# Expresiones regulares

* Es una cadena de caracteres que tiene cierta sintaxis compacta que me determina si un un string cumple con cierto formato
* Tiene ciertos caractes especiales
    * ^ : Matchea con el inicio del string
      * ^Ho : Matchea si el string comienza con "Ho"
   * $ : Mache con el final del string
     * al$ : Marche si el string termina en "al"
   * . : Cualquier caracter
       * ....  son hasta 4 caracteres
   * [A-Z] : Caracteres posibles (A-Z) mayucula
   * .* : Cualquier caracter (.) n veces (*)

* ^[Hh]o.*al$
    * ^ Empieza con
    * [Hh] la letra H o h (mayuscula y muniscula
    * o despues una o
    * . despues cualquier caracter
    * N veces (*)
    * Termina con al (al$)


> https://regex101.com/

* Hoy en dia las podemos armar con la IA

```
Dame una regex para validar un numero de telefono 5555-55555 (cuatro digitos, guion , cuatro digitos). Tiene que tener exactamente 8 numeros y un guion en el medio
```

* Me devuelve

```
^\d{4}-\d{4}$
```

## Bases de datos con expresiones regulares

* Quiero una tabla PErsona (id, nombre, Celular)
  * El nombre Empieza con mayuscula y despues todos caracteres en minuscula sin espacio
  * El celilar empieza con 11 (4 digitos) - (4 dititos)

* Sqlite
```
CREATE TABLE Persona (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,

    nombre TEXT NOT NULL
        CHECK (
            nombre REGEXP '^[A-Z][a-z]+$'
        ),

    celular TEXT NOT NULL
        CHECK (
            celular REGEXP '^11[0-9]{2}-[0-9]{4}$'
        )
);
```

* o Bien (Sin expresiones regulares)

```
CREATE TABLE IF NOT EXISTS Persona (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre  TEXT    NOT NULL
                    CHECK (
                        -- Sin espacios
                        nombre NOT LIKE '% %'
                        -- 1ra letra mayúscula (A–Z)
                        AND substr(nombre, 1, 1) BETWEEN 'A' AND 'Z'
                        -- Resto en minúscula (a–z)
                        AND lower(substr(nombre, 2)) = substr(nombre, 2)
                    ),
    celular TEXT    NOT NULL
                    CHECK (
                        -- Empieza con 11, formato: 1123-4567
                        celular GLOB '11[0-9][0-9]-[0-9][0-9][0-9][0-9]'
                    )
);
```

* En postgres

```
CREATE TABLE Persona (
    id SERIAL PRIMARY KEY,

    nombre TEXT NOT NULL
        CHECK (
            nombre ~ '^[A-Z][a-z]+$'
        ),

    celular TEXT NOT NULL
        CHECK (
            celular ~ '^11[0-9]{2}-[0-9]{4}$'
        )
);
```

---

# Base de datos





