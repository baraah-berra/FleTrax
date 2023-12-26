"use client"
import LoginForm from '@/components/auth/login';
import { selectToken } from '@/store/authSlice';
import { Spinner } from '@nextui-org/react';
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';

type Props = { children: React.ReactNode };

const AuthRedirected = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const token = useSelector(selectToken);

  const isAuthenticated = useMemo(() => {
    return !!token;
  }, [token]);

  useEffect(() => {
    setIsAuth(isAuthenticated); // Update isAuth state
    setTimeout(() => {
      setIsLoading(false); // Stop loading after a timeout
    }, 5000);
  }, [isAuthenticated]);

  return (
    <>
      {isAuth ? (
        <>
          {children}
        </>
      ) : isLoading ? (
        <div className='w-screen h-screen flex justify-center items-center'>
          <Spinner size='lg' />
        </div>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default AuthRedirected;