# Clase Veinte - 15 de Mayo del 2026

# Repaso 

* Herramientas de IA para Base de Datos
    * https://database.build/
    * Diagram GPT
* Expresiones Regulares
    * Usar Expresiones regulares en checks de Base de Datos
* Bases de Datos
    * Seguimos trabajando con el ejemplo
        * Inscripcion
    * Funciones
        * Cada motor tiene sus funciones
        * Consultar la documentacion
    * Disenio de Base de Datos
        * Integridad Referencial
    * Relaciones entre tablas
        * Relacion Padre-hijo, Maestro-DEtalle
          * ON DELETE CASCADE

# Base de Datos

```sql
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
   )
    CONSTRAINT uq_tipo_documento UNIQUE (tipo_documento, documento)
);

CREATE TABLE Curso (
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

    activo      INTEGER     NOT NULL DEFAULT 1
                            CONSTRAINT ck_activo           CHECK (activo IN (0, 1)),

    fecha_creacion      TEXT NOT NULL DEFAULT (datetime('now')),
    fecha_actualizacion TEXT,

    CONSTRAINT ck_rango_alumnos CHECK (min_alumnos <= max_alumnos)
);


CREATE TABLE Comision (
    id           INTEGER NOT NULL CONSTRAINT pk_comision PRIMARY KEY AUTOINCREMENT,
    codigo       INTEGER NOT NULL CONSTRAINT uq_codigo UNIQUE,
    id_curso     INTEGER NOT NULL CONSTRAINT fk_curso REFERENCES Curso(id),
    fecha_inicio TEXT    NOT NULL CONSTRAINT ck_fecha_inicio CHECK (
                             DATE(fecha_inicio) IS NOT NULL
                             AND DATE(fecha_inicio) = fecha_inicio
                         ),
    fecha_fin    TEXT    NOT NULL CONSTRAINT ck_fecha_fin CHECK (
                             DATE(fecha_fin) IS NOT NULL
                             AND DATE(fecha_fin) = fecha_fin
                             AND fecha_fin >= fecha_inicio
                         ),
    modalidad    TEXT    NOT NULL CONSTRAINT ck_modalidad CHECK (
                             modalidad IN ('Presencial', 'Virtual', 'Asincronico', 'Hibrida')
                         ),
    activo       INTEGER NOT NULL DEFAULT 1
                         CONSTRAINT ck_activo CHECK (activo IN (0, 1))
);

CREATE TABLE Clase (
    id           INTEGER NOT NULL CONSTRAINT pk_clase PRIMARY KEY AUTOINCREMENT,
    id_comision  INTEGER NOT NULL 
                 CONSTRAINT fk_comision 
                 REFERENCES Comision(id) ON DELETE CASCADE,
    fecha        TEXT    NOT NULL CONSTRAINT ck_fecha CHECK (
                             DATE(fecha) IS NOT NULL
                             AND DATE(fecha) = fecha
                         ),
    hora_inicio  TEXT    NOT NULL CONSTRAINT ck_hora_inicio CHECK (
                             hora_inicio GLOB '[0-2][0-9]:[0-5][0-9]'
                         ),
    hora_fin     TEXT    NOT NULL CONSTRAINT ck_hora_fin CHECK (
                             hora_fin GLOB '[0-2][0-9]:[0-5][0-9]'
                             AND hora_fin > hora_inicio
                         ),
    descripcion  TEXT    NOT NULL DEFAULT '',
    estado       TEXT    NOT NULL DEFAULT 'pendiente'
                         CONSTRAINT ck_estado CHECK (
                             estado IN ('pendiente', 'dictada', 'cancelada')
                         ),
    url_git      TEXT    NOT NULL DEFAULT ''
);

CREATE TABLE Inscripcion (
    id           INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    fecha        TEXT    NOT NULL CHECK (
                             DATE(fecha) IS NOT NULL
                             AND DATE(fecha) = fecha
                         ),
    id_alumno    INTEGER NOT NULL REFERENCES Alumno(id) ON DELETE CASCADE,
    id_comision  INTEGER NOT NULL REFERENCES Comision(id),
    CONSTRAINT uq_alumno_comision UNIQUE (id_alumno, id_comision)
);
```

