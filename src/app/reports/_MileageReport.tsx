"use client"
import TrashIcon from '@/app/components/icons/TrashIcon'
import PageLoader from '@/app/components/layout/PageLoader'
import { fetchReport } from '@/store/reports'
import { Button, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
    slug: string
}
const MileageReport = ({ slug }: Props) => {
    const [page, setPage] = React.useState(1);
    const dispatch = useDispatch<any>();

    const { report, status, error } = useSelector((state: any) => state.reports);

    useEffect(() => {
        const getReport = async () => {
            await dispatch(fetchReport(slug));
        }

        getReport();
    }, [dispatch]);
    if (!report) {
        return <PageLoader />
    }

    return (
        <div>
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
                    <TableColumn>id</TableColumn>
                    <TableColumn>User</TableColumn>
                    <TableColumn>Device Name</TableColumn>
                    <TableColumn>Device IMEI</TableColumn>
                    <TableColumn>Vehicle</TableColumn>
                    <TableColumn>Date Time</TableColumn>
                    <TableColumn>Milage KM</TableColumn>
                    <TableColumn>Weekly Milage</TableColumn>
                    <TableColumn>Monthly Milage</TableColumn>
                    <TableColumn>Yearly Milage</TableColumn>
                    <TableColumn>Total Milage</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody>
                    {report.map((report: any, i: number) => (
                        <TableRow key={i}>
                            <TableCell>{report.id}</TableCell>
                            <TableCell>{report.username}</TableCell>
                            <TableCell>{report.device_name}</TableCell>
                            <TableCell>{report.sim_card}</TableCell>
                            <TableCell>{report.vehicle}</TableCell>
                            <TableCell>{report.date_time}</TableCell>
                            <TableCell>{report.mileage}</TableCell>
                            <TableCell>{report.weekly_mileage}</TableCell>
                            <TableCell>{report.monthly_mileage}</TableCell>
                            <TableCell>{report.yearly_mileage}</TableCell>
                            <TableCell>{report.total_mileage}</TableCell>
                            <TableCell className='text-center'>
                                <Button isIconOnly variant='light' size='sm' className='fill-primary'>
                                    <TrashIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default MileageReport