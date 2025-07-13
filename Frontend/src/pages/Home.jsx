import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const backgroundImages = [
  "/images/a935aeba-56f3-4c9b-bbd1-978e446cba10.jpg",
  "/images/Beautiful Africa.jpg",
  "/images/Emotional Black Boy Art - Violin Tears Digital Print, Soulful African Children Wall Decor.jpg",
   "/images/Unleashing Determination! 🏀💪.jpg",
   "/images/Vibrant, expressive portrait of joyful, mischievous siblings_.jpg",
];


export default function Home() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const team = [
    {
      name: "Reagan Weru",
      role: "Group Leader",
      contact: "werureagan2@gmail.com",
      img: "public/images/WhatsApp Image 2025-06-19 at 11.20.29_4cdaf905.jpg",
      
    },
    {
      name: "Evans Muriithi",
      role: " Front-end Developer",
      contact: "kalawa.evans19@gmail.com",
      img: "public/images/WhatsApp Image 2025-06-19 at 11.23.39_bfd916ef.jpg",
      
    },
    {
      name: "Anne Naeku",
      role: "UI/UX designer",
      contact: "nae67ku@gmail.com",
      img: "public/images/WhatsApp Image 2025-06-19 at 11.03.57_1f1d1ed5.jpg",
    
    },
    {
      name: "Purity Muthoni",
      role: "Communication Personnel",
      contact: "puritymuthoni831@gmail.com",
      img: "public/images/WhatsApp Image 2025-06-19 at 12.23.46_ed7f4797.jpg"
    },
    {
      name: "Mike Nyanyuki",
      role: "Front-end developer",
      contact: "mikenyanyuki@gmail.com",
      img: "public/images/WhatsApp Image 2025-06-19 at 11.13.15_7652f0b8.jpg"
    },
    {
      name: "Krystal Mark",
      role: "Back-end developer",
      contact: "krystal.markk@gmail.com",
      img: "public/images/WhatsApp Image 2025-06-19 at 11.22.24_c8f26315.jpg",
      

    },
{
      name: "Josh Ndirangu",
      role: "Data Scientist",
      contact: "ndirangujoshua89@gmail.com",
      img: "public/images/WhatsApp Image 2025-06-19 at 11.18.31_0f46441f.jpg",
      

    },
  ];

  return (
    <div className="relative text-gray-800 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-screen z-0 transition-opacity duration-1000">
        <img
          src={backgroundImages[bgIndex]}
          alt="slideshow"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40" />
      </div>

      <section className="relative min-h-screen z-10 flex flex-col justify-center items-center text-center px-4 py-12 text-white" data-aos="fade-up">
        <h1 className="text-5xl font-extrabold mb-6">TalantaHub Kenya</h1>
        <p className="text-xl max-w-3xl mb-4">
          TalantaHub Kenya is a digital platform designed to empower Kenyan youth by showcasing their diverse talents and connecting them with real opportunities.
        </p>
        <p className="text-lg max-w-2xl">
          Young people can create rich talent profiles, upload their work, and gain visibility among scouts, mentors, and organizations. <strong>Our mission is simple: Discover. Develop. Shine.</strong>
        </p>
      </section>

      <section className="bg-gradient-to-b from-green-100 to-green-300 flex flex-col justify-center items-center px-4 py-12" data-aos="fade-right">
        <h2 className="text-4xl font-bold text-green-800 mb-4">Our Solution</h2>
        <ul className="list-disc text-left max-w-xl space-y-2 text-lg">
          <li>A platform designed to elevate youth potential.</li>
          <li>Showcase talents across various disciplines.</li>
          <li>Connect youth with mentors, scouts, and sponsors.</li>
          <li>Publish real opportunities (gigs, grants, jobs).</li>
          <li>Recognize and reward local talent.</li>
        </ul>
      </section>

      <section className="bg-gradient-to-b from-purple-100 to-purple-300 px-6 py-16" data-aos="fade-up">
        <h3 className="text-3xl font-bold text-center mb-10 text-purple-800">Our Team</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white shadow-xl rounded-lg p-6 text-center hover:shadow-2xl transition-transform transform hover:-translate-y-2">
              <img src={member.img} alt={member.name} className="w-full h-40 object-contain rounded-md mb-3" />
              <h4 className="text-xl font-semibold text-purple-900">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.role}</p>
              <p className="mt-2 text-blue-600 text-sm">{member.contact}</p>
              <div className="flex justify-center gap-4 mt-4 text-xl text-purple-800">
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hover:text-blue-600">
                    <FaLinkedin />
                  </a>
                )}
                {member.twitter && (
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer" title="Twitter" className="hover:text-sky-400">
                    <FaTwitter />
                  </a>
                )}
                {member.github && (
                  <a href={member.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="hover:text-gray-700">
                    <FaGithub />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-600 mt-10">© {new Date().getFullYear()} TalantaHub Kenya. All rights reserved.</p>
      </section>
    </div>
  );
}
