// src/pages/Opportunities/ViewAll.jsx
import { useOpportunities } from '../../contexts/OpportunitiesContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ViewAll() {
  const { opportunities } = useOpportunities();
  const { role } = useAuth();

  return (
    <main className="max-w-5xl mx-auto p-6">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">All Opportunities</h1>

        {/* Show “Post” button only to Mentor/Sponsor/Org */}
        {['mentor', 'sponsor', 'organization'].includes(role) && (
          <Link
            to="/opportunities/post"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Post Opportunity
          </Link>
        )}
      </header>

      {opportunities.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          🚧 No opportunities have been posted yet. <br />
          {['mentor', 'sponsor', 'organization'].includes(role) && (
            <>
              Be the first to{' '}
              <Link className="text-green-700 underline" to="/opportunities/post">
                create one
              </Link>
              !
            </>
          )}
        </p>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((o) => (
            <article key={o.id} className="bg-white p-4 rounded shadow">
              {o.photo && (
                <img
                  src={o.photo}
                  alt={o.title}
                  className="h-40 w-full object-cover rounded mb-3"
                />
              )}
              <h2 className="font-bold text-xl mb-1">{o.title}</h2>
              <p className="text-sm mb-2">{o.description}</p>
              {o.organization && (
                <p className="text-xs text-gray-600">
                  <strong>Organization:</strong> {o.organization}
                </p>
              )}
              <p className="text-xs text-gray-600">
                <strong>Contact:</strong> {o.contact}
              </p>
              <p className="text-xs text-gray-600">
                <strong>Posted by:</strong> {o.postedBy} ({o.role})
              </p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
