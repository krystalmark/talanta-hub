import { useEffect } from 'react';
import { useTalent } from '../contexts/TalentContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Discover() {
  /* ─────────── get talent list ─────────── */
  const { talents = [] } = useTalent() || {};   // <= default to [] in case context undefined

  /* ─────────── AOS once ─────────── */
  useEffect(() => {
    AOS.init({ duration: 900, easing: 'ease-out-cubic' });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-12 px-4">
      <h1
        className="text-4xl font-extrabold text-white text-center mb-12 drop-shadow-lg"
        data-aos="fade-down"
      >
        Discover Talent
      </h1>

      {talents.length === 0 ? (
        <p className="text-gray-200 text-center text-lg" data-aos="zoom-in">
          No talents uploaded yet. Be the first to showcase yours!
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {talents.map((t, idx) => (
            <article
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden flex flex-col border border-white/10"
            >
              {/* Photo */}
              {t.photo ? (
                <img
                  src={t.photo}
                  alt={`${t.name} profile`}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-r from-indigo-400 to-purple-500" />
              )}

              {/* Content */}
              <div className="flex flex-col flex-1 p-4 space-y-2">
                <h3 className="text-lg font-bold text-indigo-900">{t.name}</h3>

                <p className="text-sm text-slate-800 flex-1 whitespace-pre-line">
                  {t.bio}
                </p>

                {t.contact && (
                  <p className="text-xs text-slate-700 break-all">
                    <strong>Contact:</strong> {t.contact}
                  </p>
                )}

                {t.url && (
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-600 text-sm font-semibold hover:underline"
                  >
                    View Showcase
                    {/* arrow icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 5.25a.75.75 0 01.75-.75h6.5a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0V7.81l-6.72 6.72a.75.75 0 11-1.06-1.06l6.72-6.72h-4.44a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M4.25 6a1.75 1.75 0 011.75-1.75h6.5a.75.75 0 010 1.5h-6.5a.25.25 0 00-.25.25v11.5c0 .138.112.25.25.25h11.5a.25.25 0 00.25-.25v-6.5a.75.75 0 011.5 0v6.5A1.75 1.75 0 0117.75 20h-11.5A1.75 1.75 0 014.5 18.25V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
