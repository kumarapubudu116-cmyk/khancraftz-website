import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  ShoppingBag, Menu, X, Star, ChevronDown, ChevronRight, Leaf, Globe2,
  ShieldCheck, Truck, Mail, Phone, MapPin, Plus, Minus, Trash2,
  CheckCircle2, Search, Instagram, Facebook, ArrowRight, Sprout, PackageCheck,
} from "lucide-react";

/* ---------------------------------------------------------------
   KHANCRAFTZ — rare & exotic tropical seed house
   Palette: obsidian black / ivory / antique gold
   Display: Fraunces (botanical-serif) — Body: Manrope
--------------------------------------------------------------- */

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Manrope:wght@400;500;600;700;800&display=swap";

const PRODUCTS = [
  {
    id: "red-atemoya",
    name: "Red Atemoya Seeds",
    latin: "Annona × atemoya 'Rubra'",
    origin: "Philippines",
    tier: "Rare",
    price: 18.5,
    unit: "pack of 5",
    tag: "Fruit Trees",
    swatch: ["#7a1f2b", "#2f4a34"],
    blurb: "A blush-crimson cousin of the classic atemoya — custardy, floral flesh inside a rose-hued rind.",
    description:
      "The Red Atemoya is a striking sport of the beloved sugar-apple hybrid, prized as much for its garnet-blushed skin as its perfumed, custard-sweet flesh. Trees are compact and well suited to large containers in temperate climates or open ground in the tropics and subtropics. Each pack contains hand-selected, viability-tested seeds harvested from mature, high-yield mother trees.",
    care: "Soak 24 hrs before sowing. Germinates in 3–6 weeks at 24–29°C. Prefers well-draining, slightly acidic soil and full sun once established.",
    zone: "USDA 9b – 11, or greenhouse/container elsewhere",
    stock: 42,
  },
  {
    id: "soursop",
    name: "Soursop Seeds",
    latin: "Annona muricata",
    origin: "Sri Lanka",
    tier: "Signature",
    price: 12.0,
    unit: "pack of 8",
    tag: "Fruit Trees",
    swatch: ["#1f3d2b", "#e7c878"],
    blurb: "The spiny green icon of tropical markets — tangy, tropical flesh, legendary in teas and desserts.",
    description:
      "Also known as graviola, the soursop tree yields large, spine-covered fruit with fibrous, tart-sweet white flesh. Our seeds are sourced from a heritage grove on Sri Lanka's southern coast, selected for fruit size and disease resistance. A fast-growing, evergreen tree that rewards patient growers within 3–5 years.",
    care: "Sow fresh within 30 days for best germination. Keep soil consistently moist and warm (25–30°C). Full sun, shelter from strong wind.",
    zone: "USDA 10 – 12, tropical/subtropical only",
    stock: 65,
  },
  {
    id: "red-lady-papaya",
    name: "Red Lady Papaya Seeds",
    latin: "Carica papaya 'Red Lady'",
    origin: "Thailand",
    tier: "Signature",
    price: 9.5,
    unit: "pack of 15",
    tag: "Tropical Rare",
    swatch: ["#b6472f", "#e7c878"],
    blurb: "A dwarf, self-fertile papaya cultivar prized for deep-orange, honey-sweet fruit.",
    description:
      "Red Lady is one of the most reliable papaya cultivars for home orchards — self-pollinating, compact, and precocious, often fruiting within 9 months. The flesh is a rich reddish-orange with exceptional sweetness. Ideal for growers who want dependable yields without needing separate male and female trees.",
    care: "Sow directly 1cm deep, keep warm (26–30°C). Germinates in 2–4 weeks. Full sun and rich, well-draining soil.",
    zone: "USDA 9b – 11, container-friendly",
    stock: 120,
  },
  {
    id: "jackfruit",
    name: "Jackfruit Seeds",
    latin: "Artocarpus heterophyllus",
    origin: "India",
    tier: "Signature",
    price: 14.0,
    unit: "pack of 4",
    tag: "Fruit Trees",
    swatch: ["#7a6a1a", "#1f3d2b"],
    blurb: "The world's largest tree-borne fruit — sweet, fibrous bulbs beloved from curries to jackfruit 'pulled pork'.",
    description:
      "Sourced from a renowned Kerala orchard known for consistent, large-bulb fruit and manageable tree height. Jackfruit trees are majestic, long-lived, and generous — a single mature tree can produce fruit weighing over 30kg. A true centerpiece specimen for spacious tropical gardens.",
    care: "Sow fresh, seeds lose viability quickly. Soak 24 hrs, plant 2cm deep in rich soil. Germinates in 3–8 weeks.",
    zone: "USDA 10 – 12",
    stock: 30,
  },
  {
    id: "red-cacao",
    name: "Red Cacao / Cocoa Seeds",
    latin: "Theobroma cacao 'Criollo Rojo'",
    origin: "Peru",
    tier: "Rare",
    price: 22.0,
    unit: "pack of 6",
    tag: "Cacao & Chocolate",
    swatch: ["#5a2116", "#c6a15b"],
    blurb: "Heirloom Criollo cacao with crimson pods — the aristocrat of fine-flavour chocolate.",
    description:
      "Criollo Rojo is considered among the finest cacao varieties in the world, treasured by chocolatiers for its low bitterness and complex, fruit-forward flavour. Our beans are sourced directly from a smallholder cooperative in the Peruvian Amazon practising shade-grown, agroforestry cultivation.",
    care: "Sow fresh within 7–10 days of harvest for viable germination. Requires high humidity, warmth (24–28°C), and dappled shade as a seedling.",
    zone: "USDA 11 – 12, tropical understory or heated greenhouse",
    stock: 24,
  },
  {
    id: "miyazaki-mango",
    name: "Miyazaki Mango Seeds",
    latin: "Mangifera indica 'Taiyo no Tamago'",
    origin: "Japan",
    tier: "Ultra Rare",
    price: 35.0,
    unit: "pack of 2",
    tag: "Tropical Rare",
    swatch: ["#a3283f", "#e7c878"],
    blurb: "The legendary 'Egg of the Sun' — Japan's most coveted mango, prized for intense sweetness and ruby skin.",
    description:
      "Miyazaki mangoes are grown under exacting standards in Japan and routinely fetch record prices at auction for their extraordinary sugar content and jewel-red blush. This is our most exclusive offering — a limited seasonal harvest with strictly limited stock. Each seed is individually inspected before dispatch.",
    care: "Sow fresh, husk lightly scored to aid germination. Warm (26–30°C), humid conditions. Germinates in 2–4 weeks.",
    zone: "USDA 10 – 11, container growing recommended outside tropics",
    stock: 9,
  },
  {
    id: "purple-passionfruit",
    name: "Purple Passionfruit Seeds",
    latin: "Passiflora edulis",
    origin: "Colombia",
    tier: "Signature",
    price: 8.0,
    unit: "pack of 20",
    tag: "Tropical Rare",
    swatch: ["#4b2a5e", "#e7c878"],
    blurb: "Vigorous flowering vines with intensely aromatic, tangy-sweet purple fruit.",
    description:
      "A fast, vigorous climbing vine that rewards growers with fragrant white-and-purple flowers followed by a heavy crop of tart, aromatic fruit. Excellent for trellises, fences, and pergolas — as ornamental as it is delicious.",
    care: "Soak 24 hrs, sow 5mm deep. Germinates in 2–5 weeks. Full sun, sturdy support structure required.",
    zone: "USDA 9 – 11",
    stock: 88,
  },
  {
    id: "golden-dragonfruit",
    name: "Golden Dragonfruit Seeds",
    latin: "Selenicereus megalanthus",
    origin: "Ecuador",
    tier: "Rare",
    price: 16.0,
    unit: "pack of 25",
    tag: "Cacao & Chocolate",
    swatch: ["#8c6a2e", "#1f3d2b"],
    blurb: "The rarest dragonfruit variety — spineless golden skin, floral-sweet white flesh.",
    description:
      "The most refined of the dragonfruit clan, this climbing cactus produces small, spineless golden fruit with a flavour far sweeter and more floral than its pink-skinned relatives. Striking as an ornamental climbing succulent even before it fruits.",
    care: "Surface sow, keep warm and lightly moist. Germinates in 2–3 weeks. Bright light, cactus-mix soil.",
    zone: "USDA 10 – 12, excellent container/greenhouse plant",
    stock: 56,
  },
];

