---
applyTo: "**/*.py"
description: "Usar cuando se creen o modifiquen clases Python. Aplicar POO disciplinada, encapsulamiento, validacion de invariantes, constructores que solo creen objetos consistentes y preguntas de negocio cerradas si faltan reglas."
---

# Estilo para clases Python

Cuando generes o refactorices clases Python en este proyecto, segui estas reglas:

- Aplicar buenas practicas de programacion orientada a objetos y un estilo de Python disciplinado.
- Toda clase debe proteger su estado interno. No expongas atributos mutables de forma publica salvo que haya un motivo explicito.
- Definir niveles de visibilidad de forma explicita: usar atributos internos con guion bajo (`_atributo`) y evitar atributos publicos mutables.
- Los objetos deben nacer validos. El constructor debe aceptar solo datos que permitan crear una instancia consistente.
- Validar entradas en el constructor y en toda operacion publica que pueda romper invariantes.
- Si un dato no es valido para el dominio, fallar temprano con una excepcion clara (`ValueError`, `TypeError` o una excepcion de dominio si ya existe).
- Mantener encapsulamiento obligatorio. Toda clase debe exponer getters para los atributos encapsulados mediante `@property`.
- Si un atributo puede cambiar despues de crear el objeto, debe existir setter (`@atributo.setter`) con validacion obligatoria.
- Si un atributo no debe cambiar, definir solo getter y bloquear su modificacion por API publica.
- No usar setters que permitan estados intermedios invalidos. Toda modificacion publica debe dejar el objeto consistente al terminar.
- Si la clase tiene reglas de consistencia complejas, extraer validaciones a metodos privados con nombres claros.
- Evitar clases anemicas o contenedores triviales de datos cuando el objeto deba proteger invariantes o tener comportamiento propio.
- No usar `dataclass` para entidades con invariantes importantes o encapsulamiento fuerte, salvo pedido explicito.
- Usar nombres claros, type hints y metodos pequenos con una unica responsabilidad.
- Evitar logica duplicada entre constructor, propiedades y metodos mutadores. Centralizar validaciones reutilizables.
- No agregar comentarios redundantes. El codigo debe ser legible por estructura y nombres.

# Criterios de diseno

- Cada metodo publico debe preservar la consistencia del objeto.
- No dejar objetos parcialmente inicializados.
- Si hay colecciones internas mutables, no devolver referencias mutables directas salvo que sea intencional; preferir copias o vistas inmutables.
- Las decisiones de modelado deben priorizar claridad del dominio antes que conveniencia superficial.

# Cuando falten reglas de negocio

- Si faltan reglas de negocio concretas, hacer preguntas cerradas, de si o no, de a una.
- Si no conviene frenar el trabajo, asumir la regla mas logica y conservadora, e indicar la suposicion de forma breve.

# Resultado esperado

Al crear una clase nueva, el resultado debe mostrar:

- Encapsulamiento real.
- Validacion explicita.
- Invariantes protegidas.
- Constructor seguro.
- API publica pequena y coherente.

# Reglas obligatorias (sin excepcion)

- Si una clase nueva no incluye encapsulamiento, getters, validaciones y visibilidad explicita, el resultado es incorrecto.
- No dejar atributos de dominio como publicos mutables.
- No aceptar setters sin validacion.