function Header() {
  return (
    <header style={{
      background: '#1a4a2e',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 16px rgba(0,0,0,0.2)'
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '36px', height: '36px',
          background: '#52b788', borderRadius: '10px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '20px'
        }}>🌱</div>
        <div>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: '20px', fontWeight: '600',
            color: 'white', letterSpacing: '-0.3px'
          }}>AgriMind</div>
          <div style={{
            fontSize: '11px', color: '#52b788',
            fontWeight: '300', letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>AI Farm Assistant</div>
        </div>
      </div>

      {/* Status badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '20px', padding: '6px 14px'
      }}>
        <div style={{
          width: '8px', height: '8px',
          background: '#52b788', borderRadius: '50%',
          animation: 'pulse 2s infinite'
        }}/>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
          AI Online
        </span>
      </div>
    </header>
  );
}

export default Header;