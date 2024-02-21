import React, { useContext } from "react";
import * as XLSX from 'xlsx'
import { appContext } from "../../App";
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const [quizArr, setQuizArr] = React.useState<any>([]);
    const {currentQuiz, setCurrentQuiz} = useContext(appContext)
    const navigate = useNavigate();
    React.useEffect(() => {
        console.log(quizArr);
    },[quizArr])
    const fileUpload = (e) => {
        let files = e.target.files, f = files[0];
        let reader = new FileReader();
        reader.onload = function (e) {
            let data = new Uint8Array(e?.target?.result as ArrayBuffer);
            let workbook = XLSX.read(data, { type: 'array' });
            let sheetName = workbook.SheetNames[0]
            let worksheet = workbook.Sheets[sheetName];
            modifyAndSaveQuestions(XLSX.utils.sheet_to_json(worksheet));
        };
        reader.readAsArrayBuffer(f);
    }
    const modifyAndSaveQuestions = (queList) => {
        queList.forEach(que => {
            let options = {
                "A": que.option1,
                "B": que.option2,
                "C": que.option3,
                "D": que.option4,
            }
            que['options'] = options
        });
        console.log(queList);
        setQuizArr(prevList => [...prevList, {name:`New Quiz ${quizArr.length+1}`, id:quizArr.length+1, questionSet: queList}]);
        alert("Questions Added");
    }

    const startQuiz = (index:number) => {
        setCurrentQuiz(quizArr[index]);
        navigate('/quiz');
    }

    return (
        <div style={{ padding: '100px' }}>
            <h1>
                Take Quiz
            </h1>
            {quizArr.map((quiz:any, index:number) => {
                return <>
                <span>{quiz.name}</span>
                <button onClick={() => startQuiz(index)}>Start Quiz</button>
                </>
            })}
            <div></div>
            <h1>
                Create Quiz
            </h1>
            <input type="file" onChange={fileUpload} />
        </div>
    )
}
export default Home;