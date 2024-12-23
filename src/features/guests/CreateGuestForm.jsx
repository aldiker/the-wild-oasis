import { useForm } from 'react-hook-form'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FormRow from '../../ui/FormRow'
import Heading from '../../ui/Heading'

import { useSettings } from '../settings/useSettings'

export default function CreateGuestForm({ onClose }) {
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState,
        setValue,
        watch,
    } = useForm({
        defaultValues: {},
    })
    const { errors } = formState

    // Работа с БД
    // const isWorking = isCreating

    function handleSubmitForm(data) {
        console.log('Submiting ...')
        console.log(data)

        onClose?.()
    }

    function handleErrorForm(errors) {
        console.log(errors)
    }

    return (
        <Form
            onSubmit={handleSubmit(handleSubmitForm, handleErrorForm)}
            type={onClose ? 'modal' : 'regular'}
        >
            <Heading as="h1">Creating a new guest</Heading>

            <FormRow
                id="fullName"
                label="Full Name:"
                error={errors?.fullName?.message}
            >
                <Input
                    type="text"
                    id="fullName"
                    // disabled={isWorking}
                    {...register('fullName', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow id="email" label="E-mail:" error={errors?.email?.message}>
                <Input
                    type="text"
                    id="email"
                    // disabled={isWorking}
                    {...register('email', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow>
                <Button
                    variation="secondary"
                    type="reset"
                    // disabled={isWorking}
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
