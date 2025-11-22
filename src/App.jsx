import {Route, Routes, BrowserRouter} from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext.jsx'
import Home from './components/home/home.jsx'
import SignIn from './components/sign/signin.jsx'
import SignUp from './components/sign/signup.jsx'
import Translate from './components/translate/Translate.jsx'
import Quiz from './components/quiz/Quiz.jsx'

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signIn' element={<SignIn />} />
                    <Route path='/signUp' element={<SignUp />} />
                    <Route path='/translate' element={<Translate />} />
                    <Route path='/quiz' element={<Quiz />}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
