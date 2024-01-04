import { fetchUsers } from '@/store/users';
import { Checkbox, CheckboxGroup, Input, Spinner } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

type Props = { selectedDevice: any }

const Basic = ({ selectedDevice }: Props) => {
    const dispatch = useDispatch<any>();
    const { users, loading, error } = useSelector((state: any) => state.users);

    useEffect(() => {
        dispatch(fetchUsers(1));
    }, [dispatch]);


    if (!selectedDevice && loading) {
        return <Spinner />
    }
    return (
        <div className='grid grid-cols-4 p-6 gap-10'>
            <div className="justify-start col-span-4 items-center gap-4 inline-flex">
                <div className="w-[5px] h-[35px] bg-indigo-500 rounded-tr-[10px] rounded-br-[10px]" />
                <div className="text-center text-indigo-500 text-xl font-semibold leading-tight">Required</div>
            </div>
            <Input
                label="name"
                labelPlacement='outside'
                isDisabled
                value={selectedDevice.name}
                variant='bordered'
                classNames={{
                    base: "col-span-2",
                    inputWrapper: "rounded-md bg-white",
                }}
            />
            <Input
                label="Type"
                labelPlacement='outside'
                isDisabled
                value={selectedDevice.device_type_name}
                variant='bordered'
                classNames={{
                    base: "col-span-2",
                    inputWrapper: "rounded-md bg-white",
                }}
            />
            <Input
                label="Phone"
                labelPlacement='outside'
                isDisabled
                value={selectedDevice.telemetry['gsm.sim.imsi']}
                variant='bordered'
                classNames={{
                    base: "col-span-2",
                    inputWrapper: "rounded-md bg-white",
                }}
            />
            <div className="col-span-4">
                <CheckboxGroup
                    label={
                        <div className="justify-start items-center gap-4 inline-flex mb-10">
                            <div className="w-[5px] h-[35px] bg-indigo-500 rounded-tr-[10px] rounded-br-[10px]" />
                            <div className="text-center text-indigo-500 text-xl font-semibold leading-tight">Users</div>
                        </div>
                    }
                    classNames={{
                        wrapper:"grid grid-cols-2 gap-10"
                    }}
                    defaultValue={["buenos-aires", "london"]}
                >
                    {users.map((user: any, i: number) => (
                        <Checkbox  key={i} value={user.name}>{user.name}</Checkbox>
                    ))}
                </CheckboxGroup>
            </div>
        </div>
    )
}

export default Basic