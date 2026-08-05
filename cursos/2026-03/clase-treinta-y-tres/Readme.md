# Clase 33 - 1 de Julio del 2026

# Repaso

* RAG
  * Busqueda semantica
  * Particionamiento / Chunking
    * Para documentos largos se los dividia en chunks
  * Calculo del embedings
    * Usando un modelo de HF como all-MiniLM-L6-v2
      * Descargamos el modelo en su totalidad
    * Por medio de API keys
      * Usamos el modelo e embedings de google que tenia una api key utilizable gratis
  * Bases de Datos de Embeddigs
    * Faiss
    * ChromaDB

---
# Novedades

* Los DBMS tracicionales van incorporando la capacidad de almacenar embeddings
  * Por SQL Lite
    * https://github.com/sqliteai/sqlite-vector

---

# Colab de la Clase

* https://colab.research.google.com/drive/1c3yi2ZO4dozQA4GAecr-ijnOY72G20iT?usp=sharing

---

# Integrar RAG con LLM

* Pre prosesamiento
  * Generamos nuestra base de datos de conocimineto
  * Particionamos los documentos en chunks
  * Calculamos el Embbeding para cada documento
  * Guardamos los embeddings en nuesta DB vectorial
* Usar el RAG
  * Pregunta/Prompt del Usuario
  * Generar el embeding del prompt
  * Buscamos los documentos relacionados y armarmos un contexto
  * Enviar al LLM contexto generado + prompt original
  * EL LLM genera la respuesta final

* Sacar una Api Key de Grok
  * https://console.groq.com/keys

* Cargamos la lista de documentos

