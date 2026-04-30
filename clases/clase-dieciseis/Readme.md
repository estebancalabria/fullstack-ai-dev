<img width="1110" height="881" alt="image" src="https://github.com/user-attachments/assets/d4498fba-fd82-491f-9e64-ef6185bbd442" /># Repaso

* Bibliografia
    * Clean Code
    * Patrones de Arquitectura / Enteprise Patters (Fowler)
    * Design Patters
* System Desingn
  * Divison en Capas
      * Presetentacion/Interfaz
      * Servicios
      * Persistencia  <<<<
      * Modelo
* SQL
  * SQLIte
  * Trabajo con el CLI

# SQL (Modulo 15 a 19 del Alumni)

## Herramienta para SQLIte

> https://sqlitebrowser.org/

## Trabajando con SQL

### DDL (Data Definition Language) : Create

1. Crearmos una tabla de Alumno

* Campos
  * ID           <<< Clave Primaria 
  * Documento    <<< Clave Natural 
  * Nombre
  * Apellido
  * Fecha De Nacimiento
* Restricciones
  * ID Numerio auto incremental
  * El documento no se repite          
  * El nombre y apellido no se repite
  * Validar la fecha de nacimiento

> [!NOTE]
> No tenemos que permitir cuando diseniamos una tabla que se guarden datos inconsistentes
> Es clave como pensamos las restricciones cuando definimos una tabla

* Analizar un poquito
  * Cada motor de base de datos define sus propios tipos de datos


```sql
  CREATE TABLE Alumno (
     <NOMBRE CAMPO> <TIPO DE DATO> <MODIFICADORES>,
     <NOMBRE CAMPO> <TIPO DE DATO> <MODIFICADORES>,
     <NOMBRE CAMPO> <TIPO DE DATO> <MODIFICADORES>,
     ...
     <CONSTRAINTS>
  )
```

* <TIPO DE DATO> se define segun el motor de base de datos
* <MODIFICADORES> varian el motor de base de datos
    * NULL, NOT NULL Son estandar
    * PRIMARY KEY    <<< Dependen del motor 
    * AUTOINCREMENT  <<< Dependen del motor
* <CONSTRAINTS>
    * Restricciones que se aplican sobre los datos
    * UNIQUE  Chequean que no se repitan los datos (ej DNI)
       * CONSTRAINT <NOMBRE_RESTRICCION> UNIQUE (Campo1, Campo2, ...)
    * CHECK : Chquean que el valor cumpla ciertas caracteristicas
        * Numeros entre 1 y 1000
        * Texto solo en minuscula o solo en mayuscula
        * ETC
        * CONSTRAINT <NOMBRE_RESTRICCION> CHECK (Condiciones logicas que chequean)
        

* EN SQLITE
```
CREATE TABLE Alumno (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    documento        TEXT    NOT NULL,
    nombre           TEXT    NOT NULL,
    apellido         TEXT    NOT NULL,
    fecha_nacimiento TEXT    NOT NULL,

    CONSTRAINT uq_documento       UNIQUE (documento),
    CONSTRAINT uq_nombre_apellido UNIQUE (nombre, apellido),
    CONSTRAINT ck_fecha_nacimiento CHECK (
        fecha_nacimiento GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'
        AND CAST(strftime('%Y', fecha_nacimiento) AS INTEGER) BETWEEN 1900 AND CAST(strftime('%Y', 'now') AS INTEGER)
        AND CAST(strftime('%m', fecha_nacimiento) AS INTEGER) BETWEEN 1 AND 12
        AND CAST(strftime('%d', fecha_nacimiento) AS INTEGER) BETWEEN 1 AND 31
        AND fecha_nacimiento <= date('now')
    )
);
```

> [!WARN]
> Esa forma anterior la tuve que iterar con la ia porque no me funcionaba la funcion strftime. Me genero

```
CREATE TABLE personas (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    documento        TEXT    NOT NULL,
    nombre           TEXT    NOT NULL,
    apellido         TEXT    NOT NULL,
    fecha_nacimiento TEXT    NOT NULL,

    CONSTRAINT uq_documento       UNIQUE (documento),
    CONSTRAINT uq_nombre_apellido UNIQUE (nombre, apellido),
    CONSTRAINT ck_fecha_nacimiento CHECK (
        fecha_nacimiento GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'
        AND SUBSTR(fecha_nacimiento, 1, 4) BETWEEN '1900' AND '2100'
        AND SUBSTR(fecha_nacimiento, 6, 2) BETWEEN '01' AND '12'
        AND SUBSTR(fecha_nacimiento, 9, 2) BETWEEN '01' AND '31'
    )
);
```

