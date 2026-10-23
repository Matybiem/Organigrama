import type { Funcionario } from '../types/funcionario';

export interface NewFuncionarioInput {
  nombre: string;
  cargo: string;
  email: string;
}

export function createFuncionario(input: NewFuncionarioInput): Funcionario {
  return {
    id: Date.now(),
    nombre: input.nombre,
    cargo: input.cargo || 'Funcionario',
    iniciales: input.nombre.split(' ').map((nombre) => nombre[0]).join('').substring(0, 2),
    avatarBg: 'bg-blue-600',
    tags: ['Nuevo'],
    email: input.email || 'correo@santotomas.cl',
    telefono: '22 510 0000'
  };
}
