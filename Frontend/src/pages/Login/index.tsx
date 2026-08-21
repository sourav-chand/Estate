import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login as apiLogin } from '../../utils/api';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await apiLogin(email, password);
      navigate('/');
      window.location.reload();
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
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
          <p className="mt-2 font-sans text-sm text-charcoal-muted">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-xl border border-cream p-8">
          {error && (
            <div className="mb-4 bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@estele.co"
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
