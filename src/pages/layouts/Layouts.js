// Layouts.js
import React, { useState } from 'react';
import './Layouts.css';

const Layouts = () => {
  const [layouts] = useState([
    { id: 1, nomeBanco: 'Banco do Brasil', codigoBanco: '001', tipo: 'CNAB 240', file: '/files/banco_brasil_cnab240.pdf' },
    { id: 2, nomeBanco: 'Caixa Econômica Federal', codigoBanco: '104', tipo: 'CNAB 400', file: '/files/caixa_cnab400.pdf' },
    { id: 3, nomeBanco: 'Bradesco', codigoBanco: '237', tipo: 'CNAB 240', file: '/files/bradesco_cnab240.pdf' },
    // Adicione mais itens conforme necessário
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Filtra a lista de layouts com base no termo de pesquisa .
  const filteredLayouts = layouts.filter(layout =>
    layout.nomeBanco.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="layouts-content">
      <h2>Layouts</h2>
      
      {/* Campo de pesquisa */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar por banco..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      <ul className="layouts-list">
        {filteredLayouts.map((layout) => (
          <li key={layout.id} className="layout-item">
            <h3>{layout.nomeBanco}</h3>
            <p><strong>Código do Banco:</strong> {layout.codigoBanco}</p>
            <p><strong>Tipo:</strong> {layout.tipo}</p>
            <a href={layout.file} download className="download-link">
              Baixar Layout
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Layouts;
