import { useEffect } from 'react';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { LoginForm } from '../components/admin/LoginForm';
import { useAdminSession } from '../components/admin/useAdminSession';
import '../styles/admin.css';

export default function AdminPage() {
  const { api, username, login, logout } = useAdminSession();

  useEffect(() => {
    document.title = 'BURGESTA — Admin';
    document.documentElement.classList.add('admin-mode');
    return () => document.documentElement.classList.remove('admin-mode');
  }, []);

  return api
    ? <AdminDashboard api={api} username={username} onLogout={logout} />
    : <LoginForm onLogin={login} />;
}
