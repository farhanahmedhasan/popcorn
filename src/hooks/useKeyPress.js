import {useEffect} from "react";

export default function (key, fn){
    useEffect(()=> {
        const callback = (e)=> {
            if(e.code.toLowerCase() === key.toLowerCase()) fn?.()
        }

        document.addEventListener('keydown', callback)

        return ()=> document.removeEventListener('keydown', callback)
    },[fn, key])
}