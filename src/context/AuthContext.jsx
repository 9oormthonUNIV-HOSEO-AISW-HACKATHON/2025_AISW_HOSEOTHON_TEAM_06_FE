import { useState, useCallback } from 'react';
import constate from 'constate';

function useAuthLogic() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = localStorage.getItem('token');
        return !!token;
    });

    const login = useCallback((token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }, []);

    return { isLoggedIn, login, logout };
}

export const [AuthProvider, useAuth] = constate(useAuthLogic);