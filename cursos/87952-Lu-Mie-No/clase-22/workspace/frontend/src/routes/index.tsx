import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_BASE_URL,
  fetchAlumnos,
  fetchAlumno,
  crearAlumno,
  type Alumno,
} from "@/lib/alumnos-api";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Registro de Alumnos — Cliente API" },
      {
        name: "description",
        content:
          "Cliente web para la API de alumnos: listá, buscá por legajo y registrá nuevos alumnos.",
      },
      { property: "og:title", content: "Registro de Alumnos — Cliente API" },
      {
        property: "og:description",
        content:
          "Cliente web para la API de alumnos: listá, buscá por legajo y registrá nuevos alumnos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const BASE_URL_KEY = "alumnos-api-base-url";

function formatFecha(iso: string): string {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

function Index() {
  const [baseUrl, setBaseUrl] = useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_BASE_URL;
    return localStorage.getItem(BASE_URL_KEY) ?? DEFAULT_BASE_URL;
  });
  const [baseUrlInput, setBaseUrlInput] = useState(baseUrl);

  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorLista, setErrorLista] = useState<string | null>(null);

  const [legajoBusqueda, setLegajoBusqueda] = useState("");
  const [resultadoBusqueda, setResultadoBusqueda] = useState<Alumno | null>(null);
  const [errorBusqueda, setErrorBusqueda] = useState<string | null>(null);
  const [buscando, setBuscando] = useState(false);

  const [form, setForm] = useState({
    legajo: "",
    nombre: "",
    apellido: "",
    fechaDeNacimiento: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [errorForm, setErrorForm] = useState<string | null>(null);
  const [exitoForm, setExitoForm] = useState<string | null>(null);

  const cargarAlumnos = useCallback(async (url: string) => {
    setCargando(true);
    setErrorLista(null);
    try {
      setAlumnos(await fetchAlumnos(url));
    } catch (e) {
      setAlumnos([]);
      setErrorLista(
        e instanceof Error
          ? e.message
          : "No se pudo conectar con la API. Verificá la URL y el túnel.",
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarAlumnos(baseUrl);
  }, [baseUrl, cargarAlumnos]);

  const conectar = () => {
    const url = baseUrlInput.trim() || DEFAULT_BASE_URL;
    localStorage.setItem(BASE_URL_KEY, url);
    setBaseUrl(url);
  };

  const buscar = async () => {
    const legajo = Number(legajoBusqueda);
    if (!legajoBusqueda || Number.isNaN(legajo) || legajo <= 0) {
      setErrorBusqueda("Ingresá un legajo válido (número mayor a 0).");
      setResultadoBusqueda(null);
      return;
    }
    setBuscando(true);
    setErrorBusqueda(null);
    setResultadoBusqueda(null);
    try {
      setResultadoBusqueda(await fetchAlumno(baseUrl, legajo));
    } catch (e) {
      setErrorBusqueda(e instanceof Error ? e.message : "Error al buscar.");
    } finally {
      setBuscando(false);
    }
  };

  const validarNombre = (valor: string, campo: string): string | null => {
    if (!valor) return `El ${campo} no puede estar vacío.`;
    if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+$/.test(valor))
      return `El ${campo} no puede contener espacios ni números.`;
    if (valor.charAt(0) !== valor.charAt(0).toUpperCase())
      return `El ${campo} debe comenzar con mayúscula.`;
    return null;
  };

  const registrar = async () => {
    setErrorForm(null);
    setExitoForm(null);

    const legajo = Number(form.legajo);
    if (!form.legajo || Number.isNaN(legajo) || legajo <= 0)
      return setErrorForm("El legajo debe ser un número mayor que 0.");
    const errNombre = validarNombre(form.nombre, "nombre");
    if (errNombre) return setErrorForm(errNombre);
    const errApellido = validarNombre(form.apellido, "apellido");
    if (errApellido) return setErrorForm(errApellido);
    if (!form.fechaDeNacimiento)
      return setErrorForm("Ingresá la fecha de nacimiento.");
    if (form.fechaDeNacimiento > new Date().toISOString().slice(0, 10))
      return setErrorForm("La fecha de nacimiento no puede ser futura.");

    setEnviando(true);
    try {
      const creado = await crearAlumno(baseUrl, {
        legajo,
        nombre: form.nombre,
        apellido: form.apellido,
        fechaDeNacimiento: form.fechaDeNacimiento,
      });
      setExitoForm(
        `Alumno ${creado.nombre} ${creado.apellido} registrado (legajo ${creado.legajo}).`,
      );
      setForm({ legajo: "", nombre: "", apellido: "", fechaDeNacimiento: "" });
      cargarAlumnos(baseUrl);
    } catch (e) {
      setErrorForm(e instanceof Error ? e.message : "Error al registrar.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="grid size-9 rotate-3 place-items-center bg-primary">
              <span className="font-display -rotate-3 text-lg leading-none text-primary-foreground">
                A
              </span>
            </div>
            <div>
              <div className="font-display text-xl leading-none tracking-wide">
                ALUMNOS<span className="text-primary">.API</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Cliente del registro
              </div>
            </div>
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-2 border border-input bg-secondary/50 px-4 py-2.5">
            <span className="shrink-0 text-xs font-semibold uppercase tracking-widest text-primary">
              Base URL
            </span>
            <input
              type="text"
              value={baseUrlInput}
              onChange={(e) => setBaseUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && conectar()}
              placeholder="https://tu-tunel.dev"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button
            onClick={conectar}
            className="-skew-x-12 bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:skew-x-0"
          >
            <span className="inline-block skew-x-12">Conectar</span>
          </button>
        </div>
      </header>

      <section className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-6 pb-10 pt-14 md:flex-row md:items-end">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              01 — Registro
            </div>
            <h1 className="font-display text-6xl uppercase leading-[0.9] md:text-7xl">
              Todos los
              <br />
              <span className="text-primary">Alumnos</span>
            </h1>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Consultá <span className="text-foreground">GET /alumnos</span>, buscá
            por <span className="text-foreground">GET /alumnos/{"{id}"}</span> y
            dá de alta con <span className="text-foreground">POST</span>. Todo en
            un solo panel.
          </p>
        </div>
      </section>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="font-display text-3xl uppercase tracking-wide">
              Padrón{" "}
              <span className="align-middle text-lg text-muted-foreground">
                / {alumnos.length}
              </span>
            </div>
            <div className="flex items-center gap-2 border border-input px-3 py-2">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Buscar legajo
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={legajoBusqueda}
                onChange={(e) => setLegajoBusqueda(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && buscar()}
                placeholder="101"
                className="w-20 bg-transparent text-sm text-primary outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={buscar}
                disabled={buscando}
                className="text-xs font-semibold uppercase tracking-widest text-primary hover:underline disabled:opacity-50"
              >
                {buscando ? "…" : "Ir →"}
              </button>
            </div>
          </div>

          {(resultadoBusqueda || errorBusqueda) && (
            <div className="animate-rise mb-6 border border-primary/40 bg-primary/5 px-5 py-4">
              {resultadoBusqueda ? (
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-display text-lg">
                    {String(resultadoBusqueda.legajo).padStart(3, "0")}
                  </span>
                  <span className="font-semibold">
                    {resultadoBusqueda.nombre} {resultadoBusqueda.apellido}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    nació el {formatFecha(resultadoBusqueda.fechaDeNacimiento)}
                  </span>
                </div>
              ) : (
                <p className="text-sm text-destructive">{errorBusqueda}</p>
              )}
            </div>
          )}

          {cargando ? (
            <div className="border border-border px-5 py-10 text-center text-sm uppercase tracking-widest text-muted-foreground">
              Cargando alumnos…
            </div>
          ) : errorLista ? (
            <div className="border border-destructive/40 bg-destructive/10 px-5 py-6">
              <p className="text-sm text-destructive">{errorLista}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Si es la primera vez que usás el túnel de VS Code, abrí la URL en
                el navegador y confirmá con «Continuar».
              </p>
              <button
                onClick={() => cargarAlumnos(baseUrl)}
                className="mt-4 border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest hover:bg-secondary"
              >
                Reintentar
              </button>
            </div>
          ) : alumnos.length === 0 ? (
            <div className="border border-dashed border-border px-5 py-10 text-center text-sm uppercase tracking-widest text-muted-foreground">
              No hay alumnos cargados todavía
            </div>
          ) : (
            <div className="divide-y divide-border border border-border bg-card/40">
              {alumnos.map((a, i) => (
                <div
                  key={a.legajo}
                  className="animate-rise group flex items-center gap-4 px-5 py-4 hover:bg-secondary/40"
                  style={{ animationDelay: `${i * 45}ms` }}
                >
                  <div className="accent-bar h-8 w-10 shrink-0 rotate-1" />
                  <div className="font-display w-16 shrink-0 text-lg">
                    {String(a.legajo).padStart(3, "0")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold">
                      {a.nombre} {a.apellido}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Nació el {formatFecha(a.fechaDeNacimiento)}
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    GET /alumnos/{a.legajo} →
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="h-fit border border-primary/40 bg-primary/5 p-6">
          <div className="mb-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            02 — Alta
          </div>
          <div className="font-display mb-6 text-3xl uppercase">
            Nuevo Alumno
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-[10px] uppercase tracking-widest text-muted-foreground">
                Legajo
              </label>
              <input
                type="number"
                min={1}
                value={form.legajo}
                onChange={(e) => setForm({ ...form, legajo: e.target.value })}
                placeholder="101"
                className="w-full border border-input bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[10px] uppercase tracking-widest text-muted-foreground">
                Nombre
              </label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                placeholder="Lucía"
                className="w-full border border-input bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[10px] uppercase tracking-widest text-muted-foreground">
                Apellido
              </label>
              <input
                type="text"
                value={form.apellido}
                onChange={(e) => setForm({ ...form, apellido: e.target.value })}
                placeholder="Moreno"
                className="w-full border border-input bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[10px] uppercase tracking-widest text-muted-foreground">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                value={form.fechaDeNacimiento}
                onChange={(e) =>
                  setForm({ ...form, fechaDeNacimiento: e.target.value })
                }
                className="w-full border border-input bg-background/60 px-3 py-2.5 text-sm outline-none [color-scheme:dark] focus:border-primary"
              />
            </div>
          </div>

          {errorForm && (
            <p className="animate-rise mt-4 border border-destructive/40 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
              {errorForm}
            </p>
          )}
          {exitoForm && (
            <p className="animate-rise mt-4 border border-success/40 bg-success/10 px-3 py-2.5 text-sm text-success">
              {exitoForm}
            </p>
          )}

          <button
            onClick={registrar}
            disabled={enviando}
            className="font-display mt-7 w-full -skew-x-6 bg-primary py-4 text-lg uppercase tracking-wide text-primary-foreground transition-transform hover:skew-x-0 disabled:opacity-50"
          >
            <span className="inline-block skew-x-6">
              {enviando ? "Enviando…" : "POST /alumnos →"}
            </span>
          </button>
          <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
            DevTunnel · confirmá «Continuar» la primera vez
          </p>
        </aside>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>Alumnos · Cliente API</span>
          <span className={errorLista ? "text-destructive" : "text-primary"}>
            ● {errorLista ? "Sin conexión" : "Conectado"}
          </span>
        </div>
      </footer>
    </div>
  );
}
