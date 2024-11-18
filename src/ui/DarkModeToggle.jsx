import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import ButtonIcon from './ButtonIcon'
import { useDarkMode } from '../context/DarkModeContext'

export default function DarkModeToggle() {
    const { isDarkMode, toogleDarkMode } = useDarkMode()

    return (
        <ButtonIcon onClick={toogleDarkMode}>
            {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
    )
}
