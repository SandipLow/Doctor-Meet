import { useEffect, useState } from "react";

export function useLogin() {
    const [user, setUser] = useState(null)

    useEffect(()=> {
        // TODO : fetch user code
        setUser(JSON.parse(localStorage.getItem("user")))
    }, [])

    return user;
}