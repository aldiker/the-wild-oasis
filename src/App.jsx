import styled from 'styled-components'
import GlobalStyle from './styles/GlobalStyles'
import Button from './ui/Button'
import Input from './ui/Input'
import Heading from './ui/Heading'
import Row from './ui/Row'

const StyleApp = styled.div`
    /* background-color: orangered; */
    padding: 20px;
`

export default function App() {
    return (
        <>
            <GlobalStyle />
            <StyleApp>
                <Row type="vertical">
                    <Row type="horizontal">
                        <Heading as="h1">The Wild Oasis</Heading>
                        <div>
                            <Heading as="h2">Check in to out</Heading>

                            <Button onClick={() => alert('Hello')}>
                                Check in
                            </Button>
                            <Button
                                variation="secondary"
                                size="medium"
                                onClick={() => alert('Good Buy')}
                            >
                                Check out
                            </Button>
                        </div>
                    </Row>
                    <Row type="vertical">
                        <Heading as="h3">Form</Heading>
                        <div>
                            <Input
                                type="number"
                                placeholder="Number of guests"
                            />
                            <Input
                                type="number"
                                placeholder="Number of guests"
                            />
                        </div>
                    </Row>
                </Row>
            </StyleApp>
        </>
    )
}
