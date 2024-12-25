import { useState } from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateGuestForm from '../guests/CreateGuestForm'
import CreateBookingForm from './CreateBookingForm'

export default function AddBooking() {
    const [newGuest, setNewGuest] = useState(null)
    console.log('AddBooking:newGuest = ', newGuest)

    // useEffect(() => {
    //     console.log('AddBooking - Mounting ...')
    //     return () => {
    //         console.log('AddBooking - Unmounting ...')
    //     }
    // }, [])

    return (
        <div>
            <Modal>
                <Modal.Open opens="booking-form">
                    <Button>Add new booking</Button>
                </Modal.Open>
                <Modal.Window name="booking-form">
                    <CreateBookingForm
                        newGuest={newGuest}
                        setNewGuest={setNewGuest}
                    />
                </Modal.Window>
                <Modal.Window name="guest-form">
                    <CreateGuestForm setNewGuest={setNewGuest} />
                </Modal.Window>
            </Modal>
        </div>
    )
}
