import { ArrowRight, Building2, Clock, MapPin, Users } from 'lucide-react';
import type { Area } from '../types/area';

interface AreasProps {
  areas: Area[];
  onSelectArea: (areaId: number) => void;
}

export default function Areas({ areas, onSelectArea }: AreasProps) {
  return (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Áreas Organizacionales</h2>
                <p className="text-sm text-slate-400 mt-1">Selecciona una de las áreas para consultar su plantilla y estructura completa.</p>
              </div>

              {/* GRID OF AREAS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {areas.map((area) => (
                  <div
                    key={area.id}
                    className={`bg-[#111827] rounded-2xl p-5 border border-slate-800 ${area.borderTop} flex flex-col justify-between hover:shadow-2xl hover:border-slate-700 transition group`}
                  >
                    <div className="space-y-4">
                      {/* HEADER TITLE & ICON */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-100 group-hover:text-blue-400 transition">{area.nombre}</h3>
                            <span className="text-xs bg-slate-800/80 px-2 py-0.5 rounded-md text-slate-400 font-medium inline-flex items-center gap-1 mt-1">
                              <Users className="w-3 h-3" /> {area.funcionariosCount} funcionarios
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                        {area.descripcion}
                      </p>

                      <div className="space-y-1.5 text-xs text-slate-400 border-t border-slate-800/60 pt-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="truncate">{area.ubicacion}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="truncate">{area.horario}</span>
                        </div>
                      </div>
                    </div>

                    {/* VIEW DETAILS LINK */}
                    <div className="pt-5 mt-4 border-t border-slate-800/40">
                      <button
                        onClick={() => onSelectArea(area.id)}
                        className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-slate-200 hover:text-blue-400 py-2 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 transition"
                      >
                        <span>Ver detalles</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  );
}
