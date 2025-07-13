// Opportunities.jsx
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Opportunities() {
  const { users, user, setUsers } = useAuth();

  if (!user) return <Navigate to="/login" />;

  const handleDelete = (emailToDelete) => {
    const updatedUsers = users.map(u => {
      if (u.email === emailToDelete) {
        return { ...u, opportunity: '' };
      }
      return u;
    });
    setUsers(updatedUsers);
  };

  const opportunities = users.filter(
    (u) => u.opportunity && (u.role === 'Mentor' || u.role === 'Sponsor' || u.role === 'Organization')
  );

  const youths = users.filter((u) => u.role === 'Youth');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 to-pink-500 py-12 px-6">
      <h2 className="text-4xl font-extrabold text-center text-white mb-10">🎯 Available Opportunities</h2>

      {opportunities.length === 0 ? (
        <p className="text-white text-center text-xl">No opportunities available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((oppUser, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 relative"
            >
              <img
                src={`https://source.unsplash.com/400x200/?${oppUser.role},youth`}
                alt={`${oppUser.role}`}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              <h3 className="text-2xl font-bold text-indigo-700 mb-1">{oppUser.name}</h3>
              <p className="text-sm text-pink-600 font-semibold mb-2">
                {oppUser.role} Opportunity
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium">
                  {oppUser.role}
                </span>
                <span className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full font-medium">
                  Youth Empowerment
                </span>
              </div>

              <p className="text-gray-800 mb-4 text-sm">{oppUser.opportunity}</p>

              <p className="text-sm text-gray-600 mb-2">
                <strong>Email:</strong> <a href={`mailto:${oppUser.email}`} className="text-indigo-600 underline">{oppUser.email}</a>
              </p>

              {user && user.role === 'Youth' && (
                <a
                  href={`mailto:${oppUser.email}`}
                  className="block w-full text-center bg-indigo-600 hover:bg-indigo-800 text-white py-2 rounded-full font-semibold shadow mb-3"
                >
                  📩 Contact {oppUser.role}
                </a>
              )}

              {user && (user.role === 'Mentor' || user.role === 'Sponsor' || user.role === 'Organization') && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reach Out to Youths:</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white"
                    onChange={(e) => {
                      const email = e.target.value;
                      if (email) window.location.href = `mailto:${email}`;
                    }}
                  >
                    <option value="">Select a Youth to Contact</option>
                    {youths.map((youth, idx) => (
                      <option key={idx} value={youth.email}>
                        {youth.name} ({youth.email})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {user && user.email === oppUser.email && (
                <button
                  onClick={() => handleDelete(oppUser.email)}
                  className="absolute top-3 right-3 bg-red-500 hover:bg-red-700 text-white px-3 py-1 text-sm rounded-full shadow"
                >
                  🗑️ Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}