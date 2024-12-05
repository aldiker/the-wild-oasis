import { useForm } from 'react-hook-form'
import { createPortal } from 'react-dom'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
// import FileInput from '../../ui/FileInput'
// import Textarea from '../../ui/Textarea'
import FormRow from '../../ui/FormRow'
import Heading from '../../ui/Heading'
import { useGuests } from '../guests/useGuests'
import { useRef, useState } from 'react'
// import { ListSelect } from '../../ui/ListSelect'
// import MenusSelect from '../../ui/MenusSelect'
import styled from 'styled-components'

// import { useCreateCabin } from './useCreateCabin'
// import { useEditCabin } from './useEditCabin'

const SearchList = styled.ul`
    position: fixed;

    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-grey-200);
    padding: 0.5rem;
    z-index: 2000;

    left: ${(props) => props.position.x}px;
    top: ${(props) => props.position.y}px;
`

const SearchListItem = styled.li`
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 0.5rem 1.2rem;
    font-size: 1.4rem;
    transition: all 0.2s;

    display: flex;
    align-items: center;
    gap: 1.6rem;

    &:hover {
        background-color: var(--color-grey-50);
    }

    cursor: pointer;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
    & svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }
`

export default function CreateBookingForm({ onClose }) {
    const { register, handleSubmit, reset, getValues, formState } = useForm()
    const { errors } = formState

    const { isLoading, isError, guests } = useGuests()
    console.log('guests: ', guests)

    const inputRef = useRef(null)

    const [filteredGuests, setFilteredGuests] = useState([])
    const [searchListId, setSearchListId] = useState('')
    const [searchListPosition, setSearchListPosition] = useState({ x: 0, y: 0 })

    const handleInputChange = () => {
        const inputValue = getValues().guest
        console.log('guest', inputValue)

        if (inputValue.trim() === '') {
            setFilteredGuests([])
            setSearchListId('')
            return
        }

        // // Фильтруем гостей по имени
        const filtered = guests.filter((guest) =>
            guest.fullName.toLowerCase().includes(inputValue.toLowerCase()),
        )

        console.log('filtered array:', filtered)

        setFilteredGuests(filtered)
        setSearchListId(filtered.length > 0 ? 'guest' : '')

        console.log('InputRef.current: ', inputRef.current)

        if (inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect()
            console.log('rect', rect)
            setSearchListPosition({ x: rect.left, y: rect.bottom + 4 })
        }
    }

    const isWorking = isLoading

    function handleSubmitForm(data) {
        console.log(data)
    }

    function handleErrorForm(errors) {
        console.log(errors)
    }

    return (
        <div>
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
                            onChange: handleInputChange,
                        })}
                        ref={(e) => {
                            register('guest').ref(e)
                            inputRef.current = e
                        }}
                    />
                </FormRow>
                {searchListId === 'guest' &&
                    createPortal(
                        <SearchList position={searchListPosition}>
                            {filteredGuests.map((guest) => (
                                <SearchListItem key={guest.id}>
                                    {guest.fullName}
                                </SearchListItem>
                            ))}
                        </SearchList>,
                        document.body,
                    )}

                <FormRow label="Cabin:" error={errors?.cabinId?.message}>
                    <Input
                        type="text"
                        id="cabinId"
                        // disabled={isWorking}
                        // defaultValue={editValues?.name}
                        {...register('cabinId', {
                            required: 'This field is required',
                        })}
                    />
                </FormRow>

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
