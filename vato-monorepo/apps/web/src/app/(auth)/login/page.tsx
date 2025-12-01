'use client';

import { useState } from 'react';
import { AuthClient } from '@vato/api-client';
import { Button, Card, CardContent, Input } from '@vato/ui-primitives';
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
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* Professional Background Gradient */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 30%, #cbd5e1 70%, #94a3b8 100%)',
        }}
      />
      
      <Card 
        variant="professional" 
        className="w-full max-w-md"
        style={{ padding: '2rem' }}
      >
        <CardContent>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 
              style={{
                fontFamily: '"TT Neoris", "Space Grotesk", sans-serif',
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#1e293b',
                marginBottom: '0.5rem',
                lineHeight: '1.2',
              }}
            >
              Welcome back
            </h1>
            <p 
              style={{
                fontFamily: '"TT Neoris", "Inter", sans-serif',
                fontSize: '0.875rem',
                fontWeight: 100,
                color: '#64748b',
              }}
            >
              Sign in to continue to VATO
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Input */}
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                style={{
                  color: '#64748b',
                  transition: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#0891b2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#64748b';
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div 
                className="p-3 rounded-lg text-sm"
                style={{
                  background: 'rgba(239, 68, 68, 0.05)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '0.75rem',
                  color: '#dc2626',
                }}
              >
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-6">
              <Button 
                type="submit" 
                disabled={loading} 
                variant="primary"
                className="w-full"
                style={{ minHeight: '44px' }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p 
              style={{
                fontSize: '0.875rem',
                color: '#64748b',
                fontFamily: '"TT Neoris", "Inter", sans-serif',
                fontWeight: 100,
              }}
            >
              Don't have an account?{' '}
              <Link 
                href="/register" 
                className="font-medium hover:underline"
                style={{
                  color: '#0891b2',
                  fontWeight: 600,
                  transition: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Create account
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
