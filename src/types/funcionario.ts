export interface Funcionario {
  id: number;
  nombre: string;
  cargo: string;
  iniciales: string;
  avatarBg: string;
  tags: string[];
  email: string;
  telefono: string;
  areaNombre?: string;
  areaId?: number;
}
