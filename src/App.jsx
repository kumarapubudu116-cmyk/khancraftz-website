import React, { useState } from "react";

const products = [
  {
    id: 1,
    name: "Red Lady Papaya Seeds",
    scientific: "Carica papaya 'Red Lady'",
    price: 9.50,
    pack: "15 seeds",
    origin: "Thailand",
    category: "Tropical Seeds",
    color: "#b84b32",
    description:
      "A productive tropical papaya variety known for sweet, deep-orange fruit and reliable growth."
  },
  {
    id: 2,
    name: "Soursop Seeds",
    scientific: "Annona muricata",
    price: 12.00,
    pack: "8 seeds",
    origin: "Sri Lanka",
    category: "Fruit Trees",
    color: "#31533a",
    description:
      "Grow your own tropical soursop tree with fresh seeds selected for healthy germination."
  },
  {
    id: 3,
    name: "Jackfruit Seeds",
    scientific: "Artocarpus heterophyllus",
    price: 14.00,
    pack: "4 seeds",
    origin: "India",
    category: "Fruit Trees",
    color: "#76661e",
    description:
      "A magnificent tropical fruit tree producing large, sweet and aromatic jackfruit."
  },
  {
    id: 4,
    name: "Red Cacao Seeds",
    scientific: "Theobroma cacao",
    price: 22.00,
    pack: "6 seeds",
    origin: "Peru",
    category: "Rare Seeds",
    color: "#602719",
    description:
      "Rare cacao seeds for collectors and growers interested in growing their own chocolate tree."
  },
  {
    id: 5,
    name: "Miyazaki Mango Seeds",
    scientific: "Mangifera indica",
    price: 35.00,
    pack: "2 seeds",
    origin: "Japan",
    category: "Rare Seeds",
    color: "#a73543",
    description:
      "An exclusive mango variety inspired by the famous Japanese Miyazaki mango."
  },
  {
    id: 6,
    name: "Purple Passionfruit Seeds",
    scientific: "Passiflora edulis",
    price: 8.00,
    pack: "20 seeds",
    origin: "Colombia",
    category: "Tropical Seeds",
    color: "#563267",
    description:
      "Fast-growing passionfruit vines with beautiful flowers and delicious purple fruit."
  }
];

