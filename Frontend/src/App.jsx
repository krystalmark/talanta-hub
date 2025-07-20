import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Upload from './pages/Upload';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Opportunities from './pages/Opportunities';
import PostForm from './pages/Opportunities/PostForm';
import ManageDashboard from './pages/Opportunities/ManageDashboard';
import { AuthProvider } from './contexts/AuthContext';
import { TalentProvider } from './contexts/TalentContext';
import { OpportunitiesProvider } from './contexts/OpportunitiesContext';
import ViewAll from './pages/Opportunities/ViewAll';

export default function App() {
  return (
    <AuthProvider>
      <TalentProvider>
        <OpportunitiesProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/opportunities/all" element={<ViewAll />} />
            <Route
              path="/upload"
              element={
                <PrivateRoute>
                  <Upload />
                </PrivateRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Public view of all opportunities */}
            <Route path="/opportunities" element={<Opportunities />} />

            {/* Private opportunity submission route */}
            <Route
              path="/opportunities/post"
              element={
                <PrivateRoute allowedRoles={['mentor', 'sponsor', 'organization']}>
                  <PostForm/>
                </PrivateRoute>
              }
            />

            {/* View all submissions by logged-in orgs/mentors */}
            <Route
              path="/opportunities/dashboard"
              element={
                <PrivateRoute allowedRoles={['mentor', 'sponsor', 'organization']}>
                  <ManageDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </OpportunitiesProvider>
      </TalentProvider>
    </AuthProvider>
  );
}
