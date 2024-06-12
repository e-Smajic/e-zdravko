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
import Notifications from './components/notifications/Notifications';
import Therapy from './components/therapy/Therapy';
import TestResults from './components/test/TestResults';
import Test from './components/test/Test';
import HealthDiary from './components/health-diary/HealthDiary';
import DiaryEntries from './components/health-diary/DiaryEntries';
import Referral from './components/referral/Referral';
import Examination from './components/examination/Examination';
import Footer from './components/footer/Footer';
import UsersList from './components/search/Search';

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
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/therapy" element={<Therapy />} />
          <Route path="/test-results" element={<TestResults />} />
          <Route path="/test" element={<Test />} />
          <Route path="/health-diary" element={<HealthDiary />} />
          <Route path="/examination" element={<Examination />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/diary-entries" element={<DiaryEntries />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
