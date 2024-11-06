import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { logout as logoutApi } from '../../services/apiAuth'

export function useLogout() {
    const queryClient = useQueryClient()
    const navigation = useNavigate()

    const { mutate: logout, isLoading } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.removeQueries(['user'])
            navigation('/login', { replace: true })
        },
    })

    return { logout, isLoading }
}
