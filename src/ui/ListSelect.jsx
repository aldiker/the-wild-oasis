import styled from 'styled-components'
import { createPortal } from 'react-dom'

const StyledList = styled.ul`
    position: fixed;

    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);

    right: ${(props) => props.position.x}px;
    top: ${(props) => props.position.y}px;
`

export function ListSelect({ position, show, children }) {
    if (!show) return null

    return createPortal(
        <StyledList position={position}>{children}</StyledList>,
        document.body,
    )
}
