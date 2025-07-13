import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTalent } from '../contexts/TalentContext';
import { useNavigate } from 'react-router-dom';

export default function Upload() {
  const { user } = useAuth();
  const { addTalent } = useTalent();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (!user) navigate('/login');
    else setName(user.name);
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTalent = {
      name,
      category,
      bio,
      img: image ? URL.createObjectURL(image) : null,
    };
    addTalent(newTalent);
    navigate('/discover');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-pink-500 py-12 px-6 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-2xl">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">📤 Share Your Talent</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="🙋 Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="🎨 Talent Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="📝 Brief Description / Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="w-full px-3 py-2 border rounded-lg bg-gray-50 shadow-sm"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-800 text-white py-2 rounded-lg font-semibold shadow-lg transition duration-300"
          >
            🚀 Upload Talent
          </button>
        </form>
      </div>
    </div>
  );
}
