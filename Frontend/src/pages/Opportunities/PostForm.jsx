// src/pages/Opportunities/PostForm.jsx
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useOpportunities } from '../../contexts/OpportunitiesContext';
import { useNavigate } from 'react-router-dom';

export default function PostOpportunity() {
  const { user } = useAuth();
  const { addOpportunity } = useOpportunities();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contact: '',
    organization: user?.role === 'organization' ? user?.name || '' : '',
    photo: null,
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const opportunity = {
      id: Date.now(),
      ...formData,
      role: user.role,
      postedBy: user.name || user.username,
    };

    addOpportunity(opportunity);
    alert('Opportunity submitted!');
    navigate('/opportunities/dashboard');
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-green-100 py-10 px-4">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Post a New Opportunity</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="contact"
            placeholder="Contact (Email / Phone / Link)"
            required
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {user?.role === 'organization' && (
            <input
              name="organization"
              placeholder="Organization Name"
              required
              value={formData.organization}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          )}
          <textarea
            name="description"
            placeholder="Description"
            required
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handlePhoto}
            className="w-full"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
