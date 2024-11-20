import { HiOutlineBriefcase, HiOutlineChartBar } from 'react-icons/hi'
import Stat from './Stat'
import { HiOutlineBanknotes, HiOutlineCalendarDays } from 'react-icons/hi2'
import { formatCurrency } from '../../utils/helpers'

export default function Stats({
    bookings,
    confirmedStays,
    numDays,
    cabinsCount,
}) {
    // 1.
    const numBookings = bookings.length

    // 2.
    const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0)

    // 3.
    const checkings = confirmedStays.length

    // 4.
    const checkingNights = confirmedStays.reduce(
        (acc, cur) => acc + cur.numNights,
        0,
    )
    const availableNights = numDays * cabinsCount
    const occupation = Math.round((checkingNights / availableNights) * 100)

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
                value={formatCurrency(sales)}
                color="green"
            />
            <Stat
                icon={<HiOutlineCalendarDays />}
                title="Check ins"
                value={checkings}
                color="indigo"
            />
            <Stat
                icon={<HiOutlineChartBar />}
                title="Occupancy rate"
                value={occupation + '%'}
                color="yellow"
            />
        </>
    )
}
