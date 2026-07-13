import { useEffect, useRef, useState } from "react";
import settings from "./content/settings.json";
import galleryData from "./content/gallery.json";

type GalleryImage = { image: string; alt?: string };
const gallery = galleryData as { images: GalleryImage[] };

const PHONE = settings.phone;
const WHATSAPP_NUMBER = settings.whatsapp;
const WA_MSG = encodeURIComponent("שלום! אשמח לשמוע פרטים על הסדנאות 🐾");

const PhoneIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.58 1.18 2 2 0 012.57 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.5a16 16 0 006.59 6.59l.87-.87a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const WAIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const WaButton = ({ large = false }: { large?: boolean }) => (
  <a
    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MSG}`}
    target="_blank"
    rel="noopener noreferrer"
    className={large ? "btn-wa-large" : "btn-wa-small"}
  >
    <WAIcon size={large ? 22 : 18} />
    <span>שלחו הודעה בוואטסאפ</span>
  </a>
);

export default function App() {
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  const [openCard, setOpenCard] = useState<number | null>(null);
  const toggleCard = (i: number) => setOpenCard(prev => prev === i ? null : i);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;600;700;900&family=Frank+Ruhl+Libre:wght@400;700;900&display=swap');

        :root {
          --cream:       #ede7db;
          --light-cream: #f5f0e8;
          --dark-red:    #7a2020;
          --terracotta:  #c45a2a;
          --dark-brown:  #3a1f0d;
          --text-dark:   #2a1a0e;
          --white:       #ffffff;
        }

        * { margin:0; padding:0; box-sizing:border-box; }
        .visually-hidden {
          position:absolute; width:1px; height:1px;
          padding:0; margin:-1px; overflow:hidden;
          clip:rect(0,0,0,0); white-space:nowrap; border:0;
        }
        html { scroll-behavior:smooth; }
        body {
          font-family:'Heebo',sans-serif;
          background:var(--light-cream);
          color:var(--text-dark);
          overflow-x:hidden;
          direction:rtl;
        }

        .hero {
          background:var(--dark-brown);
          position:relative;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:flex-start;
          text-align:center;
          padding:72px 20px 0;
          overflow:hidden;
        }
        .hero::before {
          content:'';
          position:absolute;
          inset:0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 50%, rgba(122,32,32,0.45) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 80% 50%, rgba(196,90,42,0.25) 0%, transparent 70%);
          z-index:0;
        }
        .hero-content { position:relative; z-index:1; max-width:820px; width:100%; }

        .badge {
          display:inline-block;
          font-size:0.75rem;
          font-weight:600;
          letter-spacing:0.18em;
          text-transform:uppercase;
          color:rgba(255,255,255,0.55);
          border:1px solid rgba(255,255,255,0.18);
          padding:6px 18px;
          border-radius:999px;
          margin-bottom:18px;
          animation:fadeUp 0.8s ease both;
        }

        .hero-logo-wrap {
          margin-bottom:12px;
          animation:fadeUp 0.8s 0.1s ease both;
        }
        .hero-logo-img {
          height:280px;
          width:auto;
          border-radius:20px;
          -webkit-mask-image:radial-gradient(ellipse 88% 88% at 50% 50%, black 60%, transparent 100%);
          mask-image:radial-gradient(ellipse 88% 88% at 50% 50%, black 60%, transparent 100%);
          display:block;
          margin:0 auto;
        }

        .hero-tagline {
          font-size:clamp(1.15rem,3vw,1.7rem);
          font-weight:400;
          color:rgba(255,255,255,0.85);
          margin-bottom:7px;
          animation:fadeUp 0.8s 0.2s ease both;
        }
        .hero-sub {
          font-size:1rem;
          color:rgba(255,255,255,0.48);
          margin-bottom:24px;
          animation:fadeUp 0.8s 0.3s ease both;
        }
        .hero-ctas {
          display:flex;
          gap:12px;
          justify-content:center;
          flex-wrap:wrap;
          animation:fadeUp 0.8s 0.4s ease both;
        }

        .btn-call {
          display:inline-flex;
          align-items:center;
          gap:9px;
          padding:14px 28px;
          border-radius:14px;
          font-family:'Heebo',sans-serif;
          font-size:1rem;
          font-weight:700;
          text-decoration:none;
          background:linear-gradient(135deg,var(--dark-red),var(--terracotta));
          color:#fff;
          box-shadow:0 4px 22px rgba(122,32,32,0.4);
          transition:all 0.25s;
          white-space:nowrap;
        }
        .btn-call:hover { transform:translateY(-3px); box-shadow:0 8px 30px rgba(122,32,32,0.55); }

        .btn-wa-large {
          display:inline-flex;
          align-items:center;
          gap:10px;
          padding:14px 28px;
          border-radius:14px;
          font-family:'Heebo',sans-serif;
          font-size:1rem;
          font-weight:700;
          text-decoration:none;
          color:#fff;
          background:linear-gradient(135deg,#1ebe5d,#128c3e);
          box-shadow:0 4px 20px rgba(18,140,62,0.45), inset 0 1px 0 rgba(255,255,255,0.15);
          transition:all 0.25s;
          white-space:nowrap;
          position:relative;
          overflow:hidden;
        }
        .btn-wa-large::before {
          content:'';
          position:absolute;
          top:-50%; left:-60%;
          width:40%; height:200%;
          background:rgba(255,255,255,0.12);
          transform:skewX(-20deg);
          transition:left 0.5s ease;
        }
        .btn-wa-large:hover { transform:translateY(-3px); box-shadow:0 8px 28px rgba(18,140,62,0.6); }
        .btn-wa-large:hover::before { left:130%; }

        .btn-wa-small {
          display:inline-flex;
          align-items:center;
          gap:9px;
          padding:12px 24px;
          border-radius:12px;
          font-family:'Heebo',sans-serif;
          font-size:0.95rem;
          font-weight:700;
          text-decoration:none;
          color:#fff;
          background:linear-gradient(135deg,#1ebe5d,#128c3e);
          box-shadow:0 3px 16px rgba(18,140,62,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
          transition:all 0.25s;
          white-space:nowrap;
          position:relative;
          overflow:hidden;
        }
        .btn-wa-small::before {
          content:'';
          position:absolute;
          top:-50%; left:-60%;
          width:40%; height:200%;
          background:rgba(255,255,255,0.12);
          transform:skewX(-20deg);
          transition:left 0.5s ease;
        }
        .btn-wa-small:hover { transform:translateY(-2px); box-shadow:0 6px 22px rgba(18,140,62,0.55); }
        .btn-wa-small:hover::before { left:130%; }

        .scroll-hint {
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:4px;
          color:rgba(255,255,255,0.25);
          font-size:0.68rem;
          letter-spacing:0.12em;
          animation:bounce-y 2s ease infinite;
          margin-top:18px;
          padding-bottom:28px;
          cursor:pointer;
        }
        @keyframes bounce-y {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(7px); }
        }

        .about-section { padding:90px 24px; max-width:1100px; margin:0 auto; }
        .about-grid { display:grid; grid-template-columns:1.1fr 1fr; gap:48px; align-items:center; }
        .about-text-side { padding-left:20px; }

        .section-label {
          font-size:0.75rem;
          font-weight:800;
          letter-spacing:0.25em;
          text-transform:uppercase;
          color:var(--terracotta);
          margin-bottom:14px;
        }
        .section-title {
          font-family:'Frank Ruhl Libre',serif;
          font-size:clamp(2.2rem,5vw,3.4rem);
          font-weight:900;
          line-height:1.15;
          color:var(--dark-brown);
          margin-bottom:20px;
        }
        .section-body { font-size:1.05rem; line-height:1.85; color:#4a3020; }

        .passion-block {
          margin-top:22px;
          padding:18px 20px;
          background:linear-gradient(135deg,rgba(122,32,32,0.07),rgba(196,90,42,0.07));
          border-right:3px solid var(--terracotta);
          border-radius:12px;
        }
        .passion-block p { font-size:0.98rem; line-height:1.8; color:#5a3520; font-style:italic; }

        .about-features { display:flex; flex-direction:column; gap:14px; }
        .about-feat-card {
          background:#fff;
          border-radius:18px;
          padding:20px;
          display:flex;
          align-items:flex-start;
          gap:14px;
          box-shadow:0 4px 16px rgba(0,0,0,0.04);
          border:1px solid rgba(92,51,23,0.07);
          cursor:pointer;
          transition:all 0.3s cubic-bezier(0.4,0,0.2,1);
          user-select:none;
        }
        .about-feat-card:hover,
        .about-feat-card.open {
          transform:translateY(-2px);
          box-shadow:0 10px 26px rgba(122,32,32,0.09);
          border-color:rgba(196,90,42,0.2);
        }
        .about-feat-icon {
          font-size:1.5rem;
          background:var(--light-cream);
          padding:10px;
          border-radius:12px;
          line-height:1;
          flex-shrink:0;
          transition:background 0.3s;
        }
        .about-feat-card:hover .about-feat-icon,
        .about-feat-card.open .about-feat-icon { background:#fdeee6; }
        .about-feat-title {
          font-size:1.05rem;
          font-weight:700;
          color:var(--dark-brown);
          display:flex;
          align-items:center;
          gap:6px;
        }
        .about-feat-arrow {
          font-size:0.85rem;
          color:var(--terracotta);
          opacity:0.6;
          transition:transform 0.3s;
          margin-right:auto;
          display:inline-block;
        }
        .about-feat-card.open .about-feat-arrow { transform:rotate(-180deg); }
        .about-feat-desc {
          max-height:0;
          opacity:0;
          overflow:hidden;
          font-size:0.92rem;
          color:#6a5040;
          line-height:1.65;
          margin-top:0;
          transition:max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease, margin-top 0.3s;
        }
        .about-feat-card.open .about-feat-desc { max-height:120px; opacity:1; margin-top:8px; }

        .divider {
          height:2px;
          background:linear-gradient(90deg,transparent,var(--dark-red),var(--terracotta),transparent);
          max-width:1000px;
          margin:0 auto;
        }

        .audience-section { background:var(--dark-brown); padding:90px 24px; }
        .audience-inner { max-width:1000px; margin:0 auto; }
        .audience-section .section-label { color:#e8a070; }
        .audience-section .section-title { color:var(--white); }
        .cards {
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
          gap:16px;
          margin-top:44px;
        }
        .card {
          background:rgba(255,255,255,0.06);
          border:1px solid rgba(255,255,255,0.1);
          border-radius:20px;
          padding:30px 22px;
          text-align:center;
          transition:background 0.3s, border-color 0.3s;
        }
        .card:hover { background:rgba(255,255,255,0.1); border-color:rgba(196,90,42,0.4); }
        .card-icon { font-size:2.5rem; margin-bottom:12px; }
        .card-title { font-weight:700; font-size:1.05rem; color:#fff; margin-bottom:8px; }
        .card-desc { font-size:0.88rem; color:rgba(255,255,255,0.5); line-height:1.6; }

        .animals-section { padding:90px 24px; }
        .animals-inner { max-width:720px; margin:0 auto; }
        .animals-grid {
          display:grid;
          grid-template-columns:repeat(2,1fr);
          gap:16px;
          margin-top:44px;
        }
        .animal-card {
          background:var(--dark-brown);
          border-radius:24px;
          padding:36px 16px;
          text-align:center;
          color:#fff;
          position:relative;
          overflow:hidden;
          transition:transform 0.3s, box-shadow 0.3s;
        }
        .animal-card:hover { transform:translateY(-4px); box-shadow:0 12px 32px rgba(58,31,13,0.4); }
        .animal-card::after {
          content:'';
          position:absolute;
          inset:0;
          background:linear-gradient(135deg,rgba(122,32,32,0.3),rgba(196,90,42,0.25));
          opacity:0;
          transition:opacity 0.3s;
        }
        .animal-card:hover::after { opacity:1; }
        .animal-card .big-emoji { font-size:3.5rem; display:block; margin-bottom:12px; position:relative; z-index:1; }
        .animal-card .animal-name { font-weight:700; font-size:1.12rem; position:relative; z-index:1; }
        .animal-card .animal-note { font-size:0.82rem; color:rgba(255,255,255,0.5); margin-top:5px; position:relative; z-index:1; }
        .animal-card.more-animals { background:linear-gradient(135deg,var(--dark-red),var(--terracotta)); }
        .animal-card.more-animals .animal-note { color:rgba(255,255,255,0.9); font-weight:600; }

        .photos-section { background:#ede4d6; padding:70px 24px; }
        .photos-inner { max-width:1000px; margin:0 auto; }
        .photo-grid {
          display:grid;
          grid-template-columns:2fr 1fr 1fr;
          grid-template-rows:220px 220px;
          gap:14px;
          margin-top:36px;
        }
        .photo-slot {
          background:linear-gradient(135deg,#d5c9b8,#c8bba8);
          border-radius:16px;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:0.8rem;
          color:rgba(0,0,0,0.3);
          letter-spacing:0.08em;
          text-transform:uppercase;
          font-weight:600;
        }
        .photo-slot:first-child { grid-row:1/3; }

        .cta-strip {
          background:var(--dark-brown);
          position:relative;
          overflow:hidden;
          padding:90px 24px;
          text-align:center;
        }
        .cta-strip::before {
          content:'';
          position:absolute;
          inset:0;
          background:radial-gradient(ellipse 70% 80% at 50% 50%, rgba(196,90,42,0.2) 0%, transparent 70%);
        }
        .cta-strip-inner { position:relative; z-index:1; }
        .cta-strip .section-label { color:#e8a070; }
        .cta-title {
          font-family:'Frank Ruhl Libre',serif;
          font-size:clamp(2rem,5vw,3.5rem);
          font-weight:900;
          color:#fff;
          margin-bottom:14px;
          line-height:1.2;
        }
        .cta-sub { font-size:1rem; color:rgba(255,255,255,0.5); margin-bottom:40px; }
        .cta-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }

        footer {
          background:#1e0f06;
          padding:44px 24px;
          text-align:center;
          border-top:1px solid rgba(255,255,255,0.06);
        }
        .footer-logo-wrap { margin-bottom:16px; }
        .footer-logo-img {
          height:72px;
          width:auto;
          display:block;
          margin:0 auto;
          border-radius:12px;
          -webkit-mask-image:radial-gradient(ellipse 88% 88% at 50% 50%, black 60%, transparent 100%);
          mask-image:radial-gradient(ellipse 88% 88% at 50% 50%, black 60%, transparent 100%);
        }
        .footer-text { font-size:0.85rem; color:rgba(255,255,255,0.3); }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .reveal { opacity:0; transform:translateY(28px); transition:opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity:1; transform:none; }

        @media (max-width:768px) {
          .about-grid { grid-template-columns:1fr; gap:28px; }
          .about-text-side { padding-left:0; }
        }
        @media (max-width:600px) {
          .photo-grid { grid-template-columns:1fr 1fr; grid-template-rows:auto; }
          .photo-slot:first-child { grid-row:auto; }
          .animals-inner { max-width:100%; }
          .hero-logo-img { height:200px; }
        }
      `}</style>

      <section className="hero">
        <div className="hero-content">
          <h1 className="visually-hidden">ארה - סדנאות חיות עם אילה, בית שמש והאזור</h1>
          <div className="badge">{settings.badgeText}</div>
          <div className="hero-logo-wrap">
            <img src="/logo.jpeg" alt="ארה - סדנאות חוגים הפעלות" className="hero-logo-img" />
          </div>
          <p className="hero-tagline">{settings.heroTagline}</p>
          <p className="hero-sub">{settings.heroSub}</p>
          <div className="hero-ctas">
            <a href={`tel:${PHONE}`} className="btn-call">
              <PhoneIcon />
              חייגו לפרטים והזמנות
            </a>
            <WaButton large />
          </div>
          <div className="scroll-hint" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span>גלילה</span>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>
      </section>

      <section className="about-section reveal" ref={addReveal as any}>
        <div className="about-grid">
          <div className="about-text-side">
            <div className="section-label">נעים להכיר</div>
            <h2 className="section-title">הסיפור מאחורי ארה</h2>
            <p className="section-body">
              {settings.aboutText.split("\n\n").map((para, i) => (
                <span key={i}>{para}{i < settings.aboutText.split("\n\n").length - 1 ? <><br/><br/></> : null}</span>
              ))}
            </p>
            <div className="passion-block">
              <p>{settings.passionText}</p>
            </div>
          </div>
          <div className="about-features">
            {[
              { icon:"❤️", title:"אהבה בגובה העיניים", desc:"כל מפגש מועבר בגובה העיניים, עם המון קשב, רוגע והתאמה מלאה לקצב של הילדים." },
              { icon:"🛡️", title:"בטיחות ורווחת החיות", desc:"הבטיחות שלכם והשמירה על נוחות החיות הן מעל הכל. המפגש מתבצע בפיקוח מלא ובתנאים סטריליים ובטוחים." },
              { icon:"🎓", title:"תוכן חוויתי ומעשיר", desc:"אנחנו לא רק מסתכלים – אנחנו לומדים עובדות מרתקות, מגלים סודות מעולם הטבע ונהנים מחוויית מגע אמיתית." },
            ].map((item, i) => (
              <div
                key={i}
                className={`about-feat-card${openCard === i ? " open" : ""}`}
                onClick={() => toggleCard(i)}
              >
                <div className="about-feat-icon">{item.icon}</div>
                <div style={{flex:1}}>
                  <h3 className="about-feat-title">
                    {item.title}
                    <span className="about-feat-arrow">↓</span>
                  </h3>
                  <p className="about-feat-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="audience-section">
        <div className="audience-inner reveal" ref={addReveal as any}>
          <div className="section-label">למי זה מתאים</div>
          <h2 className="section-title">מגיעים לכולם</h2>
          <div className="cards">
            <div className="card">
              <div className="card-icon">🌳</div>
              <div className="card-title">גנים וגני ילדים</div>
              <div className="card-desc">פעילות העשרה מרתקת שהילדים יזכרו לנצח</div>
            </div>
            <div className="card">
              <div className="card-icon">🏫</div>
              <div className="card-title">מוסדות וביה"ס</div>
              <div className="card-desc">סדנאות חינוכיות המותאמות לכל גיל ותכנית לימודים</div>
            </div>
            <div className="card">
              <div className="card-icon">👨‍👩‍👧</div>
              <div className="card-title">משפחות</div>
              <div className="card-desc">אירוע ביתי, יום הולדת, חגיגה — עם טוויסט של חיות</div>
            </div>
            <div className="card">
              <div className="card-icon">🎉</div>
              <div className="card-title">אירועים מיוחדים</div>
              <div className="card-desc">פעילות ששוברת את כל האירועים הרגילים ומדליקה את המצב</div>
            </div>
          </div>
        </div>
      </section>

      <section className="animals-section">
        <div className="animals-inner reveal" ref={addReveal as any}>
          <div className="section-label">החיות איתנו</div>
          <h2 className="section-title">הכירו את החברים שלי 🐾</h2>
          <div className="animals-grid">
            {settings.animals.map((a, i) => (
              <div className="animal-card" key={i}>
                <span className="big-emoji">{a.emoji}</span>
                <div className="animal-name">{a.name}</div>
                <div className="animal-note">{a.note}</div>
              </div>
            ))}
            <div className="animal-card more-animals">
              <span className="big-emoji">✨</span>
              <div className="animal-name">ועוד מגוון חיות!</div>
              <div className="animal-note">בסדנאות שלנו מחכים לכם עוד חברים ומפתעים מגוונים...</div>
            </div>
          </div>
        </div>
      </section>

      <section className="photos-section">
        <div className="photos-inner reveal" ref={addReveal as any}>
          <div className="section-label">גלריה</div>
          <h2 className="section-title" style={{color:"var(--dark-brown)"}}>רגעים מהסדנאות</h2>
          <div className="photo-grid">
            {Array.from({ length: 5 }).map((_, i) => {
              const photo = gallery.images[i];
              return (
                <div className="photo-slot" key={i}>
                  {photo ? (
                    <img src={photo.image} alt={photo.alt || ""} style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"16px"}} />
                  ) : (
                    i === 0 ? "📸 תמונה ראשית" : "📸"
                  )}
                </div>
              );
            })}
          </div>
          {gallery.images.length === 0 && (
            <p style={{marginTop:"14px",fontSize:"0.8rem",color:"#999",textAlign:"center"}}>* כאן ישולבו התמונות שלך</p>
          )}
        </div>
      </section>

      <section className="cta-strip">
        <div className="cta-strip-inner reveal" ref={addReveal as any}>
          <div className="section-label">בואו נדבר</div>
          <h2 className="cta-title">מוכנים לחוויה?</h2>
          <p className="cta-sub">צרו איתי קשר — ונשמח לתאם לכם אירוע בלתי נשכח</p>
          <div className="cta-btns">
            <a href={`tel:${PHONE}`} className="btn-call">
              <PhoneIcon size={18} />
              חייגו עכשיו
            </a>
            <WaButton large />
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-logo-wrap">
          <img src="/logo.jpeg" alt="ארה" className="footer-logo-img" />
        </div>
        <p className="footer-text">© 2026 ארה - סדנאות חיות עם אילה. כל הזכויות שמורות.</p>
      </footer>
    </>
  );
}
