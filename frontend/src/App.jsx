import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProblemsPage from './pages/ProblemsPage';
import ProblemPage from './pages/ProblemPage';
import ProfilePage from './pages/ProfilePage';
import SubmissionsPage from './pages/SubmissionsPage';

function ProtectedRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <div className="min-h-screen bg-lc-bg">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <ProblemsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/problems"
                        element={
                            <ProtectedRoute>
                                <ProblemsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/problem/:id"
                        element={
                            <ProtectedRoute>
                                <ProblemPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/submissions"
                        element={
                            <ProtectedRoute>
                                <SubmissionsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
