// context/authContext.tsx
import { createContext , useState, ReactNode } from 'react';
			
export type TRole = "admin"|"tutor"|"student";

interface TUser {
id: number;
email: string;
role: TRole;
}

interface AuthContextProps {
user: TUser | null;
logIn: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthProviderProps {
children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
const [user, setUser] = useState<TUser | null>(null);

const logIn = async (email: string) => {
 const userData = await new Promise<TUser>((resolve) => {
   setTimeout(() => {
     resolve({
       id: 1,
       email,
       role: 'admin',
     });
   }, 200);
 });

 setUser(userData);
};

return (
 <AuthContext.Provider
   value={{
     user,
     logIn,
   }}
 >
   {children}
 </AuthContext.Provider>
);
} 