```
documentos = [
    "Fase de grupos | Grupo: A | Jornada: 1 | Fecha: 2026-06-11 | Partido: México vs Sudáfrica | Resultado: México 2-0 Sudáfrica | Sede: Estadio Azteca, Ciudad de México | Estado: Finalizado | Goleadores: Julián Quiñones 9', Raúl Jiménez 67' (México) | Árbitro: Wilton Sampaio (Brasil)",
    "Fase de grupos | Grupo: A | Jornada: 1 | Fecha: 2026-06-11 | Partido: Corea del Sur vs Chequia | Resultado: Corea del Sur 2-1 Chequia | Sede: Estadio Guadalajara (Akron), Guadalajara | Estado: Finalizado | Goleadores: Ladislav Krejčí (Chequia); Hwang Hee-chan y Oh Hyeon-gyu (Corea del Sur) | Árbitro: No disponible",
    "Fase de grupos | Grupo: B | Jornada: 1 | Fecha: 2026-06-12 | Partido: Canadá vs Bosnia y Herzegovina | Resultado: Canadá 1-1 Bosnia y Herzegovina | Sede: BMO Field, Toronto | Estado: Finalizado | Goleadores: Jovo Lukić (Bosnia y Herzegovina); Cyle Larin, ingresado desde el banco (Canadá) | Árbitro: No disponible",
    "Fase de grupos | Grupo: D | Jornada: 1 | Fecha: 2026-06-12 | Partido: Estados Unidos vs Paraguay | Resultado: Estados Unidos 4-1 Paraguay | Sede: SoFi Stadium, Los Ángeles | Estado: Finalizado | Goleadores: autogol de Damián Bobadilla, Folarin Balogun (doblete) y Giovanni Reyna (Estados Unidos); Maurício (Paraguay) | Árbitro: No disponible",
    "Fase de grupos | Grupo: B | Jornada: 1 | Fecha: 2026-06-13 | Partido: Qatar vs Suiza | Resultado: Qatar 1-1 Suiza | Sede: Levi's Stadium (Santa Clara), San Francisco | Estado: Finalizado | Goleadores: Breel Embolo de penal 17' (Suiza); autogol de Miro Muheim 94' a favor de Qatar (Suiza) | Árbitro: No disponible",
    "Fase de grupos | Grupo: C | Jornada: 1 | Fecha: 2026-06-13 | Partido: Brasil vs Marruecos | Resultado: Brasil 1-1 Marruecos | Sede: MetLife Stadium (East Rutherford), Nueva York | Estado: Finalizado | Goleadores: Ismael Saibari (Marruecos); Vinícius Júnior 32' (Brasil) | Árbitro: No disponible",
    "Fase de grupos | Grupo: C | Jornada: 1 | Fecha: 2026-06-13 | Partido: Haití vs Escocia | Resultado: Haití 0-1 Escocia | Sede: Gillette Stadium (Foxborough), Boston | Estado: Finalizado | Goleadores: John McGinn 28' (Escocia) | Árbitro: No disponible",
    "Fase de grupos | Grupo: D | Jornada: 1 | Fecha: 2026-06-13 | Partido: Australia vs Turquía | Resultado: Australia 2-0 Turquía | Sede: BC Place, Vancouver | Estado: Finalizado | Goleadores: Nestory Irankunda y Connor Metcalfe (Australia) | Árbitro: No disponible",
    "Fase de grupos | Grupo: E | Jornada: 1 | Fecha: 2026-06-14 | Partido: Alemania vs Curazao | Resultado: Alemania 7-1 Curazao | Sede: NRG Stadium, Houston | Estado: Finalizado | Goleadores: Nathaniel Brown (asistencia de Deniz Undav) entre los goleadores de Alemania; resto de los siete goles no especificado por las fuentes consultadas | Árbitro: No disponible",
    "Fase de grupos | Grupo: F | Jornada: 1 | Fecha: 2026-06-14 | Partido: Países Bajos vs Japón | Resultado: Países Bajos 2-2 Japón | Sede: AT&T Stadium (Arlington), Dallas | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: E | Jornada: 1 | Fecha: 2026-06-14 | Partido: Costa de Marfil vs Ecuador | Resultado: Costa de Marfil 1-0 Ecuador | Sede: Lincoln Financial Field, Philadelphia | Estado: Finalizado | Goleadores: Amad Diallo (Costa de Marfil) | Árbitro: No disponible",
    "Fase de grupos | Grupo: F | Jornada: 1 | Fecha: 2026-06-14 | Partido: Suecia vs Túnez | Resultado: Suecia 5-1 Túnez | Sede: Estadio BBVA, Monterrey | Estado: Finalizado | Goleadores: Alexander Isak, Viktor Gyökeres, Yasin Ayari y Mattias Svanberg (Suecia; uno de ellos anotó doblete, el quinto gol no fue especificado por las fuentes) | Árbitro: No disponible",
    "Fase de grupos | Grupo: H | Jornada: 1 | Fecha: 2026-06-15 | Partido: España vs Cabo Verde | Resultado: España 0-0 Cabo Verde | Sede: Mercedes-Benz Stadium, Atlanta | Estado: Finalizado | Goleadores: No disponible (partido sin goles) | Árbitro: Adham Makhadmeh (Jordania)",
    "Fase de grupos | Grupo: G | Jornada: 1 | Fecha: 2026-06-15 | Partido: Bélgica vs Egipto | Resultado: Bélgica 1-1 Egipto | Sede: Lumen Field, Seattle | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: H | Jornada: 1 | Fecha: 2026-06-15 | Partido: Arabia Saudita vs Uruguay | Resultado: Arabia Saudita 1-1 Uruguay | Sede: Hard Rock Stadium, Miami | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: G | Jornada: 1 | Fecha: 2026-06-15 | Partido: Irán vs Nueva Zelanda | Resultado: Irán 2-2 Nueva Zelanda | Sede: SoFi Stadium, Los Ángeles | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: I | Jornada: 1 | Fecha: 2026-06-16 | Partido: Francia vs Senegal | Resultado: Francia 3-1 Senegal | Sede: MetLife Stadium (East Rutherford), Nueva York | Estado: Finalizado | Goleadores: Kylian Mbappé (doblete, Francia); tercer gol francés no especificado por las fuentes | Árbitro: No disponible",
    "Fase de grupos | Grupo: I | Jornada: 1 | Fecha: 2026-06-16 | Partido: Irak vs Noruega | Resultado: Irak 1-4 Noruega | Sede: Gillette Stadium (Foxborough), Boston | Estado: Finalizado | Goleadores: Erling Haaland (doblete, Noruega); resto de los goles no especificado | Árbitro: No disponible",
    "Fase de grupos | Grupo: J | Jornada: 1 | Fecha: 2026-06-16 | Partido: Argentina vs Argelia | Resultado: Argentina 3-0 Argelia | Sede: Arrowhead Stadium, Kansas City | Estado: Finalizado | Goleadores: Lionel Messi (triplete, primer hat-trick de Messi en Mundiales) | Árbitro: No disponible",
    "Fase de grupos | Grupo: J | Jornada: 1 | Fecha: 2026-06-16 | Partido: Austria vs Jordania | Resultado: Austria 3-1 Jordania | Sede: Levi's Stadium (Santa Clara), San Francisco | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: K | Jornada: 1 | Fecha: 2026-06-17 | Partido: Portugal vs RD Congo | Resultado: Portugal 1-1 RD Congo | Sede: NRG Stadium, Houston | Estado: Finalizado | Goleadores: Yoane Wissa (RD Congo); gol de Portugal no especificado por las fuentes | Árbitro: No disponible",
    "Fase de grupos | Grupo: L | Jornada: 1 | Fecha: 2026-06-17 | Partido: Inglaterra vs Croacia | Resultado: Inglaterra 4-2 Croacia | Sede: AT&T Stadium (Arlington), Dallas | Estado: Finalizado | Goleadores: Harry Kane (doblete), Jude Bellingham y Marcus Rashford (Inglaterra); goles de Croacia no especificados | Árbitro: No disponible",
    "Fase de grupos | Grupo: L | Jornada: 1 | Fecha: 2026-06-17 | Partido: Ghana vs Panamá | Resultado: Ghana 1-0 Panamá | Sede: BMO Field, Toronto | Estado: Finalizado | Goleadores: Caleb Yirenkyi 95' (Ghana) | Árbitro: No disponible",
    "Fase de grupos | Grupo: K | Jornada: 1 | Fecha: 2026-06-17 | Partido: Uzbekistán vs Colombia | Resultado: Uzbekistán 1-3 Colombia | Sede: Estadio Azteca, Ciudad de México | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: A | Jornada: 2 | Fecha: 2026-06-18 | Partido: Chequia vs Sudáfrica | Resultado: Chequia 1-1 Sudáfrica | Sede: Mercedes-Benz Stadium, Atlanta | Estado: Finalizado | Goleadores: Michal Sadílek (Chequia); Teboho Mokoena de penal 83' (Sudáfrica) | Árbitro: Tori Penso, asistida por Brooke Mayo y Kathryn Nesbitt (primer trío arbitral totalmente femenino en un Mundial masculino, Estados Unidos)",
    "Fase de grupos | Grupo: B | Jornada: 2 | Fecha: 2026-06-18 | Partido: Suiza vs Bosnia y Herzegovina | Resultado: Suiza 4-1 Bosnia y Herzegovina | Sede: SoFi Stadium, Los Ángeles | Estado: Finalizado | Goleadores: No disponible (el primer gol del partido llegó recién al minuto 74) | Árbitro: No disponible",
    "Fase de grupos | Grupo: B | Jornada: 2 | Fecha: 2026-06-18 | Partido: Canadá vs Qatar | Resultado: Canadá 6-0 Qatar | Sede: BC Place, Vancouver | Estado: Finalizado | Goleadores: Jonathan David (triplete, Canadá); resto de los goles no especificado | Árbitro: No disponible",
    "Fase de grupos | Grupo: A | Jornada: 2 | Fecha: 2026-06-18 | Partido: México vs Corea del Sur | Resultado: México 1-0 Corea del Sur | Sede: Estadio Guadalajara (Akron), Guadalajara | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: D | Jornada: 2 | Fecha: 2026-06-19 | Partido: Estados Unidos vs Australia | Resultado: Estados Unidos 2-0 Australia | Sede: Lumen Field, Seattle | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: C | Jornada: 2 | Fecha: 2026-06-19 | Partido: Escocia vs Marruecos | Resultado: Escocia 0-1 Marruecos | Sede: Gillette Stadium (Foxborough), Boston | Estado: Finalizado | Goleadores: Ismael Saibari 2' (gol más rápido del torneo hasta ese momento, Marruecos) | Árbitro: No disponible",
    "Fase de grupos | Grupo: C | Jornada: 2 | Fecha: 2026-06-19 | Partido: Brasil vs Haití | Resultado: Brasil 3-0 Haití | Sede: Lincoln Financial Field, Philadelphia | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: D | Jornada: 2 | Fecha: 2026-06-19 | Partido: Turquía vs Paraguay | Resultado: Turquía 0-1 Paraguay | Sede: Levi's Stadium (Santa Clara), San Francisco | Estado: Finalizado | Goleadores: Matías Galarza 2' (gol más rápido del torneo hasta ese momento, Paraguay) | Árbitro: No disponible",
    "Fase de grupos | Grupo: F | Jornada: 2 | Fecha: 2026-06-20 | Partido: Países Bajos vs Suecia | Resultado: Países Bajos 5-1 Suecia | Sede: NRG Stadium, Houston | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: E | Jornada: 2 | Fecha: 2026-06-20 | Partido: Alemania vs Costa de Marfil | Resultado: Alemania 2-1 Costa de Marfil | Sede: BMO Field, Toronto | Estado: Finalizado | Goleadores: Deniz Undav, ingresado desde el banco, doblete (empate y gol de la victoria en el 94', Alemania); gol de Costa de Marfil no especificado | Árbitro: No disponible",
    "Fase de grupos | Grupo: E | Jornada: 2 | Fecha: 2026-06-20 | Partido: Ecuador vs Curazao | Resultado: Ecuador 0-0 Curazao | Sede: Arrowhead Stadium, Kansas City | Estado: Finalizado | Goleadores: No disponible (partido sin goles) | Árbitro: No disponible",
    "Fase de grupos | Grupo: F | Jornada: 2 | Fecha: 2026-06-20 | Partido: Túnez vs Japón | Resultado: Túnez 0-4 Japón | Sede: Estadio BBVA, Monterrey | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: H | Jornada: 2 | Fecha: 2026-06-21 | Partido: España vs Arabia Saudita | Resultado: España 4-0 Arabia Saudita | Sede: Mercedes-Benz Stadium, Atlanta | Estado: Finalizado | Goleadores: Mikel Oyarzabal (doblete) y Lamine Yamal, su primer gol en Mundiales (España); cuarto gol no especificado | Árbitro: No disponible",
    "Fase de grupos | Grupo: G | Jornada: 2 | Fecha: 2026-06-21 | Partido: Bélgica vs Irán | Resultado: Bélgica 0-0 Irán | Sede: SoFi Stadium, Los Ángeles | Estado: Finalizado | Goleadores: No disponible (partido sin goles) | Árbitro: No disponible",
    "Fase de grupos | Grupo: H | Jornada: 2 | Fecha: 2026-06-21 | Partido: Uruguay vs Cabo Verde | Resultado: Uruguay 2-2 Cabo Verde | Sede: Hard Rock Stadium, Miami | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: G | Jornada: 2 | Fecha: 2026-06-21 | Partido: Nueva Zelanda vs Egipto | Resultado: Nueva Zelanda 1-3 Egipto | Sede: BC Place, Vancouver | Estado: Finalizado | Goleadores: Mohamed Salah, con gol y asistencia (Egipto); resto no especificado | Árbitro: No disponible",
    "Fase de grupos | Grupo: J | Jornada: 2 | Fecha: 2026-06-22 | Partido: Argentina vs Austria | Resultado: Argentina 2-0 Austria | Sede: AT&T Stadium (Arlington), Dallas | Estado: Finalizado | Goleadores: Lionel Messi (doblete; sus goles 17º y 18º en Mundiales, con los que se convirtió en el máximo goleador histórico de la Copa del Mundo) | Árbitro: No disponible",
    "Fase de grupos | Grupo: I | Jornada: 2 | Fecha: 2026-06-22 | Partido: Francia vs Irak | Resultado: Francia 3-0 Irak | Sede: Lincoln Financial Field, Philadelphia | Estado: Finalizado | Goleadores: Kylian Mbappé (doblete) y Ousmane Dembélé (Francia) | Árbitro: No disponible",
    "Fase de grupos | Grupo: I | Jornada: 2 | Fecha: 2026-06-22 | Partido: Noruega vs Senegal | Resultado: Noruega 3-2 Senegal | Sede: MetLife Stadium (East Rutherford), Nueva York | Estado: Finalizado | Goleadores: Marcus Holmgren Pedersen y Erling Haaland (doblete) por Noruega; Ismaila Sarr (doblete) por Senegal | Árbitro: No disponible",
    "Fase de grupos | Grupo: J | Jornada: 2 | Fecha: 2026-06-22 | Partido: Jordania vs Argelia | Resultado: Jordania 1-2 Argelia | Sede: Levi's Stadium (Santa Clara), San Francisco | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: K | Jornada: 2 | Fecha: 2026-06-23 | Partido: Portugal vs Uzbekistán | Resultado: Portugal 5-0 Uzbekistán | Sede: NRG Stadium, Houston | Estado: Finalizado | Goleadores: Cristiano Ronaldo (doblete, incluye su primer gol del torneo asistido por João Cancelo, Portugal); resto de los goles no especificado | Árbitro: No disponible",
    "Fase de grupos | Grupo: L | Jornada: 2 | Fecha: 2026-06-23 | Partido: Inglaterra vs Ghana | Resultado: Inglaterra 0-0 Ghana | Sede: Gillette Stadium (Foxborough), Boston | Estado: Finalizado | Goleadores: No disponible (partido sin goles) | Árbitro: No disponible",
    "Fase de grupos | Grupo: L | Jornada: 2 | Fecha: 2026-06-23 | Partido: Panamá vs Croacia | Resultado: Panamá 0-1 Croacia | Sede: BMO Field, Toronto | Estado: Finalizado | Goleadores: Ante Budimir (Croacia) | Árbitro: No disponible",
    "Fase de grupos | Grupo: K | Jornada: 2 | Fecha: 2026-06-23 | Partido: Colombia vs RD Congo | Resultado: Colombia 1-0 RD Congo | Sede: Estadio Guadalajara (Akron), Guadalajara | Estado: Finalizado | Goleadores: Daniel Muñoz (Colombia) | Árbitro: No disponible",
    "Fase de grupos | Grupo: B | Jornada: 3 | Fecha: 2026-06-24 | Partido: Suiza vs Canadá | Resultado: Suiza 2-1 Canadá | Sede: BC Place, Vancouver | Estado: Finalizado | Goleadores: Rubén Vargas y Johan Manzambi (Suiza); gol de Canadá no especificado | Árbitro: No disponible",
    "Fase de grupos | Grupo: B | Jornada: 3 | Fecha: 2026-06-24 | Partido: Bosnia y Herzegovina vs Qatar | Resultado: Bosnia y Herzegovina 3-1 Qatar | Sede: Lumen Field, Seattle | Estado: Finalizado | Goleadores: Kerim Alajbegović, el más joven de Bosnia y Herzegovina en marcar en el torneo, entre los goleadores; resto no especificado | Árbitro: No disponible",
    "Fase de grupos | Grupo: C | Jornada: 3 | Fecha: 2026-06-24 | Partido: Escocia vs Brasil | Resultado: Escocia 0-3 Brasil | Sede: Hard Rock Stadium, Miami | Estado: Finalizado | Goleadores: Vinícius Júnior (doblete, Brasil); tercer gol no especificado | Árbitro: No disponible",
    "Fase de grupos | Grupo: C | Jornada: 3 | Fecha: 2026-06-24 | Partido: Marruecos vs Haití | Resultado: Marruecos 4-2 Haití | Sede: Mercedes-Benz Stadium, Atlanta | Estado: Finalizado | Goleadores: autogol de Yassine Bounou 10' a favor de Haití; Wilson Isidor entre los goleadores de Haití; goles de Marruecos no especificados en detalle | Árbitro: No disponible",
    "Fase de grupos | Grupo: A | Jornada: 3 | Fecha: 2026-06-24 | Partido: Chequia vs México | Resultado: Chequia 0-3 México | Sede: Estadio Azteca, Ciudad de México | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: A | Jornada: 3 | Fecha: 2026-06-24 | Partido: Sudáfrica vs Corea del Sur | Resultado: Sudáfrica 1-0 Corea del Sur | Sede: Estadio BBVA, Monterrey | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: E | Jornada: 3 | Fecha: 2026-06-25 | Partido: Curazao vs Costa de Marfil | Resultado: Curazao 0-2 Costa de Marfil | Sede: Lincoln Financial Field, Philadelphia | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: E | Jornada: 3 | Fecha: 2026-06-25 | Partido: Ecuador vs Alemania | Resultado: Ecuador 2-1 Alemania | Sede: MetLife Stadium (East Rutherford), Nueva York | Estado: Finalizado | Goleadores: Nilson Angulo y Gonzalo Plata (Ecuador); gol de Alemania no especificado | Árbitro: No disponible",
    "Fase de grupos | Grupo: F | Jornada: 3 | Fecha: 2026-06-25 | Partido: Japón vs Suecia | Resultado: Japón 1-1 Suecia | Sede: AT&T Stadium (Arlington), Dallas | Estado: Finalizado | Goleadores: Anthony Elanga (Suecia); gol de Japón no especificado | Árbitro: No disponible",
    "Fase de grupos | Grupo: F | Jornada: 3 | Fecha: 2026-06-25 | Partido: Túnez vs Países Bajos | Resultado: Túnez 1-3 Países Bajos | Sede: Arrowhead Stadium, Kansas City | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: D | Jornada: 3 | Fecha: 2026-06-25 | Partido: Turquía vs Estados Unidos | Resultado: Turquía 3-2 Estados Unidos | Sede: SoFi Stadium, Los Ángeles | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: D | Jornada: 3 | Fecha: 2026-06-25 | Partido: Paraguay vs Australia | Resultado: Paraguay 0-0 Australia | Sede: Levi's Stadium (Santa Clara), San Francisco | Estado: Finalizado | Goleadores: No disponible (partido sin goles) | Árbitro: No disponible",
    "Fase de grupos | Grupo: I | Jornada: 3 | Fecha: 2026-06-26 | Partido: Noruega vs Francia | Resultado: Noruega 1-4 Francia | Sede: Gillette Stadium (Foxborough), Boston | Estado: Finalizado | Goleadores: Ousmane Dembélé (triplete, Francia); cuarto gol francés y gol de Noruega no especificados | Árbitro: No disponible",
    "Fase de grupos | Grupo: I | Jornada: 3 | Fecha: 2026-06-26 | Partido: Senegal vs Irak | Resultado: Senegal 5-0 Irak | Sede: BMO Field, Toronto | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: H | Jornada: 3 | Fecha: 2026-06-26 | Partido: Cabo Verde vs Arabia Saudita | Resultado: Cabo Verde 0-0 Arabia Saudita | Sede: NRG Stadium, Houston | Estado: Finalizado | Goleadores: No disponible (partido sin goles) | Árbitro: No disponible",
    "Fase de grupos | Grupo: H | Jornada: 3 | Fecha: 2026-06-26 | Partido: Uruguay vs España | Resultado: Uruguay 0-1 España | Sede: Estadio Guadalajara (Akron), Guadalajara | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: G | Jornada: 3 | Fecha: 2026-06-26 | Partido: Egipto vs Irán | Resultado: Egipto 1-1 Irán | Sede: Lumen Field, Seattle | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: G | Jornada: 3 | Fecha: 2026-06-26 | Partido: Nueva Zelanda vs Bélgica | Resultado: Nueva Zelanda 1-5 Bélgica | Sede: BC Place, Vancouver | Estado: Finalizado | Goleadores: No disponible | Árbitro: Adham Makhadmeh (Jordania)",
    "Fase de grupos | Grupo: L | Jornada: 3 | Fecha: 2026-06-27 | Partido: Panamá vs Inglaterra | Resultado: Panamá 0-2 Inglaterra | Sede: MetLife Stadium (East Rutherford), Nueva York | Estado: Finalizado | Goleadores: Jude Bellingham y Harry Kane, con asistencia de Bellingham en el segundo (Inglaterra) | Árbitro: No disponible",
    "Fase de grupos | Grupo: L | Jornada: 3 | Fecha: 2026-06-27 | Partido: Croacia vs Ghana | Resultado: Croacia 2-1 Ghana | Sede: Lincoln Financial Field, Philadelphia | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: K | Jornada: 3 | Fecha: 2026-06-27 | Partido: Colombia vs Portugal | Resultado: Colombia 0-0 Portugal | Sede: Hard Rock Stadium, Miami | Estado: Finalizado | Goleadores: No disponible (partido sin goles) | Árbitro: No disponible",
    "Fase de grupos | Grupo: K | Jornada: 3 | Fecha: 2026-06-27 | Partido: RD Congo vs Uzbekistán | Resultado: RD Congo 3-1 Uzbekistán | Sede: Mercedes-Benz Stadium, Atlanta | Estado: Finalizado | Goleadores: No disponible | Árbitro: No disponible",
    "Fase de grupos | Grupo: J | Jornada: 3 | Fecha: 2026-06-27 | Partido: Argelia vs Austria | Resultado: Argelia 3-3 Austria | Sede: Arrowhead Stadium, Kansas City | Estado: Finalizado | Goleadores: No disponible (ambos equipos marcaron en el tiempo añadido) | Árbitro: No disponible",
    "Fase de grupos | Grupo: J | Jornada: 3 | Fecha: 2026-06-27 | Partido: Jordania vs Argentina | Resultado: Jordania 1-3 Argentina | Sede: AT&T Stadium (Arlington), Dallas | Estado: Finalizado | Goleadores: Lionel Messi, ingresado desde el banco, entre los goleadores (Argentina); resto no especificado | Árbitro: No disponible",
    "Dieciseisavos de final (Ronda de 32) | Fecha: 2026-06-28 | Partido: Sudáfrica vs Canadá | Resultado: Sudáfrica 0-1 Canadá | Sede: Los Ángeles | Estado: Finalizado | Clasificó: Canadá | Goleadores: Stephen Eustáquio 92' (Canadá, gol único del partido; primera victoria de Canadá en fase eliminatoria de un Mundial) | Árbitro: No disponible",
    "Dieciseisavos de final (Ronda de 32) | Fecha: 2026-06-29 | Partido: Brasil vs Japón | Resultado: Brasil 2-1 Japón | Sede: Houston | Estado: Finalizado | Clasificó: Brasil | Goleadores: Kaishu Sano (Japón); Casemiro y Gabriel Martinelli (Brasil) | Árbitro: No disponible",
    "Dieciseisavos de final (Ronda de 32) | Fecha: 2026-06-29 | Partido: Alemania vs Paraguay | Resultado: Alemania 1-1 (3-4 penales) Paraguay | Sede: Boston | Estado: Finalizado | Clasificó: Paraguay | Goleadores: Julio Enciso (Paraguay); Kai Havertz (Alemania). Penales: Orlando Gill (ARQ Paraguay) atajó a Havertz y Woltemade; José Canale definió la serie | Árbitro: No disponible",
    "Dieciseisavos de final (Ronda de 32) | Fecha: 2026-06-29 | Partido: Países Bajos vs Marruecos | Resultado: Países Bajos 1-1 (2-3 penales) Marruecos | Sede: desconocida | Estado: Finalizado | Clasificó: Marruecos | Goleadores: Cody Gakpo (Países Bajos); Issa Diop (Marruecos). Penales: Ismael Saibari anotó el definitivo; Yassine Bounou (ARQ Marruecos) atajó un remate | Árbitro: No disponible",
    "Dieciseisavos de final (Ronda de 32) | Fecha: 2026-06-30 | Partido: Costa de Marfil vs Noruega | Resultado: Costa de Marfil 1-2 Noruega | Sede: desconocida | Estado: Finalizado | Clasificó: Noruega | Goleadores: Erling Haaland, gol decisivo de la victoria (Noruega); resto de los goles no especificado | Árbitro: No disponible",
    "Dieciseisavos de final (Ronda de 32) | Fecha: 2026-06-30 | Partido: Francia vs Suecia | Resultado: Francia 3-0 Suecia | Sede: desconocida | Estado: Finalizado | Clasificó: Francia | Goleadores: Kylian Mbappé (doblete, su gol 6º del torneo) y Bradley Barcola, ambos asistidos por Michael Olise (Francia) | Árbitro: No disponible",
    "Dieciseisavos de final (Ronda de 32) | Fecha: 2026-06-30 | Partido: México vs Ecuador | Resultado: México 2-0 Ecuador | Sede: Ciudad de México | Estado: Finalizado | Clasificó: México | Goleadores: Julián Quiñones y Raúl Jiménez, ambos en el primer tiempo (México) | Árbitro: No disponible",
    "Dieciseisavos de final (Ronda de 32) | Fecha: 2026-07-01 | Partido: Inglaterra vs RD Congo | Resultado: Inglaterra 2-1 RD Congo | Sede: desconocida | Estado: Finalizado | Clasificó: Inglaterra | Goleadores: Harry Kane x2 (Inglaterra); Brian Cipenga (RD Congo) | Árbitro: Adham Makhadmeh (Jordania)",
    "Dieciseisavos de final (Ronda de 32) | Fecha: 2026-07-01 | Partido: Bélgica vs Senegal | Resultado: Pendiente | Sede: Lumen Field, Seattle | Estado: En juego | Clasificó: - | Goleadores: No disponible | Árbitro: No disponible",
    "Dieciseisavos de final (Ronda de 32) | Fecha: 2026-07-01 | Partido: Estados Unidos vs Bosnia y Herzegovina | Resultado: Pendiente | Sede: Levi's Stadium, San Francisco (Santa Clara) | Estado: Programado | Clasificó: - | Goleadores: No disponible | Árbitro: No disponible",
    "Dieciseisavos de final (Ronda de 32) | Fecha: 2026-07-02 | Partido: España vs Austria | Resultado: Pendiente | Sede: desconocida | Estado: Programado | Clasificó: - | Goleadores: No disponible | Árbitro: No disponible",
    "Dieciseisavos de final (Ronda de 32) | Fecha: 2026-07-02 | Partido: Portugal vs Croacia | Resultado: Pendiente | Sede: BMO Field, Toronto | Estado: Programado | Clasificó: - | Goleadores: No disponible | Árbitro: No disponible",
    "Dieciseisavos de final (Ronda de 32) | Fecha: 2026-07-02 | Partido: Suiza vs Argelia | Resultado: Pendiente | Sede: desconocida | Estado: Programado | Clasificó: - | Goleadores: No disponible | Árbitro: No disponible",
    "Dieciseisavos de final (Ronda de 32) | Fecha: 2026-07-03 | Partido: Australia vs Egipto | Resultado: Pendiente | Sede: desconocida | Estado: Programado | Clasificó: - | Goleadores: No disponible | Árbitro: No disponible",
    "Dieciseisavos de final (Ronda de 32) | Fecha: 2026-07-03 | Partido: Argentina vs Cabo Verde | Resultado: Pendiente | Sede: desconocida | Estado: Programado | Clasificó: - | Goleadores: No disponible | Árbitro: No disponible",
    "Dieciseisavos de final (Ronda de 32) | Fecha: 2026-07-03 | Partido: Colombia vs Ghana | Resultado: Pendiente | Sede: desconocida | Estado: Programado | Clasificó: - | Goleadores: No disponible | Árbitro: No disponible",
    "Octavos de final | Fecha: 2026-07-04 | Partido: Canadá vs Marruecos | Sede: Filadelfia u otra sede por confirmar | Estado: Programado | Goleadores: No disponible | Árbitro: No disponible",
    "Octavos de final | Fecha: 2026-07-04 | Partido: Paraguay vs Francia | Sede: Filadelfia | Estado: Programado | Goleadores: No disponible | Árbitro: No disponible",
    "Octavos de final | Fecha: 2026-07-05 | Partido: Brasil vs Noruega | Sede: desconocida | Estado: Programado | Goleadores: No disponible | Árbitro: No disponible",
    "Octavos de final | Fecha: 2026-07-05 | Partido: México vs Inglaterra | Sede: Estadio Ciudad de México, Ciudad de México | Estado: Programado | Goleadores: No disponible | Árbitro: No disponible",
    "Octavos de final | Fecha: 2026-07-06 | Partido: Ganador Portugal/Croacia vs Ganador España/Austria | Sede: desconocida | Estado: Programado | Goleadores: No disponible | Árbitro: No disponible",
    "Octavos de final | Fecha: 2026-07-06 | Partido: Ganador Estados Unidos/Bosnia y Herzegovina vs Ganador Bélgica/Senegal | Sede: desconocida | Estado: Programado | Goleadores: No disponible | Árbitro: No disponible",
    "Octavos de final | Fecha: 2026-07-07 | Partido: Ganador Argentina/Cabo Verde vs Ganador Australia/Egipto | Sede: desconocida | Estado: Programado | Goleadores: No disponible | Árbitro: No disponible",
    "Octavos de final | Fecha: 2026-07-07 | Partido: Ganador Suiza/Argelia vs Ganador Colombia/Ghana | Sede: desconocida | Estado: Programado | Goleadores: No disponible | Árbitro: No disponible",
    "Cuartos de final | Fecha: 2026-07-09 | Partido: Ganador Paraguay/Francia vs Ganador Canadá/Marruecos | Estado: Programado | Goleadores: No disponible | Árbitro: No disponible",
    "Cuartos de final | Fecha: 2026-07-10 | Partido: Ganador Llave Portugal/España vs Ganador Llave Estados Unidos/Bélgica | Estado: Programado | Goleadores: No disponible | Árbitro: No disponible",
    "Cuartos de final | Fecha: 2026-07-11 | Partido: Ganador Brasil/Noruega vs Ganador México/Inglaterra | Estado: Programado | Goleadores: No disponible | Árbitro: No disponible",
    "Cuartos de final | Fecha: 2026-07-11 | Partido: Ganador Argentina/Australia vs Ganador Suiza/Colombia | Estado: Programado | Goleadores: No disponible | Árbitro: No disponible",
    "Semifinal | Fecha: 2026-07-14 | Partido: Ganador Cuartos 1 vs Ganador Cuartos 2 | Sede: MetLife Stadium, East Rutherford (Nueva York/NJ) | Estado: Programado | Goleadores: No disponible | Árbitro: No disponible",
    "Semifinal | Fecha: 2026-07-15 | Partido: Ganador Cuartos 3 vs Ganador Cuartos 4 | Sede: MetLife Stadium, East Rutherford (Nueva York/NJ) | Estado: Programado | Goleadores: No disponible | Árbitro: No disponible",
    "Tercer puesto | Fecha: 2026-07-18 | Partido: Perdedor Semifinal 1 vs Perdedor Semifinal 2 | Sede: Hard Rock Stadium, Miami | Estado: Programado | Goleadores: No disponible | Árbitro: No disponible",
    "Final | Fecha: 2026-07-19 | Partido: Ganador Semifinal 1 vs Ganador Semifinal 2 | Sede: MetLife Stadium, East Rutherford (Nueva York/NJ) | Estado: Programado | Goleadores: No disponible | Árbitro: No disponible",
]
```

