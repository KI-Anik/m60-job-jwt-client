import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

const useAxiosSecure = () => {
    const {signOutUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        instance.interceptors.response.use(response => {
            return response
        }, error => {
            if (error.status === 401 || 403) {
                return signOutUser()
                .then(()=>{
                    console.log('logout by intercepter')
                    // redirect to login page
                    navigate('/signin')
                })
                .catch(err =>console.log(err.message))
            }
            return Promise.reject(error)
        })
    }, [])
    return instance

};

export default useAxiosSecure;