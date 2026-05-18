function Sidebar() {
  return (
    <aside style={{
      width: '280px',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      overflowY: 'auto',
      height: '100%'
    }}>

      {/* Welcome card */}
      <div style={{
        background: 'linear-gradient(135deg, #1a4a2e, #2d6a4f)',
        borderRadius: '16px', padding: '20px',
        boxShadow: '0 4px 24px rgba(26,74,46,0.2)',
      }}>
        <div style={{ fontSize: '32px', marginBottom: '10px' }}>🌾</div>
        <h2 style={{
          color: 'white', fontSize: '16px',
          fontWeight: '700', marginBottom: '6px'
        }}>Sawubona, Farmer!</h2>
        <p style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: '13px', lineHeight: '1.5'
        }}>
          I am your AI farming assistant. Take a photo of your sick plant and I will tell you what is wrong and how to fix it.
        </p>
      </div>

      {/* What I can do */}
      <div style={{
        background: 'white', borderRadius: '16px',
        padding: '18px', boxShadow: '0 4px 24px rgba(26,74,46,0.08)',
        border: '1px solid rgba(26,74,46,0.08)'
      }}>
        <h3 style={{
          fontSize: '13px', fontWeight: '700',
          color: '#1a4a2e', marginBottom: '14px',
          textTransform: 'uppercase', letterSpacing: '0.5px'
        }}>How I can help you</h3>

        {[
          {
            icon: '📸',
            color: '#d8f3dc',
            title: 'Check your plants',
            desc: 'Take a photo of a sick plant and I will diagnose the disease instantly'
          },
          {
            icon: '💊',
            color: '#fff3cd',
            title: 'Get treatment advice',
            desc: 'I will tell you exactly what to spray or do to save your crop'
          },
          {
            icon: '🌦️',
            color: '#dbeafe',
            title: 'Farming questions',
            desc: 'Ask me anything about planting seasons, soil, or crop care'
          },
        ].map((item, i, arr) => (
          <div key={item.title} style={{
            display: 'flex', alignItems: 'flex-start',
            gap: '10px', padding: '10px 0',
            borderBottom: i < arr.length - 1 ? '1px solid #f0ead6' : 'none'
          }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: item.color, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', flexShrink: 0
            }}>{item.icon}</div>
            <div>
              <strong style={{
                display: 'block', fontSize: '13px',
                fontWeight: '600', color: '#1a2e1a', marginBottom: '3px'
              }}>{item.title}</strong>
              <span style={{ fontSize: '12px', color: '#8a9e8a', lineHeight: '1.4' }}>
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Trust indicators */}
      <div style={{
        background: 'white', borderRadius: '16px',
        padding: '18px', boxShadow: '0 4px 24px rgba(26,74,46,0.08)',
        border: '1px solid rgba(26,74,46,0.08)'
      }}>
        <h3 style={{
          fontSize: '13px', fontWeight: '700',
          color: '#1a4a2e', marginBottom: '14px',
          textTransform: 'uppercase', letterSpacing: '0.5px'
        }}>Why trust AgriMind?</h3>

        {[
          { icon: '🎯', value: '98%', label: 'Disease detection accuracy' },
          { icon: '🔬', value: '38', label: 'Plant diseases it can identify' },
          { icon: '🌱', value: '14', label: 'Different crop types supported' },
          { icon: '📚', value: '54K', label: 'Plant photos it was trained on' },
        ].map((stat) => (
          <div key={stat.label} style={{
            display: 'flex', alignItems: 'center',
            gap: '12px', padding: '8px 0',
            borderBottom: '1px solid #f0ead6'
          }}>
            <span style={{ fontSize: '20px' }}>{stat.icon}</span>
            <div>
              <span style={{
                fontSize: '18px', fontWeight: '700',
                color: '#1a4a2e', display: 'block',
                lineHeight: 1
              }}>{stat.value}</span>
              <span style={{ fontSize: '12px', color: '#8a9e8a' }}>
                {stat.label}
              </span>
            </div>
          </div>
        ))}

        {/* Accuracy bar */}
        <div style={{ marginTop: '14px' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: '12px', color: '#4a5e4a',
            fontWeight: '500', marginBottom: '6px'
          }}>
            <span>Detection accuracy</span>
            <span style={{ color: '#1a4a2e', fontWeight: '700' }}>98.25%</span>
          </div>
          <div style={{
            height: '8px', background: '#f0ead6',
            borderRadius: '4px', overflow: 'hidden'
          }}>
            <div style={{
              height: '100%', width: '98.25%',
              background: 'linear-gradient(90deg, #52b788, #1a4a2e)',
              borderRadius: '4px'
            }}/>
          </div>
        </div>
      </div>

      {/* Tip card */}
      <div style={{
        background: '#f0f9f4',
        border: '1px solid rgba(82,183,136,0.3)',
        borderRadius: '16px', padding: '16px',
      }}>
        <div style={{
          fontSize: '13px', color: '#1a4a2e',
          fontWeight: '600', marginBottom: '6px'
        }}>💡 Tip for best results</div>
        <p style={{
          fontSize: '12px', color: '#4a5e4a',
          lineHeight: '1.5', margin: 0
        }}>
          Take a close-up photo of the affected leaf in good lighting for the most accurate diagnosis.
        </p>
      </div>

    </aside>
  );
}

export default Sidebar;