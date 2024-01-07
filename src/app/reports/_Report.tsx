"use client"
import RestartIcon from '@/app/components/icons/RestartIcon'
import PageLoader from '@/app/components/layout/PageLoader'
import { fetchDevices } from '@/store/devices'
import { fetchReport } from '@/store/reports'
import { fetchUsers } from '@/store/users'
import { fetchVehicles } from '@/store/vehicles'
import { Button, Input, Pagination, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
    slug: string
}
const Report = ({ slug }: Props) => {
    const [page, setPage] = React.useState(1);
    const dispatch = useDispatch<any>();

    const { report, status } = useSelector((state: any) => state.reports);
    const { users, loading } = useSelector((state: any) => state.users);
    const { vehicles } = useSelector((state: any) => state.vehicles);
    const [selectedUsers, setSelectedUsers] = useState<any>(new Set(['']))
    const [selectedVehicles, setSelectedVehicles] = useState<any>(new Set(['']))
    useEffect(() => {
        const getReport = async () => {
            await dispatch(fetchReport({ slug: slug }));
            await dispatch(fetchUsers(1));
            if (slug == 'over_speed_reports') {
                await dispatch(fetchVehicles('name,id'));
            }
        }

        getReport();
    }, [dispatch]);

    const handleChange = async (e: any) => {
        // await dispatch(fetchReport({
        //     slug: slug, params: {
        //         [key]: e.target.value
        //     }
        // }));
        console.log(e);
    }

    const formik = useFormik({
        initialValues: {
            users_ids: selectedUsers,
            vehicles_ids: selectedVehicles,
        },
        onSubmit: async (values) => {
            console.log(selectedUsers, selectedVehicles);

            // await dispatch(fetchReport({
            //     slug: slug,
            //     params: {
            //         users_ids: values.users_ids, // Pass the correct values
            //         vehicles_ids: values.vehicles_ids, // Pass the correct values
            //     }
            // }));
        }
    })
    if (!report || !users || (!vehicles && slug == 'over_speed_reports')) {
        return <PageLoader />
    }

    return (
        <div>
            <div>
                <form className="grid grid-cols-12 gap-3" onSubmit={formik.handleSubmit}>
                    <Select
                        label="users"
                        placeholder="Select users"
                        selectionMode="multiple"
                        className="col-span-2"
                        variant='bordered'
                        color='primary'
                        size='sm'
                        name='users_ids'
                        selectedKeys={Array.from(selectedUsers)}
                        onSelectionChange={(newKeys) => setSelectedUsers(new Set(newKeys))}
                        onChange={(e)=> console.log(e.target.value)}
                    >
                        {users.map((item: any, i: number) => (
                            <SelectItem key={item.name} value={item.name}>
                                {item.name}
                            </SelectItem>
                        ))}
                    </Select>
                    {slug == 'over_speed_reports' &&
                        <>
                            <Select
                                placeholder="Select Vehicle"
                                selectionMode="multiple"
                                className="col-span-2"
                                variant='bordered'
                                color='primary'
                                size='sm'
                                name='vehicles_ids'
                                selectedKeys={Array.from(selectedVehicles)}
                                onSelectionChange={(newKeys) => setSelectedVehicles(new Set(newKeys))}
                            >
                                {vehicles.map((item: any, i: number) => (
                                    <SelectItem key={i} value={item.plate}>
                                        {item.plate}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Input

                            />
                        </>
                    }
                    <Button isIconOnly color='warning' size='lg' radius='sm' type='submit'>
                        <RestartIcon />
                    </Button>
                </form>
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
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={1}
                            total={10}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
            >
                <TableHeader>
                    {Object.keys(report[0]).map((key) => (
                        <TableColumn key={key}>{key}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {report.map((row: any, i: number) => (
                        <TableRow key={i}>
                            {Object.values(row).map((value: any, i: number) => (
                                <TableCell key={i}>
                                    {value}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Report