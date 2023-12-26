"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from "./providers";
import { useEffect, useState } from 'react';
import { selectToken } from '@/store/authSlice';
import { useSelector } from 'react-redux';
import LoginForm from '@/components/auth/login';
import AuthRedirected from './authRedirected';
import Headers from '@/components/layout/Header';
import SideBar from '@/components/layout/SideBar';

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
            <div className='flex flex-wrap'>
              <Headers />
              <SideBar />
              {children}
            </div>
          </AuthRedirected>
        </Providers>
      </body>
    </html>
  )
}
