import React from 'react';
import './ReglasComponent.css';

interface Props {
  onClose: () => void;
}

const ReglasComponent: React.FC<Props> = ({ onClose }) => {
    return (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={onClose}>&times;</span>
              <h2>Reglas del Juego</h2>
              <p><strong>1.</strong>  Desafía tu mente y gana premios! Completa 4 preguntas para un premio 🍬, 6 preguntas para otro 🍭, ¡y el gran premio al llegar al final! 🍕</p>
              <p><strong>2.</strong>  Cada pregunta tiene cuatro opciones de respuesta y solo <strong>una</strong> es la correcta. </p>
              <p><strong>3.</strong>  Puedes retirarte en cualquier momento. </p>
              <p><strong>4.</strong>  Cuando termines, muéstrale a algún miembro del grupo cuál fue tu puntaje. </p>
              <div className='Suerte'>
                <p > ✨ ¡Buena suerte! ✨ </p>
              </div>
            </div>
          </div>
        </div>
      );  
};

export default ReglasComponent;
