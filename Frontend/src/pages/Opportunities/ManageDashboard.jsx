import { useEffect } from 'react';
import { useOpportunities } from '../../contexts/OpportunitiesContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ManageDashboard() {
  const { opportunities } = useOpportunities();

  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  return (
    <main className="min-h-screen px-4 py-10 bg-gradient-to-b from-green-600 to-emerald-700 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center" data-aos="fade-down">
          All Submitted Opportunities
        </h1>

        {opportunities.length === 0 ? (
          <p className="text-center text-lg bg-yellow-100 text-yellow-800 p-4 rounded shadow" data-aos="fade-right">
            No opportunities have been posted yet.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="bg-white text-gray-800 rounded-lg shadow-md overflow-hidden"
                data-aos="zoom-in-up"
              >
                {opp.photo && (
                  <img
                    src={opp.photo}
                    alt="logo"
                    className="h-36 w-full object-cover"
                  />
                )}
                <div className="p-4 space-y-1">
                  <h3 className="text-lg font-bold text-emerald-800">{opp.title}</h3>
                  <p className="text-sm">{opp.description}</p>
                  <div className="text-xs text-gray-600 mt-2">
                    {opp.organization && (
                      <p><strong>Org:</strong> {opp.organization}</p>
                    )}
                    {opp.contact && (
                      <p><strong>Contact:</strong> {opp.contact}</p>
                    )}
                    <p><strong>Posted By:</strong> {opp.postedBy || 'Unknown'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