* Si no le agrego el on delete cascade en la comision
    * Delete From comision where id=....   <<<<  Me va a dar error si la comision tiene clases
    * Con On Delete Cascade <<< Al borrar la comision se borran las clases
    * Comision y Clase tienen un relacion Maestro detalle / Padre hijo
* El Default al crear una tabla permite poner un valor por defecto si no se especifica      

# Llenamos la base con datos

```sql
PRAGMA foreign_keys = ON;

-- =========================
-- ALUMNOS
-- =========================

INSERT INTO Alumno (
    tipo_documento,
    documento,
    nombre,
    apellido,
    fecha_nacimiento,
    pais
) VALUES
('DNI', '30111222', 'Juan', 'Perez', '1995-03-10', 'Argentina'),
('DNI', '28999111', 'Maria', 'Gomez', '1992-07-21', 'Argentina'),
('PASAPORTE', 'BR998877', 'Lucas', 'Silva', '1990-11-02', 'Brasil'),
('PASAPORTE', 'UY123456', 'Ana', 'Rodriguez', '1998-05-15', 'Uruguay'),
('DNI', '33444555', 'Carlos', 'Lopez', '1988-09-12', 'Argentina'),
('PASAPORTE', 'CL456789', 'Valentina', 'Rojas', '1999-01-30', 'Chile'),
('CUIT', '20333444556', 'Martin', 'Suarez', '1985-04-19', 'Argentina'),
('PASAPORTE', 'PE654321', 'Camila', 'Torres', '1997-06-11', 'Peru'),
('DNI', '41222333', 'Sofia', 'Martinez', '2000-10-25', 'Argentina'),
('PASAPORTE', 'MX112233', 'Diego', 'Fernandez', '1994-12-09', 'Mexico'),
('DNI', '37777888', 'Lucia', 'Alvarez', '1996-08-17', 'Argentina'),
('PASAPORTE', 'CO778899', 'Mateo', 'Ramirez', '1993-02-13', 'Colombia'),
('DNI', '35555111', 'Agustina', 'Castro', '1991-03-28', 'Argentina'),
('PASAPORTE', 'ES998811', 'Pablo', 'Navarro', '1987-07-07', 'España'),
('DNI', '43333444', 'Milagros', 'Diaz', '2001-09-18', 'Argentina');

-- =========================
-- CURSOS
-- =========================

INSERT INTO Curso (
    nombre,
    codigo,
    cantidad_clases,
    horas_por_clase,
    tema,
    min_alumnos,
    max_alumnos,
    descripcion,
    nivel,
    activo
) VALUES
(
    'Java Inicial',
    'JAVA-101',
    20,
    2,
    'Programacion',
    5,
    30,
    'Curso introductorio de Java',
    'basico',
    1
),
(
    'SQL y Bases de Datos',
    'SQL-201',
    16,
    2,
    'Base de Datos',
    5,
    25,
    'Fundamentos de SQL',
    'intermedio',
    1
),
(
    'Redes CCNA Intro',
    'NET-110',
    24,
    3,
    'Redes',
    8,
    40,
    'Introduccion a redes',
    'basico',
    1
),
(
    'Python Avanzado',
    'PY-400',
    18,
    2.5,
    'Programacion',
    4,
    20,
    'Curso avanzado de Python',
    'avanzado',
    1
),
(
    'Algebra',
    'MAT-101',
    12,
    2,
    'Matematica',
    5,
    35,
    'Curso de algebra basica',
    'basico',
    1
),
(
    'Linux Administracion',
    'SYS-300',
    15,
    3,
    'Sistemas',
    3,
    15,
    'Administracion Linux',
    'intermedio',
    1
),
(
    'Docker y Containers',
    'DEV-500',
    10,
    2,
    'Sistemas',
    5,
    25,
    'Containers y Docker',
    'intermedio',
    0
),
(
    'Introduccion a la IA',
    'AI-100',
    14,
    2,
    'General',
    5,
    50,
    'Conceptos generales de IA',
    'basico',
    1
);

-- =========================
-- COMISIONES
-- =========================

INSERT INTO Comision (
    codigo,
    id_curso,
    fecha_inicio,
    fecha_fin,
    modalidad,
    activo
) VALUES
(1001, 1, '2026-03-01', '2026-05-15', 'Virtual', 1),
(1002, 1, '2026-08-01', '2026-10-15', 'Presencial', 1),

(2001, 2, '2026-04-10', '2026-06-20', 'Hibrida', 1),

(3001, 3, '2026-02-05', '2026-07-05', 'Presencial', 1),

(4001, 4, '2026-05-01', '2026-08-30', 'Virtual', 0),

(5001, 5, '2026-03-20', '2026-05-30', 'Asincronico', 1),

(8001, 8, '2026-06-01', '2026-08-01', 'Virtual', 1);

-- El curso 6 y 7 quedan SIN comisiones

-- =========================
-- CLASES
-- =========================

INSERT INTO Clase (
    id_comision,
    fecha,
    hora_inicio,
    hora_fin,
    descripcion,
    estado,
    url_git
) VALUES

-- JAVA
(1, '2026-03-01', '18:00', '20:00', 'Introduccion a Java', 'dictada', 'https://github.com/java/clase1'),
(1, '2026-03-03', '18:00', '20:00', 'Variables y tipos', 'dictada', 'https://github.com/java/clase2'),
(1, '2026-03-05', '18:00', '20:00', 'POO', 'pendiente', ''),

(2, '2026-08-01', '19:00', '21:00', 'Introduccion presencial', 'pendiente', ''),

-- SQL
(3, '2026-04-10', '17:00', '19:00', 'Modelo relacional', 'dictada', 'https://github.com/sql/clase1'),
(3, '2026-04-12', '17:00', '19:00', 'SELECT y WHERE', 'cancelada', ''),

-- REDES
(4, '2026-02-05', '09:00', '12:00', 'Modelo OSI', 'dictada', ''),
(4, '2026-02-07', '09:00', '12:00', 'TCP/IP', 'dictada', ''),

-- PYTHON
(5, '2026-05-01', '18:30', '21:00', 'Decoradores', 'pendiente', ''),

-- ALGEBRA
(6, '2026-03-20', '10:00', '12:00', 'Ecuaciones', 'dictada', ''),

-- IA
(7, '2026-06-01', '19:00', '21:00', 'Historia de la IA', 'pendiente', '');

-- =========================
-- INSCRIPCIONES
-- =========================

INSERT INTO Inscripcion (
    fecha,
    id_alumno,
    id_comision
) VALUES

-- JAVA 1001
('2026-02-15', 1, 1),
('2026-02-16', 2, 1),
('2026-02-17', 3, 1),
('2026-02-18', 4, 1),

-- JAVA 1002
('2026-07-15', 5, 2),
('2026-07-16', 6, 2),

-- SQL
('2026-03-25', 1, 3),
('2026-03-26', 7, 3),
('2026-03-27', 8, 3),
('2026-03-28', 9, 3),

-- REDES
('2026-01-20', 10, 4),
('2026-01-21', 11, 4),

-- PYTHON
('2026-04-15', 12, 5),

-- ALGEBRA
('2026-03-01', 13, 6),
('2026-03-02', 14, 6),

-- IA
('2026-05-20', 15, 7),
('2026-05-21', 2, 7),
('2026-05-22', 4, 7);

-- =========================
-- CASOS INTERESANTES
-- =========================

-- Alumno SIN inscripciones:
-- alumno id = 5? no, cursa
-- alumno id = 6? cursa
-- alumno id = 11? cursa
-- alumno id = 15? cursa

-- Agregamos uno sin cursar

INSERT INTO Alumno (
    tipo_documento,
    documento,
    nombre,
    apellido,
    fecha_nacimiento,
    pais
) VALUES (
    'PASAPORTE',
    'IT998877',
    'Luca',
    'Bianchi',
    '1993-04-14',
    'Italia'
);

-- Curso sin comisiones:
-- id 6 = Linux
-- id 7 = Docker

-- Comisión sin inscriptos:
INSERT INTO Comision (
    codigo,
    id_curso,
    fecha_inicio,
    fecha_fin,
    modalidad,
    activo
) VALUES (
    9001,
    8,
    '2026-09-01',
    '2026-11-01',
    'Virtual',
    1
);
```

# Python con IA
