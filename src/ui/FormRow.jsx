import styled from 'styled-components'
import { Label } from './Label'

const StyledFormRow = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 24rem 1fr 1.2fr;
    gap: 2.4rem;

    padding: 1.2rem 0;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }

    &:has(input[type='checkbox']) {
        grid-template-columns: 24rem 2rem 1.5fr 1fr;
    }

    // Только для блока ошибки — выравнивание по правому краю
    /* & > span:last-child {
        text-align: right;
    } */
`

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`

export default function FormRow({ id, label, error, children }) {
    return (
        <StyledFormRow>
            {label && <Label htmlFor={id}>{label}</Label>}
            {children}

            {error && <Error> {error} </Error>}
        </StyledFormRow>
    )
}
