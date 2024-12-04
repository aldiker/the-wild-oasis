import { useQuery } from '@tanstack/react-query'
import { getGuests } from '../../services/apiGuests'

export function useGuests() {
    const {
        isError,
        isLoading,
        data: guests,
    } = useQuery({
        queryKey: ['guests'],
        queryFn: getGuests,
    })

    return { isLoading, isError, guests }
}
