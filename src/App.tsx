import { useState } from 'react';
import './App.css';
import { Pregunta } from './models/preguntaModel';
import logoACM from './assets/images/acm_logo.png'  ;


const preguntas: Pregunta[] = [
  {
    id: 1,
    pregunta: "¿Cuál es la capital de Francia?",
    opcion: ["Madrid", "Berlín", "París", "Lisboa"],
    respuesta: "París"
  },
  {
    id: 2,
    pregunta: "¿Cuánto es 2 + 2?",
    opcion: ["3", "4", "5", "6"],
    respuesta: "4"
  },
  {
    id: 3,
    pregunta: "¿Cuál es la capital de Portugal?",
    opcion: ["Madrid", "Berlín", "París", "Lisboa"],
    respuesta: "Lisboa"
  }
  

];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [mostrarPuntaje, setMostrarPuntaje] = useState<boolean>(false);
  const [puntaje, setPuntaje] = useState<number>(0);

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

  return (
    <div className="App">
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
