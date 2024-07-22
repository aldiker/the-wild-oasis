import styled from 'styled-components'
import GlobalStyle from './styles/GlobalStyles'
import Button from './ui/Button'
import Input from './ui/Input'

const H1 = styled.h1`
    font-size: 30px;
    font-weight: 600;
`

const StyleApp = styled.div`
    background-color: orangered;
    padding: 20px;
`

export default function App() {
    return (
        <>
            <GlobalStyle />
            <StyleApp>
                <H1>Hello</H1>
                <Button onClick={() => alert('Hello')}>Hello</Button>
                <Button onClick={() => alert('Good Buy')}>Good Buy</Button>
                <Input type="number" placeholder="Number of guests" />
            </StyleApp>
        </>
    )
}
