import {useState} from "react";
import {useAuth} from "../context/AuthContext";
import type {apiFunc} from "../API"

interface iResponse {
    data: any | null
    isFetching: boolean,
    error: Error | null,
    isSuccess: boolean   
}

export function useApi(apiFunction : apiFunc) : [iResponse, any] {
    const [response, setResponse] = useState({
        data: null,
        isFetching: false,
        error: null,
        isSuccess: false
    })
    const {user} = useAuth();
    
    const fetchMethod = (args?:any):void => {
        setResponse({
            data: null,
            isFetching: true,
            error: null,
            isSuccess: false
        });

        apiFunction(user, args).then((res : any) => {
            setResponse({
                ...response,
                data: res,
                isFetching: false,
                isSuccess: true
            })
        }).catch((err:any) => {
            setResponse({
                ...response,
                isFetching: false,
                isSuccess: false,
                error: err
            })
        })

    }
    
    return [response, fetchMethod]
}