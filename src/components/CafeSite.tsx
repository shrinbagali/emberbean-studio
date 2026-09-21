import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bean,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Coffee,
  Instagram,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  Sparkles,
  SunMedium,
  Users,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import heroImage from "@/assets/ember-hero.jpg";
import interiorImage from "@/assets/ember-interior.jpg";
import menuImage from "@/assets/ember-menu.jpg";
import eveningImage from "@/assets/ember-evening.jpg";
import beansImage from "@/assets/ember-beans.jpg";
import pastriesImage from "@/assets/ember-pastries.jpg";

type Modal = "menu" | "gallery" | "reserve" | null;
type MenuCategory = "Coffee" | "Non-Coffee" | "All-Day Bites" | "Pasta & Mains" | "Desserts";

const navItems = [
  ["home", "Home"],
  ["menu", "Menu"],
  ["gallery", "Gallery"],
  ["about", "About"],
  ["visit", "Visit Us"],
] as const;

const signatureItems = [
  { name: "Cappuccino", price: "₹160", detail: "Rich espresso, silky steamed milk and delicate latte art.", pos: "16% 68%" },
  { name: "Spanish Latte", price: "₹190", detail: "Bold espresso softened with creamy condensed milk.", pos: "9% 21%" },
  { name: "Cold Brew", price: "₹180", detail: "Slow-steeped for a smooth, naturally sweet finish.", pos: "31% 17%" },
  { name: "Butter Croissant", price: "₹140", detail: "Flaky, golden and freshly baked.", pos: "50% 43%" },
  { name: "Creamy Pesto Pasta", price: "₹280", detail: "Al dente pasta tossed in creamy basil pesto.", pos: "84% 32%" },
  { name: "Berry Cheesecake", price: "₹220", detail: "Silky cheesecake finished with seasonal berries.", pos: "72% 72%" },
];

const fullMenu: Record<MenuCategory, { name: string; price: string; detail: string; veg?: boolean; pos: string }[]> = {
  Coffee: [
    ...signatureItems.slice(0, 3).map((item) => ({ ...item, veg: true })),
    { name: "Flat White", price: "₹175", detail: "Double ristretto with velvety microfoam.", veg: true, pos: "18% 67%" },
    { name: "Mocha", price: "₹190", detail: "Espresso, dark chocolate and steamed milk.", veg: true, pos: "27% 62%" },
    { name: "Pour Over", price: "₹210", detail: "Single-origin coffee, hand brewed to order.", veg: true, pos: "18% 66%" },
  ],
  "Non-Coffee": [
    { name: "Ceremonial Matcha", price: "₹210", detail: "Stone-ground matcha with your choice of milk.", veg: true, pos: "83% 25%" },
    { name: "Belgian Hot Chocolate", price: "₹220", detail: "Deep cocoa, warm milk and sea salt.", veg: true, pos: "14% 64%" },
    { name: "Peach Iced Tea", price: "₹170", detail: "Cold-steeped tea, peach and fresh citrus.", veg: true, pos: "32% 21%" },
  ],
  "All-Day Bites": [
    { name: "Avocado Sourdough", price: "₹260", detail: "Smashed avocado, feta, seeds and chilli oil.", veg: true, pos: "82% 39%" },
    { name: "Truffle Mushroom Toast", price: "₹280", detail: "Forest mushrooms, parmesan and soft herbs.", veg: true, pos: "51% 42%" },
    { name: "Butter Croissant", price: "₹140", detail: "Flaky, golden and freshly baked.", veg: true, pos: "51% 43%" },
  ],
  "Pasta & Mains": [
    { name: "Creamy Pesto Pasta", price: "₹280", detail: "Al dente pasta tossed in creamy basil pesto.", veg: true, pos: "84% 32%" },
    { name: "Roasted Tomato Penne", price: "₹270", detail: "Slow-roasted tomato, garlic and basil.", veg: true, pos: "80% 37%" },
    { name: "Herb Chicken Bowl", price: "₹320", detail: "Grilled chicken, seasonal greens and herbed rice.", pos: "78% 41%" },
  ],
  Desserts: [
    { name: "Berry Cheesecake", price: "₹220", detail: "Silky cheesecake finished with seasonal berries.", veg: true, pos: "72% 72%" },
    { name: "Tiramisu", price: "₹230", detail: "Espresso-soaked sponge and mascarpone cream.", veg: true, pos: "69% 70%" },
    { name: "Dark Chocolate Tart", price: "₹210", detail: "Bittersweet chocolate in a crisp cocoa shell.", veg: true, pos: "76% 66%" },
  ],
};