const REVIEWS = [
  { name: "Amara O.", loc: "Lagos, Nigeria", rating: 5, text: "Germination rate was exceptional — 9 of 10 Red Atemoya seeds sprouted within a month. Packaging felt genuinely premium, like unboxing something precious." },
  { name: "Devon P.", loc: "Austin, USA", rating: 5, text: "The Miyazaki mango seeds arrived exactly as described, well protected and clearly labelled with care instructions. Worth every cent for a collector." },
  { name: "Priya R.", loc: "Auckland, New Zealand", rating: 5, text: "Ordered the Red Cacao pack for a small agroforestry trial. Communication was excellent and customs paperwork was already sorted for me." },
  { name: "Mateus F.", loc: "Lisbon, Portugal", rating: 4, text: "Beautiful presentation, seeds arrived fresh and viable. Shipping to Europe took a little longer than expected but tracking was accurate throughout." },
];

const FAQS = [
  { q: "Will these seeds germinate outside the tropics?", a: "Most varieties can be germinated indoors or in a heated greenhouse with the right warmth and humidity, then grown in containers and moved outdoors seasonally. Each product page lists the recommended USDA zone and care notes." },
  { q: "Do you ship internationally?", a: "Yes — we ship to over 60 countries. All seed packs are prepared with phytosanitary compliance in mind, though import regulations vary by country. See our Shipping Information page for full details." },
  { q: "Will my seeds clear customs?", a: "We package all orders discreetly and include accurate customs declarations. Some countries restrict the import of certain plant seeds — we recommend checking your country's agricultural import rules before ordering. We are not liable for items seized by customs." },
  { q: "How fresh are the seeds?", a: "We harvest and pack in small batches to order rather than holding large stockpiles, and list an approximate harvest window on each product page. Freshness is critical to viability, especially for cacao and soursop." },
  { q: "Do you offer a germination guarantee?", a: "We stand behind the quality of every seed we sell. If a pack fails to germinate following our provided care instructions, contact us within 30 days of delivery with photos for a replacement or store credit." },
  { q: "Can I bulk order for a nursery or farm?", a: "Absolutely — reach out via our Contact page with your requirements and we'll prepare a wholesale quote for larger quantities." },
];

const fmt = (n) => `$${n.toFixed(2)}`;

/* ---------------- Botanical line-art (signature motif) ---------------- */
function SeedPod({ className = "", stroke = "currentColor", opacity = 1 }) {
  return (
    <svg className={className} viewBox="0 0 120 200" fill="none" style={{ opacity }}>
      <path d="M60 4C90 40 108 90 96 138C88 172 74 194 60 196C46 194 32 172 24 138C12 90 30 40 60 4Z" stroke={stroke} strokeWidth="1.2" />
      <path d="M60 4C60 70 60 130 60 196" stroke={stroke} strokeWidth="0.7" strokeDasharray="2 4" />
      <path d="M60 40C74 52 82 66 82 66" stroke={stroke} strokeWidth="0.7" />
      <path d="M60 40C46 52 38 66 38 66" stroke={stroke} strokeWidth="0.7" />
      <path d="M60 90C76 100 86 112 86 112" stroke={stroke} strokeWidth="0.7" />
      <path d="M60 90C44 100 34 112 34 112" stroke={stroke} strokeWidth="0.7" />
      <path d="M60 138C72 146 78 156 78 156" stroke={stroke} strokeWidth="0.7" />
      <path d="M60 138C48 146 42 156 42 156" stroke={stroke} strokeWidth="0.7" />
    </svg>
  );
}

function ProvenanceStamp({ origin, tier, size = 74 }) {
  return (
    <div
      className="stamp"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="47" fill="none" stroke="#C6A15B" strokeWidth="1" />
        <circle cx="50" cy="50" r="41" fill="none" stroke="#C6A15B" strokeWidth="0.6" />
        <path id={`circlePath-${origin}-${tier}`} d="M 50, 50 m -33, 0 a 33,33 0 1,1 66,0 a 33,33 0 1,1 -66,0" fill="none" />
        <text fontSize="7.4" letterSpacing="2.2" fill="#C6A15B">
          <textPath href={`#circlePath-${origin}-${tier}`} startOffset="2%">
            {origin.toUpperCase()} • {tier.toUpperCase()} •
          </textPath>
        </text>
        <text x="50" y="47" textAnchor="middle" fontSize="9" fill="#C6A15B" fontFamily="Fraunces, serif">K</text>
        <text x="50" y="60" textAnchor="middle" fontSize="5.2" letterSpacing="1" fill="#C6A15B">EST. RARITY</text>
      </svg>
    </div>
  );
}

function Stars({ rating }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={14} color="#C6A15B" fill={i <= rating ? "#C6A15B" : "none"} strokeWidth={1.4} />
      ))}
    </div>
  );
}

/* ---------------------------- Layout bits ---------------------------- */

function TopBar() {
  return (
    <div className="topbar">
      <span>Free discreet worldwide shipping on orders over $75</span>
    </div>
  );
}

