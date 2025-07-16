import { Link } from 'react-router-dom';
import { useOpportunities } from '../../contexts/OpportunitiesContext';

export default function PublicList() {
  const { opportunities } = useOpportunities();

  return (
    <main className="min-h-screen px-6 py-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Available Opportunities</h1>

      <div className="text-center mb-8">
        <Link
          to="/opportunities/manage"
          className="inline-block bg-teal-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-teal-700 transition"
        >
          Manage My Opportunities
        </Link>
      </div>

      {opportunities.length === 0 ? (
        <p className="text-gray-500 text-center">No opportunities posted yet.</p>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((o) => (
            <article key={o.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
              {o.photo && (
                <img src={o.photo} alt="preview" className="h-40 w-full object-cover rounded mb-3" />
              )}
              <h3 className="font-semibold text-lg">{o.title}</h3>
              <p className="text-sm flex-grow mt-1">{o.description}</p>
              <div className="text-xs text-gray-600 mt-3 space-y-1">
                {o.organization && <p><strong>Org:</strong> {o.organization}</p>}
                <p><strong>Contact:</strong> {o.contact}</p>
                <p><strong>Posted by:</strong> {o.postedBy} ({o.role})</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
