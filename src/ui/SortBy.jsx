import Select from './Select'

export default function SortBy({ options }) {
    function handleChange(event) {
        console.log(event)
    }

    return <Select options={options} onChange={handleChange} type="white" />
}
