import { useQuery } from '@tanstack/react-query'
import { getCountries } from '../../services/apiGuests'

export function useCountries() {
    const {
        isError,
        isLoading,
        data: countries,
    } = useQuery({
        queryKey: ['countries'],
        queryFn: getCountries,
    })

    return { isLoading, isError, countries }
}
