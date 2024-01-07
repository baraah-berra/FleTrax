"use client"
import TrashIcon from '@/components/icons/TrashIcon'
import PageLoader from '@/components/layout/PageLoader'
import { fetchReport } from '@/store/reports'
import { Button, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
    slug: string
}
const Report = ({ slug }: Props) => {
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
                    {Object.keys(report[0]).map((key) => (
                        <TableColumn key={key}>{key}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {report.map((row: any, i: number) => (
                        <TableRow key={i}>
                            {Object.values(row).map((value: any, i: number) => (
                                <TableCell key={value}>
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