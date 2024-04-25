import React from 'react';
import './ConfirmacionRetiroComponent.css';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmacionRetiroComponent: React.FC<Props> = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay ">
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onCancel}>&times;</span>
          <div className='terindes'>
            <h2>¿Eso es todo?😅</h2>
          </div>
          <div className="confirm-buttons">
            <button onClick={onConfirm} className="confirm-button">Sí, retirarme</button>
            <button onClick={onCancel} className="cancel-button">No, seguir jugando</button>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default ConfirmacionRetiroComponent;
