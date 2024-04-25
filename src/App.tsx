import { useState, useEffect } from 'react';
import './App.css';
import { preguntas } from './data/preguntas';
import { Pregunta } from './models/preguntaModel';
import logoACM from './assets/images/acm_logo.png';
import ReglasComponent from './components/ReglasComponent/ReglasComponent';
import ConfirmacionRetiroComponent from './components/ConfirmacionRetiroComponent/ConfirmacionRetiroComponent';
import PremioComponent from './components/PremioComponent/PremioComponent';


function obtenerPreguntasAleatorias(array: Pregunta[]): Pregunta[] {
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
  const [mostrarConfirmacionRetiro, setMostrarConfirmacionRetiro] = useState(false);
  const [mostrarPremio, setMostrarPremio] = useState(false);

  useEffect(() => {
    setPreguntasAleatorias(obtenerPreguntasAleatorias(preguntas));
  }, []);

  const handleAnswerOptionClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setPuntaje(puntaje + 1);
    } else {
      setMostrarPuntaje(true);
      setMostrarPremio(true);
      return; 
    }
  
    const siguientePregunta = currentQuestionIndex + 1;
    if (siguientePregunta < preguntasAleatorias.length) {
      setCurrentQuestionIndex(siguientePregunta);
    } else {
      setMostrarPuntaje(true);
      setMostrarPremio(true);
    }
  };

  const handleRetirarseClick = () => {
    setMostrarConfirmacionRetiro(true);
  };

  const confirmarRetiro = () => {
    setMostrarPuntaje(true);
    setMostrarPremio(true);
    setMostrarConfirmacionRetiro(false);
  };

  const cancelarRetiro = () => {
    setMostrarConfirmacionRetiro(false);
  };

  const handleCloseReglamento = () => {
    setMostrarReglamento(false);
  };

  const handleClosePremio = () => {
    setMostrarPremio(false); 
    setMostrarPuntaje(true); 
  };

  return (
    <div className="App">
      {mostrarReglamento && <ReglasComponent onClose={handleCloseReglamento} />}
      <img src={logoACM} alt="Logo ACM" className='imagenLogo'/>
      {!mostrarPuntaje ? (
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
          <div className="retirarse-section" style={{ textAlign: 'right', marginTop: '20px' }}>
            <button className="retirarse-button" onClick={handleRetirarseClick}>
              Retirarse
            </button>
          </div>
        </>
      ) : (
        <>
          {mostrarPremio && (
            <PremioComponent puntaje={puntaje} onClose={handleClosePremio} />
          )}
          <div className="instagram-message">
            No se te olvide seguirnos en Instagram.
          </div>
          <iframe
            className="iframe"
            src='https://845dfc03865c49359e345ffbca3c295d.elf.site'
            width='100%'
            height='1000'
            frameBorder='0'
          ></iframe>
          <div className="section puntaje-section">
            Has alcanzado {puntaje} de {preguntasAleatorias.length} preguntas correctas.
          </div>
        </>   
      )}
      {mostrarConfirmacionRetiro && (
        <ConfirmacionRetiroComponent
          onConfirm={confirmarRetiro}
          onCancel={cancelarRetiro}
        />
      )}
    </div>
  );
}

export default App;


