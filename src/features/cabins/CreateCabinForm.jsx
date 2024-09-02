import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import FormRow from '../../ui/FormRow'

import { createEditCabins } from '../../services/apiCabins'

export default function CreateCabinForm({ cabinToEdit = {} }) {
    const { id: editId, ...editValues } = cabinToEdit
    console.log(`editId = ${editId}`)
    console.log(editValues)

    const isEditSession = Boolean(editId)

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    })
    const { errors } = formState

    const queryClient = useQueryClient()

    const { mutate: createCabin, isLoading: isCreating } = useMutation({
        mutationFn: createEditCabins,
        onSuccess: () => {
            toast.success('New cabin successfully created')
            queryClient.invalidateQueries({ queryKey: ['cabins'] })
            reset()
        },
        onError: (err) => toast.error(err.message),
    })

    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) =>
            createEditCabins(newCabinData, id),
        onSuccess: () => {
            toast.success('Cabin successfully changed')
            queryClient.invalidateQueries({ queryKey: ['cabins'] })
            reset()
        },
        onError: (err) => toast.error(err.message),
    })

    const isWorking = isCreating || isEditing

    function handleSubmitForm(data) {
        const image =
            typeof data.image === 'string' ? data.image : data.image[0]

        if (isEditSession)
            editCabin({ newCabinData: { ...data, image: image }, id: editId })
        else createCabin({ ...data, image: image })
    }

    function handleErrorForm(errors) {
        console.log(errors)
    }

    return (
        <Form onSubmit={handleSubmit(handleSubmitForm, handleErrorForm)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    defaultValue={editValues?.name}
                    {...register('name', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
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
                    disabled={isWorking}
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
                    disabled={isWorking}
                    defaultValue={0}
                    {...register('discount', {
                        required: 'This field is required',
                        validate: (value) =>
                            +value < +getValues().regularPrice ||
                            `Discount = ${value} should be less than Regular price = ${getValues().regularPrice}`,
                    })}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    disabled={isWorking}
                    defaultValue=""
                    {...register('description', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo" error={errors?.image?.message}>
                <FileInput
                    id="image"
                    accept="image/*"
                    disabled={isWorking}
                    {...register('image', {
                        required: isEditSession
                            ? false
                            : 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow>
                <Button
                    variation="secondary"
                    type="reset"
                    disabled={isWorking}
                    onClick={() => reset()}
                >
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? 'Edit cabin' : 'Create new cabin'}
                </Button>
            </FormRow>
        </Form>
    )
}
