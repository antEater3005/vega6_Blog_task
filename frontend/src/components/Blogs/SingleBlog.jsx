import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SingleBlog() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/blogs/${blogId}`
        );
        setBlog(response.data);
      } catch (err) {
        setError('Error fetching blog details');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [blogId]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      {loading ? (
        <p>Loading blog details...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <div className='bg-white p-6 rounded shadow-md w-1/2'>
          <h2 className='text-2xl font-semibold mb-4'>{blog.title}</h2>
          {blog.image && (
            <img
              src={import.meta.env.VITE_BASE_URL + blog.image}
              alt='Blog'
              className='w-full h-48 rounded mb-3 object-contain'
            />
          )}
          <p className='text-gray-700 mb-3'>{blog.description}</p>
        </div>
      )}
    </div>
  );
}

export default SingleBlog;
