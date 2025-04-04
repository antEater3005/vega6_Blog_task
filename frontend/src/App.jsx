import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';
import CreateForm from './components/Blogs/CreateForm';
import EditBlog from './components/Blogs/EditBlog';
import SingleBlog from './components/Blogs/SingleBlog';
import BlogList from './components/Blogs/BlogList';

import './index.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className=" h-17"/>
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/create-blog' element={<CreateForm />} />
        <Route path='/edit-blog/:blogId' element={<EditBlog />} />
        <Route path='/blogs/:blogId' element={<SingleBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
