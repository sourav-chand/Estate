// This can be changed at build time for a deployed frontend while retaining a
// convenient local default for Docker Compose and non-container development.
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'https://estate-jw6y.onrender.com/api';

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    throw new Error('Session expired. Please login again.');
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || data.error || 'Request failed');
  }

  return response.json();
}

export async function login(email: string, password: string) {
  const data = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem('auth_token', data.token);
  localStorage.setItem('auth_user', JSON.stringify(data.user));
  return data;
}

export async function register(name: string, email: string, password: string, password_confirmation: string) {
  const data = await apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, password_confirmation }),
  });
  localStorage.setItem('auth_token', data.token);
  localStorage.setItem('auth_user', JSON.stringify(data.user));
  return data;
}

export function logout() {
  const token = localStorage.getItem('auth_token');
  if (token) {
    apiRequest('/auth/logout', { method: 'POST' }).catch(() => {});
  }
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
}

export function getStoredUser() {
  const raw = localStorage.getItem('auth_user');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function isAuthenticated() {
  return !!localStorage.getItem('auth_token');
}
