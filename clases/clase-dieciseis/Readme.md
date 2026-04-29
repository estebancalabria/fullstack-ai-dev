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
    * UNIQUE << Chequean que no se repitan los datos (ej DNI)
    * CHECK << Chquean que el valor cumpla ciertas caracteristicas
        * Numeros entre 1 y 1000
        * Texto solo en minuscula o solo en mayuscula
        * ETC

* EN SQLITE
```
```

## Claves 

* Cada tabla tiene que tener una clave primaria
  * Hoy en dia hay concenso en sistemas sobre esto
* Ademas podemos tener claves naturales que no se tienen que repetir

## Restricciones




