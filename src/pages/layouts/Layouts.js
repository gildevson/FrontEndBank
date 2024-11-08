import React, { useState } from 'react';
import './Layouts.css';

const Layouts = () => {
  const [layouts] = useState([
    { id: 1, nomeBanco: 'Banco do Brasil', codigoBanco: '001', tipo: 'CNAB 240', file: '/files/banco_brasil_cnab240.pdf', dataInserida: '01/01/2024' },
    { id: 2, nomeBanco: 'Caixa Econômica Federal', codigoBanco: '104', tipo: 'CNAB 400', file: '/files/caixa_cnab400.pdf', dataInserida: '02/01/2024' },
    { id: 3, nomeBanco: 'Bradesco', codigoBanco: '237', tipo: 'CNAB 240', file: '/files/bradesco_cnab240.pdf', dataInserida: '03/01/2024' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredLayouts = layouts.filter(layout =>
    layout.nomeBanco.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="layouts-content">
      <h2>Layouts</h2>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar por banco..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      <table className="layouts-table">
        <thead>
          <tr>
            <th>Banco</th>
            <th>Código</th>
            <th>Tipo</th>
            <th>Data Inserida</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {filteredLayouts.map((layout) => (
            <tr key={layout.id}>
              <td>{layout.nomeBanco}</td>
              <td>{layout.codigoBanco}</td>
              <td>{layout.tipo}</td>
              <td>{layout.dataInserida}</td>
              <td>
                <a href={layout.file} download className="download-link">
                  Baixar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Layouts;
