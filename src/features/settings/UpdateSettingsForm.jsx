import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useUpdateSetting } from './useEditSetting'
import { useSettings } from './useSettings'

export default function UpdateSettingsForm() {
    const { isLoading, settings = {} } = useSettings()
    const {
        minBookingLength,
        maxBookingLength,
        maxGuestsPerBooking,
        breakfastPrice,
    } = settings

    const { isUpdating, updateSetting } = useUpdateSetting()

    function handleUpdate(event, field) {
        console.log(event)

        const { value } = event.target

        if (!value) return
        updateSetting({ [field]: value })
    }

    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="min-nights"
                    disabled={isUpdating}
                    defaultValue={minBookingLength}
                    onBlur={(event) => handleUpdate(event, 'minBookingLength')}
                />
            </FormRow>

            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    id="max-nights"
                    disabled={isUpdating}
                    defaultValue={maxBookingLength}
                    onBlur={(event) => handleUpdate(event, 'maxBookingLength')}
                />
            </FormRow>
            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    id="max-guests"
                    disabled={isUpdating}
                    defaultValue={maxGuestsPerBooking}
                    onBlur={(event) =>
                        handleUpdate(event, 'maxGuestsPerBooking')
                    }
                />
            </FormRow>
            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfast-price"
                    disabled={isUpdating}
                    defaultValue={breakfastPrice}
                    onBlur={(event) => handleUpdate(event, 'breakfastPrice')}
                />
            </FormRow>
        </Form>
    )
}
