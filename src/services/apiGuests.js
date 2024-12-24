import { longFormatters } from 'date-fns'
import supabase from './supabase'

export async function getGuests() {
    const { data, error } = await supabase.from('guests').select('*')

    if (error) {
        console.log(error)
        throw new Error('Cabins could not be loaded!')
    }

    return data
}

export async function getCountries() {
    try {
        const response = await fetch('https://flagcdn.com/en/codes.json')
        if (!response.ok) {
            console.log(response.status)
            throw new Error('HTTP Error: ')
        }
        const data = await response.json()

        const result = Object.entries(data).map(([flag, country]) => {
            return { flag: `https://flagcdn.com/${flag}.svg`, country: country }
        })

        // const result = []
        // for (const key in data) {
        //     result.push({
        //         flag: `https://flagcdn.com/${key}.svg`,
        //         country: data[key],
        //     })
        // }

        return result
    } catch (error) {
        console.log(error)
        throw new Error('Countries could not be loaded!')
    }
}

export async function createGuest(newGuest) {
    const query = supabase.from('guests').insert([{ ...newGuest }])

    const { data, error } = await query.select()

    if (error) {
        console.log(error)
        throw new Error('Guest could not be inserted!')
    }

    return data
}

// export async function getGuests({ filter, sortBy, page }) {
//     let query = supabase
//         .from('guests')
//         .select(
//             'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)',
//             { count: 'exact' },
//         )

//     // FILTERING
//     if (filter !== null)
//         query = query[filter.method || 'eq'](filter.field, filter.value)

//     // SORT
//     if (sortBy)
//         query = query.order(sortBy.field, {
//             ascending: sortBy.direction === 'asc',
//         })

//     // PAGINATION
//     if (page) {
//         const from = (page - 1) * PAGE_SIZE
//         const to = from + PAGE_SIZE - 1
//         query = query.range(from, to)
//     }

//     const { data, error, count } = await query

//     // console.log('In getBookings we have count: ', count)

//     if (error) {
//         console.log(error)
//         throw new Error('Bookings could not be loaded!')
//     }

//     return { data, count }
// }

// export async function getBooking(id) {
//     const { data, error } = await supabase
//         .from('bookings')
//         .select('*, cabins(*), guests(*)')
//         .eq('id', id)
//         .single()

//     if (error) {
//         console.error(error)
//         throw new Error('Booking not found')
//     }

//     return data
// }

// export async function updateBooking(id, obj) {
//     const { data, error } = await supabase
//         .from('bookings')
//         .update(obj)
//         .eq('id', id)
//         .select()
//         .single()

//     if (error) {
//         console.error(error)
//         throw new Error('Booking could not be updated')
//     }
//     return data
// }

// export async function deleteBooking(id) {
//     // REMEMBER RLS POLICIES
//     const { data, error } = await supabase
//         .from('bookings')
//         .delete()
//         .eq('id', id)

//     if (error) {
//         console.error(error)
//         throw new Error('Booking could not be deleted')
//     }
//     return data
// }
