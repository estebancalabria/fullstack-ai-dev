# Repaso

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
