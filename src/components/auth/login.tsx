"use client";
import Image from 'next/image';
import styles from './style.module.scss';
import { Tab, Tabs } from '@nextui-org/react';
import React from "react";
import UserLoginForm from './userLoginForm';
import AdminLoginForm from './adminLoginForm';
import * as yup from 'yup';
import { useFormik } from 'formik';



export default function LoginForm() {
    
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className={`${styles.login} grid grid-cols-2 gap-4 container m-auto pt-9 `}>
            <div>
                <h1 className='m-auto text-3xl font-bold p-16 text-center'>{"Welcome Back 👋"}</h1>
                <UserLoginForm />
            </div>
            <div>
                <Image width='872' height='1000' src='/assets/images/loginBg.svg' alt='login image' />
            </div>
        </div>
    )
}