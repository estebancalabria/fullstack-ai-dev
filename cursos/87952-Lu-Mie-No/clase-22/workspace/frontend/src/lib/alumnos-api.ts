export interface Alumno {
  legajo: number;
  nombre: string;
  apellido: string;
  fechaDeNacimiento: string;
}

export const DEFAULT_BASE_URL = "https://lg3zkhvf-5000.brs.devtunnels.ms/";

export function normalizeBaseUrl(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

async function parseError(res: Response): Promise<string> {
  try {
    const data = await res.json();
    if (data && typeof data.error === "string") return data.error;
  } catch {
    // ignore
  }
  return `Error ${res.status} al contactar la API`;
}

export async function fetchAlumnos(baseUrl: string): Promise<Alumno[]> {
  const res = await fetch(`${normalizeBaseUrl(baseUrl)}/alumnos`);
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function fetchAlumno(
  baseUrl: string,
  legajo: number,
): Promise<Alumno> {
  const res = await fetch(`${normalizeBaseUrl(baseUrl)}/alumnos/${legajo}`);
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function crearAlumno(
  baseUrl: string,
  alumno: Alumno,
): Promise<Alumno> {
  const res = await fetch(`${normalizeBaseUrl(baseUrl)}/alumnos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(alumno),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}
