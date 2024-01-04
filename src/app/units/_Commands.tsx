import PlusIcon from '@/components/icons/PlusIcon'
import SearchIcon from '@/components/icons/SearchIcon'
import SendIcon from '@/components/icons/SendIcon'
import TrashIcon from '@/components/icons/TrashIcon'
import { Button, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React from 'react'

type Props = {
    selectedDevice: any
}

function Commands({ selectedDevice }: Props) {
    return (
        <>
            <div className="header flex justify-between items-center mb-10">
                <h6 className="title text-primary">
                    Commands
                </h6>
                <div className="w-75 flex gap-3">
                    <Input variant='flat' size='sm' radius="sm" className='bg-white' startContent={<SearchIcon />} classNames={{
                        inputWrapper: "!bg-white shadow-medium",
                    }} />
                    <Button isIconOnly color='warning' size='lg' radius='sm'>
                        <SendIcon />
                    </Button>
                </div>
            </div>
            <Table
                color='primary'
                selectionMode="multiple"
                aria-label="Example static collection table"
                classNames={{
                    wrapper: "border-1 shadow-none",
                }}
            >
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>Time</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody>
                    {selectedDevice.commands.map((command: any, i: number) => (
                        <TableRow key={i}>
                            <TableCell>{command.name}</TableCell>
                            <TableCell>{command.time}</TableCell>
                            <TableCell className='text-center'>
                                <Button isIconOnly variant='light' size='sm' className='fill-primary'>
                                    <TrashIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default Commands