import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { createEditCabins } from '../../services/apiCabins'
import toast from 'react-hot-toast'
import { createBooking as createBookingApi } from '../../services/apiBookings'

export function useCreateBookings() {
    const queryClient = useQueryClient()

    const { mutate: createBooking, isLoading: isCreating } = useMutation({
        mutationFn: createBookingApi,
        onSuccess: () => {
            toast.success('New booking successfully created')
            queryClient.invalidateQueries({ queryKey: ['bookings'] })
        },
        onError: (err) => toast.error(err.message),
    })
    return { isCreating, createBooking }
}
