import styled from 'styled-components'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { insertCabins } from '../../services/apiCabins'
import toast from 'react-hot-toast'
import FormRow from '../../ui/FormRow'

export default function CreateCabinForm() {
    const { register, handleSubmit, reset, getValues, formState } = useForm()
    const { errors } = formState
    // console.log(errors)

    const queryClient = useQueryClient()

    const { mutate, isLoading: isCreating } = useMutation({
        mutationFn: insertCabins,
        onSuccess: () => {
            toast.success('New cabin successfully created')
            queryClient.invalidateQueries({ queryKey: ['cabins'] })
            reset()
        },
        onError: (err) => toast.error(err.message),
    })

    function handleSubmitForm(data) {
        mutate(data)
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
                    defaultValue=""
                    {...register('description', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    disabled={isCreating}
                    {...register('image', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow>
                <Button
                    variation="secondary"
                    type="reset"
                    disabled={isCreating}
                    onClick={() => reset()}
                >
                    Cancel
                </Button>
                <Button disabled={isCreating}>Edit cabin</Button>
            </FormRow>
        </Form>
    )
}
