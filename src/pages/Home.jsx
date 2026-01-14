import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero">
        <h1>
          Welcome to <span>CampusVerse</span>
        </h1>
        <p>
          A digital ecosystem for students, parents, alumni, and educators —
          explore, connect, and grow together.
        </p>

        <div className="hero-actions">
          <Link to="/360" className="primary-btn">
            🌐 Explore Campus
          </Link>
          <Link to="/campusbot" className="secondary-btn">
            🤖 CampusBot
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <FeatureCard
          title="360° Campus View"
          icon="🌐"
          desc="Experience iconic campus locations through immersive panoramic views."
          link="/360"
        />

        <FeatureCard
          title="NoteX"
          icon="📢"
          desc="Stay updated with real-time notices, exams, and important announcements."
          link="/notex"
        />

        <FeatureCard
          title="RiseWall"
          icon="🏆"
          desc="Celebrate student achievements in academics, sports, and culture."
          link="/risewall"
        />

        <FeatureCard
          title="TalkNest"
          icon="🕊"
          desc="A safe, anonymous space for guidance, discussions, and mentorship."
          link="/talknest"
        />

        <FeatureCard
          title="Alumni Scroll"
          icon="🎓"
          desc="Explore alumni journeys and the strong legacy of our institution."
          link="/alumni"
        />

        <FeatureCard
          title="Reviews & Feedback"
          icon="⭐"
          desc="Transparent feedback from students, parents, and teachers."
          link="/reviews"
        />
      </section>

      {/* CTA SECTION */}
      <section className="cta">
        <h2>Be a part of the CampusVerse</h2>
        <p>
          Discover opportunities, share achievements, and build meaningful
          connections within the campus community.
        </p>

        <Link to="/risewall" className="primary-btn">
          🚀 Get Started
        </Link>
      </section>
    </div>
  );
}

/* FEATURE CARD COMPONENT */
function FeatureCard({ title, icon, desc, link }) {
  return (
    <Link to={link} className="feature-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <span className="explore">Explore →</span>
    </Link>
  );
}
