import { PropsWithChildren, createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from 'lib/supabase';

type AuthContextType = {
  session: Session | null;
  user: User | null;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <AuthContext.Provider value={{ session, user: session?.user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const { session, user } = useContext(AuthContext);

  return { isAuth: !!user, user, session };
};
