import React, { useState } from 'react';
import { X, Lock, User as UserIcon, Mail, ShieldAlert, CheckCircle } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'register';
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  // Login fields
  const [loginUsername, setLoginUsername] = useState('alex_shopper');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Register fields
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!loginUsername.trim() || !loginPassword.trim()) {
      setError('Please fill in both username and password.');
      return;
    }

    // Simulated call to Spring Boot POST /api/auth/login
    const mockUser: User = {
      id: 1,
      username: loginUsername.trim(),
      email: loginUsername.includes('@') ? loginUsername.trim() : `${loginUsername.trim()}@example.com`,
      fullName: loginUsername.trim() === 'alex_shopper' ? 'Alex Johnson' : loginUsername.trim(),
      token: 'jwt-token-springboot-auth-' + Date.now(),
    };

    setSuccessMsg('Logged in successfully!');
    setTimeout(() => {
      onLoginSuccess(mockUser);
      onClose();
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!regUsername.trim() || !regEmail.trim() || !regPassword || !regConfirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setError('Password and Confirm Password do not match.');
      return;
    }

    if (regPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Simulated call to Spring Boot POST /api/auth/register
    const newUser: User = {
      id: Date.now(),
      username: regUsername.trim(),
      email: regEmail.trim(),
      fullName: regUsername.trim(),
      token: 'jwt-token-springboot-auth-' + Date.now(),
    };

    setSuccessMsg('Account created successfully!');
    setTimeout(() => {
      onLoginSuccess(newUser);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Title (Matches Wireframe: Login / Register) */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
              {mode === 'login' ? 'Login' : 'Register'}
            </h2>
            <p className="text-xs text-stone-500">
              {mode === 'login'
                ? 'Sign in to access your saved cart and orders'
                : 'Create an account to start shopping and tracking orders'}
            </p>
          </div>

          {/* Feedback messages */}
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* 1. Login Form (From Wireframe: Login, Username, Password, Log In, Don't have an account? Sign Up) */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                    className="w-full pl-9 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white"
                  />
                  <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    className="w-full pl-9 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white"
                  />
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm rounded-xl transition-all shadow-xs cursor-pointer active:scale-98"
              >
                Log In
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setError(null);
                  }}
                  className="text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Don't have an account? <span className="font-bold text-amber-700 underline">Sign Up</span>
                </button>
              </div>

              {/* Quick Demo Pre-fill helper */}
              <div className="pt-2 border-t border-stone-100 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setLoginUsername('alex_shopper');
                    setLoginPassword('password123');
                  }}
                  className="text-[11px] text-stone-400 hover:text-stone-700 underline cursor-pointer"
                >
                  Fill Demo Credentials (alex_shopper)
                </button>
              </div>
            </form>
          ) : (
            /* 2. Registration Form (From Wireframe: Register, Username, Email, Password, Confirm Password, Sign Up, Already have an account? Log In) */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder="Choose a username"
                    required
                    className="w-full pl-9 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white"
                  />
                  <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="Enter email address"
                    required
                    className="w-full pl-9 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white"
                  />
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                    className="w-full pl-9 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white"
                  />
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Confirm Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    className="w-full pl-9 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white"
                  />
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm rounded-xl transition-all shadow-xs cursor-pointer active:scale-98 mt-2"
              >
                Sign Up
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError(null);
                  }}
                  className="text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Already have an account? <span className="font-bold text-amber-700 underline">Log In</span>
                </button>
              </div>
            </form>
          )}

          {/* Backend Info Badge */}
          <div className="p-2.5 bg-stone-100 rounded-xl text-[11px] text-stone-500 text-center font-mono">
            Spring Security 6 &bull; BCrypt Hashing &bull; JWT REST Auth
          </div>
        </div>
      </div>
    </div>
  );
};
