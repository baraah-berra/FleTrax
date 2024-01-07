"use client"
import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Badge, Divider, Accordion, AccordionItem, Avatar, Chip } from "@nextui-org/react";
import BellIcon from '../icons/BellIcon';
import CloseIcon from '../icons/CloseIcon';
import Image from 'next/image';
import { title } from 'process';

type Props = {}

const NotificationIconModal = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(!isOpen);
    const onClose = () => setIsOpen(false);
    const defaultContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    return (
        <>
            <Button variant='light' radius='sm' isIconOnly onClick={onOpen}>
                <Badge color="warning" className='text-blue-600' content={5} shape="circle">
                    <BellIcon />
                </Badge>
            </Button>
            <div className={`bg-primary bg-opacity-70 w-screen h-screen absolute z-50 transition-all start-0 top-0 flex justify-end ${isOpen ? "" : "translate-x-full"}`} onClick={onClose} />
            <div className={`w-1/3 p-3 rounded-s-3xl bg-white h-screen absolute z-50 transition-all end-0 top-0 flex justify-end ${!isOpen ? "translate-x-full" : ""}`} >
                <div className='w-full flex flex-wrap h-fit p-3 justify-between items-center'>
                    <h1 className='text-primary font-semibold'>Notifications</h1>
                    <Button isIconOnly variant='light' onClick={onClose}>
                        <CloseIcon />
                    </Button>
                    <Divider className='w-full mt-2' />
                    <Button color='warning' className='text-white ms-auto mt-5 rounded-lg bg-warning-400 text-xs'>
                        Mark all as read
                    </Button>
                    <Accordion>
                        <AccordionItem
                            key="1"
                            aria-label="Chung Miller"
                            classNames={{
                                title:"text-small"
                            }}
                            indicator={<div className='w-2 h-2 bg-warning rounded-full' />}
                            startContent={
                                <Image
                                    width={40}
                                    height={40}
                                    alt='dsa'
                                    src="/assets/images/nti.svg"
                                />
                            }
                            subtitle={
                                <>
                                    <p className='whitespace-nowrap text-xs'>Movement is observed while protection mode is active</p>
                                    <span className="text-xs text-gray-400">
                                        0 min
                                    </span>
                                </>
                            }
                            title="Suspicious movement"
                        >
                            {defaultContent}
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </>
    );
}

export default NotificationIconModal

