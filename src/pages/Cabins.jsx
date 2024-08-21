import { useEffect } from 'react'
import Heading from '../ui/Heading'
import Row from '../ui/Row'
import { getCabins } from '../services/apiCabins'
import CabinTable from '../features/cabins/CabinTable'

export default function Cabins() {
    return (
        <Row type="vertical">
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <p>Filter / Sort</p>
            </Row>
            <Row>
                <CabinTable />
            </Row>
        </Row>
    )
}
