Quiero que tomes este frontend existente y realices un REDISEÑO COMPLETO de la interfaz y de la experiencia de usuario (UX/UI).
Tu objetivo es transformar visualmente la aplicación para que se vea mucho más moderna, profesional, cuidada, coherente y atractiva, manteniendo intacta toda la funcionalidad existente y, sobre todo, su integración con el backend.
OBJETIVO PRINCIPAL
Quiero un cambio visual importante.
No quiero simplemente cambiar algunos colores, márgenes o bordes. Quiero que replantees la interfaz visual completa:
Layouts
Jerarquía visual
Navegación
Headers
Footers
Cards
Formularios
Botones
Tablas
Modales
Menús
Buscadores
Filtros
Estados vacíos
Estados de carga
Mensajes de error
Alertas
Tipografía
Espaciados
Responsive
Microinteracciones
Hover states
Focus states
Transiciones
Organización de información
Experiencia mobile
Experiencia desktop
Quiero que la aplicación parezca un producto actual y profesional, no una plantilla genérica.
Tenés libertad para reemplazar completamente los estilos existentes y reorganizar visualmente componentes cuando sea necesario.
Sin embargo, hay una regla fundamental:
NO ROMPER LA FUNCIONALIDAD EXISTENTE
Este ZIP contiene principalmente el frontend de una aplicación que está conectada a un backend existente.
El backend NO forma parte de este rediseño.
Tenés que asumir que actualmente las conexiones frontend-backend funcionan y deben continuar funcionando exactamente igual después del rediseño.
REGLA CRÍTICA: PRESERVAR CONTRATOS CON EL BACKEND
No modifiques ni elimines elementos que puedan formar parte del contrato entre frontend y backend.
Antes de modificar un componente, analizá cuidadosamente:
llamadas fetch()
llamadas axios
endpoints
URLs de API
Server Actions
actions de formularios
handlers
hooks
parámetros
query strings
nombres de variables provenientes del backend
payloads
objetos enviados
objetos recibidos
IDs
claves
nombres de propiedades
nombres de campos
values
atributos name
métodos HTTP
headers
tokens
cookies
autenticación
autorización
rutas
slugs
parámetros dinámicos
relaciones entre componentes
callbacks
estados relacionados con información del backend
Considerá todas estas cosas como CONTRATOS y preservalas.
Por ejemplo, si existe:
NO cambies arbitrariamente "productId" por otro nombre.
Si existe:
fetch("/api/products")
NO cambies ese endpoint.
Si existe:
router.push(/products/${product.id})
preservá esa lógica y esa estructura de navegación salvo que sea estrictamente necesario y puedas garantizar compatibilidad.
Si un botón llama:
onClick={() => deleteProduct(product.id)}
podés rediseñar completamente el botón visualmente, moverlo, agregarle iconos, confirmaciones visuales o mejorar su UX, pero NO eliminar ni romper esa llamada.
IDs Y ATRIBUTOS IMPORTANTES
No elimines ni renombres IDs existentes sin comprobar previamente para qué se utilizan.
Lo mismo aplica a:
id=""
name=""
data-*
aria-*
value
key
href
src
action
method
type
route params
Si no sabés con certeza si un identificador es puramente visual o funcional, PRESERVALO.
NO INVENTAR UN BACKEND NUEVO
No reemplaces conexiones reales por:
mocks
datos hardcodeados
arrays ficticios
JSON de ejemplo
localStorage
datos falsos
APIs simuladas
Si actualmente un componente obtiene productos, usuarios, órdenes, precios, categorías, imágenes, configuraciones u otra información desde el backend, debe continuar haciéndolo desde el mismo lugar.
No conviertas componentes funcionales en simples demos visuales.
NO REESCRIBIR LÓGICA INNECESARIAMENTE
No hagas refactors grandes de lógica simplemente porque considerás que otra arquitectura sería más elegante.
Prioridad:
Mantener funcionalidad.
Mejorar UX.
Mejorar UI.
Mejorar código visual cuando sea seguro.
NO:
Reescribir arquitectura.
Cambiar contratos.
Adaptar después la funcionalidad.
El proyecto ya funciona. Tu trabajo principal es REDISEÑARLO, no reconstruirlo.
COMPONENTES
Podés:
crear nuevos componentes visuales
separar componentes demasiado grandes
crear componentes reutilizables
crear layouts
crear wrappers
crear sistemas de diseño
crear componentes UI
reorganizar JSX
reemplazar CSS
reemplazar Tailwind classes
mejorar responsive
mejorar accesibilidad
agregar animaciones sutiles
Pero al hacerlo, preservá la lógica funcional interna.
Una buena estrategia es separar:
LÓGICA EXISTENTE
↓
NUEVA CAPA VISUAL
↓
MISMA FUNCIONALIDAD
DISEÑO
Quiero una estética moderna y profesional.
Busco:
diseño limpio
aspecto premium
buena jerarquía
excelente legibilidad
uso inteligente del espacio
responsive real
navegación clara
componentes visualmente consistentes
detalles modernos
microinteracciones
animaciones suaves
estados hover/focus/active
feedback visual cuando el usuario realiza una acción
sensación de aplicación terminada
Evitá:
apariencia de template genérico
UI extremadamente plana sin personalidad
cantidades excesivas de gradientes
exceso de sombras
exceso de glassmorphism
animaciones innecesarias
colores sin coherencia
tamaños de fuente inconsistentes
enormes cantidades de espacios vacíos sin propósito
cards para absolutamente todo
estilos distintos en cada pantalla
Quiero una IDENTIDAD VISUAL consistente.
SISTEMA DE DISEÑO
Antes de comenzar a modificar todas las páginas, definí internamente un sistema visual coherente.
Debe existir consistencia en:
colores
background
superficies
bordes
radius
sombras
tipografía
tamaños
botones
inputs
selects
textarea
cards
tablas
badges
mensajes
modales
dropdowns
navegación
No quiero que cada página parezca diseñada por una persona distinta.
RESPONSIVE
La aplicación debe funcionar correctamente en:
desktop grande
notebook
tablet
mobile
No hagas solamente que los elementos "entren".
Adaptá realmente la UX.
Por ejemplo:
Una tabla compleja puede necesitar otro tratamiento en mobile.
La navegación puede convertirse en menú mobile.
Los controles pueden reorganizarse.
Los formularios deben ser cómodos de usar desde celular.
Los botones importantes deben seguir siendo visibles.
Los textos no deben desbordarse.
Las imágenes deben mantener proporciones correctas.
FORMULARIOS
Prestá especial atención a los formularios.
Podés mejorar muchísimo:
organización
labels
agrupación
ayudas
errores
validaciones visuales
botones
estados disabled
estados loading
selects
inputs
textareas
PERO:
No cambies arbitrariamente:
name
value
id
onChange
onSubmit
action
payload
estructura de datos enviada
LISTADOS Y TABLAS
Mejorá visualmente:
filtros
búsqueda
sorting si ya existe
encabezados
acciones
paginación
responsive
estados sin resultados
loading
selección
No cambies la lógica de datos que alimenta estos componentes.
NAVEGACIÓN
Podés modernizar por completo:
navbar
sidebar
breadcrumbs
menús
tabs
botones de navegación
Pero preservá las rutas existentes.
No modifiques URLs simplemente por estética.
ICONOS
Podés utilizar una librería de iconos si el proyecto ya cuenta con una o si agregar una dependencia pequeña y estable es razonable.
No reemplaces texto importante exclusivamente por iconos ambiguos.
Los iconos deben mejorar comprensión, no empeorarla.
DEPENDENCIAS
Antes de agregar una dependencia nueva, revisá package.json.
Preferí utilizar lo que ya existe.
No agregues grandes frameworks UI innecesariamente.
No reemplaces el stack actual.
No actualices versiones de dependencias existentes salvo que sea estrictamente necesario.
No cambies:
framework
versión de Next/React
ORM
sistema de autenticación
cliente HTTP
arquitectura del proyecto
solamente para realizar el rediseño.
ARCHIVOS SENSIBLES
No modifiques archivos relacionados con infraestructura o backend salvo absoluta necesidad.
Prestá especial atención a:
.env
.env.*
prisma/*
schema.prisma
migrations
configuraciones de DB
autenticación
API backend
middleware
configuración de deployment
package-lock / lockfiles innecesariamente
Si alguno aparece dentro del ZIP, asumí inicialmente que NO debe modificarse.
MÉTODO DE TRABAJO
Antes de modificar código:
Analizá la estructura completa del proyecto.
Identificá framework y tecnologías.
Identificá componentes principales.
Identificá rutas.
Identificá dónde está la lógica relacionada con backend.
Identificá IDs, names, handlers y atributos funcionales importantes.
Identificá componentes reutilizables.
Identificá estilos globales existentes.
Luego definí una estrategia visual coherente.
Después comenzá el rediseño.
No empieces reemplazando archivos aleatoriamente.
MUY IMPORTANTE
Cuando encuentres código que no entiendas completamente:
NO lo elimines.
NO supongas que no sirve.
NO lo reemplaces solamente porque parece extraño.
Preservalo y construí el nuevo diseño alrededor de él.
Asumí que puede existir lógica dependiente de ese código fuera de los archivos que recibiste en este ZIP.
Este punto es especialmente importante porque NO tenés necesariamente acceso al backend completo.
CUANDO FALTE INFORMACIÓN
Si encontrás una integración cuyo funcionamiento depende de código que no está incluido:
Preservá la interfaz actual de esa integración.
Por ejemplo, preservá:
argumentos
props
nombres
IDs
handlers
URLs
callbacks
estructuras de objetos
tipos
No inventes cómo funciona el backend ausente.
CRITERIO DE ÉXITO
Al terminar, debería poder reemplazar el frontend actual por tu versión y obtener:
MISMO BACKEND
+
MISMAS FUNCIONES
+
MISMOS DATOS
+
MISMAS OPERACIONES
+
MISMAS RUTAS
+
NUEVO FRONTEND
Visualmente debería sentirse como un producto completamente renovado.
Funcionalmente debería seguir siendo la misma aplicación.
PRIORIDAD ABSOLUTA
Si en algún momento existe un conflicto entre:
"esto quedaría visualmente mejor"
y
"esto podría romper funcionalidad"
elegí SIEMPRE preservar funcionalidad.
Diseñá alrededor de la lógica existente.
No cambies la lógica existente para acomodarla al diseño.
AL FINALIZAR
Antes de considerar terminado el trabajo:
revisá imports
revisá errores TypeScript
revisá JSX
revisá rutas
revisá handlers
revisá fetch/API calls
revisá formularios
revisá IDs
revisá names
revisá props
revisá responsive
revisá estados de loading
revisá estados de error
revisá estados vacíos
Si el proyecto posee scripts para ello, ejecutá:
lint
typecheck
build
Corregí cualquier problema introducido por el rediseño.
Finalmente, dame un resumen de:
Qué archivos modificaste.
Qué componentes 
