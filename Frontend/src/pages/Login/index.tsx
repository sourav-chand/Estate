import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login as apiLogin, register as apiRegister, getStoredUser } from '../../utils/api';

export function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await apiLogin(email, password);
      const user = getStoredUser();
      navigate(user?.is_admin ? '/admin' : '/');
      window.location.reload();
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    try {
      await apiRegister(name, email, password, confirmPassword);
      navigate('/');
      window.location.reload();
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="font-serif text-3xl tracking-[0.3em] text-charcoal">ESTELE</Link>
          <p className="mt-2 font-sans text-sm text-charcoal-muted">
            {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-cream p-8">
          {/* Tabs */}
          <div className="mb-6 flex border-b border-cream">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 pb-3 text-sm font-semibold tracking-wider transition-colors border-b-2 ${
                mode === 'login' ? 'border-gold text-charcoal' : 'border-transparent text-charcoal-muted hover:text-charcoal'
              }`}
            >
              SIGN IN
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 pb-3 text-sm font-semibold tracking-wider transition-colors border-b-2 ${
                mode === 'register' ? 'border-gold text-charcoal' : 'border-transparent text-charcoal-muted hover:text-charcoal'
              }`}
            >
              SIGN UP
            </button>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-cream rounded-sm px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
                />
              </div>
              <div className="mb-6">
                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-cream rounded-sm px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-charcoal text-ivory py-3.5 rounded-sm font-sans text-sm font-semibold tracking-widest hover:bg-gold transition-colors disabled:opacity-50"
              >
                {loading ? 'SIGNING IN...' : 'SIGN IN'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full border border-cream rounded-sm px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
                />
              </div>
              <div className="mb-4">
                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-cream rounded-sm px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
                />
              </div>
              <div className="mb-4">
                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className="w-full border border-cream rounded-sm px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
                />
              </div>
              <div className="mb-6">
                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="w-full border border-cream rounded-sm px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-charcoal text-ivory py-3.5 rounded-sm font-sans text-sm font-semibold tracking-widest hover:bg-gold transition-colors disabled:opacity-50"
              >
                {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-cream text-center">
            <p className="font-sans text-xs text-charcoal-muted">
              Demo accounts:<br />
              Admin: <span className="text-charcoal">admin@estele.co</span> / <span className="text-charcoal">password</span><br />
              Customer: <span className="text-charcoal">customer@estele.co</span> / <span className="text-charcoal">password</span>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center font-sans text-sm text-charcoal-muted">
          <Link to="/" className="text-gold hover:text-gold-dark transition-colors">← Back to shop</Link>
        </p>
      </motion.div>
    </div>
  );
}
