import { useForm, Controller } from 'react-hook-form'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
// import FileInput from '../../ui/FileInput'
// import Textarea from '../../ui/Textarea'
import FormRow from '../../ui/FormRow'
import Heading from '../../ui/Heading'
import { useGuests } from '../guests/useGuests'
import { useRef } from 'react'
import { useCabins } from '../cabins/useCabins'
import { useDropdown } from '../../ui/Dropdown/useDropdown'
import DropDownList from '../../ui/Dropdown/DropdownList'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function CreateBookingForm({ onClose }) {
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState,
        setValue,
        control,
    } = useForm()
    const { errors } = formState

    const { isLoading: isLoadingGuests, guests } = useGuests()
    const { isLoading: isLoadingCabins, cabins } = useCabins()

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
                                handleInputChange(
                                    getValues().guest,
                                    guests,
                                    'fullName',
                                    inputGuestRef,
                                    'guest',
                                ),
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
                            {filtered.map((guest) => (
                                <DropDownList.Item
                                    key={guest.id}
                                    onClick={() => {
                                        setValue('guest', guest.fullName)
                                        closeDropdown()
                                    }}
                                >
                                    {guest.fullName}
                                </DropDownList.Item>
                            ))}
                        </DropDownList.List>
                    </DropDownList>
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
                                handleInputChange(
                                    getValues().cabin,
                                    cabins,
                                    'name',
                                    inputCabinRef,
                                    'cabin',
                                ),
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
                                        closeDropdown()
                                    }}
                                >
                                    {cabin.name}
                                </DropDownList.Item>
                            ))}
                        </DropDownList.List>
                    </DropDownList>
                )}

                <FormRow label="Start Date:" error={errors?.startDate?.message}>
                    {/* <Input
                        type="text"
                        id="startDate"
                        // disabled={isWorking}
                        // defaultValue={editValues?.name}
                        {...register('startDate', {
                            required: 'This field is required',
                        })}
                    /> */}

                    <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                selected={field.value}
                                onChange={(date) => field.onChange(date)} // Уведомление react-hook-form
                                customInput={<Input />} // Применение стилей
                                dateFormat="dd.MM.yyyy"
                            />
                        )}
                    />
                </FormRow>

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
