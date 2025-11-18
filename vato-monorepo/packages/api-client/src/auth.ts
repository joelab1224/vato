export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    user_id: string;
    email: string;
  };
  session_token: string;
}

export class AuthClient {
  constructor(private baseUrl = '/api') {}

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json() as Promise<AuthResponse>;
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json() as Promise<AuthResponse>;
  }

  async logout(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/auth/logout`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }
  }

  async me(): Promise<AuthResponse['user'] | null> {
    const response = await fetch(`${this.baseUrl}/auth/me`);

    if (response.status === 401) {
      return null;
    }

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json() as Promise<AuthResponse['user']>;
  }
}