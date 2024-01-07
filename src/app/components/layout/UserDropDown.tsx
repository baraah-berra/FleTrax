'use client'
import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User, Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { logoutAsync } from "@/store/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { AppDispatch } from "@/store";

type Props = {
    userData: {
        username: string,
        email: string,
    } | null
}

export default function UserDropDown({ userData }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const pathname = usePathname();
    
    const handleLogout = () => {
        dispatch(logoutAsync());
        router.refresh();
    };

    return (
        <div className="flex items-center gap-4">
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Button variant='light' className='mb-0 text-xl text-blue-600 text capitalize'>
                        {userData?.username}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">{userData?.email}</p>
                    </DropdownItem>
                    <DropdownItem key="settings">
                        My Settings
                    </DropdownItem>
                    <DropdownItem key="analytics">
                        Analytics
                    </DropdownItem>
                    <DropdownItem key="system">System</DropdownItem>
                    <DropdownItem key="configurations">Configurations</DropdownItem>
                    <DropdownItem key="help_and_feedback">
                        Help & Feedback
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
