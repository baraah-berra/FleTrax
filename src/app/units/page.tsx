"use client"
import PlusIcon from '@/components/icons/PlusIcon'
import SearchIcon from '@/components/icons/SearchIcon'
import TrashIcon from '@/components/icons/TrashIcon'
import { fetchDevices } from '@/store/devicesSlice'
import { Button, Card, CardBody, Divider, Input, Spinner, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Telemetry from './_Telemetry'
import Commands from './_Commands'
import Basic from './_Basic'

type Props = {}


const page = (props: Props) => {
  const dispatch = useDispatch<any>();


  const { devices, status, error } = useSelector((state: any) => state.devices);

  const [selected, setSelected] = React.useState<any>("photos");

  const [selectedDevice, setSelectedDevice] = React.useState<any>({})

  useEffect(() => {
    const getDevices = async () => {
      await dispatch(fetchDevices("id,last_active,name,telemetry,commands,device_type_name"));
    }

    getDevices()
  }, [dispatch]);
  useEffect(() => {
    if (status != 'loading') {
      setSelectedDevice(devices[0])
    }
  }, [devices]);


  return (
    <div className='px-10 grid grid-cols-12 gap-5 h-full pb-10 py-2'>
      <div className='p-10 bg-white rounded-lg box-shadow col-span-3'>
        <div className="flex gap-3 max-h-full">
          <Input variant='flat' size='sm' radius="sm" className='bg-white' startContent={<SearchIcon />} classNames={{
            inputWrapper: "!bg-white shadow-medium"
          }} />
          <Button isIconOnly color='warning' size='lg' radius='md'>
            <PlusIcon />
          </Button>
        </div>
        <div className='flex flex-col mt-7 gap-5 max-h-full'>
          {status == 'loading' ? <Spinner /> :
            devices.map((device: any, i: number) => (
              <Button key={i} variant='light' size='lg' className={`flex flex-wrap box-shadow p-6 rounded-lg gap-2 fill-primary h-auto hover:!bg-primary-100 ${(selectedDevice && selectedDevice.id) == device.id && 'bg-primary-100 text-white'}`} onClick={() => setSelectedDevice(device)}>
                <div className='flex flex-col w-3/4'>
                  <p className='text-black font-semibold text-xs'>{device.name}</p>
                  <p className='text-black font-extralight text-xs'></p>
                </div>
                <Button isIconOnly variant='light' size='sm' radius='md' className='fill-primary ms-auto'>
                  <TrashIcon className="col-span-1 row-span-2" />
                </Button>
              </Button>
            ))
          }
        </div>
      </div>
      <div className="flex flex-col col-span-9">
        <Tabs
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={setSelected}
          classNames={{
            tabList: " rounded-md gap-0 bg-white p-px box-shadow h-12",
            tab: " rounded-none first:rounded-s-md last:rounded-e-md px-16 py-4  h-12",
            cursor: "rounded-md bg-transparent shadow-none border-primary border-1 h-12 m-0",
          }}
        >
          <Tab key="attributes" title="All Attributes">
            <Card className='box-shadow rounded-lg'>
              <CardBody className='p-12 mb-7'>
                <Telemetry selectedDevice={selectedDevice} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="basic" title="Basic">
            <Card className='box-shadow rounded-lg'>
              <CardBody>
                <Basic selectedDevice={selectedDevice} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="commands" title="commands">
            <Card className='box-shadow rounded-lg'>
              <CardBody className='p-12 mb-7'>
                <Commands selectedDevice={selectedDevice} />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default page