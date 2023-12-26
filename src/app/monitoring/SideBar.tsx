"use client"
import React, { useState } from 'react'
import { Accordion, AccordionItem, Button, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import DeiceStatus from '@/components/icons/DeiceStatus'
import TurnOff from '@/components/icons/TurnOff'
import SearchIcon from '@/components/icons/SearchIcon'
import RestartIcon from '@/components/icons/RestartIcon'
import MoreIcon from '@/components/icons/MoreIcon'
import Map from '@/components/Map'
type Props = {
    devices: any
}

const SideBar = ({ devices }: Props) => {
    const [location , setLocation] = useState({ lat: 44, lng: -80 })
    return (
        <div className='w-max h-max p-16 flex'>
            <Accordion variant="bordered" className='bg-white '>
                <AccordionItem key="1" aria-label="Accordion 1" title={
                    <p>Devices</p>
                }>
                    <>
                        <Table
                            color='primary'
                            shadow='none'
                            selectionMode="multiple"
                            aria-label="Example static collection table"
                            classNames={{
                                wrapper: "p-0",
                                th: "bg-transparent",
                            }}
                        >
                            <TableHeader>
                                <TableColumn>
                                    <div className="flex gap-3">
                                        <Input variant='flat' size='sm' radius="sm" className='bg-white' startContent={<SearchIcon />} classNames={{
                                            inputWrapper: "!bg-white shadow-medium"
                                        }} />
                                    </div>
                                </TableColumn>
                                <TableColumn className='flex justify-center'>
                                    <Button color='warning' radius="sm" isIconOnly>
                                        <RestartIcon />
                                    </Button>
                                    <Button variant="light" radius="sm" isIconOnly>
                                        <MoreIcon />
                                    </Button>
                                </TableColumn>
                            </TableHeader>
                            <TableBody>
                                {devices?.map((device: any, i: number) => (
                                    <TableRow key={i}>
                                        <TableCell>{device.name}</TableCell>
                                        <TableCell className='flex items-center gap-2'>
                                            <TurnOff active={device.telemetry['engine.ignition.status']} />
                                            {/* connection */}
                                            <DeiceStatus active={device.telemetry['defense.active.status']} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </>
                </AccordionItem>
            </Accordion>
            <Map location={location} />
        </div>
    )
}

export default SideBar