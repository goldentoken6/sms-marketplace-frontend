import { useContext } from 'react';
import { AuthContext } from 'src/contexts/auth/auth-context';

export const useAuth = () => useContext(AuthContext);
