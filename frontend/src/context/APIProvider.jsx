import { useState, useContext } from 'react'
import axios from "axios";
import { APIContext } from './contexts.js';


const baseURL = "http://127.0.0.1:8000/api/";

const client = axios.create({
    baseURL,
});

export default function APIProvider({ children }) {

    return (
        <APIContext value={{ client, }}>
            {children}
        </APIContext>
    )
}
