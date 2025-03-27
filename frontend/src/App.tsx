import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { HomePage } from './pages/home';
import { SearchPage } from './pages/search';
import { BusinessPage } from './pages/business';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { ProfilePage } from './pages/profile';
import { AddBusinessPage } from './pages/add-business';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';

function App() {
  return (
    <AuthProvider>
        <NotificationProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/business/:id" element={<BusinessPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/add-business" element={<AddBusinessPage />} />
              </Routes>
            </div>
          </Router>
        </NotificationProvider>
    </AuthProvider>
  );
}

export default App;