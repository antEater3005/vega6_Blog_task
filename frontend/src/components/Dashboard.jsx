import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/login');

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/auth`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user data');
      }
    };
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/login');
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/blogs/by-user`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBlogs(response.data);
      } catch (err) {
        setError('Error fetching blogs');
      }
    };
    fetchBlogs();
    fetchUser();
  }, [navigate]);

  const deleteBlog = async (blogId) => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/blogs/${blogId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting blog');
    }
  };

  const handleDelete = (blogId) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this blog?'
    );

    if (isConfirmed) {
      deleteBlog(blogId);
    }
  };

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-100'>
      <h2 className='text-3xl font-semibold mb-4'>Dashboard</h2>
      {error && <p className='text-red-500 text-sm'>{error}</p>}
      {user && (
        <div className='bg-white p-6 rounded shadow-md w-3/5 flex flex-row items-center justify-between'>
          <div className=''>
            <p className='text-lg font-semibold'>{user.name}</p>
            <p className='text-lg font-semibold'>{user.email}</p>
          </div>
          <img
            src={import.meta.env.VITE_BASE_URL + user.profileImage}
            alt='Profile'
            className='w-36 h-36 rounded-full mb-3'
          />
        </div>
      )}
      <div className=' w-3/5 mt-2 bg-white rounded-sm shadow-md p-3 h-auto'>
        <h1 className=' text-xl font-semibold text-start'>My Blogs</h1>
        <div className='flex flex-col gap-1'>
          {blogs.map((blog, idx) => (
            <div className=' w-full flex flex-row gap-1 p-1 shadow-md justify-between px-3'>
              <div className=' flex flex-row'>
                <p className=' text-m text-gray-700'>{idx + 1}.</p>
                <p className=' text-m text-gray-700 font-semibold'>
                  {blog.title}
                </p>
              </div>
              <div className=''>
                <button
                  className=' bg-red-600 text-white px-1 rounded-sm hover:cursor-pointer ml-4'
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <Link
                  className=' bg-green-600 text-white px-3 rounded-sm hover:cursor-pointer ml-2 '
                  to={`/edit-blog/${blog._id}`}
                >
                  Edit
                </Link>
                <Link
                  className=' bg-green-600 text-white px-3 rounded-sm hover:cursor-pointer ml-2'
                  to={`/blogs/${blog._id}`}
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
