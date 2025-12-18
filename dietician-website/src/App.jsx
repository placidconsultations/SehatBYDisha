import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/public/Home';
import Services from './pages/public/Services';
import PricingPage from './pages/public/PricingPage';
import Blogs from './pages/public/Blogs';
import BlogDetails from './pages/public/BlogDetails';
import About from './pages/public/About';
import AddPost from './pages/admin/AddPost';
import EditPost from './pages/admin/EditPost';
import Contact from './pages/public/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';


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
                <Route path="/" element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/services' element={<Services />} />
                <Route path='/plans' element={<PricingPage />} />
                <Route path='/blogs' element={<Blogs />} />
                <Route path='/blogs/:id' element={<BlogDetails />} />
                <Route path="/admin/posts/new" element={<AddPost />} />
                <Route path="/admin/posts/edit/:id" element={<EditPost />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/admin/login' element={<AdminLogin/>}/>
                <Route path='/admin/dashboard' element={<Dashboard/>}/>

            </Routes>
        </Router>
    );
};

export default App;