import { useState, useEffect } from 'react';
import './App.css';
import { preguntas } from './data/preguntas'; 
import { Pregunta } from './models/preguntaModel'; 
import logoACM from './assets/images/acm_logo.png';
import ReglasComponent from './components/ReglasComponent/ReglasComponent';

function prguntasAleatorias(array: Pregunta[]): Pregunta[] {
  let tempArray = [...array];
  for (let i = tempArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
  }
  return tempArray.slice(0, 10);
}

function App() {
  const [preguntasAleatorias, setPreguntasAleatorias] = useState<Pregunta[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [mostrarPuntaje, setMostrarPuntaje] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [mostrarReglamento, setMostrarReglamento] = useState(true);

  useEffect(() => {
    setPreguntasAleatorias(prguntasAleatorias(preguntas));
  }, []);

  const handleAnswerOptionClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setPuntaje(puntaje + 1);
      const siguientePregunta = currentQuestionIndex + 1;
      if (siguientePregunta < preguntasAleatorias.length) {
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
          Has alcanzado {puntaje} de {preguntasAleatorias.length} preguntas correctas.
        </div>
      ) : (
        <>
          {preguntasAleatorias.length > 0 && currentQuestionIndex < preguntasAleatorias.length && (
            <>
              <div className="question-section">
                <div className="question-count">
                  <span>Pregunta {currentQuestionIndex + 1}</span>/{preguntasAleatorias.length}
                </div>
                <div className="question-text">
                  {preguntasAleatorias[currentQuestionIndex].pregunta}
                </div>
              </div>
              <div className="answer-section">
                {preguntasAleatorias[currentQuestionIndex].opcion.map((opcion, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerOptionClick(opcion === preguntasAleatorias[currentQuestionIndex].respuesta)}
                  >
                    {opcion}
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