function Header({ page, navigate, cartCount, menuOpen, setMenuOpen }) {
  const links = [
    ["home", "Home"],
    ["shop", "Shop"],
    ["about", "About"],
    ["contact", "Contact"],
    ["faq", "FAQ"],
    ["shipping", "Shipping"],
  ];
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <button className="logo" onClick={() => navigate("home")}>
          <span className="logo-mark">K</span>
          <span className="logo-word">KHANCRAFTZ</span>
        </button>
        <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
          {links.map(([key, label]) => (
            <button
              key={key}
              className={`nav-link ${page === key ? "active" : ""}`}
              onClick={() => { navigate(key); setMenuOpen(false); }}
            >
              {label}
            </button>
          ))}
        </nav>
        <button className="cart-btn" onClick={() => navigate("cart")} aria-label="View cart">
          <ShoppingBag size={20} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-grain" />
      <div className="footer-inner">
        <div className="footer-col brand-col">
          <div className="logo footer-logo">
            <span className="logo-mark">K</span>
            <span className="logo-word">KHANCRAFTZ</span>
          </div>
          <p>Hand-selected rare and exotic tropical fruit seeds, sourced ethically from smallholder growers and shipped worldwide with care.</p>
          <div className="social-row">
            <a href="#" aria-label="Instagram"><Instagram size={17} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={17} /></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <button onClick={() => navigate("shop")}>All Seeds</button>
          <button onClick={() => navigate("shop")}>Fruit Trees</button>
          <button onClick={() => navigate("shop")}>Tropical Rare</button>
          <button onClick={() => navigate("shop")}>Cacao & Chocolate</button>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <button onClick={() => navigate("faq")}>FAQ</button>
          <button onClick={() => navigate("shipping")}>Shipping Info</button>
          <button onClick={() => navigate("contact")}>Contact Us</button>
          <button onClick={() => navigate("about")}>About Khancraftz</button>
        </div>
        <div className="footer-col">
          <h4>Newsletter</h4>
          <p className="muted">Rare drops, growing tips, and harvest notices — occasionally, never spam.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" required />
            <button type="submit"><ArrowRight size={16} /></button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Khancraftz. All rights reserved.</span>
        <span className="footer-payments">Visa · Mastercard · PayPal · Amex</span>
      </div>
    </footer>
  );
}

