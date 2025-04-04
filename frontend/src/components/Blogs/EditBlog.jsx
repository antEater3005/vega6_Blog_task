import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditBlog() {
  const { blogId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/blogs/${blogId}`
        );
        setFormData({
          title: response.data.title,
          description: response.data.description,
          image: response.data.image,
        });
      } catch (err) {
        setError('Error fetching blog details');
      }
    };
    fetchBlog();
  }, [blogId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const formDataObj = new FormData();
    formDataObj.append('title', formData.title);
    formDataObj.append('description', formData.description);
    if (formData.image) {
      formDataObj.append('image', formData.image);
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/blogs/${blogId}`,
        formDataObj,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating blog');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded shadow-md w-3/4'
      >
        <h2 className='text-2xl font-semibold mb-4'>Edit Blog</h2>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={formData.title}
          onChange={handleChange}
          className='w-full p-2 border rounded mb-3'
          required
        />
        <textarea
          name='description'
          placeholder='Description'
          value={formData.description}
          onChange={handleChange}
          className='w-full p-2 border rounded mb-3'
          required
        ></textarea>
        <input
          type='file'
          name='image'
          onChange={handleFileChange}
          className='w-full p-2 border rounded mb-3'
        />
        <div className='flex gap-2'>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
          >
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBlog;