const gallery = [
  { src: interiorImage, alt: "Sunlit café interior filled with green plants", pos: "center" },
  { src: menuImage, alt: "Cappuccino and café dishes on a wooden table", pos: "17% 65%" },
  { src: pastriesImage, alt: "Fresh pastries in the café display", pos: "center" },
  { src: eveningImage, alt: "Warm evening seating at Ember and Bean", pos: "center" },
  { src: beansImage, alt: "Fresh roasted coffee beans and espresso", pos: "center" },
  { src: heroImage, alt: "Coffee and croissant in morning light", pos: "76% 55%" },
  { src: menuImage, alt: "Creamy pesto pasta served at the café", pos: "85% 35%" },
  { src: interiorImage, alt: "Comfortable window seating and indoor greenery", pos: "25% center" },
];

const buttonBase = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" className={`brand ${light ? "brand-light" : ""}`} aria-label="Ember and Bean home">
      <span className="brand-mark" aria-hidden="true"><Leaf size={13} /><Bean size={15} /></span>
      <span><strong>EMBER &amp; BEAN</strong><small>CAFÉ · BISTRO · GOOD VIBES</small></span>
    </a>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`section-label ${light ? "text-soft" : "text-accent"}`}><span />{children}</p>;
}

function AppButton({ children, variant = "dark", onClick, type = "button", className = "", ariaLabel }: { children: React.ReactNode; variant?: "dark" | "light" | "outline"; onClick?: () => void; type?: "button" | "submit"; className?: string; ariaLabel?: string }) {
  const variantClass = variant === "light" ? "bg-surface text-primary hover:bg-soft" : variant === "outline" ? "border border-current text-inherit hover:bg-foreground/10" : "bg-primary text-primary-foreground hover:bg-accent";
  return <button type={type} onClick={onClick} aria-label={ariaLabel} className={`${buttonBase} ${variantClass} ${className}`}>{children}</button>;
}

