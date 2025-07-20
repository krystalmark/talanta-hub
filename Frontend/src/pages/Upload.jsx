import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTalent } from '../contexts/TalentContext';

export default function Upload() {
  const { user } = useAuth();
  const { addTalent } = useTalent();

  const role = user?.role?.toLowerCase();

  // ⛔ Not logged in
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-100">
        <div className="text-center space-y-4 p-6 rounded-xl bg-white shadow">
          <h2 className="text-xl font-bold text-red-600">Access Denied</h2>
          <p className="text-gray-700">
            Please sign in as a <strong>Youth</strong> to upload your talent.
          </p>
          <Link
            to="/login"
            className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  // ⛔ Logged in but not a youth
  const isNonYouth = role && role !== 'youth';
  if (isNonYouth) {
    return (
      <section className="flex items-center justify-center min-h-[70vh] bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 text-white px-4">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
          <p className="text-sm opacity-90">
            Only <strong>Youths</strong> are allowed to upload talents.
          </p>
          <p className="text-sm mb-4 opacity-80">
            You are currently signed in as a <strong>{role}</strong>. If you are here to share
            an opportunity instead, please go to the Opportunities page.
          </p>
          <Link
            to="/opportunities"
            className="mt-3 inline-block bg-green-600 text-white hover:bg-green-700 px-5 py-2 rounded-md font-semibold transition"
          >
            Post an Opportunity →
          </Link>
        </div>
      </section>
    );
  }

  // ✅ Youth: allowed to submit
  const [photo, setPhoto] = useState(null);
  const [bio, setBio] = useState('');
  const [url, setUrl] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onloadend = () => {
      addTalent({
        name: user?.username || user?.name || 'Unnamed',
        contact,
        photo: reader.result,
        bio,
        url,
      });
      setPhoto(null);
      setBio('');
      setUrl('');
      setContact('');
      alert('Talent submitted! Check the Discover page.');
    };
    if (photo) reader.readAsDataURL(photo);
    else reader.onloadend();
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600">
      <div className="max-w-xl w-full mx-4 px-6 py-8 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl ring-1 ring-white/20">
        <h1 className="text-3xl font-extrabold mb-6 text-center tracking-tight text-indigo-900">
          Share Your Talent
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormGroup label="Your Name">
            <input
              value={user?.username || ''}
              readOnly
              className="w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-slate-700 cursor-not-allowed"
            />
          </FormGroup>

          <FormGroup label="Contact (email / phone / link)">
            <input
              type="text"
              placeholder="+254… or email@example.com"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </FormGroup>

          <FormGroup label="Profile Photo">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </FormGroup>

          <FormGroup label="Short Bio">
            <textarea
              rows="3"
              required
              placeholder="A quick overview of your talent…"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </FormGroup>

          <FormGroup label="Showcase URL">
            <input
              type="url"
              required
              placeholder="https://youtu.be/your-video"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </FormGroup>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold tracking-wide shadow hover:bg-indigo-700 active:bg-indigo-800 transition"
          >
            Submit Talent
          </button>
        </form>
      </div>
    </section>
  );
}

function FormGroup({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      {children}
    </div>
  );
}
