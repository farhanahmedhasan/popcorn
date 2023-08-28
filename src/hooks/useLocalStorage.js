import {useEffect, useState} from "react";

export default function useLocalStorage(key, initialValue) {
    const [data, setData] = useState(() => localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : initialValue)

    useEffect(()=> {
        localStorage.setItem(key, JSON.stringify(data))
    }, [data, key])

    return [data, setData]
}