import { useForm } from 'react-hook-form'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FormRow from '../../ui/FormRow'
import Heading from '../../ui/Heading'

import { useSettings } from '../settings/useSettings'
import { useCountries } from './useCountries'
import { useDropdown } from '../../ui/Dropdown/useDropdown'
import { useRef, useState } from 'react'
import DropDownList from '../../ui/Dropdown/DropdownList'

export default function CreateGuestForm({ onClose }) {
    const [selectedNationality, setSelectedNationality] = useState(null)
    console.log('selectedNationality = ', selectedNationality)

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

    const { isLoading: isLoadingCountries, countries } = useCountries()

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
    const inputNationalityRef = useRef(null) // для поля ввода страны

    // Работа с БД
    const isWorking = isLoadingCountries

    function handleSubmitForm(data) {
        console.log('Submiting ...')
        console.log(data)

        // onClose?.()
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
                <Heading as="h1">Creating a new guest</Heading>

                <FormRow
                    id="fullName"
                    label="Full Name:"
                    error={errors?.fullName?.message}
                >
                    <Input
                        type="text"
                        id="fullName"
                        disabled={isWorking}
                        {...register('fullName', {
                            required: 'This field is required',
                        })}
                    />
                </FormRow>

                <FormRow
                    id="email"
                    label="E-mail:"
                    error={errors?.email?.message}
                >
                    <Input
                        type="email"
                        id="email"
                        disabled={isWorking}
                        {...register('email', {
                            required: 'This field is required',
                        })}
                    />
                </FormRow>

                <FormRow
                    id="nationalID"
                    label="National ID:"
                    error={errors?.nationalID?.message}
                >
                    <Input
                        type="text"
                        id="nationalID"
                        disabled={isWorking}
                        {...register('nationalID', {
                            required: 'This field is required',
                        })}
                    />
                </FormRow>

                <FormRow
                    id="nationality"
                    label="Nationality:"
                    error={errors?.nationality?.message}
                >
                    <Input
                        type="text"
                        id="nationality"
                        disabled={isWorking}
                        {...register('nationality', {
                            required: 'This field is required',
                            onChange: () => {
                                handleInputChange(
                                    getValues().nationality, // текущее введенное значение
                                    countries, // полный массив объектов со странами и флагами
                                    'country', // свойство по которому будет фильтрация
                                    inputNationalityRef, // ссылка на поле ввода для позиционирования
                                    'nationality', // ключ для идентификации всплывающего окна
                                ),
                                    setSelectedNationality(null)
                            },
                        })}
                        ref={(e) => {
                            register('nationality').ref(e)
                            inputNationalityRef.current = e
                        }}
                    />
                </FormRow>
                {listId === 'nationality' && (
                    <DropDownList>
                        <DropDownList.List position={position}>
                            {filtered.map((country) => {
                                return (
                                    <DropDownList.Item
                                        key={`${country.country}_${country.flag}`}
                                        onClick={() => {
                                            // устанавливаем значение поля ввода формы "nationality"
                                            setValue(
                                                'nationality',
                                                country.country,
                                            )
                                            // запоминаем выбранную страну в состояние
                                            setSelectedNationality(country)
                                            // закрываем выпадающий список
                                            closeDropdown()
                                        }}
                                    >
                                        {country.country}
                                    </DropDownList.Item>
                                )
                            })}
                        </DropDownList.List>
                    </DropDownList>
                )}

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
                    <Button disabled={isWorking}>Create new guest</Button>
                </FormRow>
            </Form>
        </div>
    )
}
