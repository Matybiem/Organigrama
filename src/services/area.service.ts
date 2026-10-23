import type { Area, NewAreaInput } from '../types/area';

export function createArea(input: NewAreaInput): Area {
  return {
    id: Date.now(),
    nombre: input.nombre,
    colorBar: 'bg-blue-500',
    borderTop: 'border-t-4 border-blue-500',
    descripcion: input.descripcion || 'Área institucional',
    funcionariosCount: 0,
    ubicacion: 'Edificio Central',
    horario: 'Lunes a Viernes 8:00 - 17:00',
    email: 'contacto@santotomas.cl',
    telefono: '22 510 0000',
    jefe: null,
    equipo: []
  };
}
