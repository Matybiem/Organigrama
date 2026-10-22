import React, { useState, useMemo } from 'react';
import {
  Building2,
  Users,
  MapPin,
  Clock,
  Mail,
  Phone,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ArrowLeft,
  ArrowRight,
  LogIn,
  LogOut,
  Moon,
  Sun,
  Shield,
  Briefcase,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  FileText,
  UserPlus,
  Settings,
  ChevronRight,
  ChevronDown,
  Layers,
  Award,
  X,
  Check,
  Lock,
  User,
  Activity,
  GitFork
} from 'lucide-react';

const INITIAL_AREAS = [
  {
    id: 1,
    nombre: 'Administración',
    colorBar: 'bg-emerald-500',
    borderTop: 'border-t-4 border-emerald-500',
    descripcion: 'Maneja los procesos administrativos, financieros y de recursos humanos.',
    funcionariosCount: 3,
    ubicacion: 'Edificio Principal, Piso 2',
    horario: 'Lunes a Viernes 8:00 - 17:00',
    email: 'admin@ejemplo.com',
    telefono: '+1 234 567 003',
    jefe: {
      id: 101,
      nombre: 'C.P. María López',
      cargo: 'Directora Administrativa',
      iniciales: 'CL',
      avatarBg: 'bg-purple-600',
      tags: ['Gestión administrativa', 'Recursos humanos', 'Presupuesto'],
      email: 'm.lopez@ejemplo.com',
      telefono: '+1 234 567 301'
    },
    equipo: [
      {
        id: 102,
        nombre: 'C.P. Jorge Ramírez',
        cargo: 'Jefe de Contabilidad',
        iniciales: 'CR',
        avatarBg: 'bg-emerald-600',
        tags: ['Contabilidad', 'Nómina', 'Estados financieros'],
        email: 'j.ramirez@ejemplo.com',
        telefono: '+1 234 567 302'
      },
      {
        id: 103,
        nombre: 'Lic. Patricia Castro',
        cargo: 'Jefa de Recursos Humanos',
        iniciales: 'LC',
        avatarBg: 'bg-cyan-600',
        tags: ['Reclutamiento', 'Capacitación', 'Nómina'],
        email: 'p.castro@ejemplo.com',
        telefono: '+1 234 567 303'
      }
    ]
  },
  {
    id: 2,
    nombre: 'Biblioteca',
    colorBar: 'bg-amber-500',
    borderTop: 'border-t-4 border-amber-500',
    descripcion: 'Gestiona los recursos bibliográficos y servicios de información.',
    funcionariosCount: 2,
    ubicacion: 'Edificio Central, Piso 1',
    horario: 'Lunes a Sábado 7:00 - 20:00',
    email: 'biblioteca@santotomas.cl',
    telefono: '+1 234 567 004',
    jefe: {
      id: 201,
      nombre: 'Lic. Roberto Solís',
      cargo: 'Jefe de Biblioteca',
      iniciales: 'RS',
      avatarBg: 'bg-amber-600',
      tags: ['Catalogación', 'Archivos', 'Servicios Digitales'],
      email: 'rsolis@santotomas.cl',
      telefono: '+1 234 567 304'
    },
    equipo: [
      {
        id: 202,
        nombre: 'Ana María Torres',
        cargo: 'Asistente de Biblioteca',
        iniciales: 'AT',
        avatarBg: 'bg-amber-700',
        tags: ['Atención a Usuarios', 'Préstamos'],
        email: 'atorres@santotomas.cl',
        telefono: '+1 234 567 305'
      }
    ]
  },
  {
    id: 3,
    nombre: 'Bienestar Estudiantil',
    colorBar: 'bg-pink-500',
    borderTop: 'border-t-4 border-pink-500',
    descripcion: 'Apoyo integral a estudiantes: psicología, salud, deportes y cultura.',
    funcionariosCount: 2,
    ubicacion: 'Edificio C, Piso 2',
    horario: 'Lunes a Viernes 8:00 - 17:00',
    email: 'bienestar@santotomas.cl',
    telefono: '+1 234 567 005',
    jefe: {
      id: 301,
      nombre: 'Dra. Elena Gómez',
      cargo: 'Directora de Bienestar',
      iniciales: 'EG',
      avatarBg: 'bg-pink-600',
      tags: ['Psicología', 'Becas', 'Orientación'],
      email: 'egomez@santotomas.cl',
      telefono: '+1 234 567 306'
    },
    equipo: [
      {
        id: 302,
        nombre: 'Gonzalo Morales',
        cargo: 'Coordinador Deportivo',
        iniciales: 'GM',
        avatarBg: 'bg-pink-700',
        tags: ['Deportes', 'Eventos'],
        email: 'gmorales@santotomas.cl',
        telefono: '+1 234 567 307'
      }
    ]
  },
  {
    id: 4,
    nombre: 'Dirección Académica',
    colorBar: 'bg-blue-500',
    borderTop: 'border-t-4 border-blue-500',
    descripcion: 'Gestiona los programas académicos, currículos y procesos de enseñanza-aprendizaje.',
    funcionariosCount: 3,
    ubicacion: 'Edificio A, Piso 3',
    horario: 'Lunes a Viernes 8:00 - 16:00',
    email: 'academica@santotomas.cl',
    telefono: '+1 234 567 006',
    jefe: {
      id: 401,
      nombre: 'Dr. Carlos Mendoza',
      cargo: 'Director Académico',
      iniciales: 'CM',
      avatarBg: 'bg-blue-600',
      tags: ['Curriculum', 'Acreditación', 'Docencia'],
      email: 'cmendoza@santotomas.cl',
      telefono: '+1 234 567 308'
    },
    equipo: [
      {
        id: 402,
        nombre: 'Marta Riquelme',
        cargo: 'Coordinadora Curricular',
        iniciales: 'MR',
        avatarBg: 'bg-blue-700',
        tags: ['Planes de Estudio', 'Docentes'],
        email: 'mriquelme@santotomas.cl',
        telefono: '+1 234 567 309'
      }
    ]
  },
  {
    id: 5,
    nombre: 'Dirección General',
    colorBar: 'bg-orange-500',
    borderTop: 'border-t-4 border-orange-500',
    descripcion: 'Responsable de la dirección estratégica y toma de decisiones de la organización.',
    funcionariosCount: 2,
    ubicacion: 'Edificio Principal, Piso 5',
    horario: 'Lunes a Viernes 8:00 - 17:00',
    email: 'direccion@santotomas.cl',
    telefono: '+1 234 567 007',
    jefe: {
      id: 501,
      nombre: 'Jessica Pamela Muñoz Céspedes',
      cargo: 'Directora de Administración y Operaciones (DAO)',
      iniciales: 'JM',
      avatarBg: 'bg-orange-600',
      tags: ['Estrategia', 'Dirección General', 'Gobierno'],
      email: 'jmunozc@santotomas.cl',
      telefono: '22 510 5854'
    },
    equipo: []
  },
  {
    id: 6,
    nombre: 'Extensión y Vinculación',
    colorBar: 'bg-red-500',
    borderTop: 'border-t-4 border-red-500',
    descripcion: 'Gestiona la vinculación con la sociedad y programas de extensión.',
    funcionariosCount: 2,
    ubicacion: 'Edificio D, Piso 3',
    horario: 'Lunes a Viernes 8:00 - 16:00',
    email: 'extension@santotomas.cl',
    telefono: '+1 234 567 008',
    jefe: {
      id: 601,
      nombre: 'Lic. Fernando Ruiz',
      cargo: 'Jefe de Vinculación',
      iniciales: 'FR',
      avatarBg: 'bg-red-600',
      tags: ['Convenios', 'Comunidad', 'Egresados'],
      email: 'fruiz@santotomas.cl',
      telefono: '+1 234 567 310'
    },
    equipo: []
  },
  {
    id: 7,
    nombre: 'Investigación',
    colorBar: 'bg-cyan-500',
    borderTop: 'border-t-4 border-cyan-500',
    descripcion: 'Coordina proyectos de investigación y vinculación con el sector productivo.',
    funcionariosCount: 2,
    ubicacion: 'Edificio D, Piso 4',
    horario: 'Lunes a Viernes 8:00 - 17:00',
    email: 'investigacion@santotomas.cl',
    telefono: '+1 234 567 009',
    jefe: {
      id: 701,
      nombre: 'Dr. Hernán Silva',
      cargo: 'Director de Investigación',
      iniciales: 'HS',
      avatarBg: 'bg-cyan-600',
      tags: ['Publicaciones', 'Proyectos FONDECYT', 'I+D'],
      email: 'hsilva@santotomas.cl',
      telefono: '+1 234 567 311'
    },
    equipo: []
  },
  {
    id: 8,
    nombre: 'Soporte Técnico',
    colorBar: 'bg-purple-500',
    borderTop: 'border-t-4 border-purple-500',
    descripcion: 'Proporciona soporte técnico y mantenimiento de infraestructura tecnológica.',
    funcionariosCount: 2,
    ubicacion: 'Edificio B, Sótano',
    horario: 'Lunes a Viernes 7:00 - 19:00',
    email: 'soporte@santotomas.cl',
    telefono: '+1 234 567 010',
    jefe: {
      id: 801,
      nombre: 'Patricio Abraham Basualto Sepúlveda',
      cargo: 'Jefe de Soporte TI',
      iniciales: 'PB',
      avatarBg: 'bg-purple-600',
      tags: ['Redes', 'Infraestructura', 'Soporte N2'],
      email: 'pbasualto@santotomas.cl',
      telefono: '22 510 5846'
    },
    equipo: [
      {
        id: 802,
        nombre: 'Matías Ignacio Benavides Méndez',
        cargo: 'Asistente Soporte TI',
        iniciales: 'MB',
        avatarBg: 'bg-purple-700',
        tags: ['Mantenimiento', 'Soporte N1'],
        email: 'mbenavides8@santotomas.cl',
        telefono: '22 510 5845'
      },
      {
        id: 803,
        nombre: 'Cristian Andrés Cid Avalos',
        cargo: 'Asistente Soporte TI',
        iniciales: 'CC',
        avatarBg: 'bg-purple-700',
        tags: ['Sistemas', 'Hardware'],
        email: 'ccid15@santotomas.cl',
        telefono: '22 510 5847'
      },
      {
        id: 804,
        nombre: 'Kevin Leandro Moraga Díaz',
        cargo: 'Asistente Soporte TI',
        iniciales: 'KM',
        avatarBg: 'bg-purple-700',
        tags: ['Redes', 'Soporte N1'],
        email: 'kmoraga3@santotomas.cl',
        telefono: '22 510 5845'
      },
      {
        id: 805,
        nombre: 'Virgilio Exequiel Herrera Jara',
        cargo: 'Asistente Soporte TI - CEO',
        iniciales: 'VH',
        avatarBg: 'bg-purple-800',
        tags: ['Infraestructura', 'Sistemas'],
        email: 'vherrera148@santotomas.cl',
        telefono: '22 510 58XX'
      }
    ]
  }
];

