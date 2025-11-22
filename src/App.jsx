import {Route, Routes, BrowserRouter} from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext.jsx'
import styled from 'styled-components'
import Home from './components/home/home.jsx'
import SignIn from './components/sign/signin.jsx'
import SignUp from './components/sign/signup.jsx'
import Translate from './components/translate/Translate.jsx'
import Header from './components/Header.jsx'
import Quiz from './components/quiz/Quiz.jsx'
import QuizRunner from './components/quiz/QuizRunner.jsx'

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <AppContainer>
                    <Header />
                    <MainContent>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/signIn' element={<SignIn />} />
                            <Route path='/signUp' element={<SignUp />} />
                            <Route path='/translate' element={<Translate />} />
                            <Route path='/quiz' element={<Quiz />}/>
                            <Route path='/quiz/:category' element={<QuizRunner />} />
                        </Routes>
                    </MainContent>
                </AppContainer>
            </BrowserRouter>
        </AuthProvider>
    )
}

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const MainContent = styled.main`
    flex: 1;
    display: flex; 
    flex-direction: column; 
    height: 100%;
`;

export default App
