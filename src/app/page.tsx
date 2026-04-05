"use client";

import { useEffect, useState, useRef } from 'react';

// Interfaces
interface Offer {
  title: string;
  description: string;
  price: string;
  discount: string;
  validity: string;
  image?: string;
}

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <OffersSection />
      <Services />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <span className="logo-text">RANGERS FITNESS</span>
      </div>
      <div className="nav-links">
        <a href="#" className="active">HOME</a>
        <a href="#offers" className="inactive">OFFERS</a>
        <a href="#services" className="inactive">SERVICES</a>
        <a href="#contact" className="inactive">CONTACT</a>
      </div>
      <button className="btn btn-primary header-btn">
        JOIN NOW
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmMEO3R7uW30UbkH3fPf1pZJvZpK8ZKtHru6qbLp91pSb8D5aTRIV1opVSGDDNz4z3YTcTppqFAuOsix9Q5NRhvD2XIbTG3jCbiaXtUjDVMO4Q7bIhA1tON16F3IpFTmEwZbCBRmCwX23YP_jf52v65c4cCyszpBASdrDOoISicG5UMvZrNewivj8TWdYxAJvIQfE097TVv-BsAGPgqg7nOIBxrgZLKPZQ832RrgvkpsbYzfluIJG1V7DOeJQxkHD-4I10P_qb9HJN" 
          alt="Intense high-contrast shot of a dark industrial gym" 
        />
        <div className="hero-gradient"></div>
      </div>
      <div className="hero-content container">
        <p className="hero-subtitle">ELITE PERFORMANCE CENTER</p>
        <h1 className="hero-title">
          RANGERS <br /> <span>FITNESS</span>
        </h1>
        <p className="hero-desc">
          Build Strength. Transform Your Life. Engineered for those who refuse to settle for average.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary">JOIN NOW</button>
          <a href="#offers" className="btn btn-outline" style={{ display: 'inline-block', padding: '1.25rem 3rem', textDecoration: 'none' }}>VIEW OFFERS</a>
        </div>
      </div>
    </section>
  );
}

