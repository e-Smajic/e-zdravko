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
import ForumPost from './components/forum/ForumPost';
import SurveyList from './components/survey/SurveyList';
import SurveyPost from './components/survey/SurveyPost';
import SurveyCreate from './components/survey/SurveyCreate';

function App() {
  const dummyPost = {
    id: 1,
    title: 'Sample Post Title',
    author: 'John Doe',
    date: '1 hour ago',
    content: 'This is the content of the post.',
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/article" element={<NewsArticle />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<ProfilePage />} />
          <Route path="/forum" element={<ForumList />} />
          <Route path="/forum/:id" element={<ForumPost post={dummyPost} />} />
          <Route path="/surveys" element={<SurveyList />} />
          <Route path="/survey/:id" element={<SurveyPost />} />
          <Route path="/survey/create" element={<SurveyCreate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
