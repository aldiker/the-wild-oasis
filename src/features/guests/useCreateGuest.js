import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createGuest } from '../../services/apiGuests'

export function useCreateGuest() {
    const queryClient = useQueryClient()

    const { mutate: create, isLoading: isCreating } = useMutation({
        mutationFn: createGuest,
        onSuccess: () => {
            toast.success('New guest successfully created')
            queryClient.invalidateQueries({ queryKey: ['guests'] })
        },
        onError: (err) => toast.error(err.message),
    })
    return { isCreating, create }
}
