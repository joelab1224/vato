'use client';

import { useState } from 'react';
import { AuthClient } from '@vato/api-client';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/theme-context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

const authClient = new AuthClient();

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { currentTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authClient.login({ email, password });
      router.push('/start');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-5"
      style={{
        background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 50%, #f5f0ff 100%)',
      }}
    >
      <div 
        className="w-full max-w-sm"
        style={{
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: '16px',
          padding: '32px 20px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 
            className="font-semibold mb-2"
            style={{
              fontSize: '28px',
              lineHeight: '1.2',
              color: '#18181b',
              fontFamily: '"Space Grotesk", sans-serif',
            }}
          >
            Welcome back
          </h1>
          <p 
            className="text-sm"
            style={{
              color: '#52525b',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Sign in to continue to VATO
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
              style={{
                borderRadius: '12px',
                fontSize: '15px',
                fontFamily: '"Inter", sans-serif',
                backgroundColor: '#FFFFFF',
              }}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 pr-10 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
              style={{
                borderRadius: '12px',
                fontSize: '15px',
                fontFamily: '"Inter", sans-serif',
                backgroundColor: '#FFFFFF',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div 
              className="text-sm p-3 rounded-lg"
              style={{
                color: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderRadius: '12px',
              }}
            >
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full mt-6"
            style={{
              height: '44px',
              borderRadius: '12px',
              background: loading ? '#999999' : 'linear-gradient(135deg, #8b5cf6 0%, #9333ea 100%)',
              fontWeight: '600',
              fontSize: '16px',
              border: 'none',
              color: 'white',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p 
            className="text-sm"
            style={{ 
              color: '#52525b',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Don't have an account?{' '}
            <Link 
              href="/register" 
              className="font-medium hover:underline"
              style={{ color: '#8b5cf6' }}
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
