// Minimal RFC-4180 CSV parse/stringify. No external dependency.

export function parseCSV(text) {
  const rows = [];
  let i = 0;
  let field = "";
  let row = [];
  let inQuotes = false;
  while (i < text.length) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (c === ",") {
      row.push(field);
      field = "";
      i++;
      continue;
    }
    if (c === "\r") {
      i++;
      continue;
    }
    if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      i++;
      continue;
    }
    field += c;
    i++;
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

export function loadCSV(path, fs) {
  const text = fs.readFileSync(path, "utf8");
  const rows = parseCSV(text);
  const header = rows[0];
  const idx = Object.fromEntries(header.map((h, i) => [h, i]));
  const data = rows.slice(1).filter((r) => r.length > 1 && r.some((x) => x !== ""));
  return { header, idx, data };
}

// Converts a loadCSV() result's raw row arrays into plain objects keyed by
// header name, trimming BOM on the first header cell. Row order preserved.
export function toObjects({ header, data }) {
  const h = header.map((c, i) => (i === 0 ? c.replace(/^﻿/, "") : c));
  return data.map((row) => Object.fromEntries(h.map((col, i) => [col, row[i] ?? ""])));
}

function csvField(value) {
  const s = value === null || value === undefined ? "" : String(value);
  if (/[",\n\r]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

export function stringifyCSV(columns, rows) {
  const lines = [columns.join(",")];
  for (const row of rows) {
    lines.push(columns.map((col) => csvField(row[col])).join(","));
  }
  return lines.join("\n") + "\n";
}
