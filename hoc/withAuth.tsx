// hoc/withAuth.tsx
//https://www.linkedin.com/pulse/dynamic-role-based-authentication-nextjs-antematter-8punf/

import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { AuthContext,TRole } from '@/context/authContext';
import { NextPage } from 'next';


export function withAuth(WrappedComponent: NextPage, role: TRole) {
  const Wrapper = (props: any) => {
    const Router = useRouter();
    const { user } = useContext(AuthContext);
    alert(JSON.stringify(user))

    useEffect(() => {
      //if (!user && Router.pathname !== '/login') {
        if (!user) {
         Router.push('/login');
      } //else if (user && role && user.role !== role && Router.pathname !== '/403') {
        else if (user && role && user.role !== role) {
        Router.push('/403');
      }
    }, [user, Router]);

    return <WrappedComponent {...props} />;
  }

  return Wrapper;
}