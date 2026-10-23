import type { BitacoraEntry } from '../types/bitacora';

export function createBitacoraEntry(
  modulo: string,
  accion: string,
  detalle: string
): BitacoraEntry {
  const now = new Date();

  return {
    id: Date.now(),
    fecha: now.toISOString().replace('T', ' ').substring(0, 19),
    modulo,
    accion,
    detalle
  };
}
