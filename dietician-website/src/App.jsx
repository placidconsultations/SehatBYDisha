import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/public/Home';
import Services from './pages/public/Services';
import Blogs from './pages/public/Blogs';
import BlogDetails from './pages/public/BlogDetails';
import About from './pages/public/About';
import AddPost from './pages/admin/AddPost';
import EditPost from './pages/admin/EditPost';
import Contact from './pages/public/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ManageTestimonials from './pages/admin/ManageTestimonials';


const App = () => {
    return (
        <Router>
            <ToastContainer 
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <ScrollToTop />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/services' element={<Services />} />
                <Route path='/blogs' element={<Blogs />} />
                <Route path='/blogs/:id' element={<BlogDetails />} />
                <Route path='/contact' element={<Contact />} />
                
                {/* Admin Login - Public but redirects if already logged in */}
                <Route path='/admin/login' element={<AdminLogin/>}/>
                
                {/* Protected Admin Routes */}
                <Route 
                    path="/admin/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin/posts/new" 
                    element={
                        <ProtectedRoute>
                            <AddPost />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin/posts/edit/:id" 
                    element={
                        <ProtectedRoute>
                            <EditPost />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin/testimonials" 
                    element={
                        <ProtectedRoute>
                            <ManageTestimonials />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </Router>
    );
};

export default App;