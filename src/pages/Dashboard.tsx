import { Briefcase, Building2, FileText, GitFork, Plus, Shield, Trash2, UserPlus, Users } from 'lucide-react';
import { listCargos } from '../services/cargo.service';
import type { useOrganigramaState } from '../hooks/useOrganigramaState';
import type { AdminTab } from '../types/app';

type DashboardState = ReturnType<typeof useOrganigramaState>;

interface DashboardProps {
  state: DashboardState;
}

export default function Dashboard({ state }: DashboardProps) {
  const {
    currentView, isLoggedIn, adminTab, setAdminTab, areasList, bitacora,
    newAreaName, setNewAreaName, newAreaDesc, setNewAreaDesc,
    newFuncNombre, setNewFuncNombre, newFuncCargo, setNewFuncCargo,
    newFuncArea, setNewFuncArea, newFuncEmail, setNewFuncEmail,
    addBitacora, totalFuncionariosCount, saveArea, removeArea, saveFuncionario
  } = state;

  if (currentView !== 'panel_admin' || !isLoggedIn) return null;

  return (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Shield className="w-6 h-6 text-indigo-400" />
                    Panel Administrativo
                  </h2>
                  <p className="text-sm text-slate-400">Gestión integral de áreas, cargos, funcionarios y bitácora del sistema.</p>
                </div>
              </div>

              {/* ADMIN TABS */}
              <div className="flex border-b border-slate-800 overflow-x-auto space-x-2">
                {([
                  { id: 'areas', label: 'Gestionar Áreas', icon: Building2 },
                  { id: 'funcionarios', label: 'Gestionar Funcionarios', icon: Users },
                  { id: 'cargos', label: 'Gestionar Cargos', icon: Briefcase },
                  { id: 'relaciones', label: 'Relaciones Jerárquicas', icon: GitFork },
                  { id: 'bitacora', label: 'Consultar Bitácora', icon: FileText }
                ] satisfies { id: AdminTab; label: string; icon: typeof Building2 }[]).map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setAdminTab(tab.id)}
                      className={`px-4 py-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
                        adminTab === tab.id
                          ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10 rounded-t-xl'
                          : 'border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* ADMIN TAB CONTENT */}
              <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-xl">
                
                {/* TAB 1: GESTIONAR AREAS */}
                {adminTab === 'areas' && (
                  <div className="space-y-6">
                    <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                        <Plus className="w-4 h-4 text-emerald-400" /> Crear Nueva Área
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Nombre del Área"
                          value={newAreaName}
                          onChange={(e) => setNewAreaName(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Descripción breve"
                          value={newAreaDesc}
                          onChange={(e) => setNewAreaDesc(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <button
                        onClick={() => {
                          if (!newAreaName) return;
                          saveArea();
                        }}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition"
                      >
                        Guardar Área
                      </button>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-sm text-slate-300">Áreas Existentes</h4>
                      <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden">
                        {areasList.map(a => (
                          <div key={a.id} className="p-3 bg-slate-900/40 flex items-center justify-between text-xs">
                            <div>
                              <p className="font-bold text-white">{a.nombre}</p>
                              <p className="text-slate-400 text-[11px]">{a.descripcion}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">Activo</span>
                              <button
                                onClick={() => {
                                  removeArea(a);
                                }}
                                className="p-1 hover:bg-red-500/20 text-red-400 rounded"
                                title="Eliminar/Inactivar"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: GESTIONAR FUNCIONARIOS */}
                {adminTab === 'funcionarios' && (
                  <div className="space-y-6">
                    <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                        <UserPlus className="w-4 h-4 text-blue-400" /> Registrar Nuevo Funcionario
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Nombre Completo"
                          value={newFuncNombre}
                          onChange={(e) => setNewFuncNombre(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Cargo"
                          value={newFuncCargo}
                          onChange={(e) => setNewFuncCargo(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                        />
                        <input
                          type="email"
                          placeholder="Correo institucional"
                          value={newFuncEmail}
                          onChange={(e) => setNewFuncEmail(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                        />
                        <select
                          value={newFuncArea}
                          onChange={(e) => setNewFuncArea(Number(e.target.value))}
                          className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                        >
                          {areasList.map(a => (
                            <option key={a.id} value={a.id}>{a.nombre}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={() => {
                          saveFuncionario();
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition"
                      >
                        Registrar Funcionario
                      </button>
                    </div>

                    <p className="text-xs text-slate-400">Total registrados: {totalFuncionariosCount} funcionarios.</p>
                  </div>
                )}

                {/* TAB 3: CARGOS */}
                {adminTab === 'cargos' && (
                  <div className="space-y-4 text-xs text-slate-300">
                    <p className="font-bold text-sm text-white">Catálogo de Cargos</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {listCargos().map((cargo) => (
                        <div key={cargo.nombre} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                          <span>{cargo.nombre}</span>
                          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Activo</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: RELACIONES JERARQUICAS */}
                {adminTab === 'relaciones' && (
                  <div className="space-y-4 text-xs text-slate-300">
                    <h4 className="font-bold text-sm text-white">Modificar Estructura de Jefaturas</h4>
                    <p className="text-slate-400">Asigne o cambie la jefatura directa de cada área del directorio.</p>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <label className="block text-slate-400 text-[11px]">Seleccionar Área</label>
                      <select className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-white">
                        {areasList.map(a => <option key={a.id}>{a.nombre}</option>)}
                      </select>
                      <button
                        onClick={() => addBitacora('Relaciones', 'Asignar Jefatura', 'Se modificó relación de jefatura')}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold"
                      >
                        Actualizar Relación
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 5: BITACORA DE AUDITORIA */}
                {adminTab === 'bitacora' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-sm text-white">Bitácora de Eventos y Auditoría</h4>
                      <span className="text-xs text-slate-400">{bitacora.length} registros</span>
                    </div>

                    <div className="overflow-x-auto border border-slate-800 rounded-xl">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-slate-900/80 text-slate-400 text-[11px] uppercase border-b border-slate-800">
                          <tr>
                            <th className="p-3">ID</th>
                            <th className="p-3">Fecha y Hora</th>
                            <th className="p-3">Módulo</th>
                            <th className="p-3">Acción</th>
                            <th className="p-3">Detalle</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                          {bitacora.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-900/40">
                              <td className="p-3 text-slate-500">#{row.id}</td>
                              <td className="p-3 text-slate-400">{row.fecha}</td>
                              <td className="p-3 font-semibold text-blue-400">{row.modulo}</td>
                              <td className="p-3 text-emerald-400">{row.accion}</td>
                              <td className="p-3 text-slate-300 font-sans">{row.detalle}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>
            </div>
  );
}
