import type { Funcionario } from './funcionario';

export type AppView = 'organigrama' | 'areas' | 'detalle_area' | 'panel_admin';
export type AdminTab = 'areas' | 'funcionarios' | 'cargos' | 'relaciones' | 'bitacora';

export interface SearchResults {
  matchedAreas: import('./area').Area[];
  matchedFuncionarios: Funcionario[];
}
