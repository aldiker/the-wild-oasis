import { useState, useRef } from 'react'

export function useDropdown() {
    const [filtered, setFiltered] = useState([])
    const [listId, setListId] = useState('')
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const formRef = useRef(null)

    function handleInputChange(inputValue, list, displayField, inputRef, id) {
        let newFiltered = []

        if (inputValue === ' ') newFiltered = [...list]
        else {
            if (!inputValue.trim()) {
                setFiltered([])
                setListId('')
                return
            }
            // Фильтруем список по displayField
            newFiltered = list.filter((item) =>
                item[displayField]
                    .toLowerCase()
                    .includes(inputValue.trim().toLowerCase()),
            )
        }

        console.log('filtered array:', newFiltered)

        // --------------------------------------------

        setFiltered(newFiltered)
        setListId(newFiltered.length > 0 ? id : '')

        // --------------------------------------------

        if (inputRef.current && formRef.current) {
            const rectInput = inputRef.current.getBoundingClientRect()
            const rectForm = formRef.current.getBoundingClientRect()

            const relativeX = rectInput.left - rectForm.left
            const relativeY = rectInput.bottom - rectForm.top

            setPosition({ x: relativeX + 40, y: relativeY + 32 })
        }
    }

    const closeDropdown = () => {
        setFiltered([])
        setListId('')
    }

    return {
        filtered,
        listId,
        position,
        formRef,
        handleInputChange,
        closeDropdown,
    }
}
