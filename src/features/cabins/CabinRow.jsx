import styled from 'styled-components'

import CreateCabinForm from './CreateCabinForm'
import { useDeleteCabin } from './useDeleteCabin'
import { formatCurrency } from '../../utils/helpers'
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import { useCreateCabin } from './useCreateCabin'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: 'Sono';
`

const Price = styled.div`
    font-family: 'Sono';
    font-weight: 600;
`

const Discount = styled.div`
    font-family: 'Sono';
    font-weight: 500;
    color: var(--color-green-700);
`

export default function CabinRow({ cabin }) {
    const {
        id: cabinId,
        name,
        maxCapacity,
        regularPrice,
        discount,
        description,
        image,
    } = cabin

    const { isDeleting, deleteCabin } = useDeleteCabin()
    const { isCreating, createCabin } = useCreateCabin()

    function handleDublicate() {
        const newCabin = {
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            description,
            image,
        }
        createCabin(newCabin)
    }

    return (
        <Table.Row>
            <Img src={image} />
            <Cabin>{name}</Cabin>
            <div>Fits up to {maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            <Discount>{formatCurrency(discount)}</Discount>
            <div>
                <button onClick={() => handleDublicate()} disabled={isCreating}>
                    <HiSquare2Stack />
                </button>

                <Modal>
                    <Modal.Open opens="edit">
                        <button>
                            <HiPencil />
                        </button>
                    </Modal.Open>
                    <Modal.Window name="edit">
                        <CreateCabinForm cabinToEdit={cabin} />
                    </Modal.Window>

                    <Modal.Open opens="delete">
                        <button disabled={isDeleting}>
                            <HiTrash />
                        </button>
                    </Modal.Open>
                    <Modal.Window name="delete">
                        <ConfirmDelete
                            resourceName="cabin"
                            disabled={isDeleting}
                            onConfirm={() => deleteCabin(cabinId)}
                        />
                    </Modal.Window>
                </Modal>

                <Menus.Menu>
                    <Menus.Toggle id={cabinId} />
                    <Menus.List id={cabinId}>
                        <Menus.Button>Duplicate</Menus.Button>
                        <Menus.Button>Edit</Menus.Button>
                        <Menus.Button>Delete</Menus.Button>
                    </Menus.List>
                </Menus.Menu>
            </div>
        </Table.Row>
    )
}
