import PlusIcon from '@/app/components/icons/PlusIcon'
import SearchIcon from '@/app/components/icons/SearchIcon'
import SendIcon from '@/app/components/icons/SendIcon'
import TrashIcon from '@/app/components/icons/TrashIcon'
import { Button, Input, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React from 'react'

type Props = {
    selectedDevice: any
}

function Commands({ selectedDevice }: Props) {
    if (!selectedDevice) {
        return <Spinner />
    }
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
                aria-label="Example static collection table"
                classNames={{
                    base: "!rounded-none",
                    wrapper: "border-0 p-0 shadow-none before:!rounded-none",
                    th: "!rounded-none bg-white border-1",
                    thead: "rounded-none [&>*:nth-child(2)]:hidden",
                    tr: "even:bg-primary-50 before:!rounded-none before:!rounded-none",
                    td: "before:!rounded-none border-1"
                }}
            >
                <TableHeader>
                    <TableColumn>id</TableColumn>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>Time</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody>
                    {selectedDevice.commands.map((command: any, i: number) => (
                        <TableRow key={i}>
                            <TableCell>{command.id}</TableCell>
                            <TableCell>{command.name}</TableCell>
                            <TableCell>{command.time}</TableCell>
                            <TableCell className='text-center'>
                                <Button isIconOnly variant='light' size='sm' className='fill-primary'>
                                    <TrashIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default Commands