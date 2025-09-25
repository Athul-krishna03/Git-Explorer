import { useQuery } from "@tanstack/react-query";
import { fetchSavedUsers } from "../api/services";

export const useSavedUsers = () => {
    return useQuery({
        queryKey: ["savedUsers"],
        queryFn: fetchSavedUsers,
        staleTime: 1000 * 60 * 5,     // data is fresh for 5 minutes
        gcTime: 1000 * 60 * 10,    // keep in memory for 10 minutes
        refetchOnMount: false,        // don’t refetch when component remounts
        refetchOnWindowFocus: false,  // optional: no refetch when tab is focused
        refetchOnReconnect: false,    // optional: no refetch when reconnecting
    });
};
