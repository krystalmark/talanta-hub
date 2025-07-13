// Discover.jsx
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useTalent } from '../contexts/TalentContext';

export default function Discover() {
  const { user } = useAuth();
  const { talents } = useTalent();

  if (!user) return <Navigate to="/login" />;

  const isFeatured = (talent) => talent.featured === true;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-pink-400 py-12 px-6">
      <h2 className="text-4xl font-extrabold text-white text-center mb-10">🌟 Discover Talents</h2>

      {talents.length === 0 ? (
        <p className="text-white text-xl text-center">No talents uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {talents.map((talent, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 relative ${isFeatured(talent) ? 'border-4 border-yellow-400' : ''}`}
            >
              <img
                src={talent.img || 'https://source.unsplash.com/400x200/?talent'}
                alt={talent.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-purple-700 mb-1">{talent.name}</h3>
              <p className="text-sm text-pink-600 mb-2 font-semibold">{talent.category}</p>
              <p className="text-gray-800 text-sm mb-4">{talent.bio}</p>
              {talent.email && (
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Email:</strong> <a href={`mailto:${talent.email}`} className="text-purple-600 underline">{talent.email}</a>
                </p>
              )}

              {/* Only mentors/sponsors/orgs can contact */}
              {(user.role === 'Mentor' || user.role === 'Sponsor' || user.role === 'Organization') && talent.email && user.email !== talent.email && (
                <a
                  href={`mailto:${talent.email}`}
                  className="block mt-4 text-center bg-purple-600 hover:bg-purple-800 text-white py-2 rounded-full font-semibold shadow"
                >
                  ✉️ Contact Talent
                </a>
              )}

              {/* Featured label */}
              {isFeatured(talent) && (
                <div className="absolute top-3 left-3 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                  🌟 Featured
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}