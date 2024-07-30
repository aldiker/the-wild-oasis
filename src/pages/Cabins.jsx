import { useEffect } from 'react'
import Heading from '../ui/Heading'
import Row from '../ui/Row'
import { getCabins } from '../services/apiCabins'

function Cabins() {
    useEffect(() => {
        async function fetchData() {
            const data = await getCabins()
            console.log(data)
        }
        fetchData()
    }, [])

    return (
        <Row type="vertical">
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <p>TEST</p>
            </Row>
            <img
                src="https://rhcieegpujvlcbaguuvh.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg"
                alt="Cabin 1"
            />
        </Row>
    )
}

export default Cabins
