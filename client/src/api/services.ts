import axios from 'axios'


export const api = axios.create({
    baseURL:import.meta.env.VITE_BACKEND_API,
    withCredentials:true
})


export const fetchUserData = async (username:string)=>{
    const res = await api.get(`/users/${username}`)
    return {user:res.data}
}

export const fetchSavedUsers = async ()=>{
    const res = await api.get('/users')
    return res.data
}

export const updateUser = async (id:string, data: { username?: string; avatar_url?: string; bio?: string; location?: string; })=>{
    const res = await api.patch(`/edit`,{id, bio:data.bio, location:data.location})
    return res.data
}