const INITIAL_BITACORA = [
  { id: 1, fecha: '2026-09-28 16:45:12', modulo: 'Áreas', accion: 'Crear Área', detalle: 'Se creó el área Soporte Técnico' },
  { id: 2, fecha: '2026-09-28 17:02:30', modulo: 'Funcionarios', accion: 'Editar Funcionario', detalle: 'Modificación de correo Patricio Basualto' },
  { id: 3, fecha: '2026-09-28 17:15:00', modulo: 'Relaciones', accion: 'Asignar Jefatura', detalle: 'Asignado Jefe de Operaciones' },
  { id: 4, fecha: '2026-09-28 17:30:10', modulo: 'Cargos', accion: 'Crear Cargo', detalle: 'Cargo Prevencionista de Riesgo agregado' }
];

export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState('organigrama'); // 'organigrama', 'areas', 'detalle_area', 'panel_admin'
  const [selectedAreaId, setSelectedAreaId] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginUser, setLoginUser] = useState('admin');
  const [loginPass, setLoginPass] = useState('1234');
  const [loginError, setLoginError] = useState('');

  // Selected Funcionario Detail Modal
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);

  // Organigrama Zoom State
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Database / System State (Dynamic)
  const [areasList, setAreasList] = useState(INITIAL_AREAS);
  const [bitacora, setBitacora] = useState(INITIAL_BITACORA);

  // Admin Tab selection
  const [adminTab, setAdminTab] = useState('areas'); // 'areas', 'funcionarios', 'cargos', 'relaciones', 'bitacora'

  // Form states for Admin management
  const [newAreaName, setNewAreaName] = useState('');
  const [newAreaDesc, setNewAreaDesc] = useState('');
  const [newFuncNombre, setNewFuncNombre] = useState('');
  const [newFuncCargo, setNewFuncCargo] = useState('');
  const [newFuncArea, setNewFuncArea] = useState(1);
  const [newFuncEmail, setNewFuncEmail] = useState('');

  // Helper function to log audit entries
  const addBitacora = (modulo, accion, detalle) => {
    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 19);
    setBitacora(prev => [
      { id: Date.now(), fecha: formattedDate, modulo, accion, detalle },
      ...prev
    ]);
  };

  // Auth Handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUser === 'admin' && loginPass === '1234') {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginError('');
      addBitacora('Autenticación', 'Iniciar Sesión', 'Usuario admin inició sesión correctamente');
    } else {
      setLoginError('Credenciales inválidas. Pruebe admin / 1234');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    if (currentView === 'panel_admin') setCurrentView('organigrama');
    addBitacora('Autenticación', 'Cerrar Sesión', 'Usuario admin cerró sesión');
  };

  // Current selected Area calculation
  const currentArea = useMemo(() => {
    return areasList.find(a => a.id === selectedAreaId) || areasList[0];
  }, [areasList, selectedAreaId]);

  // Global search filtering
  const filteredSearch = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();
    
    const matchedAreas = areasList.filter(a => a.nombre.toLowerCase().includes(query) || a.descripcion.toLowerCase().includes(query));
    
    let matchedFuncionarios = [];
    areasList.forEach(a => {
      if (a.jefe && (a.jefe.nombre.toLowerCase().includes(query) || a.jefe.cargo.toLowerCase().includes(query))) {
        matchedFuncionarios.push({ ...a.jefe, areaNombre: a.nombre, areaId: a.id });
      }
      a.equipo?.forEach(f => {
        if (f.nombre.toLowerCase().includes(query) || f.cargo.toLowerCase().includes(query)) {
          matchedFuncionarios.push({ ...f, areaNombre: a.nombre, areaId: a.id });
        }
      });
    });

    return { matchedAreas, matchedFuncionarios };
  }, [searchQuery, areasList]);

  // Total Statistics calculated dynamically
  const totalFuncionariosCount = useMemo(() => {
    let count = 0;
    areasList.forEach(a => {
      if (a.jefe) count++;
      if (a.equipo) count += a.equipo.length;
    });
    return count;
  }, [areasList]);

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
          {currentView === 'organigrama' && (
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
                    <p className="text-3xl font-black text-white mt-1">{areasList.length}</p>
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
                        onClick={() => {
                          setSelectedAreaId(5);
                          setCurrentView('detalle_area');
                        }}
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
                            onClick={() => {
                              setSelectedAreaId(1);
                              setCurrentView('detalle_area');
                            }}
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
                            onClick={() => {
                              setSelectedAreaId(8);
                              setCurrentView('detalle_area');
                            }}
                            className="bg-slate-900 border border-cyan-400/60 text-cyan-300 font-bold px-4 py-2 rounded-xl text-xs mb-4 shadow-md hover:bg-slate-800 cursor-pointer"
                          >
                            Soporte TI
                          </div>

                          {/* JEFE SOPORTE */}
                          <div
                            onClick={() => {
                              setSelectedAreaId(8);
                              setCurrentView('detalle_area');
                            }}
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
          )}

          {/* 2. AREAS GRID VIEW */}
          {currentView === 'areas' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Áreas Organizacionales</h2>
                <p className="text-sm text-slate-400 mt-1">Selecciona una de las áreas para consultar su plantilla y estructura completa.</p>
              </div>

              {/* GRID OF AREAS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {areasList.map((area) => (
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
                        onClick={() => {
                          setSelectedAreaId(area.id);
                          setCurrentView('detalle_area');
                        }}
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
          )}

          {/* 3. AREA DETAILED VIEW */}
          {currentView === 'detalle_area' && currentArea && (
            <div className="space-y-6 max-w-6xl mx-auto">
              {/* BACK BUTTON */}
              <button
                onClick={() => setCurrentView('organigrama')}
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-800"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al organigrama</span>
              </button>

              {/* AREA HEADER CARD */}
              <div className={`bg-[#111827] rounded-2xl p-6 border border-slate-800 ${currentArea.borderTop} space-y-5 shadow-2xl`}>
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-slate-800 text-emerald-400 border border-slate-700/60">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">{currentArea.nombre}</h2>
                    <p className="text-sm text-slate-400 mt-1 max-w-3xl">{currentArea.descripcion}</p>
                  </div>
                </div>

                {/* AREA METADATA CHIPS */}
                <div className="flex flex-wrap gap-3 text-xs pt-2">
                  <span className="bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300 flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    {currentArea.funcionariosCount} funcionarios
                  </span>
                  <span className="bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    {currentArea.ubicacion}
                  </span>
                  <span className="bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    {currentArea.horario}
                  </span>
                </div>

                <div className="border-t border-slate-800 pt-4 flex flex-wrap gap-6 text-xs text-slate-400">
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-500" />
                    {currentArea.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-500" />
                    {currentArea.telefono}
                  </span>
                </div>
              </div>

              {/* STRUCTURE & TEAM SECTION */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white tracking-tight">Estructura del Área</h3>

                {/* JEFE DE AREA */}
                {currentArea.jefe && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Jefe de Área</p>
                    
                    <div className="bg-[#111827] rounded-2xl p-5 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl relative overflow-hidden">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full ${currentArea.jefe.avatarBg} flex items-center justify-center text-white font-bold text-lg shadow-inner shrink-0`}>
                          {currentArea.jefe.iniciales}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-white text-base">{currentArea.jefe.nombre}</h4>
                          <p className="text-xs text-slate-400 flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                            {currentArea.jefe.cargo}
                          </p>

                          {/* TAGS */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {currentArea.jefe.tags.map((tag, i) => (
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
                          <span>{currentArea.jefe.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-500" />
                          <span>{currentArea.jefe.telefono}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* EQUIPO MEMBERS */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Equipo</p>

                  {currentArea.equipo && currentArea.equipo.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentArea.equipo.map((member) => (
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
          )}

          {/* 4. ADMIN PANEL VIEW (ER MODEL & FLOWCHART BASED) */}
          {currentView === 'panel_admin' && isLoggedIn && (
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
                {[
                  { id: 'areas', label: 'Gestionar Áreas', icon: Building2 },
                  { id: 'funcionarios', label: 'Gestionar Funcionarios', icon: Users },
                  { id: 'cargos', label: 'Gestionar Cargos', icon: Briefcase },
                  { id: 'relaciones', label: 'Relaciones Jerárquicas', icon: GitFork },
                  { id: 'bitacora', label: 'Consultar Bitácora', icon: FileText }
                ].map((tab) => {
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
                          const newArea = {
                            id: Date.now(),
                            nombre: newAreaName,
                            colorBar: 'bg-blue-500',
                            borderTop: 'border-t-4 border-blue-500',
                            descripcion: newAreaDesc || 'Área institucional',
                            funcionariosCount: 0,
                            ubicacion: 'Edificio Central',
                            horario: 'Lunes a Viernes 8:00 - 17:00',
                            email: 'contacto@santotomas.cl',
                            telefono: '22 510 0000',
                            jefe: null,
                            equipo: []
                          };
                          setAreasList([...areasList, newArea]);
                          addBitacora('Áreas', 'Crear Área', `Se creó el área ${newAreaName}`);
                          setNewAreaName('');
                          setNewAreaDesc('');
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
                                  setAreasList(areasList.filter(item => item.id !== a.id));
                                  addBitacora('Áreas', 'Inactivar Área', `Se inactivó/eliminó el área ${a.nombre}`);
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
                          if (!newFuncNombre) return;
                          const newMember = {
                            id: Date.now(),
                            nombre: newFuncNombre,
                            cargo: newFuncCargo || 'Funcionario',
                            iniciales: newFuncNombre.split(' ').map(n => n[0]).join('').substring(0, 2),
                            avatarBg: 'bg-blue-600',
                            tags: ['Nuevo'],
                            email: newFuncEmail || 'correo@santotomas.cl',
                            telefono: '22 510 0000'
                          };

                          setAreasList(areasList.map(a => {
                            if (a.id === newFuncArea) {
                              return {
                                ...a,
                                funcionariosCount: a.funcionariosCount + 1,
                                equipo: [...a.equipo, newMember]
                              };
                            }
                            return a;
                          }));

                          addBitacora('Funcionarios', 'Crear Funcionario', `Se registró a ${newFuncNombre}`);
                          setNewFuncNombre('');
                          setNewFuncCargo('');
                          setNewFuncEmail('');
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
                      {[
                        'Directora de Administración', 'Jefe de Operaciones', 'Jefe de Soporte TI',
                        'Asistente Soporte TI', 'Gestor de Compras', 'Prevencionista de Riesgo',
                        'Jefe de Contabilidad', 'Jefa de Recursos Humanos', 'Coordinador Deportivo'
                      ].map((cargo, i) => (
                        <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                          <span>{cargo}</span>
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
          )}

        </main>
      </div>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative space-y-5">
            <button
              onClick={() => setShowLoginModal(false)}
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

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">Usuario</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={loginUser}
                    onChange={(e) => setLoginUser(e.target.value)}
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
                    onChange={(e) => setLoginPass(e.target.value)}
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
      )}

      {/* FUNCIONARIO DETAIL MODAL */}
      {selectedFuncionario && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setSelectedFuncionario(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <div className={`w-14 h-14 rounded-full ${selectedFuncionario.avatarBg || 'bg-blue-600'} flex items-center justify-center text-white font-bold text-lg`}>
                {selectedFuncionario.iniciales || 'FN'}
              </div>
              <div>
                <h3 className="font-bold text-white text-base">{selectedFuncionario.nombre}</h3>
                <p className="text-xs text-slate-400">{selectedFuncionario.cargo}</p>
                <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20 mt-1 inline-block">
                  {selectedFuncionario.areaNombre || 'Área Institucional'}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-500" />
                <span>{selectedFuncionario.email || 'sin-correo@santotomas.cl'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-500" />
                <span>{selectedFuncionario.telefono || 'Sin teléfono'}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedFuncionario(null)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}