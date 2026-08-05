import { useState, useRef } from "react";

const MONTHS = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre"
];

function daysInMonth(m, y) {
  return new Date(y, m, 0).getDate();
}

function validate(d, m, y) {
  if (!d || !m || !y || y.length < 4) return null;
  const dd = parseInt(d), mm = parseInt(m), yy = parseInt(y);
  if (isNaN(dd) || dd < 1 || dd > 31) return { error: "Día inválido." };
  if (isNaN(mm) || mm < 1 || mm > 12) return { error: "Mes inválido." };
  if (isNaN(yy) || yy < 1900 || yy > 2100) return { error: "Año fuera de rango." };
  const max = daysInMonth(mm, yy);
  if (dd > max) return { error: `${MONTHS[mm - 1]} de ${yy} tiene solo ${max} días.` };
  return { result: `${dd} de ${MONTHS[mm - 1]} de ${yy}` };
}

export default function DatePicker({ onChange }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const mmRef = useRef();
  const yyyyRef = useRef();

  const status = validate(day, month, year);

  function onlyDigits(e) {
    if (
      !/[\d]/.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)
    ) {
      e.preventDefault();
    }
  }

  function handleDay(e) {
    const v = e.target.value.slice(0, 2);
    setDay(v);
    if (v.length === 2) mmRef.current.focus();
    onChange?.(validate(v, month, year)?.result ?? null);
  }

  function handleMonth(e) {
    const v = e.target.value.slice(0, 2);
    setMonth(v);
    if (v.length === 2) yyyyRef.current.focus();
    onChange?.(validate(day, v, year)?.result ?? null);
  }

  function handleYear(e) {
    const v = e.target.value.slice(0, 4);
    setYear(v);
    onChange?.(validate(day, month, v)?.result ?? null);
  }

  return (
    <div style={{ maxWidth: 360 }}>
      <p style={{ fontSize: 13, color: "gray", marginBottom: 8 }}>Fecha</p>

      <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: 11 }}>DÍA</label>
          <input
            id="dp-dd"
            inputMode="numeric"
            placeholder="DD"
            maxLength={2}
            value={day}
            style={{ width: 58, textAlign: "center", fontSize: 15, padding: "8px 6px" }}
            onKeyDown={onlyDigits}
            onChange={handleDay}
          />
        </div>

        <span style={{ fontSize: 18, paddingBottom: 10 }}>/</span>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: 11 }}>MES</label>
          <input
            id="dp-mm"
            ref={mmRef}
            inputMode="numeric"
            placeholder="MM"
            maxLength={2}
            value={month}
            style={{ width: 58, textAlign: "center", fontSize: 15, padding: "8px 6px" }}
            onKeyDown={onlyDigits}
            onChange={handleMonth}
          />
        </div>

        <span style={{ fontSize: 18, paddingBottom: 10 }}>/</span>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: 11 }}>AÑO</label>
          <input
            id="dp-yyyy"
            ref={yyyyRef}
            inputMode="numeric"
            placeholder="AAAA"
            maxLength={4}
            value={year}
            style={{ width: 76, textAlign: "center", fontSize: 15, padding: "8px 6px" }}
            onKeyDown={onlyDigits}
            onChange={handleYear}
          />
        </div>
      </div>

      {status?.error && (
        <p style={{ color: "red", fontSize: 13, marginTop: 8 }}>{status.error}</p>
      )}
      {status?.result && (
        <p style={{ fontSize: 14, marginTop: 12 }}>{status.result}</p>
      )}
    </div>
  );
}