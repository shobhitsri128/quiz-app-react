import React from "react";
import { appContext } from "../../App";
import './styles.css';

const Results = () => {
    const { answerList, currentQuiz } = React.useContext(appContext);
    const [myScore, setMyScore] = React.useState<any>({correct:0, wrong:0, notAttempted:0});
    React.useEffect(() => {
        console.log(answerList, currentQuiz);
        currentQuiz.questionSet.forEach((question:any) => {
            if(answerList[question.questionNo]) {
                if(answerList[question.questionNo] === question.correctAns) {
                    setMyScore(prevState => ({...prevState, correct: 1+prevState.correct}))
                } else {
                    setMyScore(prevState => ({...prevState, wrong: 1+prevState.wrong}))
                }
            }
            else{
                setMyScore(prevState => ({...prevState, notAttempted: 1+prevState.notAttempted}))
            }
        })
    }, [])

    const getColor = (question: any) => {
        console.log(question);
        if (!answerList[question.questionNo]) {
            return '#ced3db';
        } else if (question.correctAns === answerList[question.questionNo]) {
            return '#bbf5ab';
        } else {
            return '#e3a1a7';
        }
    }
    const getOptionsColor = (question: any, option: string) => {
        if (answerList[question.questionNo]) {
            if (question.correctAns === option) {
                return 'green';
            } else if (option === answerList[question.questionNo]){
                return 'red';
            }
        }
        return ''
    }
    return (
        <div style={{ margin: '50px' }}>
            <div>
                Results Component
            </div>
            <div>
               <h2>
                 Total : {currentQuiz.questionSet.length}
                </h2>
                <h2>
                 You Score : {JSON.stringify(myScore)}
                </h2>
            </div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Question No.</td>
                            <td>Question</td>
                        </tr>
                        {currentQuiz?.questionSet?.map((question: any) => {
                            return <tr style={{ backgroundColor: getColor(question) }}>
                                <td><b>{question.questionNo} </b></td>
                                <td>
                                    <p>
                                        <b><i>{question.questionText}</i></b>
                                    </p>
                                </td>
                                <td>
                                    <p style={{ background: getOptionsColor(question, 'A') }}>{question.option1}</p>
                                    <p style={{ background: getOptionsColor(question, 'B') }}>{question.option2}</p>
                                    <p style={{ background: getOptionsColor(question, 'C') }}>{question.option3}</p>
                                    <p style={{ background: getOptionsColor(question, 'D') }}>{question.option4}</p>
                                </td>
                            </tr>
                        })}
                        <tr></tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Results;