function OffersSection() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOffers() {
      try {
        const res = await fetch('/api/offers');
        if (!res.ok) throw new Error('Failed to load offers');
        const data = await res.json();
        setOffers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOffers();
  }, []);

  return (
    <section id="offers" className="section section-surface">
      <div className="container section-header">
        <h2 className="section-title">TACTICAL OFFERS</h2>
        <p className="section-subtitle">STRIKE WHILE THE IRON IS HOT</p>
      </div>
      
      <div className="container offers-grid">
        {loading && (
          <div className="loader-container" style={{ gridColumn: '1 / -1' }}>
            <div className="loader"></div>
            <p>Loading dynamic offers from Google Sheets...</p>
          </div>
        )}
        
        {error && !loading && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', border: '1px solid var(--primary-dim)' }}>
            <span className="material-symbols-outlined text-primary-dim" style={{ fontSize: '3rem', marginBottom: '1rem' }}>error</span>
            <h3 style={{ marginBottom: '1rem' }}>ERROR LOADING OFFERS</h3>
            <p style={{ color: 'var(--on-surface-variant)' }}>{error}</p>
          </div>
        )}

        {!loading && !error && offers.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', border: '1px solid var(--outline-variant)' }}>
            <p style={{ color: 'var(--on-surface-variant)' }}>No tactical offers available at the moment. Please check back later.</p>
          </div>
        )}

        {!loading && !error && offers.map((offer, index) => {
          const isPopular = Number(offer.price.replace(/\D/g, '')) > 200; // Just some dummy logic to make expensive plans prominent
          if (isPopular || index === 1) {
             return (
               <div key={index} className="offer-card offer-card-popular" style={{ backgroundImage: offer.image ? `url(${offer.image})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay', backgroundColor: offer.image ? 'rgba(0,0,0,0.8)' : '' }}>
                 <div className="offer-popular-tag">MOST POPULAR</div>
                 <div className="offer-card-inner">
                   <div className="offer-badge-row">
                     <span className="offer-badge white">{offer.validity || 'PREMIUM'}</span>
                     <span className="offer-discount">{offer.discount}</span>
                   </div>
                   <h3 className="offer-title">{offer.title}</h3>
                   <p className="offer-desc">{offer.description}</p>
                   <div className="offer-price">{offer.price}</div>
                   <button className="btn">ENLIST TODAY</button>
                 </div>
               </div>
             );
          }

          return (
            <div key={index} className="offer-card" style={{ backgroundImage: offer.image ? `url(${offer.image})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay', backgroundColor: offer.image ? 'rgba(0,0,0,0.8)' : '' }}>
              <div className="offer-card-inner">
                <div className="offer-badge-row">
                  <span className="offer-badge">{offer.validity || 'LIMITED'}</span>
                  <span className="offer-discount">{offer.discount}</span>
                </div>
                <h3 className="offer-title">{offer.title}</h3>
                <p className="offer-desc">{offer.description}</p>
                <div className="offer-price">{offer.price}</div>
                <button className="btn">CLAIM NOW</button>
              </div>
              <div className="offer-hover-bar"></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section section-surface-low">
      <div className="container services-grid">
        <div className="service-card service-featured">
          <img 
             className="service-bg" 
             src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIjyih6lwuk-16bFBuKxfm9Lk0AkXU80HUMQPm4diLQPL1VuNzcrq8ikKTIKb4r9KF6YWEPTPWY_GL0n4QV9KS7F3bhIZV3R8sRl2j9sdrfdcjW9KwQtwSr1mqtakGrE2eo9iPctjz9KICeEWlg6wn1u0AZswlCO1av1q-gyRqo4v8zEvQQ3mWOhvKponDhy30kAg6CPOSYgEgSgzPwTRUAZX_cVMAKhl7OOtHvuOg0lJxgV6b6uxwYru37ZYxsFFHnLaW8gs91u7I" 
             alt="Heavy deadlift" 
          />
          <div className="service-featured-content">
            <span className="material-symbols-outlined service-featured-icon" style={{ fontVariationSettings: "'FILL' 1" }}>weight</span>
            <h3 className="service-featured-title">Weight Training</h3>
            <p className="service-featured-desc">Master the art of strength with our comprehensive range of free weights and precision machines.</p>
          </div>
        </div>

        <div className="service-card">
          <span className="material-symbols-outlined service-icon">physical_therapy</span>
          <h3 className="service-title">Personal Training</h3>
        </div>

        <div className="service-card invert-hover">
          <span className="material-symbols-outlined service-icon primary">directions_run</span>
          <h3 className="service-title">Cardio Zone</h3>
        </div>

        <div className="service-card invert-hover">
          <span className="material-symbols-outlined service-icon primary">nutrition</span>
          <h3 className="service-title">Diet Guidance</h3>
        </div>

        <div className="service-card">
          <span className="material-symbols-outlined service-icon">groups</span>
          <h3 className="service-title">Group Combat</h3>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const images = Array.from({length: 9}, (_, i) => `/assets/images/gym${i+1}.webp`);
  const row = [...images, ...images, ...images, ...images]; 
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    let animationId: number;
    let isHovered = false;

    const scroll = () => {
      if (!isHovered) {
        el.scrollLeft += 2.0; // faster scrolling
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);

    const handleMouseEnter = () => isHovered = true;
    const handleMouseLeave = () => isHovered = false;

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const slide = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -500 : 500, behavior: 'smooth' });
    }
  };

  return (
    <section className="section section-surface" style={{ overflow: 'hidden' }}>
      <div className="container" style={{ marginBottom: '3rem' }}>
         <h2 className="section-title text-center">FACILITY <span className="text-primary-dim">RECON</span></h2>
      </div>
      
      <div className="container" style={{ position: 'relative' }}>
        <button onClick={() => slide('left')} className="carousel-arrow left">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button onClick={() => slide('right')} className="carousel-arrow right">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>

        <div className="carousel-container-native">
          <div className="carousel-track-native" ref={scrollRef}>
            {row.map((src, idx) => (
              <div key={`img-${idx}`} className="carousel-item">
                <img src={src} alt="Gym Facility" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    {
      name: "Jaya Meghana Pathuri",
      role: "Long-term Member",
      rating: 5,
      review: "I’m really happy with this gym. The environment is very good and well maintained. The trainers are extremely supportive (Dhamu, Nandhini,..etc) and never hesitate to help—no matter which exercise or machine it is. If I’m unable to do an exercise properly, they always guide me with patience and correct form. The workout plans are well structured and effective, and the fees are very reasonable compared to the quality of training provided. Overall, it’s a great place to work out, and I genuinely enjoy coming here"
    },
    {
      name: "Saundarya Kumari",
      role: "Active Member",
      rating: 5,
      review: "This gym has been a great experience for me. The atmosphere is positive and the place is well organized. The trainers(Dhamu, Nandhini..etc) are very friendly and always ready to help, even if it’s not their assigned session or equipment. They make sure exercises are done correctly and suggest alternatives when needed. The training programs are well planned and actually show results. Considering the quality of guidance and facilities, the pricing is very fair. I would definitely recommend this gym to anyone looking for good training and support."
    },
    {
      name: "BalaMurugan V",
      role: "Gym Member",
      rating: 5,
      review: "Anybody who want to join gym in Sholinganallur side Rangers Fitness is one of best choice for choose. I am the rangers fitness gym member for the last two months I am really impressed with the Rangers Fitness gym staffs and equipments. And one main thing the gym is very clean and hygienic which makes workout much more enjoyable."
    },
    {
      name: "Ratan Prabhakar",
      role: "Fitness Enthusiast",
      rating: 4,
      review: "If you’re looking for a well maintained and affordable gym around Sholinganallur locality then you may consider Rangers fitness hub. It’s one of the best gyms in Sholinganallur. The trainers are very professional and trains people with apt training sessions for weight loss, muscle strengthening and conditioning and gym equipments are of high standards and easy to work out with. They have good parking facilities and locker facilities. On top of that they also have nutritionist who also helps clients with proper nutrition plans. All in all a great gym to start your fitness routine."
    },
    {
      name: "Ishwarya S",
      role: "Weight Loss Member",
      rating: 5,
      review: "Being a new mom, I had gained around 10–15 kg of postpartum weight, and I joined Rangers Fitness for weight loss. I opted for personal training with Coach Jeneefa, and in just 2 months, I’ve already lost 8 kg!"
    }
  ];

  const [visibleCount, setVisibleCount] = useState(3);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const dragDelta = useRef<number>(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(window.innerWidth < 768 ? 1 : 3);
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }

    const maxIndex = Math.max(0, reviews.length - visibleCount);
    timerRef.current = window.setInterval(() => {
      setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, 10000);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [visibleCount]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX;
    dragDelta.current = 0;
    wrapperRef.current?.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    dragDelta.current = event.clientX - dragStartX.current;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const threshold = 50;
    const maxIndex = Math.max(0, reviews.length - visibleCount);
    if (dragDelta.current > threshold) {
      setActiveIndex((current) => Math.max(0, current - 1));
    } else if (dragDelta.current < -threshold) {
      setActiveIndex((current) => Math.min(maxIndex, current + 1));
    }
    dragStartX.current = null;
    dragDelta.current = 0;
    wrapperRef.current?.releasePointerCapture(event.pointerId);
  };

  const maxIndex = Math.max(0, reviews.length - visibleCount);
  const safeIndex = Math.min(activeIndex, maxIndex);
  const translatePercent = (safeIndex * 100) / visibleCount;

  return (
    <section className="section section-surface-low">
       <div className="container">
          <div className="testimonials-header">
             <h2 className="testimonials-title">THE RANGER VOICES</h2>
          </div>
          <div
            className="testimonials-wrapper"
            ref={wrapperRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div className="testimonials-grid" style={{ transform: `translateX(-${translatePercent}%)` }}>
              {reviews.map((item) => (
                <div key={item.name} className="testimonial-card">
                  <div className="testimonial-stars">
                    {Array.from({ length: item.rating }, (_, starIndex) => (
                      <span key={starIndex} className="material-symbols-outlined">star</span>
                    ))}
                  </div>
                  <p className="testimonial-quote">&ldquo;{item.review}&rdquo;</p>
                  <div>
                     <span className="author-name">{item.name}</span>
                     <span className="author-role">{item.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
       </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section section-surface-lowest">
      <div className="container contact-grid">
        <div>
          <h2 className="contact-title">GET IN THE <span className="text-primary-dim">RING</span></h2>
          <div className="contact-info-list">
            <div className="contact-item">
              <span className="material-symbols-outlined">location_on</span>
              <div>
                <h4 className="contact-item-title">LOCATION</h4>
                <p className="contact-item-desc">
                  Nehru St, Laxmi Nagar Extension, Sholinganallur,<br/>
                  Lakshmi Nagar, Chennai, Tamil Nadu 600119
                </p>
              </div>
            </div>
            <div className="contact-item">
              <span className="material-symbols-outlined">call</span>
              <div>
                <h4 className="contact-item-title">MOBILE</h4>
                <p className="contact-item-desc">087784 71470</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="material-symbols-outlined">schedule</span>
              <div>
                <h4 className="contact-item-title">HOURS</h4>
                <p className="contact-item-desc">4:30 AM – 9:00 PM</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-item-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm4.25 3.25a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm4.5-.75a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25Z" fill="currentColor"/>
                </svg>
              </span>
              <div>
                <p className="contact-item-desc">
                  <a href="https://instagram.com/rangers_fitness_hub" target="_blank" rel="noopener noreferrer">
                    @rangers_fitness_hub
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-form-box">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label className="form-label">Operator Name</label>
              <input className="form-input" placeholder="ENTER NAME" type="text" />
            </div>
            <div className="form-group">
              <label className="form-label">Comms Address</label>
              <input className="form-input" placeholder="ENTER EMAIL" type="email" />
            </div>
            <div className="form-group">
              <label className="form-label">Mission Intelligence</label>
              <textarea className="form-textarea" placeholder="HOW CAN WE ASSIST YOUR TRAINING?" rows={4}></textarea>
            </div>
            <button className="btn btn-primary contact-btn">SEND TRANSMISSION</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        RANGERS FITNESS
      </div>
      <div className="footer-links">
        <a href="#">PROGRAMS</a>
        <a href="#">COACHES</a>
        <a href="#">MEMBERSHIP</a>
      </div>
      <div className="footer-copy">
        © 2024 RANGERS FITNESS. ENGINEERED FOR PERFORMANCE.
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  // Replace with real gym number
  const phoneNumber = "918778471470";
  return (
    <a href={`https://wa.me/${phoneNumber}`} className="whatsapp-float" target="_blank" rel="noopener noreferrer">
      <svg viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
      </svg>
    </a>
  );
}