/* ------------------------------ Product Card ------------------------------ */
function ProductCard({ p, navigate, addToCart }) {
  return (
    <div className="product-card">
      <button className="product-media" onClick={() => navigate("product", p.id)} aria-label={p.name}>
        <div className="media-gradient" style={{ background: `linear-gradient(155deg, ${p.swatch[0]}, ${p.swatch[1]})` }}>
          <SeedPod className="pod-art" stroke="rgba(255,255,255,0.5)" />
        </div>
        <span className="tier-chip">{p.tier}</span>
      </button>
      <div className="product-body">
        <div className="product-origin"><Globe2 size={12} /> {p.origin}</div>
        <button className="product-name" onClick={() => navigate("product", p.id)}>{p.name}</button>
        <p className="product-latin">{p.latin}</p>
        <div className="product-row">
          <span className="product-price">{fmt(p.price)}</span>
          <span className="product-unit">{p.unit}</span>
        </div>
        <button className="btn btn-outline btn-block" onClick={() => addToCart(p.id, 1)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

/* ------------------------------ HOME ------------------------------ */
function Home({ navigate, addToCart }) {
  const featured = PRODUCTS.slice(0, 4);
  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <SeedPod className="hero-pod hero-pod-1" stroke="rgba(198,161,91,0.35)" />
        <SeedPod className="hero-pod hero-pod-2" stroke="rgba(198,161,91,0.18)" />
        <div className="hero-inner">
          <span className="eyebrow">The rare seed house — est. for collectors & growers</span>
          <h1>Rare &amp; Exotic Seeds<br />for Your Garden</h1>
          <p className="hero-sub">
            Hand-selected tropical fruit seeds sourced from heritage groves across the Philippines,
            Sri Lanka, Japan and beyond — packed with provenance, and shipped worldwide.
          </p>
          <div className="hero-cta">
            <button className="btn btn-gold" onClick={() => navigate("shop")}>Shop Now <ArrowRight size={16} /></button>
            <button className="btn btn-ghost-light" onClick={() => navigate("about")}>Our Story</button>
          </div>
          <div className="provenance-ticker">
            {["Sri Lanka", "Philippines", "Japan", "Peru", "Thailand", "India", "Ecuador", "Colombia"].map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <span className="eyebrow dark">Featured Rarities</span>
          <h2>This Season's Selection</h2>
        </div>
        <div className="product-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} p={p} navigate={navigate} addToCart={addToCart} />
          ))}
        </div>
        <div className="center-cta">
          <button className="btn btn-outline-dark" onClick={() => navigate("shop")}>View Full Collection</button>
        </div>
      </section>

      <section className="section why-section">
        <div className="section-head">
          <span className="eyebrow dark">Why Khancraftz</span>
          <h2>Grown for Collectors,<br />Curated Like Fine Objects</h2>
        </div>
        <div className="why-grid">
          <div className="why-item">
            <ShieldCheck size={26} strokeWidth={1.3} />
            <h3>Verified Germination</h3>
            <p>Every batch is viability-tested before packing, so what you plant is what you harvest.</p>
          </div>
          <div className="why-item">
            <Sprout size={26} strokeWidth={1.3} />
            <h3>Hand-Selected Rarity</h3>
            <p>Sourced directly from heritage groves and smallholder growers, never mass-market stock.</p>
          </div>
          <div className="why-item">
            <Truck size={26} strokeWidth={1.3} />
            <h3>Discreet Global Shipping</h3>
            <p>Carefully packed, accurately declared, and delivered to over 60 countries worldwide.</p>
          </div>
          <div className="why-item">
            <PackageCheck size={26} strokeWidth={1.3} />
            <h3>Grower Support</h3>
            <p>Detailed germination and climate notes on every product, plus real human support.</p>
          </div>
        </div>
      </section>

      <section className="section reviews-section">
        <div className="section-head">
          <span className="eyebrow dark">Testimonials</span>
          <h2>What Growers Are Saying</h2>
        </div>
        <div className="reviews-grid">
          {REVIEWS.slice(0, 3).map((r) => (
            <div className="review-card" key={r.name}>
              <Stars rating={r.rating} />
              <p>"{r.text}"</p>
              <div className="review-name">{r.name} <span>— {r.loc}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section contact-cta">
        <div className="contact-cta-inner">
          <div>
            <span className="eyebrow">Have a question?</span>
            <h2>We're Here to Help You Grow</h2>
            <p>From customs questions to germination advice, our team responds within one business day.</p>
          </div>
          <button className="btn btn-gold" onClick={() => navigate("contact")}>Contact Us <ArrowRight size={16} /></button>
        </div>
      </section>
    </>
  );
}

/* ------------------------------ SHOP ------------------------------ */
function Shop({ navigate, addToCart }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const categories = ["All", "Fruit Trees", "Tropical Rare", "Cacao & Chocolate"];
  const list = PRODUCTS.filter(
    (p) =>
      (filter === "All" || p.tag === filter) &&
      p.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <section className="section shop-page">
      <div className="page-head">
        <span className="eyebrow dark">The Collection</span>
        <h1>Shop All Seeds</h1>
        <p>Every variety hand-selected for rarity, flavour and germination reliability.</p>
      </div>
      <div className="shop-toolbar">
        <div className="chip-row">
          {categories.map((c) => (
            <button key={c} className={`chip ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>
        <div className="search-box">
          <Search size={16} />
          <input placeholder="Search seeds..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>
      <div className="product-grid">
        {list.map((p) => (
          <ProductCard key={p.id} p={p} navigate={navigate} addToCart={addToCart} />
        ))}
        {list.length === 0 && <p className="muted">No seeds match your search.</p>}
      </div>
    </section>
  );
}

/* ------------------------------ PRODUCT DETAIL ------------------------------ */
function ProductDetail({ id, navigate, addToCart }) {
  const p = PRODUCTS.find((x) => x.id === id) || PRODUCTS[0];
  const [qty, setQty] = useState(1);
  const [openAcc, setOpenAcc] = useState("care");
  const related = PRODUCTS.filter((x) => x.id !== p.id && x.tag === p.tag).slice(0, 3);

  useEffect(() => { setQty(1); setOpenAcc("care"); }, [id]);

  return (
    <section className="section product-detail">
      <div className="breadcrumb">
        <button onClick={() => navigate("shop")}>Shop</button> <ChevronRight size={13} /> <span>{p.name}</span>
      </div>
      <div className="pd-grid">
        <div className="pd-media">
          <div className="media-gradient pd-media-main" style={{ background: `linear-gradient(155deg, ${p.swatch[0]}, ${p.swatch[1]})` }}>
            <SeedPod className="pod-art pod-art-large" stroke="rgba(255,255,255,0.55)" />
          </div>
          <ProvenanceStamp origin={p.origin} tier={p.tier} size={90} />
        </div>
        <div className="pd-info">
          <div className="product-origin"><Globe2 size={12} /> Origin: {p.origin}</div>
          <h1>{p.name}</h1>
          <p className="product-latin large">{p.latin}</p>
          <div className="pd-price-row">
            <span className="product-price large">{fmt(p.price)}</span>
            <span className="product-unit">/ {p.unit}</span>
            <span className={`stock-pill ${p.stock < 15 ? "low" : ""}`}>{p.stock < 15 ? `Only ${p.stock} left` : "In stock"}</span>
          </div>
          <p className="pd-blurb">{p.blurb}</p>

          <div className="qty-row">
            <div className="qty-control">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity"><Minus size={14} /></button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity"><Plus size={14} /></button>
            </div>
            <button className="btn btn-gold btn-grow" onClick={() => addToCart(p.id, qty)}>Add to Cart — {fmt(p.price * qty)}</button>
          </div>

          <div className="pd-accordion">
            {[
              ["description", "Description", p.description],
              ["care", "Germination & Care", p.care],
              ["zone", "Growing Zone", p.zone],
            ].map(([key, label, content]) => (
              <div className="acc-item" key={key}>
                <button className="acc-head" onClick={() => setOpenAcc(openAcc === key ? "" : key)}>
                  {label}
                  <ChevronDown size={16} className={openAcc === key ? "rot" : ""} />
                </button>
                {openAcc === key && <p className="acc-body">{content}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="related-section">
          <h3>You May Also Like</h3>
          <div className="product-grid">
            {related.map((rp) => <ProductCard key={rp.id} p={rp} navigate={navigate} addToCart={addToCart} />)}
          </div>
        </div>
      )}
    </section>
  );
}

/* ------------------------------ ABOUT ------------------------------ */
function About({ navigate }) {
  return (
    <section className="section about-page">
      <div className="page-head">
        <span className="eyebrow dark">Our Story</span>
        <h1>Seeds, Sourced With Reverence</h1>
      </div>
      <div className="about-grid">
        <div className="about-copy">
          <p>Khancraftz began with a simple frustration: it was nearly impossible to find rare tropical fruit seeds that were both authentic and reliably viable. Too many listings online were vague on origin, inconsistent in quality, and indifferent to the grower on the other end.</p>
          <p>We set out to build something different — a seed house run with the same care a jeweller gives a gemstone. Every variety we carry is sourced directly from named growers and heritage groves across Sri Lanka, the Philippines, Japan, Peru and beyond, chosen for flavour, resilience and true rarity.</p>
          <p>Each pack is hand-inspected, viability-tested, and finished with a provenance stamp that traces it back to where it was grown. We believe a seed carries a story before it ever carries a fruit — and we want you to know that story before it takes root in your garden.</p>
          <p>Today, Khancraftz ships to growers, collectors and small nurseries in over 60 countries, but the standard hasn't changed: rare, real, and worth the wait.</p>
        </div>
        <div className="about-values">
          <div className="value-card">
            <Leaf size={22} strokeWidth={1.3} />
            <h4>Ethical Sourcing</h4>
            <p>Direct relationships with smallholder growers and fair prices for their harvest.</p>
          </div>
          <div className="value-card">
            <ShieldCheck size={22} strokeWidth={1.3} />
            <h4>Verified Quality</h4>
            <p>Batch-tested viability and honest, detailed growing notes — no exaggerated claims.</p>
          </div>
          <div className="value-card">
            <Globe2 size={22} strokeWidth={1.3} />
            <h4>Global Access</h4>
            <p>Bringing seeds once reserved for local markets to gardens on every continent.</p>
          </div>
        </div>
      </div>
      <div className="center-cta">
        <button className="btn btn-outline-dark" onClick={() => navigate("shop")}>Explore the Collection</button>
      </div>
    </section>
  );
}

/* ------------------------------ CONTACT ------------------------------ */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="section contact-page">
      <div className="page-head">
        <span className="eyebrow dark">Get in Touch</span>
        <h1>Contact Khancraftz</h1>
        <p>Questions about an order, growing advice, or a wholesale enquiry — we typically reply within one business day.</p>
      </div>
      <div className="contact-grid">
        <div className="contact-details">
          <div className="detail-row"><Mail size={18} /> <div><h4>Email</h4><p>hello@khancraftz.com</p></div></div>
          <div className="detail-row"><Phone size={18} /> <div><h4>Phone</h4><p>+1 (307) 555-0148</p></div></div>
          <div className="detail-row"><MapPin size={18} /> <div><h4>Studio</h4><p>Curated & dispatched worldwide from our packing studio</p></div></div>
          <div className="detail-row"><ShoppingBag size={18} /> <div><h4>Support Hours</h4><p>Mon – Fri, 9am – 6pm (GMT+5:30)</p></div></div>
        </div>
        <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          {sent ? (
            <div className="form-success"><CheckCircle2 size={28} /><p>Message sent. We'll be in touch shortly.</p></div>
          ) : (
            <>
              <label>Name<input required placeholder="Your full name" /></label>
              <label>Email<input required type="email" placeholder="your@email.com" /></label>
              <label>Subject<input placeholder="Order enquiry, wholesale, etc." /></label>
              <label>Message<textarea required rows={5} placeholder="How can we help?" /></label>
              <button className="btn btn-gold btn-block" type="submit">Send Message</button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

/* ------------------------------ FAQ ------------------------------ */
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq-page">
      <div className="page-head">
        <span className="eyebrow dark">Support</span>
        <h1>Frequently Asked Questions</h1>
      </div>
      <div className="faq-list">
        {FAQS.map((f, i) => (
          <div className="faq-item" key={f.q}>
            <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
              {f.q}
              <ChevronDown size={17} className={open === i ? "rot" : ""} />
            </button>
            {open === i && <p className="faq-a">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ SHIPPING ------------------------------ */
function Shipping() {
  return (
    <section className="section shipping-page">
      <div className="page-head">
        <span className="eyebrow dark">Logistics</span>
        <h1>Shipping Information</h1>
      </div>
      <div className="shipping-grid">
        <div className="ship-card">
          <Truck size={22} strokeWidth={1.3} />
          <h3>Processing Time</h3>
          <p>Orders are hand-packed within 1–3 business days. Seasonal or ultra-rare varieties (like Miyazaki Mango) may take up to 5 days pending harvest.</p>
        </div>
        <div className="ship-card">
          <Globe2 size={22} strokeWidth={1.3} />
          <h3>International Shipping</h3>
          <p>We ship to over 60 countries via tracked airmail. Delivery typically takes 7–21 business days depending on destination and customs processing.</p>
        </div>
        <div className="ship-card">
          <ShieldCheck size={22} strokeWidth={1.3} />
          <h3>Customs &amp; Duties</h3>
          <p>All packages include accurate customs declarations. Import duties, taxes, and plant import permits (where required) are the responsibility of the buyer. Please check your country's regulations before ordering.</p>
        </div>
        <div className="ship-card">
          <PackageCheck size={22} strokeWidth={1.3} />
          <h3>Tracking &amp; Packaging</h3>
          <p>Every order ships with tracking and is sealed in moisture-controlled, crush-resistant packaging to protect viability in transit.</p>
        </div>
      </div>
      <div className="ship-table-wrap">
        <h3>Estimated Delivery &amp; Rates</h3>
        <table className="ship-table">
          <thead><tr><th>Region</th><th>Estimated Delivery</th><th>Standard Rate</th></tr></thead>
          <tbody>
            <tr><td>USA &amp; Canada</td><td>7–12 business days</td><td>$6.50</td></tr>
            <tr><td>Europe &amp; UK</td><td>9–15 business days</td><td>$8.00</td></tr>
            <tr><td>Asia &amp; Oceania</td><td>7–14 business days</td><td>$7.50</td></tr>
            <tr><td>Africa &amp; South America</td><td>10–21 business days</td><td>$9.00</td></tr>
          </tbody>
        </table>
        <p className="muted small">Free shipping automatically applied to all orders over $75. Rates and timelines are estimates and may vary with customs delays outside our control.</p>
      </div>
    </section>
  );
}

/* ------------------------------ CART ------------------------------ */
function Cart({ cart, updateQty, removeItem, navigate }) {
  const items = cart.map((c) => ({ ...c, product: PRODUCTS.find((p) => p.id === c.id) }));
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= 75 ? 0 : 7.5;
  const total = subtotal + shipping;

  return (
    <section className="section cart-page">
      <div className="page-head">
        <span className="eyebrow dark">Your Selection</span>
        <h1>Shopping Cart</h1>
      </div>
      {items.length === 0 ? (
        <div className="empty-state">
          <ShoppingBag size={40} strokeWidth={1} />
          <p>Your cart is empty.</p>
          <button className="btn btn-gold" onClick={() => navigate("shop")}>Browse the Collection</button>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items">
            {items.map((i) => (
              <div className="cart-row" key={i.id}>
                <div className="cart-thumb" style={{ background: `linear-gradient(155deg, ${i.product.swatch[0]}, ${i.product.swatch[1]})` }}>
                  <SeedPod className="pod-art small" stroke="rgba(255,255,255,0.55)" />
                </div>
                <div className="cart-item-info">
                  <h4>{i.product.name}</h4>
                  <p className="muted">{i.product.unit} · {i.product.origin}</p>
                  <div className="qty-control small">
                    <button onClick={() => updateQty(i.id, Math.max(1, i.qty - 1))}><Minus size={12} /></button>
                    <span>{i.qty}</span>
                    <button onClick={() => updateQty(i.id, i.qty + 1)}><Plus size={12} /></button>
                  </div>
                </div>
                <div className="cart-item-price">
                  <span>{fmt(i.product.price * i.qty)}</span>
                  <button className="remove-btn" onClick={() => removeItem(i.id)} aria-label="Remove item"><Trash2 size={15} /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
            <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? "Free" : fmt(shipping)}</span></div>
            {shipping > 0 && <p className="muted small">Add {fmt(75 - subtotal)} more for free shipping.</p>}
            <div className="summary-row total"><span>Total</span><span>{fmt(total)}</span></div>
            <button className="btn btn-gold btn-block" onClick={() => navigate("checkout")}>Proceed to Checkout</button>
            <button className="btn btn-text" onClick={() => navigate("shop")}>Continue Shopping</button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ------------------------------ CHECKOUT ------------------------------ */
function Checkout({ cart, navigate, clearCart }) {
  const [placed, setPlaced] = useState(false);
  const items = cart.map((c) => ({ ...c, product: PRODUCTS.find((p) => p.id === c.id) }));
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= 75 ? 0 : 7.5;
  const total = subtotal + shipping;

  if (items.length === 0 && !placed) {
    return (
      <section className="section cart-page">
        <div className="empty-state">
          <ShoppingBag size={40} strokeWidth={1} />
          <p>Your cart is empty.</p>
          <button className="btn btn-gold" onClick={() => navigate("shop")}>Browse the Collection</button>
        </div>
      </section>
    );
  }

  if (placed) {
    return (
      <section className="section checkout-success">
        <CheckCircle2 size={48} strokeWidth={1.2} />
        <h1>Order Confirmed</h1>
        <p>Thank you for your order. A confirmation and tracking number will be emailed to you once your seeds are packed.</p>
        <button className="btn btn-gold" onClick={() => navigate("home")}>Return Home</button>
      </section>
    );
  }

  return (
    <section className="section checkout-page">
      <div className="page-head">
        <span className="eyebrow dark">Final Step</span>
        <h1>Checkout</h1>
      </div>
      <form
        className="checkout-grid"
        onSubmit={(e) => { e.preventDefault(); setPlaced(true); clearCart(); }}
      >
        <div className="checkout-form">
          <h3>Shipping Details</h3>
          <div className="form-row-2">
            <label>First Name<input required /></label>
            <label>Last Name<input required /></label>
          </div>
          <label>Email<input required type="email" /></label>
          <label>Address<input required placeholder="Street address" /></label>
          <div className="form-row-2">
            <label>City<input required /></label>
            <label>Postal Code<input required /></label>
          </div>
          <label>Country<input required placeholder="Country" /></label>
          <h3 className="pt">Payment</h3>
          <label>Card Number<input required placeholder="•••• •••• •••• ••••" /></label>
          <div className="form-row-2">
            <label>Expiry<input required placeholder="MM / YY" /></label>
            <label>CVC<input required placeholder="•••" /></label>
          </div>
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          {items.map((i) => (
            <div className="summary-row" key={i.id}>
              <span>{i.product.name} × {i.qty}</span>
              <span>{fmt(i.product.price * i.qty)}</span>
            </div>
          ))}
          <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? "Free" : fmt(shipping)}</span></div>
          <div className="summary-row total"><span>Total</span><span>{fmt(total)}</span></div>
          <button className="btn btn-gold btn-block" type="submit">Place Order</button>
          <p className="muted small center">This is a demo checkout — no payment will be processed.</p>
        </div>
      </form>
    </section>
  );
}

/* ------------------------------ APP ------------------------------ */
export default function App() {
  const [page, setPage] = useState("home");
  const [productId, setProductId] = useState(PRODUCTS[0].id);
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const topRef = useRef(null);

  const navigate = (p, pid) => {
    if (pid) setProductId(pid);
    setPage(p);
    setMenuOpen(false);
    window.scrollTo?.({ top: 0, behavior: "instant" });
  };

  const addToCart = (id, qty) => {
    setCart((c) => {
      const existing = c.find((i) => i.id === id);
      if (existing) return c.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...c, { id, qty }];
    });
  };
  const updateQty = (id, qty) => setCart((c) => c.map((i) => (i.id === id ? { ...i, qty } : i)));
  const removeItem = (id) => setCart((c) => c.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  let content;
  if (page === "home") content = <Home navigate={navigate} addToCart={addToCart} />;
  else if (page === "shop") content = <Shop navigate={navigate} addToCart={addToCart} />;
  else if (page === "product") content = <ProductDetail id={productId} navigate={navigate} addToCart={addToCart} />;
  else if (page === "about") content = <About navigate={navigate} />;
  else if (page === "contact") content = <Contact />;
  else if (page === "faq") content = <FAQ />;
  else if (page === "shipping") content = <Shipping />;
  else if (page === "cart") content = <Cart cart={cart} updateQty={updateQty} removeItem={removeItem} navigate={navigate} />;
  else if (page === "checkout") content = <Checkout cart={cart} navigate={navigate} clearCart={clearCart} />;

  return (
    <div className="kc-root" ref={topRef}>
      <style>{CSS}</style>
      <link rel="stylesheet" href={FONT_LINK} />
      <TopBar />
      <Header page={page} navigate={navigate} cartCount={cartCount} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>{content}</main>
      <Footer navigate={navigate} />
    </div>
  );
}

/* ------------------------------ STYLES ------------------------------ */
const CSS = `
:root{
  --black:#0B0B0A; --charcoal:#17160F; --ink:#111110;
  --ivory:#FAF7EF; --cream:#F1EBDC;
  --gold:#C6A15B; --gold-bright:#E7C878; --gold-deep:#8C6A2E;
  --green:#2F4A34;
  --line: rgba(198,161,91,0.28);
}
.kc-root{ font-family:'Manrope',sans-serif; background:var(--ivory); color:var(--ink); -webkit-font-smoothing:antialiased; }
.kc-root *{ box-sizing:border-box; }
.kc-root h1,.kc-root h2,.kc-root h3,.kc-root h4{ font-family:'Fraunces',serif; font-weight:500; letter-spacing:-0.01em; margin:0; color:var(--black); }
.kc-root p{ margin:0; line-height:1.7; color:#4b4a42; }
.kc-root button{ font-family:'Manrope',sans-serif; cursor:pointer; }
.kc-root input, .kc-root textarea{ font-family:'Manrope',sans-serif; }

.eyebrow{ display:inline-block; font-size:11.5px; letter-spacing:0.16em; text-transform:uppercase; color:var(--gold-bright); font-weight:600; margin-bottom:14px; }
.eyebrow.dark{ color:var(--gold-deep); }

/* Topbar */
.topbar{ background:var(--black); color:var(--gold-bright); text-align:center; font-size:12px; letter-spacing:0.03em; padding:8px 12px; }

/* Header */
.site-header{ position:sticky; top:0; z-index:50; background:rgba(11,11,10,0.97); backdrop-filter:blur(6px); border-bottom:1px solid var(--line); }
.header-inner{ max-width:1240px; margin:0 auto; display:flex; align-items:center; gap:20px; padding:16px 24px; }
.logo{ background:none; border:none; display:flex; align-items:center; gap:9px; }
.logo-mark{ width:34px; height:34px; border:1px solid var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Fraunces',serif; color:var(--gold-bright); font-size:16px; }
.logo-word{ font-family:'Fraunces',serif; letter-spacing:0.14em; color:var(--ivory); font-size:16px; }
.main-nav{ display:flex; gap:28px; margin-left:12px; flex:1; }
.nav-link{ background:none; border:none; color:#cfc9b8; font-size:14px; padding:6px 0; border-bottom:1px solid transparent; letter-spacing:0.01em; }
.nav-link:hover, .nav-link.active{ color:var(--gold-bright); border-bottom-color:var(--gold); }
.cart-btn{ background:none; border:none; color:var(--ivory); position:relative; margin-left:auto; padding:6px; }
.cart-badge{ position:absolute; top:-4px; right:-6px; background:var(--gold); color:var(--black); font-size:10px; font-weight:700; width:17px; height:17px; border-radius:50%; display:flex; align-items:center; justify-content:center; }
.hamburger{ display:none; background:none; border:none; color:var(--ivory); }

@media(max-width:880px){
  .hamburger{ display:block; order:1; }
  .logo{ order:2; margin-right:auto; }
  .cart-btn{ order:3; margin-left:0; }
  .main-nav{ display:none; order:4; width:100%; flex-direction:column; gap:2px; margin:14px 0 4px; }
  .main-nav.open{ display:flex; }
  .nav-link{ padding:10px 4px; border-bottom:1px solid rgba(255,255,255,0.06); width:100%; text-align:left; }
  .header-inner{ flex-wrap:wrap; }
}

/* Hero */
.hero{ position:relative; background:var(--black); color:var(--ivory); overflow:hidden; padding:110px 24px 90px; text-align:center; }
.hero-bg{ position:absolute; inset:0; background:radial-gradient(ellipse at 50% 0%, rgba(198,161,91,0.14), transparent 60%); }
.hero-pod{ position:absolute; width:220px; height:auto; }
.hero-pod-1{ top:-40px; left:-60px; transform:rotate(-18deg); }
.hero-pod-2{ bottom:-60px; right:-50px; width:280px; transform:rotate(12deg); }
.hero-inner{ position:relative; max-width:760px; margin:0 auto; }
.hero h1{ color:var(--ivory); font-size:clamp(36px,6vw,64px); line-height:1.08; font-weight:500; margin:6px 0 22px; }
.hero-sub{ color:#cfc9b8; max-width:560px; margin:0 auto 34px; font-size:16px; }
.hero-cta{ display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-bottom:46px; }
.provenance-ticker{ display:flex; gap:22px; justify-content:center; flex-wrap:wrap; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#8b8672; border-top:1px solid var(--line); padding-top:24px; }

/* Buttons */
.btn{ display:inline-flex; align-items:center; gap:8px; justify-content:center; padding:13px 26px; border-radius:2px; font-size:13.5px; font-weight:600; letter-spacing:0.03em; border:1px solid transparent; transition:all .18s ease; text-transform:uppercase; }
.btn-gold{ background:var(--gold); color:var(--black); }
.btn-gold:hover{ background:var(--gold-bright); }
.btn-ghost-light{ background:transparent; color:var(--ivory); border-color:rgba(255,255,255,0.35); }
.btn-ghost-light:hover{ border-color:var(--gold); color:var(--gold-bright); }
.btn-outline{ background:transparent; color:var(--black); border-color:var(--black); }
.btn-outline:hover{ background:var(--black); color:var(--ivory); }
.btn-outline-dark{ background:transparent; color:var(--black); border-color:var(--gold-deep); }
.btn-outline-dark:hover{ background:var(--black); border-color:var(--black); color:var(--gold-bright); }
.btn-block{ width:100%; }
.btn-grow{ flex:1; }
.btn-text{ background:none; border:none; color:#6b6a5f; text-transform:none; font-weight:500; text-decoration:underline; padding:8px; }

/* Sections */
.section{ max-width:1240px; margin:0 auto; padding:88px 24px; }
.section-head{ text-align:center; max-width:620px; margin:0 auto 48px; }
.section-head h2{ font-size:clamp(26px,3.4vw,38px); }
.page-head{ max-width:680px; margin:0 auto 44px; text-align:center; }
.page-head h1{ font-size:clamp(30px,4vw,44px); margin-bottom:10px; }
.page-head p{ margin-top:12px; }
.center-cta{ text-align:center; margin-top:46px; }

/* Product grid & cards */
.product-grid{ display:grid; grid-template-columns:repeat(auto-fit, minmax(240px,1fr)); gap:26px; }
.product-card{ background:#fff; border:1px solid #e9e3d3; display:flex; flex-direction:column; }
.product-media{ position:relative; width:100%; aspect-ratio:1/1; border:none; padding:0; overflow:hidden; }
.media-gradient{ width:100%; height:100%; display:flex; align-items:center; justify-content:center; }
.pod-art{ width:56%; height:auto; }
.pod-art.small{ width:70%; }
.pod-art-large{ width:44%; }
.tier-chip{ position:absolute; top:12px; left:12px; background:rgba(11,11,10,0.72); color:var(--gold-bright); font-size:10px; letter-spacing:0.1em; text-transform:uppercase; padding:5px 10px; }
.product-body{ padding:18px 18px 20px; display:flex; flex-direction:column; gap:6px; }
.product-origin{ display:flex; align-items:center; gap:5px; font-size:11px; letter-spacing:0.06em; text-transform:uppercase; color:var(--gold-deep); }
.product-name{ background:none; border:none; text-align:left; padding:0; font-family:'Fraunces',serif; font-size:18px; color:var(--black); }
.product-latin{ font-style:italic; font-size:12.5px; color:#8b8977; margin-bottom:6px; }
.product-latin.large{ font-size:15px; margin-bottom:18px; }
.product-row{ display:flex; align-items:baseline; gap:8px; margin-bottom:8px; }
.product-price{ font-family:'Fraunces',serif; font-size:19px; color:var(--black); }
.product-price.large{ font-size:30px; }
.product-unit{ font-size:12px; color:#9c9a8c; }

/* Why section */
.why-section{ background:var(--cream); border-top:1px solid #e9e3d3; border-bottom:1px solid #e9e3d3; }
.why-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:36px; }
.why-item{ color:var(--gold-deep); }
.why-item h3{ font-size:18px; margin:14px 0 8px; color:var(--black); }
.why-item p{ font-size:14.5px; }

/* Reviews */
.reviews-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:24px; }
.review-card{ border:1px solid #e9e3d3; padding:26px 24px; background:#fff; }
.review-card p{ margin:14px 0 16px; font-style:italic; color:#33322c; font-size:14.5px; }
.review-name{ font-size:13px; font-weight:600; color:var(--black); }
.review-name span{ font-weight:400; color:#9c9a8c; }

/* Contact CTA band */
.contact-cta{ background:var(--black); }
.contact-cta-inner{ display:flex; align-items:center; justify-content:space-between; gap:30px; flex-wrap:wrap; }
.contact-cta h2{ color:var(--ivory); font-size:clamp(24px,3vw,34px); margin:4px 0 10px; }
.contact-cta p{ color:#b7b2a0; max-width:420px; }

/* Footer */
.site-footer{ background:var(--black); color:#cfc9b8; padding-top:64px; position:relative; }
.footer-inner{ max-width:1240px; margin:0 auto; padding:0 24px 40px; display:grid; grid-template-columns:1.6fr 1fr 1fr 1.3fr; gap:36px; }
.footer-col h4{ color:var(--gold-bright); font-size:13px; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:16px; font-family:'Manrope',sans-serif; font-weight:700; }
.footer-col button{ display:block; background:none; border:none; color:#b7b2a0; padding:6px 0; font-size:14px; text-align:left; }
.footer-col button:hover{ color:var(--gold-bright); }
.brand-col p{ color:#9c9a8c; font-size:13.5px; margin:14px 0 18px; max-width:280px; }
.footer-logo{ margin-bottom:4px; }
.social-row{ display:flex; gap:14px; }
.social-row a{ color:#cfc9b8; }
.newsletter-form{ display:flex; border:1px solid rgba(255,255,255,0.2); margin-top:12px; }
.newsletter-form input{ flex:1; background:none; border:none; padding:11px 12px; color:var(--ivory); font-size:13px; }
.newsletter-form input::placeholder{ color:#7a7869; }
.newsletter-form button{ background:var(--gold); border:none; color:var(--black); padding:0 14px; }
.footer-bottom{ border-top:1px solid rgba(255,255,255,0.12); padding:20px 24px; max-width:1240px; margin:0 auto; display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px; font-size:12px; color:#8b8977; }

@media(max-width:880px){ .footer-inner{ grid-template-columns:1fr 1fr; } }
@media(max-width:520px){ .footer-inner{ grid-template-columns:1fr; } }

/* Shop toolbar */
.shop-toolbar{ display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; margin-bottom:34px; border-bottom:1px solid #e9e3d3; padding-bottom:22px; }
.chip-row{ display:flex; gap:10px; flex-wrap:wrap; }
.chip{ background:none; border:1px solid #d8d2bd; padding:8px 16px; font-size:12.5px; letter-spacing:0.03em; color:#4b4a42; }
.chip.active{ background:var(--black); color:var(--gold-bright); border-color:var(--black); }
.search-box{ display:flex; align-items:center; gap:8px; border:1px solid #d8d2bd; padding:8px 14px; color:#9c9a8c; }
.search-box input{ border:none; outline:none; background:none; font-size:13px; width:180px; }

/* Product detail */
.breadcrumb{ display:flex; align-items:center; gap:6px; font-size:12.5px; color:#9c9a8c; margin-bottom:30px; }
.breadcrumb button{ background:none; border:none; color:#9c9a8c; padding:0; }
.pd-grid{ display:grid; grid-template-columns:1fr 1fr; gap:56px; }
.pd-media{ position:relative; }
.pd-media-main{ aspect-ratio:1/1; }
.stamp{ position:absolute; bottom:18px; right:18px; background:rgba(11,11,10,0.72); border-radius:50%; padding:4px; }
.pd-price-row{ display:flex; align-items:center; gap:10px; margin:6px 0 18px; flex-wrap:wrap; }
.stock-pill{ font-size:11px; letter-spacing:0.04em; text-transform:uppercase; color:var(--green); border:1px solid var(--green); padding:3px 10px; margin-left:auto; }
.stock-pill.low{ color:#a3283f; border-color:#a3283f; }
.pd-blurb{ margin-bottom:26px; font-size:15px; }
.qty-row{ display:flex; gap:14px; margin-bottom:34px; flex-wrap:wrap; }
.qty-control{ display:flex; align-items:center; border:1px solid #d8d2bd; }
.qty-control button{ background:none; border:none; padding:12px 14px; color:var(--black); }
.qty-control span{ min-width:30px; text-align:center; font-size:14px; }
.qty-control.small button{ padding:6px 10px; }
.pd-accordion{ border-top:1px solid #e9e3d3; }
.acc-item{ border-bottom:1px solid #e9e3d3; }
.acc-head{ width:100%; background:none; border:none; display:flex; justify-content:space-between; align-items:center; padding:17px 2px; font-family:'Fraunces',serif; font-size:15.5px; color:var(--black); }
.acc-head .rot{ transform:rotate(180deg); }
.acc-body{ padding:0 2px 18px; font-size:14px; }
.related-section{ margin-top:90px; }
.related-section h3{ font-size:22px; margin-bottom:26px; }

@media(max-width:820px){ .pd-grid{ grid-template-columns:1fr; gap:32px; } }

/* About */
.about-grid{ display:grid; grid-template-columns:1.5fr 1fr; gap:56px; }
.about-copy p{ margin-bottom:18px; font-size:15px; }
.about-values{ display:flex; flex-direction:column; gap:22px; }
.value-card{ border:1px solid #e9e3d3; padding:22px; color:var(--gold-deep); }
.value-card h4{ font-size:15px; color:var(--black); margin:12px 0 6px; }
.value-card p{ font-size:13.5px; }
@media(max-width:820px){ .about-grid{ grid-template-columns:1fr; } }

/* Contact page */
.contact-grid{ display:grid; grid-template-columns:0.8fr 1.2fr; gap:56px; }
.contact-details{ display:flex; flex-direction:column; gap:26px; }
.detail-row{ display:flex; gap:14px; color:var(--gold-deep); }
.detail-row h4{ font-size:14.5px; color:var(--black); margin-bottom:3px; }
.detail-row p{ font-size:13.5px; }
.contact-form{ display:flex; flex-direction:column; gap:16px; border:1px solid #e9e3d3; padding:32px; background:#fff; }
.contact-form label{ display:flex; flex-direction:column; gap:6px; font-size:12.5px; color:#6b6a5f; letter-spacing:0.02em; }
.contact-form input, .contact-form textarea{ border:1px solid #d8d2bd; padding:11px 13px; font-size:14px; outline:none; background:#fff; resize:vertical; }
.contact-form input:focus, .contact-form textarea:focus{ border-color:var(--gold); }
.form-success{ display:flex; flex-direction:column; align-items:center; gap:10px; text-align:center; padding:40px 10px; color:var(--green); }
@media(max-width:820px){ .contact-grid{ grid-template-columns:1fr; } }

/* FAQ */
.faq-list{ max-width:760px; margin:0 auto; }
.faq-item{ border-bottom:1px solid #e9e3d3; }
.faq-q{ width:100%; background:none; border:none; display:flex; justify-content:space-between; align-items:center; padding:20px 2px; text-align:left; font-family:'Fraunces',serif; font-size:16.5px; color:var(--black); }
.faq-q .rot{ transform:rotate(180deg); }
.faq-a{ padding:0 2px 22px; font-size:14.5px; max-width:640px; }

/* Shipping */
.shipping-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:24px; margin-bottom:60px; }
.ship-card{ border:1px solid #e9e3d3; padding:26px; color:var(--gold-deep); }
.ship-card h3{ font-size:16px; color:var(--black); margin:14px 0 8px; }
.ship-card p{ font-size:13.5px; }
.ship-table-wrap h3{ font-size:20px; margin-bottom:18px; }
.ship-table{ width:100%; border-collapse:collapse; margin-bottom:14px; }
.ship-table th, .ship-table td{ text-align:left; padding:13px 14px; border-bottom:1px solid #e9e3d3; font-size:13.5px; }
.ship-table th{ color:var(--gold-deep); text-transform:uppercase; font-size:11px; letter-spacing:0.06em; }
.muted{ color:#9c9a8c; }
.muted.small{ font-size:12.5px; }
.center{ text-align:center; }

/* Cart */
.empty-state{ display:flex; flex-direction:column; align-items:center; gap:16px; padding:70px 20px; color:#9c9a8c; }
.cart-grid{ display:grid; grid-template-columns:1.7fr 1fr; gap:44px; align-items:start; }
.cart-items{ display:flex; flex-direction:column; gap:16px; }
.cart-row{ display:flex; gap:16px; align-items:center; border:1px solid #e9e3d3; padding:14px; background:#fff; }
.cart-thumb{ width:74px; height:74px; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
.cart-item-info{ flex:1; }
.cart-item-info h4{ font-size:15px; margin-bottom:2px; }
.cart-item-price{ display:flex; flex-direction:column; align-items:flex-end; gap:10px; font-family:'Fraunces',serif; font-size:15px; }
.remove-btn{ background:none; border:none; color:#b3ab8f; }
.remove-btn:hover{ color:#a3283f; }
.cart-summary{ border:1px solid #e9e3d3; padding:26px; background:#fff; position:sticky; top:90px; }
.cart-summary h3{ font-size:17px; margin-bottom:18px; }
.summary-row{ display:flex; justify-content:space-between; font-size:14px; padding:9px 0; color:#4b4a42; }
.summary-row.total{ border-top:1px solid #e9e3d3; margin-top:6px; padding-top:16px; font-family:'Fraunces',serif; font-size:18px; color:var(--black); }
@media(max-width:900px){ .cart-grid{ grid-template-columns:1fr; } .cart-summary{ position:static; } }

/* Checkout */
.checkout-grid{ display:grid; grid-template-columns:1.5fr 1fr; gap:44px; align-items:start; }
.checkout-form{ display:flex; flex-direction:column; gap:16px; border:1px solid #e9e3d3; padding:32px; background:#fff; }
.checkout-form h3{ font-size:16px; }
.checkout-form h3.pt{ margin-top:6px; padding-top:20px; border-top:1px solid #e9e3d3; }
.checkout-form label{ display:flex; flex-direction:column; gap:6px; font-size:12.5px; color:#6b6a5f; }
.checkout-form input{ border:1px solid #d8d2bd; padding:11px 13px; font-size:14px; outline:none; }
.checkout-form input:focus{ border-color:var(--gold); }
.form-row-2{ display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.checkout-success{ display:flex; flex-direction:column; align-items:center; text-align:center; gap:14px; padding:100px 20px; color:var(--green); }
.checkout-success p{ max-width:420px; }
@media(max-width:900px){ .checkout-grid{ grid-template-columns:1fr; } }
@media(max-width:520px){ .form-row-2{ grid-template-columns:1fr; } }
`;
