import './App.css';
import {BrowserRouter as Router, Routes , Route,Link} from 'react-router-dom'



//import Keyboard from "./components/Keyboard"
import {ChatPage} from "./pages/Chat/ChatPage"

function App() {
  return (
    <Router>
      
      <div className="">
        <ul>
          <li><Link to="/">main</Link></li>
          <li><Link to="/chat">Chat</Link></li>
        </ul>
      
      
      
    </div>
    <Routes>
    <Route path="/chat" element={<ChatPage />} />
    <Route path="/" element={<div >main page</div>} />      
  
    </Routes>
    
    </Router>
    
  );
}

export default App;
