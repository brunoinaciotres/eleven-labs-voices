import { useState } from "react";
import axios from 'axios'


type Body = {
    text: string
    voiceId: string
}

export default function useRequestPost<T = unknown>() {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    
    const sendPostRequest = async (url:string, body:Body) => {

        setIsLoading(true)

        try {
            const res = await axios.post(url, body, {
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType:'blob'
            })
            
            setData(res.data as T)

        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
        
    }
   
    return { data, isLoading, sendPostRequest }
}