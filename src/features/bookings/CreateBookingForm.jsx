import { useForm } from 'react-hook-form'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
// import FileInput from '../../ui/FileInput'
// import Textarea from '../../ui/Textarea'
import FormRow from '../../ui/FormRow'
import Heading from '../../ui/Heading'
import { useGuests } from '../guests/useGuests'
import { useRef, useState } from 'react'
import DropdownList from '../../ui/DropdownList_old'
import { useCabins } from '../cabins/useCabins'

export default function CreateBookingForm({ onClose }) {
    const { register, handleSubmit, reset, getValues, formState, setValue } =
        useForm()
    const { errors } = formState

    const { isLoading: isLoadingGuests, guests } = useGuests()
    const { isLoading: isLoadingCabins, cabins } = useCabins()

    const formRef = useRef(null)
    const inputGuestRef = useRef(null)
    const inputCabinRef = useRef(null)

    const [filtered, setFiltered] = useState([])
    const [searchListId, setSearchListId] = useState('')
    const [searchListPosition, setSearchListPosition] = useState({ x: 0, y: 0 })

    const handleInputListChange = (listId, list, displayField, inputRef) => {
        console.log('listId =', listId)

        const inputValue = getValues()[listId]
        console.log('input =', inputValue)

        let filtered = []

        if (inputValue === ' ') filtered = [...list]
        else {
            if (inputValue.trim() === '') {
                setFiltered([])
                setSearchListId('')
                return
            }
            // Фильтруем список по displayField
            filtered = list.filter((item) =>
                item[displayField]
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()),
            )
        }

        console.log('filtered array:', filtered)

        setFiltered(filtered)
        setSearchListId(filtered.length > 0 ? listId : '')

        console.log('inputRef = ', inputRef.current)
        if (inputRef.current) {
            const rectInput = inputRef.current.getBoundingClientRect()
            const rectForm = formRef.current.getBoundingClientRect()

            // Позиция поля ввода относительно формы
            const relativeX = rectInput.left - rectForm.left
            const relativeY = rectInput.bottom - rectForm.top

            setSearchListPosition({ x: relativeX + 40, y: relativeY + 32 })
            // setSearchListPosition({ x: 0, y: 0 })
        }
    }

    const isWorking = isLoadingGuests || isLoadingCabins

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

                <FormRow label="Guest:" error={errors?.guest?.message}>
                    <Input
                        type="text"
                        id="guest"
                        // disabled={isWorking}
                        // defaultValue={editValues?.name}
                        {...register('guest', {
                            required: 'This field is required',
                            onChange: () =>
                                handleInputListChange(
                                    'guest',
                                    guests,
                                    'fullName',
                                    inputGuestRef,
                                ),
                        })}
                        ref={(e) => {
                            register('guest').ref(e)
                            inputGuestRef.current = e
                        }}
                    />
                </FormRow>
                {searchListId === 'guest' && (
                    <DropdownList
                        list={filtered}
                        position={searchListPosition}
                        displayField="fullName"
                        onClick={(selectedGuest) => {
                            console.log('Selected guest:', selectedGuest)
                            setValue('guest', selectedGuest)
                            setFiltered([])
                            setSearchListId('')
                        }}
                    />
                )}

                <FormRow label="Cabin:" error={errors?.cabin?.message}>
                    <Input
                        type="text"
                        id="cabin"
                        // disabled={isWorking}
                        // defaultValue={editValues?.name}
                        {...register('cabin', {
                            required: 'This field is required',
                            onChange: () =>
                                handleInputListChange(
                                    'cabin',
                                    cabins,
                                    'name',
                                    inputCabinRef,
                                ),
                        })}
                        ref={(e) => {
                            register('cabin').ref(e)
                            inputCabinRef.current = e
                        }}
                    />
                </FormRow>
                {searchListId === 'cabin' && (
                    <DropdownList
                        list={filtered}
                        position={searchListPosition}
                        displayField="name"
                        onClick={(selectedCabin) => {
                            console.log('Selected cabin:', selectedCabin)
                            setValue('cabin', selectedCabin)
                            setFiltered([])
                            setSearchListId('')
                        }}
                    />
                )}

                {/* <StyledList>
                <StyledButton>Emma</StyledButton>
                <StyledButton>Sasha</StyledButton>
            </StyledList> */}

                {/* <MenusSelect.Menu>
                    <MenusSelect.List id="guest">
                        <MenusSelect.Button>111</MenusSelect.Button>
                        <MenusSelect.Button>222</MenusSelect.Button>
                        <MenusSelect.Button>333</MenusSelect.Button>
                    </MenusSelect.List>
                </MenusSelect.Menu> */}

                {/* <FormRow label="Guest:" error={errors?.guestId?.message}>
                <Input
                    type="text"
                    id="guestId"
                    // disabled={isWorking}
                    // defaultValue={editValues?.name}
                    {...register('guestId', {
                        required: 'This field is required',
                    })}
                />
            </FormRow> */}

                {/* <FormRow label="cabinId" error={errors?.cabinId?.message}>
                <Input
                    type="text"
                    id="cabinId"
                    // disabled={isWorking}
                    // defaultValue={editValues?.name}
                    {...register('cabinId', {
                        required: 'This field is required',
                    })}
                />
            </FormRow> */}

                {/* 

            <FormRow label="numGuests" error={errors?.numGuests?.message}>
                <Input
                    type="text"
                    id="numGuests"
                    // disabled={isWorking}
                    // defaultValue={editValues?.name}
                    {...register('numGuests', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow label="startDate" error={errors?.startDate?.message}>
                <Input
                    type="text"
                    id="startDate"
                    // disabled={isWorking}
                    // defaultValue={editValues?.name}
                    {...register('startDate', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow label="endDate" error={errors?.endDate?.message}>
                <Input
                    type="text"
                    id="endDate"
                    // disabled={isWorking}
                    // defaultValue={editValues?.name}
                    {...register('endDate', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow label="hasBreakfast" error={errors?.hasBreakfast?.message}>
                <Input
                    type="text"
                    id="hasBreakfast"
                    // disabled={isWorking}
                    // defaultValue={editValues?.name}
                    {...register('hasBreakfast', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow label="isPaid" error={errors?.isPaid?.message}>
                <Input
                    type="text"
                    id="isPaid"
                    // disabled={isWorking}
                    // defaultValue={editValues?.name}
                    {...register('isPaid', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow
                label="observations "
                error={errors?.observations?.message}
            >
                <Textarea
                    type="number"
                    id="observations"
                    // disabled={isWorking}
                    defaultValue=""
                    {...register('observations', {})}
                />
            </FormRow> */}

                {/* 
            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    // disabled={isWorking}
                    {...register('maxCapacity', {
                        required: 'This field is required',
                        min: {
                            value: 1,
                            message: 'Capacity should be at least 1',
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    // disabled={isWorking}
                    {...register('regularPrice', {
                        required: 'This field is required',
                        min: {
                            value: 1,
                            message: 'Regular price should be at least 1',
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    // disabled={isWorking}
                    defaultValue={0}
                    {...register('discount', {
                        required: 'This field is required',
                        validate: (value) =>
                            +value < +getValues().regularPrice ||
                            `Discount = ${value} should be less than Regular price = ${getValues().regularPrice}`,
                    })}
                />
            </FormRow> */}

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