function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [menu, setMenu] = useState(false);

  const addToCart = (product) => {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);

      if (found) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const changeQuantity = (id, amount) => {
    setCart((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 7.5;
  const total = subtotal + shipping;

  const goTo = (target) => {
    setPage(target);
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="khancraftz">
      <style>{styles}</style>

      {/* TOP BAR */}
      <div className="topbar">
        Free worldwide shipping on orders over $75
      </div>

      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <button className="mobile-menu" onClick={() => setMenu(!menu)}>
            {menu ? "✕" : "☰"}
          </button>

          <button className="logo" onClick={() => goTo("home")}>
            <span className="logo-k">K</span>
            <span>KHANCRAFTZ</span>
          </button>

          <nav className={menu ? "nav open" : "nav"}>
            <button onClick={() => goTo("home")}>Home</button>
            <button onClick={() => goTo("shop")}>Shop</button>
            <button onClick={() => goTo("about")}>Our Story</button>
            <button onClick={() => goTo("contact")}>Contact</button>
          </nav>

          <button className="cart-button" onClick={() => goTo("cart")}>
            Cart
            {cartCount > 0 && <span>{cartCount}</span>}
          </button>
        </div>
      </header>

      {/* CONTENT */}
      {page === "home" && (
        <>
          <section className="hero">
            <div className="hero-content">
              <p className="eyebrow">RARE • EXOTIC • TROPICAL</p>

              <h1>
                Rare Seeds
                <br />
                For Extraordinary Gardens
              </h1>

              <p className="hero-text">
                Discover hand-selected tropical fruit seeds from around the
                world. Carefully packed for collectors, growers and passionate
                gardeners.
              </p>

              <div className="hero-buttons">
                <button className="gold-button" onClick={() => goTo("shop")}>
                  Shop Collection
                </button>

                <button
                  className="outline-button"
                  onClick={() => goTo("about")}
                >
                  Our Story
                </button>
              </div>

              <div className="countries">
                <span>SRI LANKA</span>
                <span>JAPAN</span>
                <span>PERU</span>
                <span>THAILAND</span>
                <span>INDIA</span>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section-title">
              <p className="eyebrow dark">THE COLLECTION</p>
              <h2>Featured Seeds</h2>
              <p>
                Rare tropical varieties selected for growers who want
                something different.
              </p>
            </div>

            <div className="products">
              {products.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </div>

            <div className="center">
              <button
                className="dark-button"
                onClick={() => goTo("shop")}
              >
                View All Seeds
              </button>
            </div>
          </section>

          <section className="features">
            <div className="section-title">
              <p className="eyebrow dark">WHY KHANCRAFTZ</p>
              <h2>More Than Just Seeds</h2>
            </div>

            <div className="feature-grid">
              <Feature
                icon="✦"
                title="Rare Varieties"
                text="Discover unusual tropical fruit varieties that are difficult to find."
              />

              <Feature
                icon="✓"
                title="Carefully Selected"
                text="Every seed pack is prepared with care for growers and collectors."
              />

              <Feature
                icon="✈"
                title="Worldwide Shipping"
                text="We prepare and ship seed orders for customers around the world."
              />

              <Feature
                icon="♧"
                title="Grower Support"
                text="Growing information is provided to help you start successfully."
              />
            </div>
          </section>

          <section className="dark-section">
            <div>
              <p className="eyebrow">GROW SOMETHING RARE</p>
              <h2>Your next garden story starts with a seed.</h2>
              <p>
                Explore our collection of tropical fruit and rare exotic seeds.
              </p>
            </div>

            <button className="gold-button" onClick={() => goTo("shop")}>
              Explore Collection
            </button>
          </section>
        </>
      )}

      {/* SHOP */}
      {page === "shop" && (
        <section className="section page">
          <div className="page-heading">
            <p className="eyebrow dark">THE COLLECTION</p>
            <h1>Rare & Exotic Seeds</h1>
            <p>
              Hand-selected tropical fruit seeds for growers and collectors.
            </p>
          </div>

          <div className="products">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </section>
      )}

      {/* ABOUT */}
      {page === "about" && (
        <section className="section page">
          <div className="page-heading">
            <p className="eyebrow dark">OUR STORY</p>
            <h1>Seeds With A Story</h1>
          </div>

          <div className="about">
            <div>
              <h2>Welcome to Khancraftz</h2>

              <p>
                Khancraftz was created for people who love discovering unusual
                plants and growing something truly special.
              </p>

              <p>
                From tropical fruit trees to rare cacao and exotic varieties,
                our collection is focused on seeds that bring character,
                beauty and discovery to your garden.
              </p>

              <p>
                We believe every seed has potential. Our goal is to make rare
                tropical varieties more accessible to growers around the
                world.
              </p>
            </div>

            <div className="about-card">
              <div className="big-k">K</div>
              <h3>KHANCRAFTZ</h3>
              <p>Rare & Exotic Tropical Seeds</p>
            </div>
          </div>
        </section>
      )}

      {/* CONTACT */}
      {page === "contact" && (
        <section className="section page">
          <div className="page-heading">
            <p className="eyebrow dark">GET IN TOUCH</p>
            <h1>Contact Khancraftz</h1>
            <p>
              Questions about seeds, orders or growing? We'd love to hear from
              you.
            </p>
          </div>

          <div className="contact">
            <div className="contact-info">
              <h2>Let's Talk</h2>
              <p>
                Send us a message and we'll get back to you as soon as
                possible.
              </p>

              <div className="contact-item">
                <strong>Email</strong>
                <span>hello@khancraftz.com</span>
              </div>

              <div className="contact-item">
                <strong>Worldwide Shipping</strong>
                <span>Available to many destinations worldwide</span>
              </div>
            </div>

            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! Your message has been received.");
              }}
            >
              <label>
                Name
                <input required type="text" placeholder="Your name" />
              </label>

              <label>
                Email
                <input required type="email" placeholder="Your email" />
              </label>

              <label>
                Message
                <textarea
                  required
                  rows="6"
                  placeholder="How can we help?"
                />
              </label>

              <button className="gold-button" type="submit">
                Send Message
              </button>
            </form>
          </div>
        </section>
      )}

      {/* CART */}
      {page === "cart" && (
        <section className="section page">
          <div className="page-heading">
            <p className="eyebrow dark">YOUR SELECTION</p>
            <h1>Shopping Cart</h1>
          </div>

          {cart.length === 0 ? (
            <div className="empty">
              <h2>Your cart is empty</h2>
              <p>Discover something rare for your garden.</p>
              <button className="gold-button" onClick={() => goTo("shop")}>
                Browse Seeds
              </button>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div
                      className="cart-image"
                      style={{ background: item.color }}
                    >
                      K
                    </div>

                    <div className="cart-info">
                      <h3>{item.name}</h3>
                      <p>{item.pack}</p>
                      <strong>${item.price.toFixed(2)}</strong>
                    </div>

                    <div className="quantity">
                      <button
                        onClick={() => changeQuantity(item.id, -1)}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => changeQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="summary">
                <h2>Order Summary</h2>

                <div>
                  <span>Subtotal</span>
                  <strong>${subtotal.toFixed(2)}</strong>
                </div>

                <div>
                  <span>Shipping</span>
                  <strong>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </strong>
                </div>

                <hr />

                <div className="total">
                  <span>Total</span>
                  <strong>${total.toFixed(2)}</strong>
                </div>

                <button
                  className="gold-button full"
                  onClick={() => alert("Checkout system coming next.")}
                >
                  Proceed to Checkout
                </button>

                <button
                  className="continue"
                  onClick={() => goTo("shop")}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div>
            <button className="footer-logo" onClick={() => goTo("home")}>
              <span>K</span> KHANCRAFTZ
            </button>

            <p>
              Rare and exotic tropical seeds for passionate growers and
              collectors.
            </p>
          </div>

          <div>
            <h4>Shop</h4>
            <button onClick={() => goTo("shop")}>All Seeds</button>
            <button onClick={() => goTo("shop")}>Fruit Trees</button>
            <button onClick={() => goTo("shop")}>Rare Seeds</button>
          </div>

          <div>
            <h4>Company</h4>
            <button onClick={() => goTo("about")}>Our Story</button>
            <button onClick={() => goTo("contact")}>Contact</button>
          </div>

          <div>
            <h4>Khancraftz</h4>
            <p>Rare. Tropical. Carefully selected.</p>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Khancraftz. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <div
        className="product-image"
        style={{
          background: `linear-gradient(145deg, ${product.color}, #17160f)`
        }}
      >
        <span className="product-k">K</span>
        <small>{product.category}</small>
      </div>

      <div className="product-info">
        <span className="origin">{product.origin}</span>

        <h3>{product.name}</h3>

        <i>{product.scientific}</i>

        <p>{product.description}</p>

        <div className="product-bottom">
          <div>
            <strong>${product.price.toFixed(2)}</strong>
            <span>{product.pack}</span>
          </div>

          <button onClick={() => addToCart(product)}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="feature">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Manrope:wght@400;500;600;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: #faf7ef;
}

button,
input,
textarea {
  font-family: inherit;
}

button {
  cursor: pointer;
}

.khancraftz {
  min-height: 100vh;
  color: #111110;
  background: #faf7ef;
  font-family: 'Manrope', sans-serif;
}

.topbar {
  background: #0b0b0a;
  color: #e7c878;
  text-align: center;
  padding: 9px 15px;
  font-size: 11px;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(11,11,10,.97);
  border-bottom: 1px solid rgba(198,161,91,.3);
}

.header-inner {
  max-width: 1240px;
  margin: auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 35px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  color: #faf7ef;
  font-family: 'Fraunces', serif;
  font-size: 16px;
  letter-spacing: .16em;
}

.logo-k {
  width: 35px;
  height: 35px;
  border: 1px solid #c6a15b;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #e7c878;
  font-size: 17px;
}

.nav {
  display: flex;
  gap: 28px;
  flex: 1;
}

.nav button,
.cart-button {
  background: none;
  border: none;
  color: #cfc9b8;
  font-size: 13px;
}

.nav button:hover,
.cart-button:hover {
  color: #e7c878;
}

.cart-button {
  position: relative;
}

.cart-button span {
  position: absolute;
  top: -12px;
  right: -14px;
  width: 18px;
  height: 18px;
  background: #c6a15b;
  color: #0b0b0a;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 10px;
  font-weight: 700;
}

.mobile-menu {
  display: none;
  background: none;
  border: none;
  color: #faf7ef;
  font-size: 22px;
}

.hero {
  min-height: 680px;
  background:
    radial-gradient(circle at 50% 0%, rgba(198,161,91,.2), transparent 50%),
    #0b0b0a;
  color: #faf7ef;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 90px 24px;
}

.hero-content {
  max-width: 800px;
}

.eyebrow {
  color: #e7c878;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
}

.eyebrow.dark {
  color: #8c6a2e;
}

.hero h1 {
  font-family: 'Fraunces', serif;
  font-size: clamp(42px, 7vw, 72px);
  font-weight: 500;
  line-height: 1.04;
  margin: 22px 0;
}

.hero-text {
  color: #cfc9b8;
  max-width: 600px;
  margin: auto;
  line-height: 1.8;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 35px 0 55px;
  flex-wrap: wrap;
}

.gold-button,
.dark-button,
.outline-button {
  border: 1px solid #c6a15b;
  padding: 14px 25px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.gold-button {
  background: #c6a15b;
  color: #0b0b0a;
}

.gold-button:hover {
  background: #e7c878;
}

.outline-button {
  background: transparent;
  color: #faf7ef;
  border-color: rgba(255,255,255,.35);
}

.dark-button {
  background: #0b0b0a;
  color: #e7c878;
}

.countries {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 25px;
  padding-top: 25px;
  border-top: 1px solid rgba(198,161,91,.3);
  color: #777363;
  font-size: 10px;
  letter-spacing: .15em;
}

.section {
  max-width: 1240px;
  margin: auto;
  padding: 90px 24px;
}

.section-title,
.page-heading {
  text-align: center;
  max-width: 650px;
  margin: 0 auto 50px;
}

.section-title h2,
.page-heading h1 {
  font-family: 'Fraunces', serif;
  font-weight: 500;
  font-size: clamp(32px, 5vw, 45px);
  margin: 12px 0;
}

.section-title p:last-child,
.page-heading p:last-child {
  color: #666257;
  line-height: 1.7;
}

.products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
}

.product-card {
  background: white;
  border: 1px solid #e8e1d2;
}

.product-image {
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
}

.product-k {
  color: rgba(255,255,255,.18);
  font-family: 'Fraunces', serif;
  font-size: 110px;
}

.product-image small {
  position: absolute;
  left: 12px;
  top: 12px;
  color: #e7c878;
  background: rgba(0,0,0,.5);
  padding: 6px 9px;
  font-size: 9px;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.product-info {
  padding: 20px;
}

.origin {
  color: #8c6a2e;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: .12em;
}

.product-info h3 {
  font-family: 'Fraunces', serif;
  font-size: 20px;
  font-weight: 500;
  margin: 8px 0 4px;
}

.product-info i {
  color: #969284;
  font-size: 12px;
}

.product-info p {
  color: #67645a;
  font-size: 13px;
  line-height: 1.65;
  min-height: 65px;
}

.product-bottom {
  border-top: 1px solid #eee9df;
  padding-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.product-bottom div {
  display: flex;
  flex-direction: column;
}

.product-bottom strong {
  font-family: 'Fraunces', serif;
  font-size: 19px;
}

.product-bottom span {
  color: #999589;
  font-size: 10px;
}

.product-bottom button {
  background: #0b0b0a;
  color: #e7c878;
  border: none;
  padding: 10px 14px;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 700;
}

.center {
  text-align: center;
  margin-top: 45px;
}

.features {
  background: #f1ebdc;
  border-top: 1px solid #e5dece;
  border-bottom: 1px solid #e5dece;
  padding: 85px 24px;
}

.feature-grid {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 35px;
}

.feature {
  text-align: center;
}

.feature-icon {
  color: #8c6a2e;
  font-size: 28px;
  margin-bottom: 15px;
}

.feature h3 {
  font-family: 'Fraunces', serif;
  font-size: 19px;
  font-weight: 500;
}

.feature p {
  color: #666257;
  font-size: 13px;
  line-height: 1.7;
}

.dark-section {
  background: #0b0b0a;
  color: white;
  padding: 80px max(24px, calc((100% - 1190px) / 2));
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

.dark-section h2 {
  font-family: 'Fraunces', serif;
  font-size: clamp(30px, 4vw, 45px);
  font-weight: 500;
  max-width: 650px;
  margin: 12px 0;
}

.dark-section p:last-child {
  color: #aaa596;
}

.page {
  min-height: 650px;
}

.about,
.contact,
.cart-layout {
  max-width: 1000px;
  margin: auto;
}

.about {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 60px;
}

.about h2,
.contact h2 {
  font-family: 'Fraunces', serif;
  font-size: 35px;
  font-weight: 500;
}

.about p,
.contact p {
  color: #5e5b52;
  line-height: 1.9;
  margin-bottom: 18px;
}

.about-card {
  background: #0b0b0a;
  min-height: 300px;
  display: grid;
  place-items: center;
  align-content: center;
  color: #e7c878;
  text-align: center;
}

.big-k {
  font-family: 'Fraunces', serif;
  font-size: 100px;
  border: 1px solid #c6a15b;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  display: grid;
  place-items: center;
}

.contact {
  display: grid;
  grid-template-columns: .8fr 1.2fr;
  gap: 60px;
}

.contact-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 25px 0;
}

.contact-item strong {
  color: #8c6a2e;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: .1em;
}

.contact-item span {
  color: #555249;
}

.form {
  background: white;
  border: 1px solid #e6dfd0;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form label {
  display: flex;
  flex-direction: column;
  gap: 7px;
  color: #666257;
  font-size: 12px;
}

.form input,
.form textarea {
  border: 1px solid #d8d1c1;
  padding: 13px;
  outline: none;
  font-size: 14px;
}

.empty {
  text-align: center;
  padding: 80px 20px;
}

.empty h2 {
  font-family: 'Fraunces', serif;
  font-size: 30px;
}

.cart-layout {
  display: grid;
  grid-template-columns: 1.6fr .8fr;
  gap: 35px;
  align-items: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cart-item {
  background: white;
  border: 1px solid #e6dfd0;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.cart-image {
  width: 75px;
  height: 75px;
  display: grid;
  place-items: center;
  color: rgba(255,255,255,.3);
  font-family: 'Fraunces', serif;
  font-size: 35px;
}

.cart-info {
  flex: 1;
}

.cart-info h3 {
  font-family: 'Fraunces', serif;
  font-size: 17px;
  margin: 0 0 5px;
}

.cart-info p {
  color: #999589;
  font-size: 11px;
}

.quantity {
  display: flex;
  border: 1px solid #d8d1c1;
}

.quantity button {
  border: none;
  background: white;
  padding: 7px 10px;
}

.quantity span {
  padding: 7px 12px;
}

.remove {
  background: none;
  border: none;
  color: #9a9384;
  font-size: 11px;
}

.summary {
  background: white;
  border: 1px solid #e6dfd0;
  padding: 25px;
  position: sticky;
  top: 100px;
}

.summary h2 {
  font-family: 'Fraunces', serif;
  font-size: 22px;
  margin-top: 0;
}

.summary > div {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  color: #5e5b52;
  font-size: 13px;
}

.summary hr {
  border: none;
  border-top: 1px solid #e6dfd0;
}

.summary .total {
  font-family: 'Fraunces', serif;
  font-size: 19px;
  color: #111110;
}

.full {
  width: 100%;
  margin-top: 15px;
}

.continue {
  width: 100%;
  background: none;
  border: none;
  padding: 14px;
  color: #666257;
  text-decoration: underline;
}

footer {
  background: #0b0b0a;
  color: #aaa596;
  padding-top: 60px;
}

.footer-grid {
  max-width: 1200px;
  margin: auto;
  padding: 0 24px 45px;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 40px;
}

.footer-grid h4 {
  color: #e7c878;
  text-transform: uppercase;
  letter-spacing: .1em;
  font-size: 11px;
}

.footer-grid p {
  color: #888273;
  font-size: 13px;
  line-height: 1.7;
  max-width: 280px;
}

.footer-grid button {
  display: block;
  background: none;
  border: none;
  color: #aaa596;
  padding: 6px 0;
}

.footer-grid button:hover {
  color: #e7c878;
}

.footer-logo {
  color: #faf7ef !important;
  font-family: 'Fraunces', serif;
  font-size: 17px;
  letter-spacing: .12em;
}

.footer-logo span {
  color: #e7c878;
}

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,.1);
  padding: 20px 24px;
  text-align: center;
  font-size: 11px;
  color: #686458;
}

@media (max-width: 900px) {
  .products {
    grid-template-columns: repeat(2, 1fr);
  }

  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .about,
  .contact,
  .cart-layout {
    grid-template-columns: 1fr;
  }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }

  .dark-section {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 650px) {
  .header-inner {
    padding: 12px 16px;
  }

  .mobile-menu {
    display: block;
  }

  .logo {
    margin-right: auto;
    font-size: 13px;
  }

  .nav {
    display: none;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: #0b0b0a;
    flex-direction: column;
    padding: 15px 20px;
    border-top: 1px solid rgba(198,161,91,.2);
  }

  .nav.open {
    display: flex;
  }

  .nav button {
    text-align: left;
    padding: 12px 5px;
  }

  .products {
    grid-template-columns: 1fr;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .footer-grid {
    grid-template-columns: 1fr;
  }

  .cart-item {
    flex-wrap: wrap;
  }

  .cart-info {
    min-width: 180px;
  }

  .hero {
    min-height: 600px;
    padding: 70px 20px;
  }

  .section {
    padding: 65px 18px;
  }
}
`;

export default App;