> [!NOTE]
> EN SQlite tambien se puede poner CREATE TABLE IF NOT EXISTS Alumno(

* Como seria en MSQL
```
CREATE TABLE Alumno (
    id INT AUTO_INCREMENT PRIMARY KEY,
    documento VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,

    CONSTRAINT uq_documento UNIQUE (documento),
    CONSTRAINT uq_nombre_apellido UNIQUE (nombre, apellido),

    CONSTRAINT ck_fecha_nacimiento CHECK (
        fecha_nacimiento >= '1900-01-01'
        AND fecha_nacimiento <= CURDATE()
    )
);
```

* Como seria en SQL Server
```
CREATE TABLE Alumno (
    id INT IDENTITY(1,1) PRIMARY KEY,
    documento NVARCHAR(50) NOT NULL,
    nombre NVARCHAR(100) NOT NULL,
    apellido NVARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,

    CONSTRAINT uq_documento UNIQUE (documento),
    CONSTRAINT uq_nombre_apellido UNIQUE (nombre, apellido),

    CONSTRAINT ck_fecha_nacimiento CHECK (
        fecha_nacimiento >= '1900-01-01'
        AND fecha_nacimiento <= CAST(GETDATE() AS DATE)
    )
);
```

> [!NOTE]
> Para los nombres de las tablas, o todas en Singular o todas en singular, no mixto

## Claves 

* Cada tabla tiene que tener una clave primaria
  * Hoy en dia hay concenso en sistemas sobre esto
* Ademas podemos tener claves naturales que no se tienen que repetir

## Restricciones

* No es solo importante definir los campos de las tablas
* Es "mucho muy" importante definir tambien las restricciones
* Estas se las tengo que informar a la IA

* Si no le digo nada
```
Creame esta tabla * Campos
  * ID           <<< Clave Primaria 
  * Documento    <<< Clave Natural 
  * Nombre
  * Apellido
  * Fecha De Nacimiento
```

* ME responde claude
```sql
CREATE TABLE personas (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    documento        TEXT    NOT NULL UNIQUE,
    nombre           TEXT    NOT NULL,
    apellido         TEXT    NOT NULL,
    fecha_nacimiento TEXT    NOT NULL  -- formato 'YYYY-MM-DD'
);
```

* En cambio si le pido
```
* Campos
  * ID           <<< Clave Primaria 
  * Documento    <<< Clave Natural 
  * Nombre
  * Apellido
  * Fecha De Nacimiento
* Restricciones
  * ID Numerio auto incremental
  * El documento no se repite          
  * El nombre y apellido no se repite
  * Validar la fecha de nacimiento
```

* Me va a generar
```sql
CREATE TABLE personas (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    documento        TEXT    NOT NULL,
    nombre           TEXT    NOT NULL,
    apellido         TEXT    NOT NULL,
    fecha_nacimiento TEXT    NOT NULL,

    CONSTRAINT uq_documento       UNIQUE (documento),
    CONSTRAINT uq_nombre_apellido UNIQUE (nombre, apellido),
    CONSTRAINT ck_fecha_nacimiento CHECK (
        fecha_nacimiento GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'
        AND CAST(strftime('%Y', fecha_nacimiento) AS INTEGER) BETWEEN 1900 AND CAST(strftime('%Y', 'now') AS INTEGER)
        AND CAST(strftime('%m', fecha_nacimiento) AS INTEGER) BETWEEN 1 AND 12
        AND CAST(strftime('%d', fecha_nacimiento) AS INTEGER) BETWEEN 1 AND 31
        AND fecha_nacimiento <= date('now')
    )
);
```

### Utilizar la IA para validar restricciones

* Le preguntamos

```
Tengo esto en SQLIte "CREATE TABLE personas (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    documento        TEXT    NOT NULL,
    nombre           TEXT    NOT NULL,
    apellido         TEXT    NOT NULL,
    fecha_nacimiento TEXT    NOT NULL,
    CONSTRAINT uq_documento       UNIQUE (documento),
    CONSTRAINT uq_nombre_apellido UNIQUE (nombre, apellido),
    CONSTRAINT ck_fecha_nacimiento CHECK (
        fecha_nacimiento GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'
        AND SUBSTR(fecha_nacimiento, 1, 4) BETWEEN '1900' AND '2100'
        AND SUBSTR(fecha_nacimiento, 6, 2) BETWEEN '01' AND '12'
        AND SUBSTR(fecha_nacimiento, 9, 2) BETWEEN '01' AND '31'
    )
);" evaluame todas las constraints que consideras que faltarian para asegurar la consistencia de los datos en una aplicacion critica del mundo real. Haceme pregutnas de a una sobre las cuestiones que requieran tomar una decision sin asumir nada
```

> [!NOTE]
> EL secreto esta en decirle que me haga las preguntas de a una

* Conversacion
   * https://claude.ai/share/ff13b2b0-21c0-4ac3-989e-b1de0a4540f5

* Finalmente me genero esta tabla

```sql
CREATE TABLE personas (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo_documento   TEXT    NOT NULL,
    documento        TEXT    NOT NULL,
    nombre           TEXT    NOT NULL,
    apellido         TEXT    NOT NULL,
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
        DATE(fecha_nacimiento) IS NOT NULL
        AND DATE(fecha_nacimiento) = fecha_nacimiento
        AND fecha_nacimiento <= DATE('now')
        AND SUBSTR(fecha_nacimiento, 1, 4) BETWEEN '1900' AND '2100'
    ),
    CONSTRAINT uq_tipo_documento UNIQUE (tipo_documento, documento)
);
```

### Borrar Tabla

```
DROP TABLE ALUMNO;
```

### Insertar datos (Y consultas)

* Trato de insertar datos correctos

```sql
INSERT INTO Alumno
   (documento, nombre, apellido, fecha_nacimiento)
VALUES
   ('123456789', 'Juan', 'Perez', '1998-05-14');
```

* Verificamos con SQL que se hayan insertado los datos

```
SELECT
   *
FROM
  Alumno
```


* Trato de insertar datos duplicados

```sql
INSERT INTO Alumno
   (documento, nombre, apellido, fecha_nacimiento)
VALUES
   ('123456789', 'Juan', 'Perez', '1998-05-14');
```

* Con mismo DNI
```sql
INSERT INTO Alumno
   (documento, nombre, apellido, fecha_nacimiento)
VALUES
   ('123456789', 'J', 'P', '1998-05-14');
```

* Con nombre y apellido duplicado
```sql
INSERT INTO Alumno
   (documento, nombre, apellido, fecha_nacimiento)
VALUES
   ('12', 'Juan', 'Perez', '1998-05-14');
```

# Ejercitacion

* Definir la tabla Curso
* ID
* Nombre Curso
* Codigo
* Cantitad Clases
* Hs por Clase
* Tema
* Max Alumnos
* ...uds pueden definir mas campos

> [!NOTE]
> No confundir con el concepto de cursada. Un curso se puede volver a dictar numerosas veces

* Tuvimos varias Propuestas

  <img width="1110" height="881" alt="image" src="https://github.com/user-attachments/assets/1bb066da-7836-4f57-8b48-37ec2afa4a88" />

* La Combinamos con la IA
   * https://claude.ai/share/5e7659b1-e724-45d0-b084-40ee35defb38

* Finalmente tuvimos esta ultra mega buenisima propuesta
  
```sql
CREATE TABLE curso (
    id          INTEGER     NOT NULL
                            CONSTRAINT pk_curso PRIMARY KEY AUTOINCREMENT,

    nombre      TEXT        NOT NULL
                            CONSTRAINT ck_nombre_no_vacio  CHECK (LENGTH(TRIM(nombre)) > 0)
                            CONSTRAINT ck_nombre_formato   CHECK (nombre GLOB '[A-Za-z0-9 ]*'),

    codigo      TEXT        NOT NULL
                            CONSTRAINT uq_codigo           UNIQUE
                            CONSTRAINT ck_codigo_longitud  CHECK (LENGTH(TRIM(codigo)) BETWEEN 3 AND 20)
                            CONSTRAINT ck_codigo_formato   CHECK (codigo GLOB '[A-Za-z0-9-_]*'),

    cantidad_clases INTEGER NOT NULL
                            CONSTRAINT ck_cantidad_clases  CHECK (cantidad_clases BETWEEN 1 AND 100),

    horas_por_clase REAL    NOT NULL
                            CONSTRAINT ck_horas_por_clase  CHECK (horas_por_clase BETWEEN 0.5 AND 8),

    tema        TEXT        NOT NULL
                            CONSTRAINT ck_tema_no_vacio    CHECK (LENGTH(TRIM(tema)) > 0)
                            CONSTRAINT ck_tema_enum        CHECK (tema IN ('Programacion', 'Base de Datos', 'Redes', 'Matematica', 'Sistemas', 'General')),

    min_alumnos INTEGER     NOT NULL DEFAULT 5
                            CONSTRAINT ck_min_alumnos      CHECK (min_alumnos >= 1),

    max_alumnos INTEGER     NOT NULL DEFAULT 30
                            CONSTRAINT ck_max_alumnos      CHECK (max_alumnos BETWEEN 1 AND 100),

    descripcion TEXT,

    nivel       TEXT        NOT NULL DEFAULT 'basico'
                            CONSTRAINT ck_nivel            CHECK (nivel IN ('basico', 'intermedio', 'avanzado')),

    estado      TEXT        NOT NULL DEFAULT 'ACTIVO'
                            CONSTRAINT ck_estado           CHECK (estado IN ('ACTIVO', 'INACTIVO', 'FINALIZADO', 'SUSPENDIDO')),

    activo      INTEGER     NOT NULL DEFAULT 1
                            CONSTRAINT ck_activo           CHECK (activo IN (0, 1)),

    fecha_creacion      TEXT NOT NULL DEFAULT (datetime('now')),
    fecha_actualizacion TEXT,

    CONSTRAINT ck_rango_alumnos CHECK (min_alumnos <= max_alumnos)
);
```

* Vamos a insertar varios cursos de UNA!

```sql
INSERT INTO curso (
    nombre, codigo, cantidad_clases, horas_por_clase,
    tema, min_alumnos, max_alumnos, descripcion,
    nivel, estado, activo
) VALUES
    ('Introduccion a la Programacion',   'PROG-101', 20, 2.0, 'Programacion',  5, 25, 'Logica, algoritmos y pseudocodigo. Primera aproximacion al pensamiento computacional.',          'basico',       'ACTIVO',      1),
    ('Python para Data Science',         'PYDS-301', 24, 2.5, 'Programacion',  5, 20, 'Pandas, NumPy, visualizacion con Matplotlib y primeros modelos con scikit-learn.',              'avanzado',     'ACTIVO',      1),
    ('Desarrollo Web Full Stack',        'WEBF-201', 32, 2.0, 'Programacion',  5, 20, 'HTML, CSS, JavaScript, React en frontend. Node.js y Express en backend. Deploy en la nube.',   'intermedio',   'ACTIVO',      1),
    ('Base de Datos Relacionales',       'BBDD-201', 16, 2.0, 'Base de Datos', 5, 25, 'Modelado entidad-relacion, SQL avanzado, normalizacion y optimizacion de consultas.',           'intermedio',   'ACTIVO',      1),
    ('Administracion de Redes TCP/IP',   'REDES-201',18, 2.0, 'Redes',         4, 20, 'Modelo OSI, subnetting, routing, switching y configuracion de equipos Cisco.',                  'intermedio',   'ACTIVO',      1),
    ('Ciberseguridad Fundamentos',       'CSEC-301', 20, 2.5, 'Redes',         4, 18, 'OWASP Top 10, ethical hacking, hardening de sistemas y respuesta a incidentes.',               'avanzado',     'ACTIVO',      1),
    ('Arquitectura de Microservicios',   'ARCH-401', 16, 2.5, 'Programacion',  4, 15, 'DDD, patrones de comunicacion, Docker, Kubernetes y observabilidad.',                          'avanzado',     'ACTIVO',      1),
    ('Inteligencia Artificial Aplicada', 'IART-301', 24, 2.5, 'Sistemas',      5, 20, 'Machine learning supervisado y no supervisado, NLP basico, integracion de LLMs via API.',      'avanzado',     'ACTIVO',      1),
    ('Excel para Analisis de Datos',     'EXCL-101', 12, 2.0, 'General',       5, 30, 'Tablas dinamicas, funciones avanzadas, Power Query y dashboards con graficos interactivos.',   'basico',       'ACTIVO',      1),
    ('Metodologias Agiles y Scrum',      'AGIL-101',  8, 2.0, 'Sistemas',      5, 30, 'Framework Scrum, ceremonias, roles, Kanban y herramientas de gestion como Jira y Trello.',    'basico',       'ACTIVO',      1),
    ('DevOps y CI/CD con Azure',         'DVOP-401', 20, 2.5, 'Sistemas',      4, 15, 'Pipelines con Azure DevOps, GitHub Actions, Docker, Terraform e Infrastructure as Code.',     'avanzado',     'ACTIVO',      1),
    ('Matematica para Programadores',    'MATE-101', 16, 2.0, 'Matematica',    5, 25, 'Algebra lineal, logica proposicional, combinatoria y probabilidad aplicadas al software.',     'basico',       'FINALIZADO',  0);
```

* Quiero eliminar el campo estado (me quedo solo con activo)

```sql
ALTER TABLE Curso DROP COLUMN estado;
```

* Quiero actualizar todos los cursos y ponerle que la fecha de actualizacion sea igual a la fecha de creacion

```sql
UPDATE curso
SET fecha_actualizacion = fecha_creacion;
```

* Quiero actualizar la tabla. Quiero que la fecha de actualizacion no admita nulos y por defecto sea igual a la fecha de creacion

```sql
<<<< PARA DESPUES, USA TRIGGER
```

# Observaciones de lo que hizo la IA

* La IA tomo algunas decisiones tecnicas muy comunes
   * Campo estado (1 o 0) - Implementar Baja logica
   * Fecha_Creacion - Para llevar un registro de cuando se creo el registro
   * Fecha_Actualizacion - Para consistencia

# Para la proxima clase

*  Relaciones entre tablas y claves foraneas
*  Generar diagramas (DER) de las bases de datos
