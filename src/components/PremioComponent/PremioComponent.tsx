
import React from 'react';
//import './PremioComponent.css'; 

interface Props {
  puntaje: number;
  onClose: () => void;
}

const PremioComponent: React.FC<Props> = ({ puntaje, onClose }) => {
  let mensaje;
  if (puntaje <= 3) {
    mensaje = "¡Buen intento! no te desanimes, sigue intentando 🍪";
  } else if (puntaje >= 4 && puntaje <= 5) {
    mensaje = "¡Excelente! Te has ganado un dulce 🍬";
  } else if (puntaje >= 6 && puntaje <= 9) {
    mensaje = "¡Felicidades! Ganaste una paleta 🍭";
  } else if (puntaje === 10) {
    mensaje = "¡Increíble! Muy pocos llegan a la cima, pero tú lo lograste 🏆";
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Resultado del Juego</h2>
          <div className='terindes'>
            <p>{mensaje}</p>
          </div>
          <div className='confirm-buttons'>
            <button onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremioComponent;
