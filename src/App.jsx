import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#faf7f0',
      fontFamily: "'Outfit', 'Segoe UI', sans-serif",
    }}>
      <Header />

      <div style={{
        display: 'flex',
        flex: 1,
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px 20px',
        gap: '20px',
        height: 'calc(100vh - 64px)',
        boxSizing: 'border-box',
      }}>
        <Sidebar />
        <ChatWindow />
      </div>
    </div>
  );
}

export default App;