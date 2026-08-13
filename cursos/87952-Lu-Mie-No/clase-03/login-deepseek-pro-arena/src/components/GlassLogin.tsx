import { FormEvent, useState } from "react";

function EyeIcon({ visible }: { visible: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {visible ? (
        <>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c6.5 0 10 8 10 8a13.16 13.16 0 0 1-1.67 2.68" />
          <path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3.5 8 10 8a9.74 9.74 0 0 0 5.39-1.61" />
          <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
          <path d="m2 2 20 20" />
        </>
      )}
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="#EA4335"
        d="M12 5.04c1.7 0 3.22.59 4.42 1.74l3.28-3.28C17.65 1.62 15.05.5 12 .5 7.36.5 3.36 3.16 1.28 7.02l3.83 2.97A6.5 6.5 0 0 1 12 5.04Z"
      />
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.98-.09-1.7-.28-2.45H12v4.64h6.54c-.13 1.09-.84 2.73-2.42 3.83l3.71 2.87c2.24-2.07 3.67-5.1 3.67-8.89Z"
      />
      <path
        fill="#FBBC05"
        d="M5.11 14.01a6.5 6.5 0 0 1 0-4.02L1.28 7.02a10.5 10.5 0 0 0 0 9.96l3.83-2.97Z"
      />
      <path
        fill="#34A853"
        d="M12 23.5c3.05 0 5.6-1 7.47-2.73l-3.71-2.87c-1 .69-2.33 1.17-3.76 1.17a6.5 6.5 0 0 1-6.11-4.32L1.98 17.7C4.05 21.59 7.8 23.5 12 23.5Z"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.97 10.97 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.15c0 .3.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export default function GlassLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setSuccess(false);
    // Simulación de autenticación
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3500);
    }, 1600);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0f1e] p-4 sm:p-6">
      {/* ── Fondo: gradiente base ─────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.22),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(217,70,239,0.18),transparent_55%),linear-gradient(160deg,#0b0f1e_0%,#131a33_55%,#0b0f1e_100%)]" />

      {/* ── Orbes de color difuminados ────────────────────── */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-violet-600/35 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute top-1/3 -right-32 h-[26rem] w-[26rem] rounded-full bg-fuchsia-500/25 blur-3xl animate-float-slower" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 h-[24rem] w-[24rem] rounded-full bg-cyan-500/20 blur-3xl animate-float-medium" />
      <div className="pointer-events-none absolute top-10 left-1/2 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl animate-float-fast" />

      {/* ── Rejilla decorativa sutil ──────────────────────── */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:56px_56px]" />

      {/* ── Tarjeta de vidrio centrada ────────────────────── */}
      <section className="relative z-10 w-full max-w-md">
        {/* Borde luminoso */}
        <div className="absolute -inset-1 rounded-[2.4rem] bg-gradient-to-br from-white/25 via-white/5 to-transparent blur-[2px]" />

        <div className="relative overflow-hidden rounded-[2.2rem] border border-white/15 bg-white/[0.07] shadow-[0_24px_70px_-15px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
          {/* Brillo superior del vidrio */}
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[130%] -translate-x-1/2 rounded-full bg-white/10 blur-2xl" />

          <div className="relative px-7 py-9 sm:px-10 sm:py-11">
            {/* Logo */}
            <div className="mb-8 flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-violet-500/80 to-fuchsia-500/80 shadow-lg shadow-violet-900/50 backdrop-blur-md">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M12 2 2 7l10 5 10-5-10-5Z" />
                  <path d="m2 17 10 5 10-5" />
                  <path d="m2 12 10 5 10-5" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  Bienvenido de nuevo
                </h1>
                <p className="mt-1 text-sm text-white/60">
                  Inicia sesión para continuar a tu panel
                </p>
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50"
                >
                  Correo electrónico
                </label>
                <div className="group relative">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-white/40 transition-colors group-focus-within:text-violet-300">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="3" />
                      <path d="m22 7-10 6L2 7" />
                    </svg>
                  </span>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-white/15 bg-white/[0.06] py-3.5 pl-12 pr-4 text-sm text-white placeholder-white/30 shadow-inner shadow-white/5 outline-none backdrop-blur-md transition-all duration-300 focus:border-violet-400/60 focus:bg-white/[0.09] focus:shadow-[0_0_0_4px_rgba(139,92,246,0.15)]"
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50"
                >
                  Contraseña
                </label>
                <div className="group relative">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-white/40 transition-colors group-focus-within:text-violet-300">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <rect x="4" y="10" width="16" height="11" rx="3" />
                      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                      <circle cx="12" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
                    </svg>
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-white/15 bg-white/[0.06] py-3.5 pl-12 pr-12 text-sm text-white placeholder-white/30 shadow-inner shadow-white/5 outline-none backdrop-blur-md transition-all duration-300 focus:border-violet-400/60 focus:bg-white/[0.09] focus:shadow-[0_0_0_4px_rgba(139,92,246,0.15)]"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-3 flex items-center rounded-lg px-1.5 text-white/40 transition-colors hover:text-white/80"
                  >
                    <EyeIcon visible={showPassword} />
                  </button>
                </div>
              </div>

              {/* Opciones */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex cursor-pointer select-none items-center gap-2 text-white/60">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="peer sr-only"
                  />
                  <span className="flex h-4.5 w-4.5 items-center justify-center rounded-md border border-white/25 bg-white/10 transition-all duration-200 peer-checked:border-violet-400 peer-checked:bg-violet-500">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3 opacity-0 transition-opacity peer-checked:opacity-100"
                    >
                      <path d="m5 13 4 4L19 7" />
                    </svg>
                  </span>
                  Recuérdame
                </label>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="font-medium text-violet-300 transition-colors hover:text-violet-200"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Botón de envío */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 bg-[length:200%_100%] bg-left px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/50 transition-all duration-500 hover:bg-right hover:shadow-fuchsia-900/50 focus:outline-none focus:ring-4 focus:ring-violet-400/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {/* Brillo animado */}
                <span className="pointer-events-none absolute inset-y-0 w-1/3 bg-white/25 blur-md animate-shine" />
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg
                        className="h-4.5 w-4.5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="opacity-25"
                        />
                        <path
                          d="M12 2a10 10 0 0 1 10 10"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      </svg>
                      Verificando…
                    </>
                  ) : (
                    <>
                      Iniciar sesión
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </>
                  )}
                </span>
              </button>

              {/* Mensaje de éxito */}
              {success && (
                <div className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-300 backdrop-blur-md">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4.5 w-4.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  ¡Sesión iniciada correctamente! Redirigiendo…
                </div>
              )}
            </form>

            {/* Divisor */}
            <div className="my-7 flex items-center gap-4">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
              <span className="text-xs font-medium uppercase tracking-widest text-white/40">
                o continúa con
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
            </div>

            {/* Redes sociales */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2.5 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm font-medium text-white/80 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.12] hover:text-white active:scale-[0.97]"
              >
                <GoogleIcon />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2.5 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm font-medium text-white/80 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.12] hover:text-white active:scale-[0.97]"
              >
                <GithubIcon />
                GitHub
              </button>
            </div>

            {/* Registro */}
            <p className="mt-8 text-center text-sm text-white/50">
              ¿No tienes una cuenta?{" "}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="font-semibold text-violet-300 transition-colors hover:text-violet-200"
              >
                Regístrate gratis
              </a>
            </p>
          </div>
        </div>

        {/* Pie de página */}
        <p className="mt-6 text-center text-xs text-white/30">
          © 2026 Glassmorphism UI · Hecho con 💜
        </p>
      </section>
    </main>
  );
}
