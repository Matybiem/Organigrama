import type { FormEventHandler } from 'react';
import { Lock, User, X } from 'lucide-react';

interface LoginModalProps {
  loginError: string;
  loginUser: string;
  loginPass: string;
  onClose: () => void;
  onLogin: FormEventHandler<HTMLFormElement>;
  onUserChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
}

export default function LoginModal({
  loginError,
  loginUser,
  loginPass,
  onClose,
  onLogin,
  onUserChange,
  onPasswordChange
}: LoginModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111827] border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 rounded-2xl mx-auto flex items-center justify-center text-blue-400 mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Iniciar Sesión</h3>
          <p className="text-xs text-slate-400">Acceso al Panel Administrativo del Directorio</p>
        </div>

        {loginError && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center">
            {loginError}
          </div>
        )}

        <form onSubmit={onLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Usuario</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={loginUser}
                onChange={(event) => onUserChange(event.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                placeholder="Usuario"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Contraseña</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                value={loginPass}
                onChange={(event) => onPasswordChange(event.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-500/20 transition"
          >
            Ingresar al Sistema
          </button>
        </form>

        <div className="text-[11px] text-slate-500 text-center border-t border-slate-800/80 pt-3">
          Credenciales de prueba: <span className="text-slate-300 font-mono">admin / 1234</span>
        </div>
      </div>
    </div>
  );
}
