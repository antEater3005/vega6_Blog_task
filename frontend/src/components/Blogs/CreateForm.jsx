import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/blogs`,
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
      setError(err.response?.data?.message || 'Error creating blog');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded shadow-md w-2/3'
      >
        <h2 className='text-2xl font-semibold mb-4'>Create Blog</h2>
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
        <button
          type='submit'
          className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}

export default CreateForm;
