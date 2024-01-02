"use client";
import { Badge, Button, Divider, Progress, Skeleton } from '@nextui-org/react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import NotificationIcon from '../icons/NotificationIcon'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { fetchUserData, loginAsync, selectToken, selectUserData } from '@/store/authSlice'
import BellIcon from '../icons/BellIcon'
import Link from 'next/link'
import NotificationIconModal from './NotificationIconModal'
import UserDropDown from './UserDropDown'

type Props = {}

const Headers = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const userData = useSelector(selectUserData);

    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    return (
        <div className='flex items-center justify-between pt-7  px-14 pb-7 w-full'>
            <Link href={'/'}>
                <Image src="/assets/images/logo.svg" width={300} height={75} alt="logo" />
            </Link>
            <div className='flex justify-center items-center'>
                <UserDropDown userData={userData} />
                <hr className='bg-blue-600 rounded-full h-9 mx-2 w-0.5' />
                <NotificationIconModal />
            </div>
        </div>
    )
}

export default Headers