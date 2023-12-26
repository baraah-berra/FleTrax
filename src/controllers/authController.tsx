"use client"

import axios from "axios";
import toast from "react-hot-toast";
type Data = {
    username: string,
    password: string
}
export default async function LoginUser(data: Data) {
    try {
        await axios({
            method: "post",
            url: `${process.env.NEXT_PUBLIC_API_URL}auth/login?locale=ar`,
            data
        }).then((res) => {
            toast.success(res.data.message);
            localStorage.setItem("userData", JSON.stringify(res.data.data));
        });
    } catch (error) {
        console.log(error);
    }
}
