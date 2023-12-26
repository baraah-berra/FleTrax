'use client'

import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'react-hot-toast'
import { useEffect, useRef, useState } from 'react'
import { Provider, useSelector } from 'react-redux'
import { makeStore, AppStore } from '../store'
import { selectToken } from '@/store/authSlice'

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }
  return (
    <NextUIProvider>
      <Provider store={storeRef.current}>
        {children}
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </Provider>
    </NextUIProvider>
  )
}
