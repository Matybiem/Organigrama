import { useOrganigramaState } from '../hooks/useOrganigramaState';
import FuncionarioModal from '../components/common/FuncionarioModal';
import LoginModal from '../components/common/LoginModal';
import { INITIAL_AREAS, INITIAL_BITACORA } from '../data/mockData';
import Dashboard from './Dashboard';
import OrganigramaTree from '../components/organigrama/OrganigramaTree';
import AreaDetalle from './AreaDetalle';
import Areas from './Areas';
import {
  Building2,
  Search,
  LogIn,
  LogOut,
  Moon,
  Sun,
  Settings,
  GitFork
} from 'lucide-react';

export default function Organigrama() {
  const state = useOrganigramaState(INITIAL_AREAS, INITIAL_BITACORA);
  const {
    currentView, setCurrentView, setSelectedAreaId,
    isDarkMode, setIsDarkMode, searchQuery, setSearchQuery,
    isLoggedIn, showLoginModal, setShowLoginModal, loginUser, setLoginUser,
    loginPass, setLoginPass, loginError, selectedFuncionario, setSelectedFuncionario,
    zoomLevel, setZoomLevel, isFullscreen, setIsFullscreen, areasList,
    handleLogin, handleLogout, currentArea, filteredSearch, totalFuncionariosCount
  } = state;

  return (
    <div className={`min-h-screen flex flex-col md:flex-row text-slate-100 font-sans ${isDarkMode ? 'bg-[#0b0f19]' : 'bg-slate-100 text-slate-900'}`}>
      
      {/* SIDEBAR FIXED LEFT */}
      <aside className={`w-full md:w-64 flex-shrink-0 flex flex-col justify-between border-r ${isDarkMode ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 text-slate-800'}`}>
        <div>
          {/* LOGO */}
          <div className="p-4 border-b border-slate-800/50 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20">
              DO
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight text-white leading-tight">Directorio Org.</h1>
              <p className="text-xs text-slate-400">Sistema Jerárquico</p>
            </div>
          </div>

          {/* NAVIGATION BUTTONS */}
          <nav className="p-3 space-y-2">
            <button
              onClick={() => setCurrentView('organigrama')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                currentView === 'organigrama'
                  ? 'bg-slate-800 text-white shadow-lg shadow-black/20 border border-slate-700'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <GitFork className="w-5 h-5 text-blue-400" />
              <span>Organigrama</span>
            </button>

            <button
              onClick={() => setCurrentView('areas')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                currentView === 'areas' || currentView === 'detalle_area'
                  ? 'bg-slate-800 text-white shadow-lg shadow-black/20 border border-slate-700'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Building2 className="w-5 h-5 text-emerald-400" />
              <span>Áreas</span>
            </button>

            {isLoggedIn && (
              <button
                onClick={() => setCurrentView('panel_admin')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  currentView === 'panel_admin'
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-lg'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <Settings className="w-5 h-5 text-indigo-400" />
                <span>Panel Administrativo</span>
              </button>
            )}
          </nav>
        </div>

        {/* SIDEBAR FOOTER */}
        <div className="p-4 border-t border-slate-800/50 flex items-center justify-between text-xs text-slate-500">
          <span>Directorio Org.</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono">v1.0.0</span>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
        
        {/* TOP HEADER */}
        <header className={`h-16 px-6 border-b flex items-center justify-between gap-4 sticky top-0 z-30 ${isDarkMode ? 'bg-[#111827]/90 backdrop-blur-md border-slate-800' : 'bg-white/90 backdrop-blur-md border-slate-200'}`}>
          {/* SEARCH BAR */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar funcionario, área o cargo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-sm bg-slate-900/60 border border-slate-700/60 focus:outline-none focus:border-blue-500 text-slate-200 placeholder-slate-500 transition"
            />

            {/* SEARCH RESULTS DROPDOWN */}
            {filteredSearch && (
              <div className="absolute top-full mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 p-3 space-y-3 max-h-80 overflow-y-auto">
                {filteredSearch.matchedAreas.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Áreas</p>
                    {filteredSearch.matchedAreas.map(a => (
                      <div
                        key={a.id}
                        onClick={() => {
                          setSelectedAreaId(a.id);
                          setCurrentView('detalle_area');
                          setSearchQuery('');
                        }}
                        className="p-2 rounded-lg hover:bg-slate-800 cursor-pointer text-xs font-medium text-emerald-400 flex justify-between"
                      >
                        <span>{a.nombre}</span>
                        <span className="text-slate-500">{a.funcionariosCount} funcs</span>
                      </div>
                    ))}
                  </div>
                )}

                {filteredSearch.matchedFuncionarios.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Funcionarios</p>
                    {filteredSearch.matchedFuncionarios.map((f, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedFuncionario(f);
                          setSearchQuery('');
                        }}
                        className="p-2 rounded-lg hover:bg-slate-800 cursor-pointer text-xs flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium text-slate-200">{f.nombre}</p>
                          <p className="text-slate-400 text-[11px]">{f.cargo}</p>
                        </div>
                        <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-blue-400">{f.areaNombre}</span>
                      </div>
                    ))}
                  </div>
                )}

                {filteredSearch.matchedAreas.length === 0 && filteredSearch.matchedFuncionarios.length === 0 && (
                  <p className="text-xs text-slate-500 text-center py-2">No se encontraron resultados.</p>
                )}
              </div>
            )}
          </div>

          {/* HEADER CONTROLS */}
          <div className="flex items-center gap-3">
            {/* DARK MODE TOGGLE */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl border border-slate-700/80 hover:bg-slate-800 text-slate-300 transition"
              title="Cambiar tema"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* AUTH BUTTON */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Admin
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-xl border border-red-500/30 hover:bg-red-500/10 text-red-400 text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-2 transition shadow-md"
              >
                <LogIn className="w-4 h-4 text-blue-400" />
                <span>Iniciar sesión</span>
              </button>
            )}
          </div>
        </header>

        {/* DYNAMIC CONTENT VIEWS */}
        <main className="p-6 flex-1">
          
          {/* 1. ORGANIGRAMA VIEW */}
          <OrganigramaTree
            areasCount={areasList.length}
            totalFuncionariosCount={totalFuncionariosCount}
            zoomLevel={zoomLevel}
            setZoomLevel={setZoomLevel}
            isFullscreen={isFullscreen}
            setIsFullscreen={setIsFullscreen}
            onSelectArea={(areaId) => { setSelectedAreaId(areaId); setCurrentView('detalle_area'); }}
          />

          {/* 2. AREAS GRID VIEW */}
          {currentView === 'areas' && (
            <Areas
              areas={areasList}
              onSelectArea={(areaId) => {
                setSelectedAreaId(areaId);
                setCurrentView('detalle_area');
              }}
            />
          )}

          {/* 3. AREA DETAILED VIEW */}
          {currentView === 'detalle_area' && currentArea && (
            <AreaDetalle
              area={currentArea}
              onBack={() => setCurrentView('organigrama')}
            />
          )}

          {/* 4. ADMIN PANEL VIEW (ER MODEL & FLOWCHART BASED) */}
          <Dashboard state={state} />

        </main>
      </div>

      {showLoginModal && (
        <LoginModal
          loginError={loginError}
          loginUser={loginUser}
          loginPass={loginPass}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          onUserChange={setLoginUser}
          onPasswordChange={setLoginPass}
        />
      )}

      {selectedFuncionario && (
        <FuncionarioModal
          funcionario={selectedFuncionario}
          onClose={() => setSelectedFuncionario(null)}
        />
      )}
    </div>
  );
}