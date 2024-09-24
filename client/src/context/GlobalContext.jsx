/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const initialContext = {
    isLogedIn: false,
    changeLoginStatus: () => {},
};

export const GlobalContext = createContext(initialContext);

export function GlobalContextWrapper(props) {
    const [isLogedIn, setisLogedIn] = useState(initialContext.isLogedIn);
    

useEffect(() => {
    fetch('http://localhost:5028/api/login', {
        method: 'GET',
        credentials:'include',
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(e=> console.error(e))

}, [])
useEffect(() => {
    fetch('http://localhost:5028/api/login', {
        method: 'POST',
        credentials:'include',
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(e=> console.error(e))

}, [])
useEffect(() => {
    fetch('http://localhost:5028/api/login', {
        method: 'PUT',
        credentials:'include',
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(e=> console.error(e))

}, [])

    function changeLoginStatus(newStatus = false) {
        setisLogedIn(newStatus);
    }

    return (
        <GlobalContext.Provider value={{ isLogedIn, changeLoginStatus }}>
            {props.children}
        </GlobalContext.Provider>
    );
}