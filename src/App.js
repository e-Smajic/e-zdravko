import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import News from './components/news/News';
import NewsArticle from './components/news/NewsArticle';
import FAQPage from './components/faq/Faq';
import ContactPage from './components/contacts/Contacts';
import ProfilePage from './components/user-profile/UserProfile';
import ForumList from './components/forum/ForumList';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/news" element={<News />} />
        </Routes>
        <Routes>
          <Route path="/news/article" element={<NewsArticle />} />
        </Routes>
        <Routes>
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
        <Routes>
          <Route path="/contacts" element={<ContactPage />} />
        </Routes>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/user" element={<ProfilePage />} />
        </Routes>
        <Routes>
        <Route path="/forum" element={<ForumList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
