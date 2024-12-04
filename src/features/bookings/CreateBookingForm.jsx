import { useForm } from 'react-hook-form'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
// import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import FormRow from '../../ui/FormRow'
import Heading from '../../ui/Heading'
import { useGuests } from '../guests/useGuests'

// import { useCreateCabin } from './useCreateCabin'
// import { useEditCabin } from './useEditCabin'

export default function CreateBookingForm({ onClose }) {
    const { register, handleSubmit, reset, getValues, formState } = useForm()
    const { errors } = formState

    const { isLoading, isError, guests } = useGuests()
    console.log(guests)

    const isWorking = isLoading

    function handleSubmitForm(data) {
        console.log(data)
    }

    function handleErrorForm(errors) {
        console.log(errors)
    }

    return (
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
                    })}
                />
            </FormRow>

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
    )
}
