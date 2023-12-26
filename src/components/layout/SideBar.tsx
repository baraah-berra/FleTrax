"use client"

import { Button } from '@nextui-org/react'
import React, { useState } from 'react'
import MenuIcon from '../icons/MenuIcon'
import HomeIcon from '../icons/HomeIcon'

type Props = {}

const SideBar = (props: Props) => {
    const [isOpen, setIsOpen] = useState(true);
    const onOpen = () => setIsOpen(!isOpen);
    const onClose = () => setIsOpen(false);

    return (
        <div className='bg-primary p-3 w-fit rounded-e-3xl flex flex-col gap-2 transition-all h-max'>
            <Button className={`hover:!bg-white text-primary fill-white hover:!fill-primary transition-all ${!isOpen && ' mx-2'}`} variant='light' isIconOnly onClick={onOpen}>
                <MenuIcon />
            </Button>
            <Button className='hover:!bg-white hover:text-primary text-white fill-white hover:!fill-primary transition-all' variant='light' isIconOnly={isOpen}>
                <HomeIcon /> {!isOpen && 'dashboard'}
            </Button>
        </div>
    )
}

export default SideBar