import {  useQuery } from "@tanstack/react-query"
import { fetchUserData } from "../api/services"

export const useSearch = (inputValue:string) =>{

    return useQuery({
        queryKey: ['search', inputValue],
        queryFn: () => fetchUserData(inputValue),
        enabled: false,
        retry: false,
    })
}