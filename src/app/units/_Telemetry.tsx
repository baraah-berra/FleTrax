import { Divider, Spinner } from '@nextui-org/react'
import React from 'react'

type Props = {
    selectedDevice: any
}

function Telemetry({ selectedDevice }: Props) {
    if (!selectedDevice) {
        return <Spinner />
    }
    return (
        <>
            <h1 className='text-primary mb-10'>{selectedDevice.name}</h1>
            <Divider />
            <div className="grid grid-cols-4 gap-8 pt-10">
                {selectedDevice.telemetry && Object.entries(selectedDevice.telemetry).map(([key, value]) => (
                    <>
                        <div className={`bg-primary-50 p-6 rounded-md shadow-md flex flex-col justify-center items-center gap-3  ${value == false && "!bg-danger-50"} ${value == true && "bg-success-50"}`}>
                            <p className=' text-primary text-sm whitespace-nowrap text-ellipsis overflow-hidden max-w-ful'>a{key}</p>
                            <p className=' text-black text-md text-sm whitespace-nowrap text-ellipsis overflow-hidden max-w-full'>
                                {JSON.stringify(value)}
                            </p>
                        </div>
                    </>
                ))
                }
            </div>
        </>
    )
}

export default Telemetry