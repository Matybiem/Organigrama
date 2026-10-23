import type { Funcionario } from './funcionario';

export interface Area {
  id: number;
  nombre: string;
  colorBar: string;
  borderTop: string;
  descripcion: string;
  funcionariosCount: number;
  ubicacion: string;
  horario: string;
  email: string;
  telefono: string;
  jefe: Funcionario | null;
  equipo: Funcionario[];
}

export interface NewAreaInput {
  nombre: string;
  descripcion: string;
}
