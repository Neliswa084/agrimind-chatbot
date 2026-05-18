import { useState, useRef } from 'react';

function InputArea({ onSend, isLoading }) {
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const fileInputRef = useRef(null);

  const quickPrompts = [
    { label: '🍅 Tomato blight', text: 'How do I prevent tomato blight?' },
    { label: '🌽 KZN crops', text: 'What crops grow well in KwaZulu-Natal?' },
    { label: '🌱 Soil advice', text: 'How do I improve my soil quality?' },
  ];

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewSrc(ev.target.result);
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setSelectedFile(null);
    setPreviewSrc(null);
    fileInputRef.current.value = '';
  }

  function handleSend() {
    if (!text.trim() && !selectedFile) return;
    onSend({ text, file: selectedFile, previewSrc });
    setText('');
    setSelectedFile(null);
    setPreviewSrc(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div style={{
      padding: '16px 20px',
      borderTop: '1px solid #f0ead6',
      background: '#faf7f0'
    }}>

      {/* Quick prompts */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
        {quickPrompts.map((q) => (
          <button key={q.label} onClick={() => onSend({ text: q.text, file: null, previewSrc: null })}
            style={{
              background: 'white', border: '1px solid rgba(26,74,46,0.18)',
              borderRadius: '20px', padding: '6px 14px', fontSize: '12px',
              color: '#1a4a2e', cursor: 'pointer', fontWeight: '500',
              fontFamily: 'sans-serif'
            }}>
            {q.label}
          </button>
        ))}
      </div>

      {/* Image preview */}
      {previewSrc && (
        <div style={{ marginBottom: '10px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'white', border: '1px solid #f0ead6',
            borderRadius: '10px', padding: '6px 10px'
          }}>
            <img src={previewSrc} alt="preview" style={{
              width: '40px', height: '40px',
              objectFit: 'cover', borderRadius: '6px'
            }}/>
            <span style={{ fontSize: '12px', color: '#4a5e4a' }}>
              {selectedFile?.name}
            </span>
            <button onClick={removeImage} style={{
              background: 'none', border: 'none',
              cursor: 'pointer', color: '#8a9e8a',
              fontSize: '16px', lineHeight: 1
            }}>✕</button>
          </div>
        </div>
      )}

      {/* Input row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        background: 'white', border: '1.5px solid rgba(26,74,46,0.15)',
        borderRadius: '14px', padding: '6px 6px 6px 16px'
      }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask me anything about your crops..."
          style={{
            flex: 1, border: 'none', outline: 'none',
            fontSize: '14px', color: '#1a2e1a',
            background: 'transparent', fontFamily: 'sans-serif',
            height: '36px'
          }}
        />

        {/* Camera button */}
        <button onClick={() => fileInputRef.current.click()} style={{
          width: '36px', height: '36px', borderRadius: '9px',
          border: '1.5px solid rgba(26,74,46,0.2)',
          background: 'transparent', cursor: 'pointer',
          fontSize: '18px', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          color: '#2d6a4f'
        }}>📷</button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {/* Send button */}
        <button onClick={handleSend} disabled={isLoading}
          style={{
            width: '38px', height: '38px', borderRadius: '10px',
            border: 'none', background: isLoading ? '#d3d1c7' : '#1a4a2e',
            color: 'white', cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '16px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}>
          {isLoading ? '⏳' : '➤'}
        </button>
      </div>

      <div style={{
        fontSize: '11px', color: '#8a9e8a',
        marginTop: '8px', textAlign: 'center'
      }}>
        Upload a plant photo for disease detection, or type your farming question
      </div>
    </div>
  );
}

export default InputArea;