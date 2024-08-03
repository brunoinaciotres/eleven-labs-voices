import { useEffect, useState } from "react";
import axios from 'axios'


export default function useRequest<T = unknown>(url:string){
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(()=> {
        axios.get(url)
        .then(response => {
            setData(response.data)
        })
        .catch(e => {
            console.log(e)
        })
        .finally(()=> {
            setIsLoading(false)
        }) 

    },[])

    return {data, isLoading}
}