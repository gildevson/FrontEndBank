import React, { useState } from 'react';
import './Simulacao.css';

function Simulacao() {
  const [percentual, setPercentual] = useState('');
  const [prazo, setPrazo] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const valorDeFace = 1000;
    const pz = parseFloat(prazo);
    const perc = parseFloat(percentual);
    const calculo = valorDeFace * ((perc / 30) * pz) / 100;
    setResultado(calculo);
  };

  return (
    <div className="simulacao-container">
      <h2>Simulação de Cálculo</h2>
      <div>
        <label>Percentual (%): </label>
        <input
          type="number"
          value={percentual}
          onChange={(e) => setPercentual(e.target.value)}
        />
      </div>
      <div>
        <label>Prazo (PZ): </label>
        <input
          type="number"
          value={prazo}
          onChange={(e) => setPrazo(e.target.value)}
        />
      </div>
      <button onClick={calcular}>Calcular</button>
      {resultado !== null && (
        <div className="resultado">
          <h3>Resultado: {resultado.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}

export default Simulacao;
