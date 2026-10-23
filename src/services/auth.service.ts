import type { UsuarioCredentials } from '../types/usuario';

// Autenticación temporal para la demostración; reemplazar por el cliente JWT de la API.
export function authenticateDemoUser(credentials: UsuarioCredentials): boolean {
  return credentials.usuario === 'admin' && credentials.contrasena === '1234';
}
