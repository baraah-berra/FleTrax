"use client"
import { Button, Checkbox, Input, Link } from '@nextui-org/react'
import React from 'react'
import { EyeSlashFilledIcon } from '../icons/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../icons/EyeFilledIcon';
import * as Yup from 'yup';
import { FormikProps, useFormik } from 'formik';



type Props = {
    formik: FormikProps<{
        userName: string;
        password: string;
    }>;
}

function AdminLoginForm({ formik }: Props) {
    
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className='w-2/3 m-auto flex flex-col gap-6'>
            <Input
                type="text"
                label="User Name"
                variant="flat" radius="sm"
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
            {/* <Checkbox radius="none" defaultSelected classNames={{
                wrapper: 'rounded-md'
            }}>Option</Checkbox> */}
            <div className='w-full text-end'>
                <Link className='hover:underline cursor-pointer text-sm'>Forget Password?</Link>
            </div>
            <Button type="submit" className='h-12 capitalize text-md' color="primary" radius='sm'>
                login
            </Button>
        </div>
    )
}

export default AdminLoginForm