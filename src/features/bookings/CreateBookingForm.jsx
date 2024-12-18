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
import { add, format, isAfter, isSameDay } from 'date-fns'
import { formatCurrency, getToday, subtractDates } from '../../utils/helpers'
import { useSettings } from '../settings/useSettings'

export default function CreateBookingForm({ onClose }) {
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState,
        setValue,
        // watch,
    } = useForm()
    const { errors } = formState

    const [numNights, setNumNights] = useState(0)
    const [cabinPrice, setСabinPrice] = useState(0)
    const [cabinRegularPrice, setCabinRegularPrice] = useState(0)
    const [cabinMaxCapacity, setCabinMaxCapacity] = useState(0)
    const [cabinDiscount, setCabinDiscount] = useState(0)
    const [extrasPrice, setExtrasPrice] = useState(0)

    const { isLoading: isLoadingGuests, guests } = useGuests()
    const { isLoading: isLoadingCabins, cabins } = useCabins()

    const { isLoading: isLoadingSettings, settings = {} } = useSettings()
    const { breakfastPrice, minBookingLength, maxBookingLength } = settings

    // Стоимость завтраков за все дни
    const tempExtrasPrice = formatCurrency(breakfastPrice * numNights)
    //-------------------------------------------------
    // Слежение за выбором номера
    function handleCabinChange() {
        const cabinValue = getValues('cabin')
        const selectedCabin = cabins.find((cabin) => cabin.name === cabinValue)
        // console.log('selectedCabin = ', selectedCabin)

        const { regularPrice, maxCapacity, discount } = selectedCabin || {}
        console.log(
            'regularPrice = ',
            regularPrice, // стоимость номера
            '|| maxCapacity = ',
            maxCapacity, // вместительность номера
            '|| discount = ',
            discount, // скидка %
        )

        setCabinRegularPrice(regularPrice)
        setCabinMaxCapacity(maxCapacity)
        setCabinDiscount(discount)
    }
    //-------------------------------------------------
    // Слежение за датами
    function handleDateChange() {
        const startDateValue = getValues('startDate')
        const endDateValue = getValues('endDate')

        if (startDateValue && endDateValue) {
            const daysDiff = subtractDates(endDateValue, startDateValue)
            setNumNights(daysDiff)
        } else setNumNights(0)
    }
    //-------------------------------------------------

    useEffect(() => {
        setСabinPrice(
            formatCurrency((cabinRegularPrice - cabinDiscount) * numNights),
        )
    }, [cabinRegularPrice, numNights, cabinDiscount])

    const {
        filtered,
        listId,
        position,
        formRef,
        handleInputChange,
        closeDropdown,
    } = useDropdown()

    const inputGuestRef = useRef(null)
    const inputCabinRef = useRef(null)

    const isWorking = isLoadingGuests || isLoadingCabins || isLoadingSettings

    function handleSubmitForm(data) {
        console.log(data)
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
                        // defaultValue={editValues?.name}
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
                                // console.log('guest', guest)
                                return (
                                    <DropDownList.Item
                                        key={guest.id}
                                        onClick={() => {
                                            setValue('guest', guest.fullName)
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
                        // defaultValue={editValues?.name}
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
                                handleCabinChange()
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
                                        handleCabinChange()
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
                        defaultValue={getToday().split('T')[0]}
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
                        defaultValue={format(
                            add(new Date(), { days: minBookingLength }),
                            'yyyy-MM-dd',
                        )}
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
                        // disabled={isWorking}
                        defaultValue={1}
                        {...register('numGuests', {
                            required: 'This field is required',
                            min: {
                                value: 1,
                                message: 'Guests should not be less 1',
                            },
                            max: {
                                value: cabinMaxCapacity,
                                message: `Guests should not be more ${cabinMaxCapacity}`,
                            },
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
                        // disabled={isWorking}
                        // defaultValue={editValues?.name}
                        {...register('hasBreakfast', {})}
                    />
                    <span>
                        For {numNights} days is {tempExtrasPrice}
                    </span>
                </FormRow>

                <FormRow
                    label="Is this booking paid?"
                    error={errors?.isPaid?.message}
                >
                    <Input
                        type="checkbox"
                        id="isPaid"
                        // disabled={isWorking}
                        // defaultValue={editValues?.name}
                        {...register('isPaid', {})}
                    />
                    <span>
                        For {numNights} days is {cabinPrice}
                    </span>
                </FormRow>

                <FormRow>
                    {/* <Button>Create new guest</Button> */}

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
