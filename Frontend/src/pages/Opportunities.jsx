import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useOpportunities } from '../contexts/OpportunitiesContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

export default function Opportunities() {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase() ?? 'guest';
  const { addOpportunity } = useOpportunities();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contact: '',
    organization: '',
    photoFile: null,
    photoURL: ''
  });

  const canPost = ['mentor', 'sponsor', 'organization'].includes(role);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, photoFile: file, photoURL: url }));
  };

  const resetForm = () =>
    setFormData({
      title: '',
      description: '',
      contact: '',
      organization: '',
      photoFile: null,
      photoURL: ''
    });

  const submitOpportunity = (e) => {
    e.preventDefault();
    const { title, description, contact, organization, photoURL } = formData;
    if (!title || !description || !contact) return;

    const newOpp = {
      id: Date.now(),
      title,
      description,
      contact,
      organization:
        role === 'organization' ? (organization || user?.name || '') : '',
      photo: photoURL || null,
      postedBy: user?.name || 'Unknown',
      role
    };

    addOpportunity(newOpp);
    resetForm();
    alert('Opportunity posted! You can view it in your dashboard.');
  };

  return (
    <main className="min-h-screen px-4 py-10 bg-gradient-to-b from-[#10D164] to-[#009245] text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8" data-aos="fade-down">
          Opportunities
        </h1>
{user && role === 'youth' && (
  <>
    <div className="mb-8" data-aos="fade-right">
      <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow mb-4 text-center">
        You’re logged in as a <strong>Youth</strong>. You can’t post opportunities,
        but you can browse those shared by mentors, sponsors, and organizations.
      </div>
      <div className="text-center">
        <Link
          to="/opportunities/all"
          className="inline-block bg-green-600 text-white hover:bg-green-700 px-5 py-2 rounded-md font-semibold transition"
        >
          View Opportunities →
        </Link>
      </div>
    </div>
  </>
)}

        {!user && (
          <div className="mb-8 bg-red-100 text-red-800 p-4 rounded shadow" data-aos="fade-right">
            Please <a href="/login" className="underline font-semibold">log in</a> to post or view opportunities.
          </div>
        )}

        {canPost && (
          <>
            <form
              onSubmit={submitOpportunity}
              className="bg-white text-black p-6 rounded-xl shadow-lg mb-10"
              data-aos="zoom-in"
            >
              <h2 className="text-2xl font-semibold mb-4">Submit an Opportunity</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Opportunity Title"
                  className="p-3 border rounded"
                  required
                />

                <input
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Contact (email / phone / link)"
                  className="p-3 border rounded"
                  required
                />

                {role === 'organization' && (
                  <input
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Organization Name"
                    className="p-3 border rounded md:col-span-2"
                    required
                  />
                )}

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Opportunity Description"
                  rows={4}
                  className="p-3 border rounded md:col-span-2"
                  required
                />

                <div className="md:col-span-2 flex items-center gap-4">
                  <label className="font-medium shrink-0">Logo / Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhoto}
                    className="block w-full text-sm"
                  />
                </div>

                {formData.photoURL && (
                  <img
                    src={formData.photoURL}
                    alt="preview"
                    className="md:col-span-2 h-28 w-28 object-cover rounded-full border"
                  />
                )}

                <button
                  type="submit"
                  className="md:col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  Post Opportunity
                </button>
              </div>
            </form>

            <div className="text-center">
              <Link
                to="/opportunities/dashboard"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded font-semibold hover:bg-indigo-700"
              >
                View Submitted Opportunities →
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
