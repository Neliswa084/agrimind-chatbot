import ReactMarkdown from 'react-markdown';
import DiseaseCard from './DiseaseCard';

function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div style={{
      display: 'flex',
      gap: '10px',
      alignSelf: isUser ? 'flex-end' : 'flex-start',
      flexDirection: isUser ? 'row-reverse' : 'row',
      maxWidth: '85%',
      animation: 'fadeIn 0.3s ease'
    }}>
      {/* Avatar */}
      <div style={{
        width: '34px', height: '34px',
        borderRadius: '10px', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontSize: '16px', flexShrink: 0, alignSelf: 'flex-end',
        background: isUser
          ? '#f0ead6'
          : 'linear-gradient(135deg, #1a4a2e, #2d6a4f)'
      }}>
        {isUser ? '👤' : '🌿'}
      </div>

      {/* Bubble */}
      <div style={{
        padding: '12px 16px',
        borderRadius: '16px',
        borderBottomLeftRadius: isUser ? '16px' : '4px',
        borderBottomRightRadius: isUser ? '4px' : '16px',
        fontSize: '14px', lineHeight: '1.7',
        background: isUser ? '#1a4a2e' : '#faf7f0',
        color: isUser ? 'white' : '#1a2e1a',
        border: isUser ? 'none' : '1px solid #f0ead6',
        maxWidth: '100%'
      }}>

        {/* Image if uploaded */}
        {message.imgSrc && message.role === 'user' && (
          <img src={message.imgSrc} alt="Uploaded plant" style={{
            maxWidth: '220px', borderRadius: '10px',
            marginBottom: message.text ? '8px' : '0',
            display: 'block'
          }}/>
        )}

        {/* Disease card */}
        {message.type === 'disease' && message.data ? (
          <DiseaseCard data={message.data} imgSrc={message.imgSrc}/>
        ) : (
          /* Markdown rendered text */
          <div style={{
            lineHeight: '1.7',
          }}>
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p style={{ margin: '0 0 8px 0' }}>{children}</p>
                ),
                strong: ({ children }) => (
                  <strong style={{
                    color: isUser ? 'white' : '#1a4a2e',
                    fontWeight: '600'
                  }}>{children}</strong>
                ),
                ul: ({ children }) => (
                  <ul style={{
                    paddingLeft: '18px',
                    margin: '6px 0'
                  }}>{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol style={{
                    paddingLeft: '18px',
                    margin: '6px 0'
                  }}>{children}</ol>
                ),
                li: ({ children }) => (
                  <li style={{
                    margin: '4px 0',
                    lineHeight: '1.6'
                  }}>{children}</li>
                ),
                h1: ({ children }) => (
                  <h1 style={{
                    fontSize: '16px', fontWeight: '700',
                    color: isUser ? 'white' : '#1a4a2e',
                    margin: '8px 0 4px 0'
                  }}>{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 style={{
                    fontSize: '15px', fontWeight: '600',
                    color: isUser ? 'white' : '#1a4a2e',
                    margin: '8px 0 4px 0'
                  }}>{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 style={{
                    fontSize: '14px', fontWeight: '600',
                    color: isUser ? 'white' : '#1a4a2e',
                    margin: '6px 0 4px 0'
                  }}>{children}</h3>
                ),
                code: ({ children }) => (
                  <code style={{
                    background: 'rgba(0,0,0,0.08)',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    fontSize: '13px'
                  }}>{children}</code>
                ),
              }}
            >
              {message.text || ''}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;