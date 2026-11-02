import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthUser, Session, signIn, verifySession } from '../services/auth';

const KEY = '@reuse:demo-session:v3';

type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  checking: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  sessionStatus: string;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [sessionStatus, setStatus] = useState('Visitante');

  useEffect(() => {
    let alive = true;

    const restoreSession = async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (!raw) return;

        const saved = JSON.parse(raw) as Session;
        if (!saved.accessToken) throw new Error('Sessão inválida');

        if (alive) {
          setUser(saved.user);
          setStatus('Sessão restaurada; verificando...');
          setChecking(true);
        }

        try {
          const verified = await verifySession(saved.accessToken);
          if (alive) {
            setUser(verified);
            setStatus('Sessão validada pela API');
          }
        } catch (error) {
          if (error instanceof TypeError) {
            if (alive) setStatus('Sessão local (verificação pendente: sem conexão)');
          } else {
            await AsyncStorage.removeItem(KEY);
            if (alive) {
              setUser(null);
              setStatus('Sessão expirada; entre novamente');
            }
          }
        }
      } catch {
        await AsyncStorage.removeItem(KEY);
        if (alive) {
          setUser(null);
          setStatus('Sessão inválida; entre novamente');
        }
      } finally {
        if (alive) {
          setLoading(false);
          setChecking(false);
        }
      }
    };

    void restoreSession();
    return () => { alive = false; };
  }, []);

  const login = async (username: string, password: string) => {
    const session = await signIn(username.trim(), password);
    await AsyncStorage.setItem(KEY, JSON.stringify(session));
    setUser(session.user);
    setStatus('Sessão iniciada pela API');
  };

  const logout = async () => {
    await AsyncStorage.removeItem(KEY);
    setUser(null);
    setStatus('Sessão encerrada');
  };

  return (
    <AuthContext.Provider value={{ user, loading, checking, login, logout, sessionStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth fora do provider');
  return context;
}
