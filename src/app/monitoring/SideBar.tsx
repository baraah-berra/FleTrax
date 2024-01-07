"use client"
import React, { useState } from 'react'
import { Accordion, AccordionItem, Button, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import DeiceStatus from '@/app/components/icons/DeiceStatus'
import TurnOff from '@/app/components/icons/TurnOff'
import SearchIcon from '@/app/components/icons/SearchIcon'
import RestartIcon from '@/app/components/icons/RestartIcon'
import MoreIcon from '@/app/components/icons/MoreIcon'
type Props = {
    devices: any
}

const SideBar = ({ devices }: Props) => {
    const [location, setLocation] = useState({ lat: 44, lng: -80 })
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
                            selectionMode="single"
                            aria-label="Example static collection table"
                            classNames={{
                                wrapper: "p-0",
                                th: "bg-transparent",
                            }}
                            onSelectionChange={(e: any) => console.log(e.currentKey)
                            }
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
                                    <TableRow key={`{lat:${device.telemetry.position.latitude},lng:${device.telemetry.position.longitude}}`} textValue={`{${device.telemetry.latitude},${device.telemetry.longitude}}`}>
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
            {/* <Map location={location} /> */}
        </div>
    )
}

export default SideBar