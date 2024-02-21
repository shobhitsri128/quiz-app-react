import React from 'react';
import { createContext } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Quiz from './Pages/Quiz/Quiz';
import Results from './Pages/Results/Results';

const appContext = createContext(null);

function App() {
  const [currentQuiz, setCurrentQuiz] = React.useState<any>();
  const [answerList, setAnswerList] = React.useState<any>();
  return (
    <appContext.Provider value={{currentQuiz, setCurrentQuiz,answerList, setAnswerList}}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/quiz" element={<Quiz/>} />
      <Route path="/results" element={<Results/>} />
    </Routes>
    </BrowserRouter>
    </appContext.Provider>
  );
}

export {App,appContext};
