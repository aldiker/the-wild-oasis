import styled from 'styled-components'

const SearchList = styled.ul`
    position: fixed;
    max-height: 50rem;
    overflow: scroll;

    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-grey-200);
    padding: 0.5rem;
    z-index: 2000;

    left: ${(props) => props.position.x}px;
    top: ${(props) => props.position.y}px;
`

const SearchListItem = styled.li`
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 0.5rem 1.2rem;
    font-size: 1.4rem;
    transition: all 0.2s;

    display: flex;
    align-items: center;
    gap: 1.6rem;

    &:hover {
        background-color: var(--color-grey-50);
    }

    cursor: pointer;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
    & svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }
`

export default function DropDownList({ children }) {
    return <>{children}</>
}

function List({ children, position }) {
    return <SearchList position={position}>{children}</SearchList>
}

function Item({ children, onClick }) {
    function handleClick(event) {
        // onClick(event.target.textContent)
        // onClick(children)
        onClick()
        event.stopPropagation()
    }
    return <SearchListItem onClick={handleClick}>{children}</SearchListItem>
}

DropDownList.List = List
DropDownList.Item = Item
