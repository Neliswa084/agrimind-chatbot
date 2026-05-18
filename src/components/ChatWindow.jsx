import { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import InputArea from './InputArea';
import { detectDisease } from '../services/diseaseApi';
import { askGemini } from '../services/geminiApi';

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Thinking...');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setMessages([{
        id: Date.now(),
        role: 'bot',
        text: '👋 **Sawubona! Welcome to AgriMind.**\n\nI am your AI-powered agricultural assistant. I can help you:\n\n🔬 **Diagnose plant diseases** — upload a photo of a sick plant\n\n💬 **Answer farming questions** — ask me anything about crops or soil\n\n🌿 **Recommend treatments** — I will tell you exactly how to treat any disease\n\nHow can I help your farm today?'
      }]);
    }, 400);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  function addMessage(msg) {
    setMessages(prev => [...prev, { id: Date.now(), ...msg }]);
  }

  async function handleSend({ text, file, previewSrc }) {
    if (!text && !file) return;
    if (isLoading) return;

    addMessage({
      role: 'user',
      text: text || 'Please analyze this plant photo 📸',
      imgSrc: file ? previewSrc : null
    });

    setIsLoading(true);

    try {
      if (file) {
        setLoadingText('🔬 Analyzing your plant photo...');
        const data = await detectDisease(file);
        addMessage({
          role: 'bot',
          type: 'disease',
          data: data,
          imgSrc: previewSrc
        });
      } else {
        setLoadingText('🌿 Finding the best answer for you...');
        const reply = await askGemini(text);
        addMessage({ role: 'bot', text: reply });
      }
    } catch (err) {
      addMessage({
        role: 'bot',
        text: file
          ? `❌ **Could not connect to the disease detection API.**\n\nMake sure your Colab notebook is running and your ngrok URL is up to date in the settings panel.\n\n*Error: ${err.message}*`
          : `❌ Something went wrong: ${err.message}. Please try again.`
      });
    }

    setIsLoading(false);
  }

  return (
    <main style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 24px rgba(26,74,46,0.10)',
      border: '1px solid rgba(26,74,46,0.08)',
      overflow: 'hidden',
    }}>

      {/* Chat header */}
      <div style={{
        padding: '18px 24px',
        borderBottom: '1px solid #f0ead6',
        display: 'flex', alignItems: 'center',
        gap: '12px', background: '#faf7f0',
        flexShrink: 0
      }}>
        <div style={{
          width: '44px', height: '44px',
          background: 'linear-gradient(135deg, #1a4a2e, #2d6a4f)',
          borderRadius: '12px', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: '22px', flexShrink: 0
        }}>🌿</div>
        <div>
          <strong style={{
            display: 'block', fontSize: '15px',
            color: '#1a2e1a', fontWeight: '600'
          }}>
            AgriMind Assistant
          </strong>
          <span style={{ fontSize: '13px', color: '#8a9e8a' }}>
            Powered by CNN Disease Detection + Gemini AI
          </span>
        </div>

        {/* Online indicator */}
        <div style={{
          marginLeft: 'auto',
          display: 'flex', alignItems: 'center',
          gap: '6px', fontSize: '12px', color: '#52b788'
        }}>
          <div style={{
            width: '8px', height: '8px',
            background: '#52b788', borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }}/>
          Online
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '24px',
        display: 'flex', flexDirection: 'column',
        gap: '16px',
      }}>
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg}/>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div style={{
            display: 'flex', gap: '10px',
            alignSelf: 'flex-start', maxWidth: '85%',
            animation: 'fadeIn 0.3s ease'
          }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #1a4a2e, #2d6a4f)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '16px',
              flexShrink: 0
            }}>🌿</div>
            <div style={{
              padding: '12px 16px', background: '#faf7f0',
              border: '1px solid #f0ead6', borderRadius: '16px',
              borderBottomLeftRadius: '4px',
              display: 'flex', alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: '7px', height: '7px',
                    background: '#52b788', borderRadius: '50%',
                    animation: `bounce 1.2s infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}/>
                ))}
              </div>
              <span style={{
                fontSize: '13px', color: '#4a5e4a',
                fontStyle: 'italic'
              }}>
                {loadingText}
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef}/>
      </div>

      <InputArea onSend={handleSend} isLoading={isLoading}/>
    </main>
  );
}

export default ChatWindow;