import React from 'react';

export default function PaginaReferentes() {
  const referentes = [
    { nombre: "Hija de Inmigrantes", cuenta: "@hijadeinmigrantes", tags: ["Cultura", "Identidad"] },
    { nombre: "Hanane Mansouri", cuenta: "@hananemansouri", tags: ["Política", "Juventud"] },
    { nombre: "Lamine Thior", cuenta: "@lamine_thior", tags: ["Humor", "Conciencia"] }
  ];

  return (
    <div style={{ backgroundColor: '#F3F0FF', minHeight: '100vh', padding: '24px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#6D28D9', fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>Referentes</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>Influencers y figuras que inspiran.</p>
      
      <div style={{ display: 'grid', gap: '16px' }}>
        {referentes.map((ref, i) => (
          <div key={i} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#111' }}>{ref.nombre}</h2>
            <p style={{ color: '#7C3AED', fontWeight: '600', margin: '0 0 12px 0' }}>{ref.cuenta}</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {ref.tags.map(tag => (
                <span key={tag} style={{ backgroundColor: '#EDE9FE', color: '#6D28D9', padding: '4px 12px', borderRadius: '12px', fontSize: '12px' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <a href="/" style={{ color: '#6D28D9', textDecoration: 'none', fontWeight: 'bold' }}>← Volver a Inicio</a>
      </div>
    </div>
  );
}