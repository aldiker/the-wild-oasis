import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'

export function useBookings() {
    const [searchParams] = useSearchParams()

    // FILTER
    const filterValue = searchParams.get('status')
    const filter =
        !filterValue || filterValue === 'all'
            ? null
            : { field: 'status', value: filterValue }

    // SORT
    const sortByRow = searchParams.get('sortBy')
    const [field, direction] = sortByRow.split('-')
    const sortBy = { field, direction }

    const {
        isError,
        isLoading,
        data: bookings,
    } = useQuery({
        queryKey: ['bookings', filter, sortBy],
        queryFn: () => getBookings({ filter, sortBy }),
    })

    return { isLoading, isError, bookings }
}
