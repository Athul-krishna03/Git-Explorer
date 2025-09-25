import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/services";

interface UpdateUserPayload {
    id: string;
    username?: string;
    avatar_url?: string;
    bio?: string;
    location?: string;
}

export function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: UpdateUserPayload) => {
        const { id, ...rest } = payload;
        const res = await updateUser(id, rest);
        return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['savedUsers'] });
        },
    });
}
