import { createContext } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState'

const DarkModeContext = createContext()

function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        false,
        'isDarkMode',
    )

    function toogleDarkMode() {
        setIsDarkMode((isDark) => !isDark)
    }

    return (
        <DarkModeContext.Provider value={(isDarkMode, toogleDarkMode)}>
            {children}
        </DarkModeContext.Provider>
    )
}
