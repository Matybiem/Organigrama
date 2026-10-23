import { Mail, Phone, X } from 'lucide-react';
import type { Funcionario } from '../../types/funcionario';

interface FuncionarioModalProps {
  funcionario: Funcionario;
  onClose: () => void;
}

export default function FuncionarioModal({ funcionario, onClose }: FuncionarioModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111827] border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
          <div className={`w-14 h-14 rounded-full ${funcionario.avatarBg || 'bg-blue-600'} flex items-center justify-center text-white font-bold text-lg`}>
            {funcionario.iniciales || 'FN'}
          </div>
          <div>
            <h3 className="font-bold text-white text-base">{funcionario.nombre}</h3>
            <p className="text-xs text-slate-400">{funcionario.cargo}</p>
            <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20 mt-1 inline-block">
              {funcionario.areaNombre || 'Área Institucional'}
            </span>
          </div>
        </div>

        <div className="space-y-3 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-slate-500" />
            <span>{funcionario.email || 'sin-correo@santotomas.cl'}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-slate-500" />
            <span>{funcionario.telefono || 'Sin teléfono'}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
