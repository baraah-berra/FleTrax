"use client"

import { Button } from '@nextui-org/react'
import React, { useState } from 'react'
import MenuIcon from '../icons/MenuIcon'
import HomeIcon from '../icons/HomeIcon'
import Link from 'next/link'
import MonitoringIcon from '../icons/Monitoring'
import UnitsIcon from '../icons/UnitsIcon'

type Props = {}

const SideBar = (props: Props) => {
    const [isOpen, setIsOpen] = useState(true);
    const onOpen = () => setIsOpen(!isOpen);
    const onClose = () => setIsOpen(false);

    return (
        <div className='sidebar bg-primary p-6 w-fit rounded-e-3xl flex flex-col gap-2 transition-width h-max items-start'>
            <Button className={`hover:!bg-white text-primary fill-white hover:!fill-primary transition-width ${!isOpen && ' mx-2'}`} variant='light' isIconOnly onClick={onOpen}>
                <MenuIcon />
            </Button>
            <Button as={Link} href='/' className={`hover:!bg-white hover:text-primary text-white fill-white hover:!fill-primary transition-width w-full ${isOpen ? 'justify-center' : 'justify-start'}`} variant='light' isIconOnly={isOpen}>
                <HomeIcon /> {!isOpen && 'dashboard'}
            </Button>
            <Button as={Link} href='/monitoring' className={`hover:!bg-white hover:text-primary text-white fill-white hover:!fill-primary transition-width w-full ${isOpen ? 'justify-center' : 'justify-start'}`} variant='light' isIconOnly={isOpen}>
                <MonitoringIcon /> {!isOpen && 'Monitoring'}
            </Button>
            <Button as={Link} href='/units' className={`hover:!bg-white hover:text-primary text-white fill-white hover:!fill-primary transition-width w-full ${isOpen ? 'justify-center' : 'justify-start'}`} variant='light' isIconOnly={isOpen}>
                <UnitsIcon /> {!isOpen && 'Units'}
            </Button>
        </div>
    )
}

export default SideBar