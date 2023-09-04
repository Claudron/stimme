import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import { useNavigate } from 'react-router-dom';
import useLogout from './useLogout';

const usePersistLogin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); 
    const navigate = useNavigate();
    const logout = useLogout();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await apiClient.get('/auth/status/');
                if (response.status === 200) {
                    setIsAuthenticated(true);
                    console.log('private router:' + response.status);
                }
            } catch (error) {
                // console.error(error);
                console.log('please log in');
                setIsAuthenticated(false);
                logout();
                navigate('/login');
                
            } finally {
                setIsLoading(false); // Set loading to false when done
            }
        };

        checkAuthStatus();
    }, []);

    return { isAuthenticated, isLoading }; // Return an object containing both state variables
}

export default usePersistLogin;
