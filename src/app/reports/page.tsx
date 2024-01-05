"use client"
import { fetchReport } from '@/store/reports'
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Report from './_Reporte'

type Props = {}

const reports_types = [
    {
        name: 'Mileage Reports',
        slug: 'mileage_reports',
    },
    {
        name: 'Over Speed Reports',
        slug: 'over_speed_reports',
    },
    {
        name: 'Parking Reports',
        slug: 'parking_reports',
    },
    {
        name: 'ACC Reports',
        slug: 'acc_reports',
    },
    {
        name: 'trip Reports',
        slug: 'trip_reports',
    },
    {
        name: 'alarm Reports',
        slug: 'alarm_reports',
    },
    {
        name: 'system Reports',
        slug: 'system_reports',
    },
]
function page({ }: Props) {
    const [selected, setSelected] = React.useState<any>(reports_types[0].slug);
    

    return (
        <div className='p-2'>
            <Tabs
                aria-label="Options"
                selectedKey={selected}
                onSelectionChange={setSelected}
                classNames={{
                    tabList: " rounded-md gap-0 bg-white p-px box-shadow h-12",
                    tab: " rounded-none first:rounded-s-md last:rounded-e-md px-8 py-4  h-12",
                    cursor: "rounded-md bg-transparent shadow-none border-primary border-1 h-12 m-0",
                }}
            >
                {reports_types.map((report: any, i: number) => (
                    <Tab key={report.slug} title={report.name}>
                        <Card className='box-shadow rounded-lg'>
                            <CardBody className='p-12 mb-7'>
                                <Report slug={report.slug} />
                            </CardBody>
                        </Card>
                    </Tab>
                ))}
            </Tabs>
        </div>
    )
}

export default page