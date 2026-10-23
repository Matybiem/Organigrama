import { Building2, GitFork, Mail, MapPin, Maximize2, Minimize2, Users, X, ZoomIn, ZoomOut } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

interface OrganigramaTreeProps {
  areasCount: number;
  totalFuncionariosCount: number;
  zoomLevel: number;
  setZoomLevel: Dispatch<SetStateAction<number>>;
  isFullscreen: boolean;
  setIsFullscreen: Dispatch<SetStateAction<boolean>>;
  onSelectArea: (areaId: number) => void;
}

export default function OrganigramaTree({
  areasCount, totalFuncionariosCount, zoomLevel, setZoomLevel,
  isFullscreen, setIsFullscreen, onSelectArea
}: OrganigramaTreeProps) {
  return (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* PAGE HEADING */}
              <div className="text-center space-y-2 py-2">
                <h2 className="text-3xl font-extrabold tracking-tight text-white">Directorio Organizacional</h2>
                <p className="text-sm text-slate-400 max-w-xl mx-auto">
                  Explora nuestro organigrama interactivo. Haz clic en cualquier área o funcionario para ver más detalles sobre sus responsabilidades.
                </p>
              </div>

              {/* KPI STATS CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-xl">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Áreas</p>
                    <p className="text-3xl font-black text-white mt-1">{areasCount}</p>
                  </div>
                  <div className="p-3 bg-slate-800/80 rounded-xl text-slate-300">
                    <Building2 className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-xl">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Funcionarios</p>
                    <p className="text-3xl font-black text-white mt-1">{totalFuncionariosCount}</p>
                  </div>
                  <div className="p-3 bg-slate-800/80 rounded-xl text-slate-300">
                    <Users className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-xl">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Ubicaciones</p>
                    <p className="text-3xl font-black text-white mt-1">8</p>
                  </div>
                  <div className="p-3 bg-slate-800/80 rounded-xl text-slate-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* ORGANIGRAMA TREE CONTAINER */}
              <div className="bg-[#111827] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative">
                {/* TOOLBAR CONTROLS */}
                <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                  <h3 className="font-bold text-lg text-white flex items-center gap-2">
                    <GitFork className="w-5 h-5 text-blue-400" />
                    Organigrama
                  </h3>
                  
                  <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
                    <button
                      onClick={() => setZoomLevel(prev => Math.min(prev + 10, 150))}
                      className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 transition"
                      title="Acercar"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono px-2 text-slate-400">{zoomLevel}%</span>
                    <button
                      onClick={() => setZoomLevel(prev => Math.max(prev - 10, 60))}
                      className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 transition"
                      title="Alejar"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <div className="h-4 w-px bg-slate-700 my-auto"></div>
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 transition"
                      title="Pantalla Completa"
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* GRAPH CANVAS WITH SCROLL AND ZOOM */}
                <div className={`p-8 overflow-x-auto min-h-[550px] bg-[#0c101d] flex justify-center ${isFullscreen ? 'fixed inset-0 z-50 p-12 bg-[#0c101d]' : ''}`}>
                  {isFullscreen && (
                    <button
                      onClick={() => setIsFullscreen(false)}
                      className="absolute top-4 right-4 z-50 bg-slate-800 p-2 rounded-xl text-white hover:bg-slate-700"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  )}

                  {/* ORGANIGRAM TREE TREE VISUAL STRUCTURE */}
                  <div
                    style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                    className="transition-transform duration-200 flex flex-col items-center min-w-[900px] py-4 space-y-8"
                  >
                    {/* LEVEL 1: DIRECTORA DAO */}
                    <div className="relative group">
                      <div
                        onClick={() => onSelectArea(5)}
                        className="bg-white text-slate-900 border-2 border-cyan-400 rounded-2xl p-4 w-80 text-center shadow-xl hover:shadow-cyan-500/20 hover:scale-105 transition cursor-pointer relative z-10"
                      >
                        <span className="text-[10px] uppercase tracking-wider font-bold text-cyan-700 bg-cyan-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                          Directora de Administración y Operaciones (DAO)
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm">Jessica Pamela Muñoz Céspedes</h4>
                        <p className="text-xs text-slate-600 mt-1 flex items-center justify-center gap-1">
                          <Mail className="w-3 h-3 text-cyan-600" /> jmunozc@santotomas.cl
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 font-mono">22 510 5854</p>
                      </div>
                      
                      {/* CONNECTOR LINE DOWN */}
                      <div className="w-0.5 h-8 bg-cyan-400/80 mx-auto"></div>
                    </div>

                    {/* LEVEL 2: SUB-DEPARTMENTS (OPERACIONES, SOPORTE TI, COMPRAS, PREVENCION) */}
                    <div className="w-full relative">
                      {/* HORIZONTAL CONNECTOR LINE */}
                      <div className="absolute top-0 left-[15%] right-[15%] h-0.5 bg-cyan-400/80"></div>

                      <div className="grid grid-cols-4 gap-6 pt-8">
                        {/* 1. OPERACIONES BRANCH */}
                        <div className="flex flex-col items-center relative">
                          <div className="absolute -top-8 w-0.5 h-8 bg-cyan-400/80"></div>
                          
                          <div
                            onClick={() => onSelectArea(1)}
                            className="bg-slate-900 border border-cyan-400/60 text-cyan-300 font-bold px-4 py-2 rounded-xl text-xs mb-6 shadow-md hover:bg-slate-800 cursor-pointer"
                          >
                            Operaciones
                          </div>

                          <div className="w-full space-y-4">
                            <div className="bg-white text-slate-900 p-3 rounded-xl border border-slate-300 text-center shadow hover:scale-102 transition cursor-pointer">
                              <p className="text-[10px] font-bold text-blue-600 uppercase">Jefe de Operaciones Diurno</p>
                              <p className="font-semibold text-xs mt-0.5">Custodio Oliva Solís</p>
                              <p className="text-[11px] text-slate-500 font-mono mt-1">coliva@santotomas.cl</p>
                              <p className="text-[10px] text-slate-400">22 510 5839</p>
                            </div>

                            <div className="bg-white text-slate-900 p-3 rounded-xl border border-slate-300 text-center shadow hover:scale-102 transition cursor-pointer">
                              <p className="text-[10px] font-bold text-blue-600 uppercase">Jefe de Operaciones Vespertino</p>
                              <p className="font-semibold text-xs mt-0.5">Ricardo Oyarce Pérez</p>
                              <p className="text-[11px] text-slate-500 font-mono mt-1">royarcep@santotomas.cl</p>
                              <p className="text-[10px] text-slate-400">22 510 5840</p>
                            </div>
                          </div>
                        </div>

                        {/* 2. SOPORTE TI BRANCH */}
                        <div className="flex flex-col items-center relative col-span-2">
                          <div className="absolute -top-8 w-0.5 h-8 bg-cyan-400/80"></div>
                          
                          <div
                            onClick={() => onSelectArea(8)}
                            className="bg-slate-900 border border-cyan-400/60 text-cyan-300 font-bold px-4 py-2 rounded-xl text-xs mb-4 shadow-md hover:bg-slate-800 cursor-pointer"
                          >
                            Soporte TI
                          </div>

                          {/* JEFE SOPORTE */}
                          <div
                            onClick={() => onSelectArea(8)}
                            className="bg-white text-slate-900 p-3 rounded-xl border border-slate-300 text-center shadow w-72 mb-6 hover:scale-102 transition cursor-pointer"
                          >
                            <p className="text-[10px] font-bold text-purple-600 uppercase">Jefe de Soporte TI</p>
                            <p className="font-semibold text-xs mt-0.5">PATRICIO ABRAHAM BASUALTO SEPÚLVEDA</p>
                            <p className="text-[11px] text-slate-500 font-mono mt-1">pbasualto@santotomas.cl</p>
                            <p className="text-[10px] text-slate-400">22 510 5846</p>
                          </div>

                          {/* SUB-NODES SOPORTE ASISTENTES */}
                          <div className="relative w-full">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-cyan-400/60"></div>
                            <div className="grid grid-cols-4 gap-2 pt-2">
                              {[
                                { name: 'MATÍAS BENAVIDES', role: 'Asistente Soporte TI', email: 'mbenavides8@santotomas.cl', phone: '22 510 5845' },
                                { name: 'CRISTIAN CID AVALOS', role: 'Asistente Soporte TI', email: 'ccid15@santotomas.cl', phone: '22 510 5847' },
                                { name: 'KEVIN MORAGA DIAZ', role: 'Asistente Soporte TI', email: 'kmoraga3@santotomas.cl', phone: '22 510 5845' },
                                { name: 'VIRGILIO HERRERA JARA', role: 'Asistente Soporte TI - CEO', email: 'vherrera148@santotomas.cl', phone: '22 510 58XX' }
                              ].map((item, idx) => (
                                <div key={idx} className="bg-white text-slate-900 p-2.5 rounded-xl border border-slate-300 text-center text-[10px] shadow hover:border-cyan-500 cursor-pointer">
                                  <p className="font-bold text-[9px] text-slate-500 uppercase">{item.role}</p>
                                  <p className="font-bold text-slate-800 mt-0.5 leading-tight">{item.name}</p>
                                  <p className="text-[9px] text-slate-500 truncate mt-1">{item.email}</p>
                                  <p className="text-[9px] text-slate-400">{item.phone}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* 3. STAFF ADICIONAL (COMPRAS & PREVENCION) */}
                        <div className="flex flex-col items-center relative space-y-4">
                          <div className="absolute -top-8 w-0.5 h-8 bg-cyan-400/80"></div>

                          <div className="bg-white text-slate-900 p-3 rounded-xl border border-slate-300 text-center shadow w-full hover:scale-102 transition cursor-pointer mt-8">
                            <p className="text-[10px] font-bold text-cyan-600 uppercase">Gestor(a) de Compras</p>
                            <p className="font-semibold text-xs mt-0.5">CINDY HENAOP CASTILLO</p>
                            <p className="text-[11px] text-slate-500 font-mono mt-1">chenao@santotomas.cl</p>
                          </div>

                          <div className="bg-white text-slate-900 p-3 rounded-xl border border-slate-300 text-center shadow w-full hover:scale-102 transition cursor-pointer">
                            <p className="text-[10px] font-bold text-cyan-600 uppercase">Prevencionista de Riesgo</p>
                            <p className="font-semibold text-xs mt-0.5">JENNIFER CAROLINA GUZMÁN</p>
                            <p className="text-[11px] text-slate-500 font-mono mt-1">jguzman17@santotomas.cl</p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  );
}
