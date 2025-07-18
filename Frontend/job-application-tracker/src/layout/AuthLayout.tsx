import AuthHeader from '../components/AuthFormComponents/AuthHeader';
import type {ReactNode} from 'react';

type AuthLayoutProps = {
  children: ReactNode;
}

const AuthLayout = ({children}: AuthLayoutProps) => {
  return (
    <>
      <AuthHeader />
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        {children}
      </main>
    </>
    
  )
}

export default AuthLayout;
