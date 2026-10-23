import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { authenticateDemoUser } from '../services/auth.service';
import { createArea } from '../services/area.service';
import { createBitacoraEntry } from '../services/bitacora.service';
import { createFuncionario } from '../services/funcionario.service';
import type { Area } from '../types/area';
import type { BitacoraEntry } from '../types/bitacora';
import type { AdminTab, AppView, SearchResults } from '../types/app';
import type { Funcionario } from '../types/funcionario';
import type { UsuarioCredentials } from '../types/usuario';

export function useOrganigramaState(
  initialAreas: Area[],
  initialBitacora: BitacoraEntry[]
) {
  const [currentView, setCurrentView] = useState<AppView>('organigrama');
  const [selectedAreaId, setSelectedAreaId] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginUser, setLoginUser] = useState('admin');
  const [loginPass, setLoginPass] = useState('1234');
  const [loginError, setLoginError] = useState('');
  const [selectedFuncionario, setSelectedFuncionario] = useState<Funcionario | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [areasList, setAreasList] = useState<Area[]>(initialAreas);
  const [bitacora, setBitacora] = useState<BitacoraEntry[]>(initialBitacora);
  const [adminTab, setAdminTab] = useState<AdminTab>('areas');
  const [newAreaName, setNewAreaName] = useState('');
  const [newAreaDesc, setNewAreaDesc] = useState('');
  const [newFuncNombre, setNewFuncNombre] = useState('');
  const [newFuncCargo, setNewFuncCargo] = useState('');
  const [newFuncArea, setNewFuncArea] = useState(1);
  const [newFuncEmail, setNewFuncEmail] = useState('');

  const addBitacora = (modulo: string, accion: string, detalle: string) => {
    setBitacora((entries) => [createBitacoraEntry(modulo, accion, detalle), ...entries]);
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const credentials: UsuarioCredentials = {
      usuario: loginUser,
      contrasena: loginPass
    };

    if (authenticateDemoUser(credentials)) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginError('');
      addBitacora('Autenticación', 'Iniciar Sesión', 'Usuario admin inició sesión correctamente');
      return;
    }

    setLoginError('Credenciales inválidas. Pruebe admin / 1234');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    if (currentView === 'panel_admin') setCurrentView('organigrama');
    addBitacora('Autenticación', 'Cerrar Sesión', 'Usuario admin cerró sesión');
  };

  const currentArea = useMemo(
    () => areasList.find((area) => area.id === selectedAreaId) || areasList[0],
    [areasList, selectedAreaId]
  );

  const filteredSearch = useMemo<SearchResults | null>(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();
    const matchedAreas = areasList.filter(
      (area) => area.nombre.toLowerCase().includes(query)
        || area.descripcion.toLowerCase().includes(query)
    );
    const matchedFuncionarios: Funcionario[] = [];

    areasList.forEach((area) => {
      if (area.jefe && (
        area.jefe.nombre.toLowerCase().includes(query)
        || area.jefe.cargo.toLowerCase().includes(query)
      )) {
        matchedFuncionarios.push({
          ...area.jefe,
          areaNombre: area.nombre,
          areaId: area.id
        });
      }

      area.equipo.forEach((funcionario) => {
        if (
          funcionario.nombre.toLowerCase().includes(query)
          || funcionario.cargo.toLowerCase().includes(query)
        ) {
          matchedFuncionarios.push({
            ...funcionario,
            areaNombre: area.nombre,
            areaId: area.id
          });
        }
      });
    });

    return { matchedAreas, matchedFuncionarios };
  }, [searchQuery, areasList]);

  const totalFuncionariosCount = useMemo(
    () => areasList.reduce(
      (count, area) => count + (area.jefe ? 1 : 0) + area.equipo.length,
      0
    ),
    [areasList]
  );

  const saveArea = () => {
    if (!newAreaName) return;
    const newArea = createArea({ nombre: newAreaName, descripcion: newAreaDesc });
    setAreasList((areas) => [...areas, newArea]);
    addBitacora('Áreas', 'Crear Área', `Se creó el área ${newAreaName}`);
    setNewAreaName('');
    setNewAreaDesc('');
  };

  const removeArea = (area: Area) => {
    setAreasList((areas) => areas.filter((item) => item.id !== area.id));
    addBitacora('Áreas', 'Inactivar Área', `Se inactivó/eliminó el área ${area.nombre}`);
  };

  const saveFuncionario = () => {
    if (!newFuncNombre) return;
    const newMember = createFuncionario({
      nombre: newFuncNombre,
      cargo: newFuncCargo,
      email: newFuncEmail
    });

    setAreasList((areas) => areas.map((area) => (
      area.id === newFuncArea
        ? {
            ...area,
            funcionariosCount: area.funcionariosCount + 1,
            equipo: [...area.equipo, newMember]
          }
        : area
    )));
    addBitacora('Funcionarios', 'Crear Funcionario', `Se registró a ${newFuncNombre}`);
    setNewFuncNombre('');
    setNewFuncCargo('');
    setNewFuncEmail('');
  };

  return {
    currentView, setCurrentView, selectedAreaId, setSelectedAreaId,
    isDarkMode, setIsDarkMode, searchQuery, setSearchQuery,
    isLoggedIn, setIsLoggedIn, showLoginModal, setShowLoginModal,
    loginUser, setLoginUser, loginPass, setLoginPass, loginError, setLoginError,
    selectedFuncionario, setSelectedFuncionario, zoomLevel, setZoomLevel,
    isFullscreen, setIsFullscreen, areasList, setAreasList, bitacora,
    adminTab, setAdminTab, newAreaName, setNewAreaName, newAreaDesc, setNewAreaDesc,
    newFuncNombre, setNewFuncNombre, newFuncCargo, setNewFuncCargo,
    newFuncArea, setNewFuncArea, newFuncEmail, setNewFuncEmail,
    addBitacora, handleLogin, handleLogout, currentArea, filteredSearch,
    totalFuncionariosCount, saveArea, removeArea, saveFuncionario
  };
}