* Levantamos el modelo de embeddings

```
from sentence_transformers import SentenceTransformer, util

modelo_embeddings = SentenceTransformer('all-MiniLM-L6-v2')
```

* Calcular los embeddings para cada documento
  
```python
embeddings_docs = modelo_embeddings.encode(documentos)
```

* Mostramos los embbedings
  
```python
embeddings_docs
```

* Generamos una respuesta del LLM con un contexto

```python
from openai import OpenAI
import os

def generar_respuesta_llm(contexto, pregunta, api_key):
  client = OpenAI(
      api_key=api_key,
      base_url="https://api.groq.com/openai/v1",
  )

  prompt = f"""
  Contexto:
  {contexto}

  Pregunta:
  {pregunta}

  Respuesta:
  """

  response = client.responses.create(
      input=prompt,
      model="openai/gpt-oss-20b",
  )
  print(response.output_text)
```

* Lo probamos

```python
api_key = input("Ingrese su api key")

generar_respuesta_llm(
    contexto ="Argentina gano 5 a 0 a Cabo Verde",
    pregunta="Cuanto gano argentina a Cabo Verde?",
    api_key=api_key)
```

* Funcion generar respuesta con llm usando el RAG

```python
def generar_respuesta_llm_con_rag(modelo_embeddings, embeddings_docs, pregunta, api_key)
   
   contexto = recuperar_contexto(modelo_embeddings, embeddings_docs, pregunta, 10)
 
   respuesta_llm = generar_respuesta_llm(
       contexto =contexto,
       pregunta=pregunta,
       api_key=api_key)
   
   return respuesta_llm
```

