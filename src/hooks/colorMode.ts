import { useEffect, useState } from "react";

export const useColorMode = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {

        const savedDarkMode = JSON.parse(localStorage.getItem("darkMode") || "false");
        document.documentElement.classList.toggle("ion-palette-dark", savedDarkMode);
        setDarkMode(savedDarkMode);

    }, []);

    const toggleColorMode = () => {
        toggleDarkPalette(!darkMode);
    };

    const toggleDarkPalette = (shouldAdd: boolean) => {
        document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
        localStorage.setItem("darkMode", JSON.stringify(shouldAdd));
        setDarkMode(shouldAdd);

    };

    return { darkMode, toggleColorMode };
}