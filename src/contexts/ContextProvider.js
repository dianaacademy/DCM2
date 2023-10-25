import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
    chat: false,
    cart:false,
    userProfile:false,
    Notification : false,
}

export const ContextProvider = ({ children }) => {

    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setisClicked] = useState(initialState);
    const [currentColor, setCurentColor] = useState('#03C9D7')
    const [currentMode, setCurentMode] = useState('Light')
    const [themeSetting, SetThemeSettings] = useState(false);
    const setMode = (e) => {
        setCurentMode(e.target.value);
        localStorage.setItem ('themeMode', e.target.value);
    }

    const setColor = (e) => {
        setCurentColor(e.target.value);
        localStorage.setItem ('colorMode', e.target.value);
    }


    const handleClick = (clicked) => {
        setisClicked({...initialState,[clicked]: true});
    }
    return(
        <StateContext.Provider value = {{activeMenu, setActiveMenu, isClicked, setisClicked,handleClick,
        currentColor,currentMode,
        setCurentColor, setCurentMode,themeSetting ,SetThemeSettings
        
        }}>
        {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);