* Lo Probamos

```python

api_key = input("Ingrese su api key")

respuesta_con_rag = generar_respuesta_llm_con_rag( 
    modelo_embeddings=modelo_embeddings,
    embeddings_docs=embeddings_docs,
    pregunta="Cuantos goles acumula Argentina?",
    api_key=api_key)

print(respuesta_con_rag)
```

* Integramos todos

```python
print("Sistema RAG con LLM")
api_key = input("Ingrese su api key")

while True:
  pregunta = input("Ingrese su pregunta: (salir para terminar)")
  if pregunta.lower() == "salir":
    break

  respuesta_con_rag = generar_respuesta_llm_con_rag( 
    modelo_embeddings=modelo_embeddings,
    embeddings_docs=embeddings_docs,
    pregunta=pregunta,
    api_key=api_key)
  
  print(respuesta_con_rag);
```

>[!NOTE]
> Para este ejemplo notamos que el modelo all-MiniLM-L6-v2 no era tan preciso e hizimos una segunda prueba con intfloat/multilingual-e5-large


## Rag con Gradio de Julian

```

# ============================================================
# 🤖 CHAT RAG + GROQ — Mundial 2026
# Recupera los documentos más relevantes de la variable `documentos` (RAG)
# y le pide a un modelo de Groq que responda basándose SOLO en esos documentos.
#
# IMPORTANTE (Google Colab): este script asume que ya corriste antes, en la
# misma sesión de Colab, la celda de build_docs que define `documentos = [...]`.
# No hace falta subir ningún archivo — Colab comparte variables entre celdas.
# ============================================================

import os
import re

import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.preprocessing import normalize
from sklearn.metrics.pairwise import cosine_similarity
import gradio as gr
from groq import Groq

# ------------------------------------------------------------
# 0. DOCUMENTOS
# ------------------------------------------------------------
# En Colab, `documentos` NO se importa de un archivo: se genera al correr
# antes la celda de build_docs (que define `documentos = [...]`) en esta
# misma sesión. Como Colab comparte el namespace entre celdas, ese `documentos`
# ya está disponible acá siempre que hayas corrido esa celda primero.
if "documentos" not in globals():
    print("⚠️ No se encontró la variable 'documentos' en esta sesión — corré primero "
          "la celda de build_docs (la que arma la lista `documentos`) y después esta celda.")
    documentos = [
        "Fase de grupos | Grupo: A | Jornada: 1 | Partido: México vs Sudáfrica | Resultado: México 2-0 Sudáfrica",
        "Fase de grupos | Grupo: A | Jornada: 1 | Partido: Corea del Sur vs Chequia | Resultado: Corea del Sur 2-1 Chequia",
        "Fase de grupos | Grupo: B | Jornada: 1 | Partido: Canadá vs Bosnia y Herzegovina | Resultado: Canadá 1-1 Bosnia y Herzegovina",
    ]
else:
    print(f"✅ Se usan los {len(documentos)} documentos ya cargados en esta sesión de Colab.")

MODELOS_FALLBACK = [
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
    "openai/gpt-oss-20b",
    "meta-llama/llama-4-scout-17b-16e-instruct",
]

# ------------------------------------------------------------
# 1. EMBEDDINGS DEL RAG (se calculan una sola vez al iniciar)
# ------------------------------------------------------------
print("⏳ Cargando modelo de embeddings...")
modelo_embeddings = SentenceTransformer('all-MiniLM-L6-v2')
print("✅ Modelo de embeddings listo!")

print("⏳ Indexando documentos del RAG...")
_vectores_docs = normalize(modelo_embeddings.encode(documentos, show_progress_bar=False))
print(f"✅ {len(documentos)} documentos indexados.")


def etiqueta_corta(texto, maxlen=90):
    """Convierte un documento pipe-delimited largo en una etiqueta corta
    tipo 'Equipo A vs Equipo B (resultado)' para mostrar como fuente."""
    m_partido = re.search(r"Partido:\s*(.*?)\s*\|", texto)
    if m_partido:
        partido = m_partido.group(1)
        m_resultado = re.search(r"Resultado:\s*(.*?)\s*\|", texto)
        resultado = m_resultado.group(1) if m_resultado else ""
        etiqueta = partido
        if resultado and resultado not in ("Pendiente", ""):
            etiqueta += f" ({resultado})"
    else:
        etiqueta = texto
    if len(etiqueta) > maxlen:
        etiqueta = etiqueta[:maxlen - 1].rstrip() + "…"
    return etiqueta


def recuperar_contexto(pregunta, k=6, umbral_min=0.15):
    """Devuelve una lista de (documento, score) con los k documentos más
    similares a la pregunta, filtrando por un umbral mínimo de similitud."""
    vec_pregunta = normalize(modelo_embeddings.encode([pregunta]))
    sims = cosine_similarity(vec_pregunta, _vectores_docs)[0]
    orden = np.argsort(sims)[::-1]
    resultados = []
    for idx in orden[:int(k)]:
        if sims[idx] >= umbral_min:
            resultados.append((documentos[idx], float(sims[idx])))
    return resultados


def formatear_fuentes(contexto):
    if not contexto:
        return "_No se encontraron documentos por encima del umbral de similitud._"
    return "\n".join(f"- {etiqueta_corta(doc)} — similitud {score:.2f}" for doc, score in contexto)


def construir_system_prompt(contexto):
    if contexto:
        contexto_texto = "\n".join(f"- {doc}" for doc, _ in contexto)
    else:
        contexto_texto = "(no se encontraron documentos relevantes para esta pregunta)"
    return (
        "Sos un asistente experto en el Mundial de Fútbol 2026. "
        "Respondé ÚNICAMENTE usando la información de los DOCUMENTOS DE CONTEXTO de abajo. "
        "Si la respuesta no está en el contexto (por ejemplo, un dato que figura como "
        "'No disponible' o un partido que todavía no se jugó), decí explícitamente que no "
        "tenés ese dato en la base en vez de inventarlo. Respondé siempre en español, de "
        "forma clara, directa y sin relleno innecesario.\n\n"
        f"DOCUMENTOS DE CONTEXTO:\n{contexto_texto}"
    )


def historial_a_mensajes(historial):
    """Convierte el historial que entrega gr.ChatInterface (puede venir como
    lista de dicts {role, content} o como lista de pares [usuario, asistente]
    según la versión de gradio) a la lista de mensajes que espera Groq."""
    mensajes = []
    for turno in historial or []:
        if isinstance(turno, dict):
            rol = turno.get("role", "user")
            contenido = turno.get("content", "")
        else:
            # compatibilidad con el formato viejo (usuario, asistente)
            usuario, asistente = turno
            if usuario:
                mensajes.append({"role": "user", "content": usuario})
            if asistente:
                mensajes.append({"role": "assistant", "content": asistente})
            continue
        if contenido:
            mensajes.append({"role": rol, "content": contenido})
    return mensajes


# ------------------------------------------------------------
# 2. CONEXIÓN CON GROQ
# ------------------------------------------------------------
def cargar_modelos(api_key):
    """Valida la API key contra Groq y puebla el dropdown con los modelos
    realmente disponibles para esa cuenta (evita hardcodear nombres)."""
    if not api_key:
        return gr.update(choices=MODELOS_FALLBACK, value=MODELOS_FALLBACK[0]), "⚠️ Ingresá tu API key primero."
    try:
        client = Groq(api_key=api_key)
        modelos = client.models.list()
        ids = sorted(m.id for m in modelos.data)
        # Evitamos ofrecer por defecto modelos de audio/moderación como modelo de chat
        candidatos_chat = [i for i in ids if not any(x in i.lower() for x in ("whisper", "tts", "guard"))]
        opciones = candidatos_chat or ids or MODELOS_FALLBACK
        valor = "llama-3.3-70b-versatile" if "llama-3.3-70b-versatile" in opciones else opciones[0]
        return gr.update(choices=opciones, value=valor), f"✅ Conectado — {len(opciones)} modelos disponibles."
    except Exception as e:
        return gr.update(choices=MODELOS_FALLBACK, value=MODELOS_FALLBACK[0]), f"❌ No se pudo conectar: {e}"


# ------------------------------------------------------------
# 3. FUNCIÓN DEL CHAT (RAG + Groq, con streaming)
# ------------------------------------------------------------
def responder(mensaje, historial, api_key, modelo_id, k, umbral_min):
    if not api_key:
        yield "⚠️ Pegá tu **Groq API key** en el panel de la izquierda (y tocá 'Conectar') antes de chatear."
        return
    if not modelo_id:
        yield "⚠️ Elegí un modelo de Groq en el panel de la izquierda."
        return

    contexto = recuperar_contexto(mensaje, k=k, umbral_min=umbral_min)
    system_prompt = construir_system_prompt(contexto)

    mensajes = [{"role": "system", "content": system_prompt}]
    mensajes.extend(historial_a_mensajes(historial))
    mensajes.append({"role": "user", "content": mensaje})

    try:
        client = Groq(api_key=api_key)
        stream = client.chat.completions.create(
            model=modelo_id,
            messages=mensajes,
            temperature=0.2,
            stream=True,
        )
    except Exception as e:
        yield f"❌ Error al conectar con Groq: {e}"
        return

    respuesta = ""
    try:
        for chunk in stream:
            delta = chunk.choices[0].delta.content or ""
            if delta:
                respuesta += delta
                yield respuesta
    except Exception as e:
        yield respuesta + f"\n\n❌ Error durante la generación: {e}"
        return

    fuentes = formatear_fuentes(contexto)
    yield respuesta + f"\n\n---\n📚 **Fuentes consultadas (RAG):**\n{fuentes}"


# ------------------------------------------------------------
# 4. TEMA VISUAL — identidad "Mundial 2026" (cancha, marcador, dorado)
# ------------------------------------------------------------
# Nota: todo lo que sigue son overrides por CSS plano y `elem_classes` propias,
# a propósito — así no dependen de qué parámetros acepte exactamente el
# gr.Blocks/gr.Chatbot de tu versión de gradio (evita el error de la vez
# pasada con `type=`). Si alguna variable/selector no existe en tu versión,
# el navegador simplemente la ignora, no rompe nada.
CSS_MUNDIAL = """
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Work+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');

:root {
    --wc-pitch-deep: #0b2818;
    --wc-pitch: #163a2b;
    --wc-pitch-light: #2d6a4f;
    --wc-chalk: #f4f1ea;
    --wc-gold: #ffb703;
    --wc-gold-deep: #e0980a;
    --wc-red: #e63946;

    --body-background-fill: var(--wc-pitch-deep);
    --background-fill-primary: var(--wc-pitch-deep);
    --background-fill-secondary: var(--wc-pitch);
    --body-text-color: var(--wc-chalk);
    --block-background-fill: rgba(22, 58, 43, 0.6);
    --block-border-color: rgba(255, 183, 3, 0.35);
    --block-radius: 14px;
    --panel-background-fill: rgba(22, 58, 43, 0.6);
    --border-color-primary: rgba(255, 183, 3, 0.25);
    --border-color-accent: var(--wc-gold);
    --input-background-fill: rgba(11, 40, 24, 0.65);
    --button-primary-background-fill: var(--wc-gold);
    --button-primary-background-fill-hover: var(--wc-gold-deep);
    --button-primary-text-color: var(--wc-pitch-deep);
    --button-secondary-background-fill: transparent;
    --button-secondary-border-color: var(--wc-red);
    --button-secondary-text-color: var(--wc-red);
    --slider-color: var(--wc-gold);
    --body-text-color-subdued: #b7cdbf;
}

body, .gradio-container {
    background: repeating-linear-gradient(115deg, #123524 0px, #123524 70px, #0f2f1f 70px, #0f2f1f 140px) !important;
    font-family: 'Work Sans', sans-serif !important;
    color: var(--wc-chalk) !important;
}
.gradio-container h1, .gradio-container h2, .gradio-container h3 {
    font-family: 'Bebas Neue', sans-serif !important;
    letter-spacing: 1.5px;
    color: var(--wc-gold) !important;
}
footer { display: none !important; }

/* Banner tipo marcador de estadio */
.wc-banner {
    background: linear-gradient(135deg, var(--wc-pitch-deep), var(--wc-pitch) 60%, var(--wc-pitch-light));
    border: 1px solid rgba(255,183,3,.4);
    border-radius: 16px;
    padding: 22px 28px 18px;
    margin-bottom: 18px;
    position: relative;
    overflow: hidden;
}
.wc-banner::before, .wc-banner::after {
    content: "";
    position: absolute; left: 0; right: 0; height: 5px;
    background: repeating-linear-gradient(90deg, var(--wc-gold) 0 18px, transparent 18px 32px);
    opacity: .9;
}
.wc-banner::before { top: 0; }
.wc-banner::after { bottom: 0; }
.wc-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: .72rem;
    letter-spacing: 2px;
    color: var(--wc-gold);
    text-transform: uppercase;
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 6px;
}
.wc-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--wc-gold);
    box-shadow: 0 0 8px var(--wc-gold);
}
.wc-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.6rem; line-height: 1; letter-spacing: 2px;
    color: var(--wc-chalk); margin: 0 0 6px 0;
}
.wc-title span { color: var(--wc-gold); }
.wc-desc {
    font-family: 'Work Sans', sans-serif;
    color: #cfe3d7; font-size: .95rem; max-width: 640px; margin: 0;
}

/* Panel lateral tipo "ficha técnica" */
.wc-panel {
    background: rgba(11, 40, 24, 0.55) !important;
    border: 1px solid rgba(255,183,3,.25) !important;
    border-radius: 14px !important;
    padding: 10px 8px !important;
}
.wc-panel h3 {
    font-size: 1.1rem !important;
    border-bottom: 2px solid var(--wc-gold);
    padding-bottom: 4px;
    display: inline-block;
}

/* Botones tipo "tarjeta" redondeada */
button {
    border-radius: 999px !important;
    font-family: 'Work Sans', sans-serif !important;
    font-weight: 600 !important;
    transition: transform .15s ease, box-shadow .15s ease !important;
}
button:hover { transform: translateY(-1px); }
button.primary {
    background: var(--wc-gold) !important;
    color: var(--wc-pitch-deep) !important;
    border: none !important;
}
button.primary:hover { box-shadow: 0 6px 16px rgba(255,183,3,.35) !important; }

/* Burbujas del chat (best-effort, no crítico si el selector no aplica) */
.message.user, [data-testid="user"] {
    background: var(--wc-chalk) !important;
    color: var(--wc-pitch-deep) !important;
    border-radius: 14px 14px 3px 14px !important;
}
.message.bot, [data-testid="bot"] {
    background: rgba(45,106,79,.55) !important;
    color: var(--wc-chalk) !important;
    border-left: 3px solid var(--wc-gold) !important;
    border-radius: 14px 14px 14px 3px !important;
}
code { font-family: 'JetBrains Mono', monospace !important; }
"""

BANNER_HTML = f"""
<div class="wc-banner">
  <div class="wc-eyebrow"><span class="wc-dot"></span> BASE RAG · {len(documentos)} DOCUMENTOS · INFERENCIA GROQ</div>
  <p class="wc-title">⚽ CHAT <span>MUNDIAL 2026</span></p>
  <p class="wc-desc">Preguntá por partidos, resultados, goleadores y árbitros. Cada respuesta se arma
  recuperando los documentos más relevantes de la base y generándola con un modelo de Groq — si el dato
  no está en la base, te lo va a decir en vez de inventarlo.</p>
</div>
"""

# ------------------------------------------------------------
# 5. INTERFAZ GRADIO
# ------------------------------------------------------------
with gr.Blocks(
    theme=gr.themes.Base(primary_hue="yellow", neutral_hue="slate"),
    title="⚽ Chat RAG — Mundial 2026 (Groq)",
    css=CSS_MUNDIAL,
) as app:

    gr.HTML(BANNER_HTML)

    with gr.Row():
        with gr.Column(scale=1, min_width=300, elem_classes=["wc-panel"]):
            gr.Markdown("### 🟨 Conexión con Groq")
            api_key_box = gr.Textbox(
                label="Groq API key",
                type="password",
                placeholder="gsk_...",
                value=os.environ.get("GROQ_API_KEY", ""),
            )
            btn_conectar = gr.Button("🔌 Conectar y cargar modelos", variant="primary")
            estado_conexion = gr.Markdown("")
            modelo_dropdown = gr.Dropdown(
                label="Modelo de Groq",
                choices=MODELOS_FALLBACK,
                value=MODELOS_FALLBACK[0],
            )

            gr.Markdown("---")
            gr.Markdown("### 📋 Parámetros de búsqueda (RAG)")
            k_slider = gr.Slider(1, 15, value=6, step=1, label="Documentos a recuperar (top-k)")
            umbral_slider = gr.Slider(0.0, 1.0, value=0.15, step=0.05, label="Umbral mínimo de similitud")
            gr.Markdown(f"📄 Base actual: **{len(documentos)} documentos** cargados desde la celda anterior de `documentos`.")

            btn_conectar.click(
                cargar_modelos,
                inputs=[api_key_box],
                outputs=[modelo_dropdown, estado_conexion],
            )

        with gr.Column(scale=3):
            gr.ChatInterface(
                fn=responder,
                chatbot=gr.Chatbot(height=560, label="⚽ Chat RAG Mundial 2026"),
                additional_inputs=[api_key_box, modelo_dropdown, k_slider, umbral_slider],
                examples=[
                    ["¿Quién ganó Brasil vs Japón en dieciseisavos de final?"],
                    ["¿Qué pasó en Alemania vs Paraguay?"],
                    ["¿Quién fue el árbitro de México vs Sudáfrica?"],
                    ["¿Cuándo y dónde es la final del Mundial 2026?"],
                ],
            )

# ------------------------------------------------------------
# 5. LANZAR LA APP
# ------------------------------------------------------------
app.launch(share=True, debug=False)
```

--- 

# Tool Use

* Mirar en los modelos de https://console.groq.com/docs/models cuales tienen habilitadas las capacidades de tool use

* Proceso....
 * Infomramos a un modelo que lo soporte en un json/diccinario las tools (funciones) que tiene disponible
 * Configuramos el system prompt para avisarle tambien aqui al modelo que tiene tools diponibles para usar
 * Hacerle una pregunta al modelo en tu prompt
 * El modelo en base a la pregunta que haces decide si necesita hacer una llamada a una tool o te responde directamente
 * Si necesita hacer una llamada a una tool no te responde como siempre sino una respuesta especial
 * Si el modelo me pide que llame a una tool, lo hago y luego hago una segunda llamada donde le paso el resputado de las llamadas a la tuol...
   

> [!NOTE] A veces el modelo se rebela y no utiliza la tool de la maner esperada y en ese caso debo ajustar al system prompt para ser mas explicito en que momentos debe utilizar la TOOL
