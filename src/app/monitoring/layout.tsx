"use client"
import PageLoader from '@/components/layout/PageLoader'
import { AppDispatch } from '@/store'
import { fetchDevices } from '@/store/devicesSlice'
import { Accordion, AccordionItem, Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { DispatchProp, useDispatch, useSelector } from 'react-redux'
import SideBar from './SideBar'
import Map from '@/components/Map'

type Props = {}

const layout = (props: Props) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchDevices());
    }, [dispatch]);
    const devices = useSelector((state: any) => state.devices.devices);
    const status = useSelector((state: any) => state.devices.status);
    const error = useSelector((state: any) => state.devices.error);
    return (
        <>
            {status === 'loading' && <PageLoader />}
            {status === 'error' && <p>Error fetching devices: {error}</p>}
            {status === 'success' && (
                <div className='w-max h-max p-16'>
                    <SideBar devices={devices} />
                </div>
            )}
        </>
    )
}

export default layout