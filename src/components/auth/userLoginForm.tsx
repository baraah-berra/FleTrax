"use client"
import { Button, Checkbox, Input, Link, Select, SelectItem } from '@nextui-org/react'
import React from 'react'
import { EyeSlashFilledIcon } from '../icons/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../icons/EyeFilledIcon';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LoginUser from '@/controllers/authController';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { loginAsync } from '@/store/authSlice';
import { AppDispatch } from '@/store';

type Props = {
}
function UserLoginForm({ }: Props) {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async (data: any) => {
        try {
            await dispatch(loginAsync(data));
            // Handle success, e.g., navigate to another page
        } catch (error) {
            // Handle error, e.g., display an error message
        }
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('this field is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });


    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            // await LoginUser(values);
            await handleLogin(values)
            actions.setSubmitting(false);
        },
    });

    return (
        <form onSubmit={(e) => { formik.handleSubmit(e); e.preventDefault(); }} className='h-full'>
            <div className='w-2/3 m-auto flex flex-col gap-6'>
                <Input
                    type="text"
                    label="User Name"
                    variant="flat" radius="sm"
                    name='username'
                    isInvalid={formik.touched.username}
                    onChange={formik.handleChange}
                    defaultValue={formik.values.username}
                    errorMessage={formik.touched.username && formik.errors.username}
                    classNames={{
                        inputWrapper: "bg-white drop-shadow-none h-12",
                        label: "pb-2"
                    }}
                    placeholder="Enter your username"
                    labelPlacement="outside"
                />
                <Input
                    label="Password"
                    placeholder="Enter your password"
                    labelPlacement="outside" radius="sm"
                    name='password'
                    isInvalid={formik.touched.password}
                    onChange={formik.handleChange}
                    defaultValue={formik.values.password}
                    errorMessage={formik.touched.password && formik.errors.password}
                    classNames={{
                        inputWrapper: [
                            "bg-white drop-shadow-none h-12",
                        ],
                        innerWrapper: ["bg-transparent", "drop-shadow-none"],
                        label: "pb-2"
                    }}
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                />
                <div className='w-full text-end'>
                    <Link className='hover:underline cursor-pointer text-sm'>Forget Password?</Link>
                </div>
                <Button type='submit' className='h-12 capitalize text-md text-white' color="primary" radius='sm'>
                    login
                </Button>
            </div>
        </form>
    )
}

export default UserLoginForm