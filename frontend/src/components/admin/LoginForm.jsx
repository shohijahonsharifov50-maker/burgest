import { useState } from 'react';
import { LogoMark } from '../site/LogoMark';

export function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await onLogin(username.trim(), password);
    } catch (err) {
      setError(err.status === 401
        ? 'Login yoki parol noto‘g‘ri.'
        : 'Server bilan bog‘lanib bo‘lmadi. Backend ishga tushganini tekshiring.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="admin-login">
      <form className="admin-card admin-login__card" onSubmit={submit} autoComplete="off">
        <LogoMark className="admin-login__mark" />
        <h1>Admin panel</h1>
        <p className="admin-muted">Menyuni boshqarish uchun kiring.</p>
        <label className="admin-field">
          <span>Login</span>
          <input value={username} onChange={(e) => setUsername(e.target.value)} name="burgesta-admin-user" autoComplete="off" autoCapitalize="none" spellCheck={false} required />
        </label>
        <label className="admin-field">
          <span>Parol</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="burgesta-admin-pass" autoComplete="new-password" required />
        </label>
        {error && <p className="admin-error" role="alert">{error}</p>}
        <button className="admin-btn admin-btn--primary" type="submit" disabled={busy}>
          {busy ? 'Tekshirilmoqda…' : 'Kirish'}
        </button>
      </form>
    </main>
  );
}
