import { useState } from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import './App.css'
import AuthContext from './context/AuthContext.jsx'
import Home from './components/home/home.jsx'
import SignIn from './components/sign/signin.jsx'
import SignUp from './components/sign/signup.jsx'

function App() {

    return (
        <AuthContext>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signIn' element={<SignIn />} />
                    <Route path='/signUp' element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </AuthContext>
    )
}

export default App
