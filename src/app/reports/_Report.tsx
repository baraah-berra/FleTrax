"use client"
import RestartIcon from '@/app/components/icons/RestartIcon'
import PageLoader from '@/app/components/layout/PageLoader'
import { fetchDevices } from '@/store/devices'
import { fetchReport } from '@/store/reports'
import { fetchUsers } from '@/store/users'
import { fetchVehicles } from '@/store/vehicles'
import { Button, Input, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup';

type Props = {
    slug: string
}
const Report = ({ slug }: Props) => {
    const [page, setPage] = React.useState(1);
    const dispatch = useDispatch<any>();

    const {
        report,
        pages,
        current_page,
    } = useSelector((state: any) => state.reports);
    const { users, loading } = useSelector((state: any) => state.users);
    const { vehicles } = useSelector((state: any) => state.vehicles);
    useEffect(() => {
        const getReport = async () => {
            await dispatch(fetchReport({ slug: slug, params: { page: page } }));
            await dispatch(fetchUsers(1));
            if (slug == 'over_speed_reports') {
                await dispatch(fetchVehicles('name,id'));
            }
        }

        getReport();
    }, [dispatch, page]);

    const validationSchema = Yup.object({
        users_ids: Yup.string(),
        vehicles_ids: Yup.string(),
        start_date: Yup.date()
            .max(Yup.ref('end_date'), 'Start Date must be before End Date')
            .max(new Date(), 'Start Date cannot be in the future'),
        end_date: Yup.date()
            .min(Yup.ref('start_date'), 'End Date must be after Start Date')
            .max(new Date(new Date().setFullYear(new Date().getFullYear() + 1)), 'End Date cannot be more than one year in the future'),
    });


    const formik = useFormik({
        initialValues: {
            page: 1,
            users_ids: '',
            vehicles_ids: '',
            start_date: '',
            end_date: '',
            ass_status: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            await dispatch(fetchReport({
                slug: slug,
                params: values
            }));
            setSubmitting(false);
        }
    })
    if (!users || (!vehicles && slug == 'over_speed_reports')) {
        return <PageLoader />
    }

    const maxStartDate = new Date().toISOString().split('T')[0];
    const maxEndDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0];
    return (
        <div>
            <div className='flex'>
                <form className="grid w-10/12 grid-cols-12 gap-3" onSubmit={formik.handleSubmit}>
                    <Select
                        label="users"
                        placeholder="Select users"
                        className="col-span-2"
                        variant='bordered'
                        color='primary'
                        size='sm'
                        name='users_ids'
                        value={formik.values.users_ids}
                        onChange={formik.handleChange}
                    >
                        {users.map((item: any, i: number) => (
                            <SelectItem key={item.id} value={item.id}>
                                {item.name}
                            </SelectItem>
                        ))}
                    </Select>
                    {slug != 'mileage_reports' &&
                        <Select
                            placeholder="Select Vehicle"
                            label="Vehicle"
                            className="col-span-2"
                            variant='bordered'
                            color='primary'
                            size='sm'
                            name='vehicles_ids'
                            value={formik.values.vehicles_ids}
                            onChange={formik.handleChange}
                        >
                            {vehicles.map((item: any, i: number) => (
                                <SelectItem key={item.id} value={item.id}>
                                    {item.plate}
                                </SelectItem>
                            ))}
                        </Select>
                    }
                    {slug == 'acc_reports' &&
                        <Select
                            placeholder="ACC Status"
                            label="ACC"
                            className="col-span-2"
                            variant='bordered'
                            color='primary'
                            size='sm'
                            name='ass_status'
                            value={formik.values.ass_status}
                            onChange={formik.handleChange}
                        >

                            <SelectItem key='on' value="on">
                                on
                            </SelectItem>
                            <SelectItem key='off' value="off">
                                off
                            </SelectItem>
                        </Select>
                    }
                    <Input
                        type='date'
                        variant='bordered'
                        size='sm'
                        radius='sm'
                        label="Start Date"
                        color='primary'
                        placeholder='start date'
                        name='start_date'
                        errorMessage={formik.errors.start_date}
                        className="col-span-2"
                        value={formik.values.start_date}
                        onChange={formik.handleChange}
                        max={maxStartDate}
                    />
                    <Input
                        type='date'
                        variant='bordered'
                        size='sm'
                        radius='sm'
                        label="End date"
                        color='primary'
                        placeholder='End Date'
                        errorMessage={formik.errors.end_date}
                        className="col-span-2"
                        name='end_date'
                        value={formik.values.end_date}
                        onChange={formik.handleChange}
                        max={maxStartDate}

                    />
                    <Button isIconOnly color='warning' size='lg' radius='sm' type='submit'>
                        {formik.isSubmitting ? <Spinner color='white' size='sm' /> :
                            <RestartIcon />
                        }
                    </Button>
                </form>

            </div>
            {report ?
                <Table
                    color='primary'
                    selectionMode="multiple" 
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
                                page={current_page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    }
                >
                    <TableHeader>
                        {report && Object.keys(report[0]).map((key) => (
                            <TableColumn key={key}>{key}</TableColumn>
                        ))}
                    </TableHeader>
                    <TableBody isLoading={report < 0} loadingContent={<Spinner label="Loading..." />}

                    >
                        {report.map((row: any, i: number) => (
                            <TableRow key={i} >
                                {Object.values(row).map((value: any, i: number) => (
                                    <TableCell key={i}>
                                        {value}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                : <PageLoader />}
        </div>
    )
}

export default Report