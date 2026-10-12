import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContextValue';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    function login(userInfo) {
        setUser(userInfo);
    }

    function logout() {
        setUser(null);
    }

    const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  async function restoreSession() {
    try {
      const response = await fetch('http://localhost:3000/api/auth/me', {
        credentials: 'include',
      });

      if (response.status === 401) {
        setUser(null);
        return;
      }

      if (!response.ok) {
        throw new Error('Could not restore login session');
      }

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('Error restoring login session:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  restoreSession();
}, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