export function CafeSite() {
  const [modal, setModal] = useState<Modal>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [category, setCategory] = useState<MenuCategory>("Coffee");
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [newsletter, setNewsletter] = useState("");
  const [newsletterState, setNewsletterState] = useState<"idle" | "error" | "success">("idle");
  const [reserveSuccess, setReserveSuccess] = useState(false);
  const [reserveError, setReserveError] = useState("");

  const currentMenu = useMemo(() => fullMenu[category], [category]);
  const lightboxImage = gallery[lightboxIndex];

  useEffect(() => {
    const sections = navItems.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-35% 0px -55%", threshold: [0, 0.2, 0.6] });
    sections.forEach((section) => observer.observe(section));

    const reveals = document.querySelectorAll("[data-reveal]");
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); });
    }, { threshold: 0.12 });
    reveals.forEach((el) => revealObserver.observe(el));

    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); revealObserver.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModal(null);
      if (modal === "gallery" && event.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % gallery.length);
      if (modal === "gallery" && event.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [modal]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const openGallery = (index = 0) => { setLightboxIndex(index); setModal("gallery"); };
  const whatsappUrl = "https://wa.me/919876543210?text=Hello%20Ember%20%26%20Bean%2C%20I%27d%20like%20to%20make%20an%20enquiry.";

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterState(/^\S+@\S+\.\S+$/.test(newsletter.trim()) ? "success" : "error");
  };

  const submitReservation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const required = ["name", "phone", "date", "time", "guests"];
    if (required.some((key) => !String(form.get(key) ?? "").trim())) {
      setReserveError("Please complete all required details.");
      return;
    }
    setReserveError("");
    setReserveSuccess(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="announcement">Freshly brewed. Thoughtfully made. Every day.</div>
      <header className="site-nav" aria-label="Main navigation">
        <Brand light />
        <nav className="desktop-nav">
          {navItems.map(([id, label]) => <button key={id} className={active === id ? "active" : ""} onClick={() => scrollTo(id)}>{label}</button>)}
        </nav>
        <AppButton variant="light" className="nav-cta" onClick={() => { setReserveSuccess(false); setModal("reserve"); }}>Order / Reserve</AppButton>
        <button className="menu-toggle" onClick={() => setMobileOpen((open) => !open)} aria-expanded={mobileOpen} aria-label="Toggle navigation">{mobileOpen ? <X /> : <Menu />}</button>
        {mobileOpen && <div className="mobile-nav">{navItems.map(([id, label]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}<AppButton onClick={() => { setMobileOpen(false); setModal("reserve"); }}>Order / Reserve</AppButton></div>}
      </header>

      <main>
        <section id="home" className="hero">
          <img src={heroImage} width={1920} height={1080} alt="Cappuccino and croissant in the warm morning light at Ember and Bean" fetchPriority="high" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-kicker">EMBER &amp; BEAN</p>
            <h1>Good Food.<br />Great Coffee.<br /><em>Better Moments.</em></h1>
            <p className="hero-copy">A cozy space for people who love coffee, delicious food and meaningful conversations.</p>
            <div className="hero-actions"><AppButton variant="light" onClick={() => scrollTo("menu")}>View menu <ArrowRight size={15} /></AppButton><AppButton variant="outline" onClick={() => scrollTo("visit")}>Find us</AppButton></div>
          </div>
          <button className="scroll-cue" onClick={() => scrollTo("about")}><span /> Scroll to explore</button>
          <div className="hero-seal" aria-hidden="true"><Leaf size={22} /><span>COFFEE · FOOD<br />GOOD COMPANY</span></div>
        </section>

        <section id="about" className="story section-pad">
          <div className="section-shell story-grid">
            <div className="story-copy" data-reveal>
              <SectionLabel>Our story</SectionLabel>
              <h2>More Than Just<br /><em>A Café</em></h2>
              <p>Born from a love for slow mornings, handcrafted coffee and good conversations, Ember &amp; Bean is a cozy café where flavours, people and stories come together.</p>
              <div className="facts"><span><CalendarDays /> Since 2022</span><span><Coffee /> Specialty Coffee</span><span><Sparkles /> Made Fresh Daily</span></div>
              <AppButton onClick={() => scrollTo("experience")}>Our journey <ChevronRight size={14} /></AppButton>
            </div>
            <div className="story-image" data-reveal><img src={interiorImage} loading="lazy" width={1536} height={1024} alt="Warm, plant-filled interior of Ember and Bean" /><span className="botanical" aria-hidden="true">⌇</span></div>
          </div>
        </section>

        <section id="menu" className="menu-section section-pad">
          <div className="section-shell" data-reveal>
            <div className="section-heading light-heading"><div><SectionLabel light>Signature menu</SectionLabel><h2>Made to Be <em>Savoured</em></h2><p>Fresh ingredients. Thoughtfully crafted. Always.</p></div><button className="text-link" onClick={() => setModal("menu")}>View full menu <ArrowRight size={15} /></button></div>
            <div className="signature-grid">
              {signatureItems.map((item, index) => <article className="menu-card" key={item.name} style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}>
                <div className="menu-card-image"><img src={menuImage} loading="lazy" width={1536} height={1024} style={{ objectPosition: item.pos }} alt={item.name} /></div>
                <div><h3>{item.name}</h3><p>{item.detail}</p><strong>{item.price}</strong></div>
              </article>)}
            </div>
            <div className="mobile-centered"><AppButton variant="light" onClick={() => setModal("menu")}>View full menu <ArrowRight size={15} /></AppButton></div>
          </div>
        </section>

        <section id="experience" className="experience section-pad">
          <div className="section-shell experience-grid">
            <div className="experience-image" data-reveal><img src={eveningImage} loading="lazy" width={1024} height={1536} alt="Intimate evening ambience and comfortable café seating" /></div>
            <div className="experience-copy" data-reveal>
              <SectionLabel>The experience</SectionLabel><h2>A Space to<br /><em>Slow Down</em></h2>
              <p>Warm natural textures, plenty of plants and comfortable seating come together to create a space designed for unhurried moments.</p>
              <div className="experience-notes"><span><Leaf />Natural materials</span><span><SunMedium />Warm lighting</span><span><Coffee />Comfortable seating</span><span><Sparkles />Indoor greenery</span></div>
            </div>
          </div>
        </section>

        <section id="gallery" className="gallery-section section-pad">
          <div className="section-shell">
            <div className="gallery-heading" data-reveal><div><SectionLabel>A glimpse into our world</SectionLabel><h2>Moments, flavours and little details<br />that make Ember &amp; Bean special.</h2></div><AppButton variant="outline" onClick={() => openGallery()}>View gallery <ArrowRight size={15} /></AppButton></div>
            <div className="gallery-grid">
              {gallery.map((image, index) => <button key={`${image.alt}-${index}`} className={`gallery-tile tile-${index + 1}`} onClick={() => openGallery(index)} aria-label={`Open image: ${image.alt}`}><img src={image.src} alt={image.alt} loading="lazy" style={{ objectPosition: image.pos }} /><span><ArrowRight /></span></button>)}
            </div>
          </div>
        </section>

        <section className="reasons section-pad">
          <div className="section-shell">
            <SectionLabel>Why people come here</SectionLabel>
            <div className="reason-grid" data-reveal>
              <article><Coffee /><span>01</span><h3>Specialty Coffee</h3><p>Carefully sourced beans, expertly brewed.</p></article>
              <article><Leaf /><span>02</span><h3>Fresh From the Kitchen</h3><p>Simple ingredients turned into comforting favourites.</p></article>
              <article><Users /><span>03</span><h3>A Place to Connect</h3><p>Good food tastes better when shared.</p></article>
            </div>
          </div>
        </section>

        <section className="testimonials section-pad">
          <div className="section-shell"><SectionLabel>Customer love</SectionLabel><h2>Loved by <em>Many</em></h2><p className="demo-note">Concept testimonials for demonstration only.</p>
            <div className="testimonial-grid" data-reveal>
              {[
                ["Beautiful ambience and genuinely good coffee. A must-visit!", "Ananya S."],
                ["The kind of place you can spend an entire afternoon in.", "Rohan M."],
                ["Cozy, calm and aesthetic. Perfect for work or a relaxed catch-up.", "Priya K."],
              ].map(([quote, author]) => <blockquote key={author}><Quote /><div className="stars" aria-label="5 out of 5 stars">★★★★★</div><p>“{quote}”</p><footer>— {author}</footer></blockquote>)}
            </div>
          </div>
        </section>

        <section id="visit" className="visit section-pad">
          <div className="section-shell visit-grid">
            <div className="visit-copy" data-reveal><SectionLabel>Visit us</SectionLabel><h2>Come <em>Find Us</em></h2><p className="lead">We'd love to see you.</p>
              <dl><div><MapPin /><dt>Address</dt><dd>12 Example Street,<br />Bengaluru, Karnataka 560001</dd></div><div><Clock3 /><dt>Opening hours</dt><dd>Monday – Sunday<br />8:00 AM – 10:30 PM</dd></div><div><Phone /><dt>Contact</dt><dd><a href="tel:+919876543210">+91 98765 43210</a><br /><a href="mailto:hello@emberandbean.in">hello@emberandbean.in</a></dd></div></dl>
              <a className={`${buttonBase} bg-primary text-primary-foreground hover:bg-accent`} href="https://www.google.com/maps/dir/?api=1&destination=12%20Example%20Street%2C%20Bengaluru%2C%20Karnataka%20560001" target="_blank" rel="noreferrer">Get directions <ArrowRight size={15} /></a>
            </div>
            <a className="map-visual" href="https://www.google.com/maps/search/?api=1&query=12%20Example%20Street%2C%20Bengaluru%2C%20Karnataka%20560001" target="_blank" rel="noreferrer" aria-label="Open location in Google Maps" data-reveal>
              <div className="map-lines" /><div className="map-pin"><MapPin /><span>EMBER &amp; BEAN<small>12 Example Street</small></span></div><span className="map-note">BENGALURU · 12.9716° N, 77.5946° E</span>
            </a>
          </div>
        </section>

        <section className="whatsapp-band"><div className="section-shell"><div><Leaf /><span><strong>Have a question? Want to reserve a table?</strong><small>Chat with us on WhatsApp.</small></span></div><a className={`${buttonBase} bg-surface text-primary hover:bg-soft`} href={whatsappUrl} target="_blank" rel="noreferrer">Chat now <MessageCircle size={16} /></a></div></section>

        <section className="social section-pad"><div className="section-shell"><div className="social-heading"><div><SectionLabel>Follow our table</SectionLabel><h2>@emberandbean</h2></div><a href="https://www.instagram.com/emberandbean" target="_blank" rel="noreferrer">Follow on Instagram <Instagram size={16} /></a></div><div className="social-grid">{gallery.slice(0, 6).map((image, i) => <a key={i} href="https://www.instagram.com/emberandbean" target="_blank" rel="noreferrer"><img src={image.src} alt={`Ember and Bean social gallery: ${image.alt}`} loading="lazy" style={{ objectPosition: image.pos }} /><span><Instagram /></span></a>)}</div></div></section>

        <section className="newsletter"><div className="section-shell newsletter-inner"><div><SectionLabel light>From our table</SectionLabel><h2>Stay in the <em>loop.</em></h2><p>Get occasional updates about new dishes, seasonal specials and events.</p></div><form onSubmit={submitNewsletter} noValidate><label htmlFor="newsletter-email" className="sr-only">Your email address</label><div><input id="newsletter-email" value={newsletter} onChange={(e) => { setNewsletter(e.target.value); setNewsletterState("idle"); }} type="email" placeholder="Your email address" aria-invalid={newsletterState === "error"} /><AppButton variant="light" type="submit">Join <ArrowRight size={14} /></AppButton></div>{newsletterState === "error" && <p className="form-message error">Please enter a valid email address.</p>}{newsletterState === "success" && <p className="form-message"><Check size={15} /> You're on the demo list. Thank you.</p>}</form></div></section>
      </main>

      <footer className="footer"><div className="section-shell footer-grid"><Brand light /><div><h3>Quick Links</h3>{navItems.map(([id, label]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}</div><div><h3>Contact</h3><p>Bengaluru, Karnataka</p><a href="tel:+919876543210">+91 98765 43210</a><a href="mailto:hello@emberandbean.in">hello@emberandbean.in</a></div><div><h3>Social</h3><a href="https://www.instagram.com/emberandbean" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a><a href="https://x.com" target="_blank" rel="noreferrer">X</a></div></div><div className="section-shell footer-bottom"><span>© 2026 Ember &amp; Bean. All rights reserved.</span><span>Good Food · Great Coffee · Better Moments</span></div></footer>

      {showTop && <button className="back-top" onClick={() => scrollTo("home")} aria-label="Back to top"><ArrowUp /></button>}
      <button className="mobile-reserve" onClick={() => setModal("reserve")}><CalendarDays /> Reserve a table</button>

      {modal === "menu" && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Full café menu"><div className="menu-modal">
        <div className="modal-head"><div><SectionLabel>Our menu</SectionLabel><h2>Made for <em>every mood.</em></h2></div><button className="icon-button" onClick={() => setModal(null)} aria-label="Close menu"><X /></button></div>
        <div className="category-tabs" role="tablist">{(Object.keys(fullMenu) as MenuCategory[]).map((cat) => <button key={cat} role="tab" aria-selected={category === cat} onClick={() => setCategory(cat)}>{cat}</button>)}</div>
        <div className="full-menu-grid">{currentMenu.map((item) => <article key={item.name}><img src={menuImage} alt={item.name} style={{ objectPosition: item.pos }} /><div><span className="item-heading"><h3>{item.name}</h3><strong>{item.price}</strong></span><p>{item.detail}</p>{item.veg && <small><i /> Vegetarian</small>}</div></article>)}</div>
        <p className="menu-footnote">Please speak with our team about allergies or dietary requirements.</p>
      </div></div>}

      {modal === "gallery" && lightboxImage && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Café photo gallery"><button className="icon-button lightbox-close" onClick={() => setModal(null)} aria-label="Close gallery"><X /></button><button className="lightbox-nav prev" onClick={() => setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length)} aria-label="Previous image"><ArrowLeft /></button><figure><img src={lightboxImage.src} alt={lightboxImage.alt} style={{ objectPosition: lightboxImage.pos }} /><figcaption><span>0{lightboxIndex + 1} / 0{gallery.length}</span>{lightboxImage.alt}</figcaption></figure><button className="lightbox-nav next" onClick={() => setLightboxIndex((i) => (i + 1) % gallery.length)} aria-label="Next image"><ArrowRight /></button></div>}

      {modal === "reserve" && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Reservation request"><div className="reserve-modal"><button className="icon-button modal-close" onClick={() => setModal(null)} aria-label="Close reservation"><X /></button>{reserveSuccess ? <div className="success-state"><span><Check /></span><SectionLabel>Request noted</SectionLabel><h2>Thank you.</h2><p>Your request has been received.</p><small>This is a demo experience. No reservation was sent to the café.</small><AppButton onClick={() => setModal(null)}>Done</AppButton></div> : <><SectionLabel>Make a reservation</SectionLabel><h2>Save a seat<br /><em>at our table.</em></h2><p className="modal-intro">Tell us when you're coming. This concept form demonstrates the booking experience and does not send data.</p><form className="reserve-form" onSubmit={submitReservation} noValidate><label>Name *<input name="name" required maxLength={100} placeholder="Your name" /></label><label>Phone *<input name="phone" required maxLength={20} inputMode="tel" placeholder="+91" /></label><label>Date *<input name="date" required type="date" /></label><label>Time *<input name="time" required type="time" /></label><label>Number of guests *<select name="guests" required defaultValue=""><option value="" disabled>Select</option>{[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}</select></label><label className="full-field">Message<textarea name="message" maxLength={500} rows={3} placeholder="Anything we should know?" /></label>{reserveError && <p className="form-error full-field">{reserveError}</p>}<AppButton type="submit" className="full-field">Send request <ArrowRight size={15} /></AppButton><a className="whatsapp-link full-field" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Chat on WhatsApp</a></form></>}</div></div>}
    </div>
  );
}