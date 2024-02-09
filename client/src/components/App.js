import React from 'react';
import {useState} from 'react'
import GuitarList from './GuitarList';
import 'bootstrap/dist/css/bootstrap.min.css'

// components need to know:
// USER, CURRENT GUITAR LIST, FILTERS: BY BRAND, MODEL, MATERIAL (could be written as json with brand, material etc)

function App() {
    const [users, setUsers]=useState({});
    return <GuitarList/>

}

export default App

