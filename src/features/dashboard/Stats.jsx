import { HiOutlineBriefcase, HiOutlineChartBar } from 'react-icons/hi'
import Stat from './Stat'
import { HiOutlineBanknotes, HiOutlineCalendarDays } from 'react-icons/hi2'

export default function Stats({ bookings, confirmedStays }) {
    const numBookings = bookings.length

    return (
        <>
            <Stat
                icon={<HiOutlineBriefcase />}
                title="Bookings"
                value={numBookings}
                color="blue"
            />
            <Stat
                icon={<HiOutlineBanknotes />}
                title="Sales"
                value={numBookings}
                color="green"
            />
            <Stat
                icon={<HiOutlineCalendarDays />}
                title="Check ins"
                value={numBookings}
                color="indigo"
            />
            <Stat
                icon={<HiOutlineChartBar />}
                title="Occupancy rate"
                value={numBookings}
                color="yellow"
            />
        </>
    )
}
