import {Route, Routes, BrowserRouter} from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext.jsx'
import Home from './components/home/home.jsx'
import SignIn from './components/sign/SignIn.jsx'
import SignUp from './components/sign/SignUp.jsx'
import Translate from './components/translate/Translate.jsx'
import Quiz from "./components/quiz/Quiz";
import QuizRunner from "./components/quiz/QuizRunner";
import Dictionary from './components/dictionary/Dictionary.jsx';
import Header from './components/Header.jsx'
import styled from 'styled-components'
import MyPage from "./components/myPage/myPage.jsx";




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
                            <Route path="/quiz" element={<Quiz />} />
                            <Route path="/quiz/:category" element={<QuizRunner />} />
                            <Route path="/dictionary" element={<Dictionary />} />
                            <Route path="/mypage" element={<MyPage />} />
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
