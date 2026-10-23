import type { Area } from '../types/area';
import type { BitacoraEntry } from '../types/bitacora';
import type { Cargo } from '../types/cargo';

// Datos de demostración aislados para sustituirlos por respuestas de la API.
export const INITIAL_AREAS = [
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
] satisfies Area[];

export const INITIAL_BITACORA = [
  { id: 1, fecha: '2026-09-28 16:45:12', modulo: 'Áreas', accion: 'Crear Área', detalle: 'Se creó el área Soporte Técnico' },
  { id: 2, fecha: '2026-09-28 17:02:30', modulo: 'Funcionarios', accion: 'Editar Funcionario', detalle: 'Modificación de correo Patricio Basualto' },
  { id: 3, fecha: '2026-09-28 17:15:00', modulo: 'Relaciones', accion: 'Asignar Jefatura', detalle: 'Asignado Jefe de Operaciones' },
  { id: 4, fecha: '2026-09-28 17:30:10', modulo: 'Cargos', accion: 'Crear Cargo', detalle: 'Cargo Prevencionista de Riesgo agregado' }
] satisfies BitacoraEntry[];

export const CARGOS: Cargo[] = [
  { nombre: 'Directora de Administración' },
  { nombre: 'Jefe de Operaciones' },
  { nombre: 'Jefe de Soporte TI' },
  { nombre: 'Asistente Soporte TI' },
  { nombre: 'Gestor de Compras' },
  { nombre: 'Prevencionista de Riesgo' },
  { nombre: 'Jefe de Contabilidad' },
  { nombre: 'Jefa de Recursos Humanos' },
  { nombre: 'Coordinador Deportivo' }
];
