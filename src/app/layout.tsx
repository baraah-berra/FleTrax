"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from "./providers";
import { useEffect, useState } from 'react';
import { selectToken } from '@/store/authSlice';
import { useSelector } from 'react-redux';
import LoginForm from '@/app/components/auth/login';
import AuthRedirected from './authRedirected';
import Header from '@/app/components/layout/Header';
import SideBar from '@/app/components/layout/SideBar';

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-100 h-screen w-screen`}>
        <Providers>
          <AuthRedirected>
            <Header />
            <div className='flex'>
              <SideBar />
              <div className="w-full h-full page-content overflow-auto">
                {children}
              </div>
            </div>
          </AuthRedirected>
        </Providers>
      </body>
    </html>
  )
}
