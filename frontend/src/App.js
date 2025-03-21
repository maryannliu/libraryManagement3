import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import Books from './pages/Books';
import Loans from './pages/Loans';
import Members from './pages/Members';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/books" element={<Books />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/members" element={<Members />} />
        
      </Routes>
    </Router>
  );
}

export default App;
