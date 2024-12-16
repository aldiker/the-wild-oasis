import styled from 'styled-components'

const Input = styled.input`
    border: 1px solid var(--color-grey-300);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
    padding: 0.8rem 1.2rem;
    box-shadow: var(--shadow-sm);

    transition: all 0.3s ease-in-out;

    &[type='checkbox'] {
        height: 2.4rem;
        width: 2.4rem;
        outline-offset: 2px;
        accent-color: var(--color-brand-600);
    }

    /* &[type='checkbox']:hover {
        transform-origin: 0;

        transform: scale(1.6);
        transform: translate(2px, -2px);
        transform: skew(20deg, 10deg); //Наклон по обеим осям
    } */
`

export default Input
