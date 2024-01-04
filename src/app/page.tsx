"use client"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '@/store/dashboard';
import { Card, CardBody, CardHeader, Divider, Progress } from '@nextui-org/react';
import CarIcon from '@/components/icons/CarIcon';
import WifiOnIcon from '@/components/icons/WifiOnIcon';
import WifiOnIcOff from '@/components/icons/WifiOnIcOff';
import PageLoader from '@/components/layout/PageLoader';
import NoteIcon from '@/components/icons/NotIcon';
import PinIcon from '@/components/icons/PinIcon';


export default function Page() {
  const dispatch = useDispatch<any>();

  const { dashboardData, status, error } = useSelector((state: any) => state.dashboard);

  useEffect(() => {
    const getDashboardData = async () => {
      await dispatch(fetchDashboardData("id,name,device_type_id,connected,telemetry"));
    }
    getDashboardData();
  }, []);
  if (!dashboardData) {
    return <PageLoader />
  }

  return (
    <>
      <div className="p-10 grid grid-cols-12 gap-14">
        {dashboardData && dashboardData.map((item: any, i: number) => {
          if (item.type == 'devices_status') {
            return (
              <Card className='col-span-4 box-shadow p-6' key={i}>
                <CardHeader className='flex flex-wrap justify-between gap-4 p-0'>
                  <h2 className='text-amber-400 text-xl font-semibold '>
                    {item.name}
                  </h2>
                  <div className='flex items-center gap-2'>
                    <span className="text-blue-800 text-2xl font-bold">{item.device_count}</span>
                    <span className="text-blue-800 text-base font-semibold">Unit</span>
                    <CarIcon />
                  </div>
                  <Divider />
                </CardHeader>
                <CardBody className='grid grid-cols-2 gap-8 p-0 pt-6 overflow-visible'>
                  {item.items.map((subItem: any, i: number) => (
                    <div className="col-span-1 shadow-small rounded-md flex flex-col justify-center items-center gap-2 p-4" key={i}>
                      {subItem.name == 'online' &&
                        <WifiOnIcon />
                      }
                      {subItem.name == 'offline' &&
                        <WifiOnIcOff />
                      }
                      {subItem.name == "not_registered" &&
                        <NoteIcon />
                      }
                      {subItem.name == "gps_not_updated" &&
                        <PinIcon />
                      }
                      <p className=' text-neutral-800 text-xl font-bold '>{subItem.value}</p>
                      <p className=' text-neutral-800 text-sm font-normal '>{subItem.name}</p>
                    </div>
                  ))}
                </CardBody>
              </Card>
            )
          }
          if (item.type == "motion_status" || item.type == "geofence" || item.type == "unit_types" && item.items.length < 0) {
            return (
              <Card className='col-span-4 box-shadow p-6'  key={i}>
                <CardHeader className='flex flex-wrap justify-center gap-4 p-0'>
                  <h2 className='text-amber-400 text-xl font-semibold '>
                    {item.name}
                  </h2>
                  <Divider />
                </CardHeader>
                <CardBody className='flex flex-col gap-6 p-0 pt-6 overflow-visible'>
                  {item.items.map((subItem: any, i: number) => (
                    <div className='p-4 bg-indigo-50 rounded-lg shadow border-l-4 border-indigo-500 justify-between items-center inline-flex'  key={i}>
                      <p className="text-neutral-800 text-sm font-semibold leading-tight">
                        {subItem.name}
                      </p>
                      <p className="text-neutral-800 text-sm font-semibold leading-tight">
                        {subItem.value}
                      </p>
                    </div>
                  ))}
                </CardBody>
              </Card>
            )
          }
          if (item.type == "engine_hours" || item.type == "mileage") {
            const sortedItems = item.items.slice().sort((a: any, b: any) => b.value - a.value)
            
            return (
              <Card className='col-span-4 box-shadow p-6'  key={i}>
                <CardHeader className='flex flex-wrap justify-center gap-4 p-0'>
                  <h2 className='text-amber-400 text-xl font-semibold '>
                    {item.name}
                  </h2>
                  <Divider />
                </CardHeader>
                <CardBody className='flex flex-col gap-6 p-0 pt-6 overflow-visible'>
                  <table className="border-separate border-spacing-y-6">
                    <tbody>
                      {sortedItems.map((subItem: any, i: number) => (
                        <tr key={i}>
                          <td>
                            <p className="text-neutral-800 text-sm font-semibold leading-tight">
                              {subItem.name}
                            </p>
                          </td>
                          <td width={210} >
                            <Progress className="relative " size="lg" classNames={{
                              base:"h-6",
                              track:"!h-6",
                              indicator:"!h-6",
                              labelWrapper:"start-3 absolute z-10 text-white"
                            }} label={subItem.value ? Math.floor(subItem.value) : "0"} aria-label="Loading..." value={(subItem.value / sortedItems[0].value) * 100} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            )
          }
        })}
      </div >
    </>
  )
}