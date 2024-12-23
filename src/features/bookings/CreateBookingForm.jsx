import { useForm } from 'react-hook-form'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
// import FileInput from '../../ui/FileInput'
// import Textarea from '../../ui/Textarea'
import FormRow from '../../ui/FormRow'
import Heading from '../../ui/Heading'
import { useGuests } from '../guests/useGuests'
import { useEffect, useRef, useState } from 'react'
import { useCabins } from '../cabins/useCabins'
import { useDropdown } from '../../ui/Dropdown/useDropdown'
import DropDownList from '../../ui/Dropdown/DropdownList'

import 'react-datepicker/dist/react-datepicker.css'
import { isAfter, isSameDay } from 'date-fns'
import { formatCurrency, getToday, subtractDates } from '../../utils/helpers'
import { useSettings } from '../settings/useSettings'
import Textarea from '../../ui/Textarea'
import { useCreateBookings } from './useCreateBooking'
import Modal from '../../ui/Modal'

export default function CreateBookingForm({ onClose }) {
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState,
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            startDate: getToday().split('T')[0],
            numGuests: 1,
            hasBreakfast: false,
            isPaid: false,
        },
    })
    const { errors } = formState

    // Получаем настройки чтобы получить стоимость завтрака и минимальное и максимальное бронирование
    const { isLoading: isLoadingSettings, settings = {} } = useSettings()
    const { breakfastPrice, minBookingLength, maxBookingLength } =
        settings || {}

    const [numNights, setNumNights] = useState(0) // количество ночей
    const [cabinPrice, setСabinPrice] = useState(0) // стоимость проживания
    const [extrasPrice, setExtrasPrice] = useState(0) // стоимость завтраков
    const [selectedGuest, setSelectedGuest] = useState({}) // выбранный гость
    const [selectedCabin, setSelectedCabin] = useState({}) // выбранный домик

    // Из выбранного домика получаем его стоимость и максимальную вместимость
    const { regularPrice, maxCapacity, discount } = selectedCabin || {}

    // получаем список гостей и домиков, для формирования выпадающего списка
    const { isLoading: isLoadingGuests, guests } = useGuests()
    const { isLoading: isLoadingCabins, cabins } = useCabins()

    // Стоимость завтраков за все дни на всех гостей
    const numGuestsValue = watch('numGuests')
    const tempExtrasPrice = breakfastPrice * numNights * numGuestsValue

    // Полная стоимость бронирования
    const totalPrice = cabinPrice + extrasPrice

    const { isCreating, createBooking } = useCreateBookings()

    // Слежение за датами
    function handleDateChange() {
        const startDateValue = getValues('startDate')
        const endDateValue = getValues('endDate')

        console.log(
            'startDateValue = ',
            startDateValue,
            '|| endDateValue = ',
            endDateValue,
        )

        if (startDateValue && endDateValue) {
            const daysDiff = subtractDates(endDateValue, startDateValue)
            setNumNights(daysDiff) // сохраняем разницу между датами
        } else setNumNights(0)
    }
    //-------------------------------------------------

    // синхронизируем стоимость проживания - cabinPrice, с количеством ночей проживания - numNights
    useEffect(() => {
        setСabinPrice((regularPrice - discount) * numNights)
    }, [regularPrice, numNights, discount])

    // Получаем объекты для формирования всплывающего списка
    const {
        filtered, // отфильрованный список
        listId, // id списка, который будет отображаться
        position, // координаты списка
        formRef, // ссылка на объект формы, относительно которой будет формироваться позиция выпадающего списка
        handleInputChange, // функция, которая будет выполняться при изменении значения поля ввода, возле которого нам необходим список
        closeDropdown, // функция, которая будет закрывать выпадающий список
    } = useDropdown()

    // Переменные для хранения полей ввода, возле которых будет всплывающий список
    const inputGuestRef = useRef(null) // для поля ввода гостя
    const inputCabinRef = useRef(null) // для поля ввода домика

    // Работа с БД
    const isWorking =
        isLoadingGuests || isLoadingCabins || isLoadingSettings || isCreating

    function handleSubmitForm(data) {
        const booking = {
            startDate: `${data.startDate}T00:00:00Z`,
            endDate: `${data.endDate}T23:59:59Z`,
            numNights,
            numGuests: +data.numGuests,
            cabinPrice,
            extrasPrice,
            totalPrice,
            status: 'unconfirmed',
            hasBreakfast: data.hasBreakfast,
            isPaid: data.isPaid,
            observations: data.observations,
            cabinId: selectedCabin.id,
            guestId: selectedGuest.id,
        }

        console.log('booking:', booking)

        createBooking(booking)
        onClose?.()
    }

    function handleErrorForm(errors) {
        console.log(errors)
    }

    return (
        <div ref={formRef}>
            <Form
                onSubmit={handleSubmit(handleSubmitForm, handleErrorForm)}
                type={onClose ? 'modal' : 'regular'}
            >
                <Heading as="h1">Creating a new booking</Heading>

                <FormRow
                    id="guest"
                    label="Guest:"
                    error={errors?.guest?.message}
                >
                    <Input
                        type="text"
                        id="guest"
                        disabled={isWorking}
                        {...register('guest', {
                            required: 'This field is required',
                            onChange: () => {
                                handleInputChange(
                                    getValues().guest,
                                    guests,
                                    'fullName',
                                    inputGuestRef,
                                    'guest',
                                )
                            },
                        })}
                        ref={(e) => {
                            register('guest').ref(e)
                            inputGuestRef.current = e
                        }}
                    />
                </FormRow>
                {listId === 'guest' && (
                    <DropDownList>
                        <DropDownList.List position={position}>
                            {filtered.map((guest) => {
                                return (
                                    <DropDownList.Item
                                        key={guest.id}
                                        onClick={() => {
                                            // устанавливаем значение поля ввода формы "guest"
                                            setValue('guest', guest.fullName)

                                            // запоминаем выбранного гостя в состояние
                                            setSelectedGuest(guest)

                                            // закрываем выпадающий список
                                            closeDropdown()
                                        }}
                                    >
                                        {guest.fullName}
                                    </DropDownList.Item>
                                )
                            })}
                        </DropDownList.List>
                    </DropDownList>
                )}

                <FormRow
                    id="cabin"
                    label="Cabin:"
                    error={errors?.cabin?.message}
                >
                    <Input
                        type="text"
                        id="cabin"
                        disabled={isWorking}
                        {...register('cabin', {
                            required: 'This field is required',
                            onChange: () => {
                                handleInputChange(
                                    getValues().cabin,
                                    cabins,
                                    'name',
                                    inputCabinRef,
                                    'cabin',
                                )
                            },
                        })}
                        ref={(e) => {
                            register('cabin').ref(e)
                            inputCabinRef.current = e
                        }}
                    />
                </FormRow>
                {listId === 'cabin' && (
                    <DropDownList>
                        <DropDownList.List position={position}>
                            {filtered.map((cabin) => (
                                <DropDownList.Item
                                    key={cabin.id}
                                    onClick={() => {
                                        setValue('cabin', cabin.name)
                                        setSelectedCabin(cabin)

                                        closeDropdown()
                                    }}
                                >
                                    {cabin.name}
                                </DropDownList.Item>
                            ))}
                        </DropDownList.List>
                    </DropDownList>
                )}

                <FormRow
                    id="startDate"
                    label="Start Date:"
                    error={errors?.startDate?.message}
                >
                    <Input
                        type="date"
                        id="startDate"
                        disabled={isWorking}
                        {...register('startDate', {
                            required: 'This field is required',
                            validate: (startDate) => {
                                const currentDate = new Date()
                                const startDateValue = new Date(startDate)

                                return (
                                    isAfter(startDateValue, currentDate) ||
                                    isSameDay(startDateValue, currentDate) ||
                                    'Start date must be after current date'
                                )
                            },
                            onChange: () => handleDateChange(),
                        })}
                    />
                </FormRow>

                <FormRow
                    id="endDate"
                    label="End Date:"
                    error={errors?.endDate?.message}
                >
                    <Input
                        type="date"
                        id="endDate"
                        disabled={isWorking}
                        {...register('endDate', {
                            required: 'This field is required',
                            validate: (endDate) => {
                                const startDateValue = getValues('startDate')
                                const endDateValue = endDate
                                const daysDifference = subtractDates(
                                    endDateValue,
                                    startDateValue,
                                )

                                // End date must be after start date
                                if (daysDifference < 0)
                                    return 'End date must be after start date'

                                // Booking must be more minBookingLength
                                if (daysDifference < minBookingLength)
                                    return `Booking must be more ${minBookingLength}`

                                // Booking must be less maxBookingLength
                                if (daysDifference > maxBookingLength)
                                    return `Booking must be less ${maxBookingLength}`

                                // Если всё в порядке, возвращаем true
                                return true
                            },
                            onChange: () => handleDateChange(),
                        })}
                    />
                </FormRow>

                <FormRow
                    id="numGuests"
                    label="Number of guests"
                    error={errors?.numGuests?.message}
                >
                    <Input
                        type="number"
                        id="numGuests"
                        disabled={isWorking}
                        // defaultValue={1}
                        {...register('numGuests', {
                            required: 'This field is required',
                            min: {
                                value: 1,
                                message: 'Guests should not be less 1',
                            },
                            max: {
                                value: maxCapacity,
                                message: `Guests should not be more ${maxCapacity}`,
                            },
                        })}
                    />
                </FormRow>

                <FormRow
                    label="Some observations:"
                    error={errors?.observations?.message}
                >
                    <Textarea
                        id="observations"
                        disabled={isWorking}
                        {...register('observations', {
                            required: 'This field is required',
                        })}
                    />
                </FormRow>

                <FormRow
                    id="hasBreakfast"
                    label="Want to add breakfast"
                    error={errors?.hasBreakfast?.message}
                >
                    <Input
                        type="checkbox"
                        id="hasBreakfast"
                        disabled={isWorking}
                        // defaultValue={false}
                        {...register('hasBreakfast', {
                            onChange: (e) => {
                                setValue('isPaid', false)
                                // console.log(e.target.checked)

                                e.target.checked
                                    ? setExtrasPrice(tempExtrasPrice)
                                    : setExtrasPrice(0)
                            },
                        })}
                    />
                    <span>
                        For {numNights} days for {numGuestsValue} guests is{' '}
                        {formatCurrency(tempExtrasPrice)}
                    </span>
                </FormRow>

                <FormRow
                    label="Is this booking paid?"
                    error={errors?.isPaid?.message}
                >
                    <Input
                        type="checkbox"
                        id="isPaid"
                        disabled={isWorking || cabinPrice === 0}
                        // defaultValue={false}
                        {...register('isPaid', {})}
                    />
                    <span>
                        For {numNights} days is{' '}
                        {formatCurrency(cabinPrice || 0)}{' '}
                        {extrasPrice > 0
                            ? `+ ${formatCurrency(extrasPrice)} = ${formatCurrency(totalPrice)}`
                            : ''}
                    </span>
                </FormRow>

                <FormRow>
                    <Modal.Open opens="guest-form">
                        <Button
                            variation="secondary"
                            disabled={isWorking}
                            type="button"
                            style={{ marginRight: 'auto' }}
                        >
                            Add new guest
                        </Button>
                    </Modal.Open>

                    <Button
                        variation="secondary"
                        type="reset"
                        disabled={isWorking}
                        onClick={() => {
                            reset()
                            onClose?.()
                        }}
                    >
                        Cancel
                    </Button>
                    <Button>Create new booking</Button>
                </FormRow>
            </Form>
        </div>
    )
}
