import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { appContext } from "../../App";
import './styles.css';

const Quiz = () => {
    const navigate = useNavigate();
    const { currentQuiz, setAnswerList  } = useContext(appContext);
    let answerSet = {};

    // Use effects
    React.useEffect(() => {
        if(!currentQuiz?.questionSet?.length){
            navigate('/');
        }
    },[])

    // handles
    const submitQuiz = () => {
        console.log("quiz submitted", answerSet, currentQuiz);
        setAnswerList({...answerSet});
        navigate('/results');
    }
    const onOptionSelect = (questionNo, option) => {
        answerSet[questionNo] = option
    }


    return (
        <>
            <div style={{margin:'50px'}}>
                Quiz Component
                {
                    currentQuiz?.questionSet.map((question: any) => {
                        return <div style={{ border: '2px dashed black', padding: '10px', margin:'20px' }}>
                            <p>
                                <b>
                                    {question.questionNo}
                                </b>&nbsp;
                                <i>{question.questionText}</i>
                            </p>
                            <p>
                                <label><input type="radio" name={question.questionNo} value="A" onClick={(e) => onOptionSelect(question.questionNo, 'A')}/>{question.option1}</label><br />
                                <label><input type="radio" name={question.questionNo} value="B" onClick={(e) => onOptionSelect(question.questionNo, 'B')}/>{question.option2}</label><br />
                                <label><input type="radio" name={question.questionNo} value="C" onClick={(e) => onOptionSelect(question.questionNo, 'C')}/>{question.option3}</label><br />
                                <label><input type="radio" name={question.questionNo} value="D" onClick={(e) => onOptionSelect(question.questionNo, 'D')}/>{question.option4}</label><br />
                            </p>
                        </div>
                    })
                }
                <div id="footer" style={{position: 'fixed', bottom: '40px', right: '40px'}}>
                    <button className="primary-button" onClick={submitQuiz}>Submit Quiz</button>
                </div>
            </div>
        </>
    )
}
export default Quiz;