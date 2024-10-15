import { useSearchParams } from 'react-router-dom'
import Select from './Select'

export default function SortBy({ options }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const sortBy = searchParams.get('sortBy') || ''

    function handleChange(event) {
        searchParams.set('sortBy', event.target.value)
        setSearchParams(searchParams)
    }

    return (
        <Select
            options={options}
            value={sortBy}
            onChange={handleChange}
            type="white"
        />
    )
}
