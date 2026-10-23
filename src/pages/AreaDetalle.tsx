import { ArrowLeft, Briefcase, Building2, Clock, Mail, MapPin, Phone, Users } from 'lucide-react';
import type { Area } from '../types/area';

interface AreaDetalleProps {
  area: Area;
  onBack: () => void;
}

export default function AreaDetalle({ area, onBack }: AreaDetalleProps) {
  return (
            <div className="space-y-6 max-w-6xl mx-auto">
              {/* BACK BUTTON */}
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-800"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al organigrama</span>
              </button>

              {/* AREA HEADER CARD */}
              <div className={`bg-[#111827] rounded-2xl p-6 border border-slate-800 ${area.borderTop} space-y-5 shadow-2xl`}>
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-slate-800 text-emerald-400 border border-slate-700/60">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">{area.nombre}</h2>
                    <p className="text-sm text-slate-400 mt-1 max-w-3xl">{area.descripcion}</p>
                  </div>
                </div>

                {/* AREA METADATA CHIPS */}
                <div className="flex flex-wrap gap-3 text-xs pt-2">
                  <span className="bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300 flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    {area.funcionariosCount} funcionarios
                  </span>
                  <span className="bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    {area.ubicacion}
                  </span>
                  <span className="bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    {area.horario}
                  </span>
                </div>

                <div className="border-t border-slate-800 pt-4 flex flex-wrap gap-6 text-xs text-slate-400">
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-500" />
                    {area.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-500" />
                    {area.telefono}
                  </span>
                </div>
              </div>

              {/* STRUCTURE & TEAM SECTION */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white tracking-tight">Estructura del Área</h3>

                {/* JEFE DE AREA */}
                {area.jefe && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Jefe de Área</p>
                    
                    <div className="bg-[#111827] rounded-2xl p-5 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl relative overflow-hidden">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full ${area.jefe.avatarBg} flex items-center justify-center text-white font-bold text-lg shadow-inner shrink-0`}>
                          {area.jefe.iniciales}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-white text-base">{area.jefe.nombre}</h4>
                          <p className="text-xs text-slate-400 flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                            {area.jefe.cargo}
                          </p>

                          {/* TAGS */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {area.jefe.tags.map((tag, i) => (
                              <span key={i} className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full border border-slate-700/60">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:items-end gap-2 text-xs text-slate-400">
                        <span className="bg-slate-800/80 px-3 py-1 rounded-full text-slate-300 font-medium text-[11px] border border-slate-700/60 self-start md:self-auto">
                          Jefe de Área
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          <span>{area.jefe.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-500" />
                          <span>{area.jefe.telefono}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* EQUIPO MEMBERS */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Equipo</p>

                  {area.equipo && area.equipo.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {area.equipo.map((member) => (
                        <div
                          key={member.id}
                          className="bg-[#111827] rounded-2xl p-5 border border-slate-800 space-y-3 shadow-lg hover:border-slate-700 transition"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-full ${member.avatarBg} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                              {member.iniciales}
                            </div>
                            <div>
                              <h5 className="font-bold text-white text-sm">{member.nombre}</h5>
                              <p className="text-xs text-slate-400">{member.cargo}</p>
                            </div>
                          </div>

                          {/* TAGS */}
                          <div className="flex flex-wrap gap-1.5">
                            {member.tags.map((tag, i) => (
                              <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700/50">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="pt-2 border-t border-slate-800/60 flex flex-col gap-1 text-xs text-slate-400">
                            <div className="flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5 text-slate-500" />
                              <span className="truncate">{member.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-3.5 h-3.5 text-slate-500" />
                              <span>{member.telefono}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic p-4 bg-[#111827] rounded-xl border border-slate-800">
                      No hay integrantes adicionales registrados en este equipo.
                    </p>
                  )}
                </div>
              </div>
            </div>
  );
}
