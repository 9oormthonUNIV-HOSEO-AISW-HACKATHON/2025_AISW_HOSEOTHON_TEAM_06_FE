import {Route, Routes, BrowserRouter} from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext.jsx'
import Home from './components/home/home.jsx'
import SignIn from './components/sign/SignIn.jsx'
import SignUp from './components/sign/SignUp.jsx'

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signIn' element={<SignIn />} />
                    <Route path='/signUp' element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
