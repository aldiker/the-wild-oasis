import styled from 'styled-components'
import { useRecentBookings } from './useRecentBookings'
import { useRecentStays } from './useRecentStays'
import Spinner from '../../ui/Spinner'

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`

export default function DashboardLayout() {
    const { isLoading: isLoading1, bookings } = useRecentBookings()
    const { isLoading: isLoading2, stays, confirmedStays } = useRecentStays()

    if (isLoading1 || isLoading2) return <Spinner />
    console.log('bookings', bookings)
    console.log('stays', stays)
    console.log('confirmedStays', confirmedStays)

    return (
        <StyledDashboardLayout>
            <div>Statistics</div>
            <div>Today&apos;s activity</div>
            <div>Chart stay durations</div>
            <div>Chart sales</div>
        </StyledDashboardLayout>
    )
}
