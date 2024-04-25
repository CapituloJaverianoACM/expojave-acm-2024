import { useState, useEffect } from 'react';
import './App.css';
import {preguntas} from './data/preguntas.ts' // con  Typescript y el modelo
import logoACM from './assets/images/acm_logo.png';
import ReglasComponent from './components/ReglasComponent/ReglasComponent';
//import preguntas from './data/preguntas.json'; //Con Json


function prguntasAleatorias(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; 
  }
}

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [mostrarPuntaje, setMostrarPuntaje] = useState<boolean>(false);
  const [puntaje, setPuntaje] = useState<number>(0);
  const [mostrarReglamento, setMostrarReglamento] = useState<boolean>(true);

  useEffect(() => {
    prguntasAleatorias(preguntas);
  }, []);

  const handleAnswerOptionClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setPuntaje(puntaje + 1);
      const siguientePregunta = currentQuestionIndex + 1;
      if (siguientePregunta < preguntas.length) {
        setCurrentQuestionIndex(siguientePregunta);
      } else {
        setMostrarPuntaje(true);
      }
    } else {
      setMostrarPuntaje(true);
    }
  };

  const handleCloseReglamento = () => {
    setMostrarReglamento(false);
  };

  return (
    <div className="App">
      {mostrarReglamento && <ReglasComponent onClose={handleCloseReglamento} />}
      <img src={logoACM} alt="Logo ACM" className='imagenLogo'/>
      {mostrarPuntaje ? (
        <div className="section puntaje-section">
          Has alcanzado {puntaje} de {preguntas.length} preguntas correctas.
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Pregunta {currentQuestionIndex + 1}</span>/{preguntas.length}
            </div>
            <div className="question-text">{preguntas[currentQuestionIndex].pregunta}</div>
          </div>
          <div className="answer-section">
            {preguntas[currentQuestionIndex].opcion.map((opcion, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(opcion === preguntas[currentQuestionIndex].respuesta)}
              >
                {opcion}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
