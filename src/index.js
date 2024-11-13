// src/index.js

// Export authentication context and hook
export { AuthContext, AuthProvider } from './AuthContext';
export { useAuth } from './useAuth';

// Export API utilities
export { 
  createApiInstance, 
  setupInterceptors 
} from './axios';


// Export any constants or utilities
export const VERSION = '1.0.1';

