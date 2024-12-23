import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateGuestForm from '../guests/CreateGuestForm'
import CreateBookingForm from './CreateBookingForm'

export default function AddBooking() {
    return (
        <div>
            <Modal>
                <Modal.Open opens="booking-form">
                    <Button>Add new booking</Button>
                </Modal.Open>
                <Modal.Window name="booking-form">
                    <CreateBookingForm />
                </Modal.Window>
                <Modal.Window name="guest-form">
                    <CreateGuestForm />
                </Modal.Window>
            </Modal>
        </div>
    )
}
