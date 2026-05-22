# Clase 22 - 22 de Mayo del 2026

# Repaso

* IA
  * Tipos de IA
    * Propietarias
    * Open Source
      * Groq
  * Trabajar con API KEY
      * Response API
        * Sin Contexto. Respuesta simple
      * Chat Completion
        * Mantenia el contexto de la conversacion

# Colab del dia

https://colab.research.google.com/drive/1qSaSML2M462RCw55ofusdEs3tFDzsJNY?usp=sharing

# Tablas para almacenar unas conversacion

## Enunciado

* Vamos a crear una Interfaz tipo chatGPT con conversaciones persistentes

* Idea de la base de datos
(usuario) (id, Nombre)
(conversaciones/Chats) (id, fecha, nombre)
(mensajes) (id, role (assistant/user/system), fecha, texto)

## Ejericio 1. Definan el ddl en SQL para crear esa estructura

* Para SQLITE

```sql
-- =============================================
--  1. Tabla: usuarios
-- =============================================
CREATE TABLE IF NOT EXISTS usuarios (
    id      INTEGER  NOT NULL,
    nombre  TEXT     NOT NULL CHECK(LENGTH(TRIM(nombre)) > 0),

    CONSTRAINT pk_usuarios PRIMARY KEY (id)
);

-- =============================================
--  2. Tabla: conversaciones
-- =============================================
CREATE TABLE IF NOT EXISTS conversaciones (
    id          INTEGER  NOT NULL,
    usuario_id  INTEGER  NOT NULL,
    nombre      TEXT     NOT NULL DEFAULT 'Nueva conversación',
    fecha       TEXT     NOT NULL DEFAULT (DATETIME('now')),

    CONSTRAINT pk_conversaciones  PRIMARY KEY (id),
    CONSTRAINT fk_conv_usuario    FOREIGN KEY (usuario_id)
                                  REFERENCES usuarios(id)
                                  ON DELETE CASCADE
                                  ON UPDATE CASCADE,
    CONSTRAINT chk_conv_fecha     CHECK(fecha = DATETIME(fecha))
);

-- =============================================
--  3. Tabla: mensajes
-- =============================================
CREATE TABLE IF NOT EXISTS mensajes (
    id               INTEGER  NOT NULL,
    conversacion_id  INTEGER  NOT NULL,
    role             TEXT     NOT NULL,
    fecha            TEXT     NOT NULL DEFAULT (DATETIME('now')),
    texto            TEXT     NOT NULL CHECK(LENGTH(TRIM(texto)) > 0),

    CONSTRAINT pk_mensajes        PRIMARY KEY (id),
    CONSTRAINT fk_mens_conv       FOREIGN KEY (conversacion_id)
                                  REFERENCES conversaciones(id)
                                  ON DELETE CASCADE
                                  ON UPDATE CASCADE,
    CONSTRAINT chk_mens_role      CHECK(role IN ('user', 'assistant', 'system')),
    CONSTRAINT chk_mens_fecha     CHECK(fecha = DATETIME(fecha))
);

-- =============================================
--  Activar foreign keys (obligatorio en SQLite)
-- =============================================
PRAGMA foreign_keys = ON;
```

## Ejecicio 2.

* Crear un google colab y en la primer celda crea la base de datos chatgpt.db con esa estructura
* Crear luego un usuario de prueba

```python

```
