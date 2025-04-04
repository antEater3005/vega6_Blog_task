import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/blogs`
        );
        setBlogs(response.data);
      } catch (err) {
        setError('Error fetching blogs');
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className='container mx-auto p-6'>
      <Link
        to={'/create-blog'}
        className='text-xl font-semibold mb-4 px-2 py-2 bg-green-600 text-amber-50 rounded-sm  '
      >
        Post blog
      </Link>
      {error && <p className='text-red-500'>{error}</p>}
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-3'>
        {blogs.map((blog) => (
          <div key={blog._id} className='bg-white p-4 rounded shadow-xl '>
            {blog.image && (
              <img
                src={import.meta.env.VITE_BASE_URL + blog.image}
                alt={blog.title}
                className='w-full h-40 object-cover rounded mb-3'
              />
            )}
            <h3 className='text-xl font-semibold'>{blog.title}</h3>
            <p className='text-gray-600'>
              {blog.description.substring(0, 100)}...
            </p>
            <button
              className='mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
              onClick={() => navigate(`/blogs/${blog._id}`)}
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
