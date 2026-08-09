import React, { useState } from "react";

const products = [
  {
    id: 1,
    name: "Red Atemoya Seeds",
    scientific: "Annona × atemoya",
    price: 18.5,
    pack: "5 Seeds",
    origin: "Philippines",
    category: "Rare",
    color: "#7a1f2b",
    icon: "✦",
  },
  {
    id: 2,
    name: "Soursop Seeds",
    scientific: "Annona muricata",
    price: 12,
    pack: "8 Seeds",
    origin: "Sri Lanka",
    category: "Tropical",
    color: "#1f3d2b",
    icon: "❋",
  },
  {
    id: 3,
    name: "Red Lady Papaya Seeds",
    scientific: "Carica papaya",
    price: 9.5,
    pack: "15 Seeds",
    origin: "Thailand",
    category: "Tropical",
    color: "#b6472f",
    icon: "✿",
  },
  {
    id: 4,
    name: "Jackfruit Seeds",
    scientific: "Artocarpus heterophyllus",
    price: 14,
    pack: "4 Seeds",
    origin: "India",
    category: "Fruit Trees",
    color: "#6b671c",
    icon: "❈",
  },
  {
    id: 5,
    name: "Red Cacao Seeds",
    scientific: "Theobroma cacao",
    price: 22,
    pack: "6 Seeds",
    origin: "Peru",
    category: "Rare",
    color: "#5a2116",
    icon: "✧",
  },
  {
    id: 6,
    name: "Miyazaki Mango Seeds",
    scientific: "Mangifera indica",
    price: 35,
    pack: "2 Seeds",
    origin: "Japan",
    category: "Ultra Rare",
    color: "#a3283f",
    icon: "❀",
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    setMenuOpen(false);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: Arial, sans-serif;
          background: #f8f5ed;
          color: #111;
        }

        button {
          cursor: pointer;
        }

        .topbar {
          background: #090908;
          color: #d6b86a;
          text-align: center;
          padding: 10px;
          font-size: 11px;
          letter-spacing: 2px;
        }

        .header {
          background: #11110f;
          color: white;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid #514421;
        }

        .nav {
          max-width: 1200px;
          margin: auto;
          min-height: 76px;
          padding: 0 25px;
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .logo {
          border: 1px solid #80692e;
          width: 43px;
          height: 43px;
          background: transparent;
          color: #d6b86a;
          font-family: Georgia, serif;
          font-size: 22px;
          font-weight: bold;
          letter-spacing: 0;
        }

        .logo:hover {
          background: #d6b86a;
          color: #111;
        }

        .navlinks {
          display: flex;
          gap: 30px;
          margin-left: auto;
        }

        .navlinks button,
        .cartbutton {
          border: none;
          background: none;
          color: #eee;
          font-size: 14px;
        }

        .navlinks button:hover,
        .cartbutton:hover {
          color: #d6b86a;
        }

        .mobilebutton {
          display: none;
          margin-left: auto;
          background: none;
          border: none;
          color: white;
          font-size: 25px;
        }

        .hero {
          background:
            radial-gradient(
              circle at 50% 40%,
              rgba(91, 77, 39, 0.45),
              transparent 35%
            ),
            radial-gradient(
              circle at 20% 80%,
              rgba(43, 74, 50, 0.35),
              transparent 30%
            ),
            #080807;
          color: white;
          min-height: 650px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 90px 20px;
          position: relative;
          overflow: hidden;
        }

        .hero::before,
        .hero::after {
          content: "";
          position: absolute;
          width: 300px;
          height: 300px;
          border: 1px solid rgba(214, 184, 106, 0.12);
          border-radius: 50%;
        }

        .hero::before {
          left: -150px;
          top: 80px;
        }

        .hero::after {
          right: -150px;
          bottom: 50px;
        }

        .hero-content {
          max-width: 850px;
          position: relative;
          z-index: 2;
        }

        .eyebrow {
          color: #d6b86a;
          text-transform: uppercase;
          letter-spacing: 4px;
          font-size: 11px;
          margin-bottom: 22px;
        }

        .hero h1 {
          font-family: Georgia, serif;
          font-size: clamp(45px, 7vw, 82px);
          line-height: 0.98;
          margin-bottom: 28px;
          font-weight: 500;
        }

        .hero h1 span {
          color: #d6b86a;
          font-style: italic;
        }

        .hero p {
          color: #c9c6b9;
          max-width: 680px;
          margin: auto;
          line-height: 1.9;
          font-size: 16px;
        }

        .buttons {
          margin-top: 38px;
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .goldbutton {
          background: #c6a15b;
          color: #111;
          border: none;
          padding: 15px 30px;
          font-weight: bold;
          letter-spacing: 1px;
          transition: 0.25s;
        }

        .goldbutton:hover {
          background: #e0c47e;
          transform: translateY(-2px);
        }

        .outlinebutton {
          background: transparent;
          color: white;
          border: 1px solid #777;
          padding: 15px 30px;
          transition: 0.25s;
        }

        .outlinebutton:hover {
          border-color: #d6b86a;
          color: #d6b86a;
        }

        .section {
          max-width: 1200px;
          margin: auto;
          padding: 95px 25px;
        }

        .sectiontitle {
          text-align: center;
          margin-bottom: 52px;
        }

        .sectiontitle small {
          color: #96772f;
          text-transform: uppercase;
          letter-spacing: 3px;
          font-size: 11px;
        }

        .sectiontitle h2 {
          font-family: Georgia, serif;
          font-size: 43px;
          font-weight: 500;
          margin-top: 10px;
        }

        .products {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .product {
          background: #fff;
          border: 1px solid #e2dccb;
          transition: 0.3s ease;
          overflow: hidden;
        }

        .product:hover {
          transform: translateY(-7px);
          box-shadow: 0 18px 45px rgba(25, 22, 12, 0.12);
        }

        .productimage {
          height: 285px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .productimage::before {
          content: "";
          position: absolute;
          width: 230px;
          height: 230px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 50%;
        }

        .productimage::after {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 50%;
        }

        .botanical {
          position: relative;
          z-index: 2;
          width: 135px;
          height: 175px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Georgia, serif;
          font-size: 74px;
          color: rgba(255,255,255,0.78);
          text-shadow: 0 8px 25px rgba(0,0,0,0.35);
          transform: rotate(-8deg);
        }

        .botanical::before {
          content: "";
          position: absolute;
          width: 80px;
          height: 150px;
          border-left: 1px solid rgba(255,255,255,0.25);
          transform: rotate(22deg);
        }

        .badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: #111;
          color: #d6b86a;
          padding: 7px 11px;
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          z-index: 4;
        }

        .number {
          position: absolute;
          bottom: 14px;
          right: 17px;
          color: rgba(255,255,255,0.45);
          font-family: Georgia, serif;
          font-size: 13px;
          z-index: 4;
        }

        .productinfo {
          padding: 24px;
        }

        .origin {
          color: #9b7d37;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .productinfo h3 {
          font-family: Georgia, serif;
          font-size: 21px;
          font-weight: 500;
          margin: 9px 0;
        }

        .scientific {
          color: #888;
          font-size: 13px;
          font-style: italic;
        }

        .price {
          font-family: Georgia, serif;
          font-size: 23px;
          margin: 19px 0;
        }

        .price small {
          color: #888;
          font-family: Arial, sans-serif;
          font-size: 11px;
        }

        .addbutton {
          width: 100%;
          background: #111;
          color: #d6b86a;
          border: 1px solid #111;
          padding: 14px;
          font-weight: bold;
          letter-spacing: 1px;
          transition: 0.25s;
        }

        .addbutton:hover {
          background: #c6a15b;
          color: #111;
        }

        .about {
          background:
            radial-gradient(
              circle at 80% 20%,
              rgba(198, 161, 91, 0.12),
              transparent 30%
            ),
            #eee8d9;
        }

        .aboutgrid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 70px;
          align-items: center;
        }

        .about h2 {
          font-family: Georgia, serif;
          font-size: 48px;
          font-weight: 500;
          margin-bottom: 25px;
          line-height: 1.05;
        }

        .about p {
          color: #555;
          line-height: 1.9;
          margin-bottom: 15px;
        }

        .values {
          display: grid;
          gap: 15px;
        }

        .value {
          background: white;
          padding: 26px;
          border-left: 3px solid #c6a15b;
          transition: 0.25s;
        }

        .value:hover {
          transform: translateX(5px);
        }

        .value h3 {
          font-family: Georgia, serif;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .value p {
          margin: 0;
          font-size: 14px;
        }

        .cartsection {
          background: #11110f;
          color: white;
        }

        .cartbox {
          max-width: 700px;
          margin: auto;
          background: #1b1b18;
          padding: 30px;
          border: 1px solid #554723;
        }

        .cartitem {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #39372d;
          gap: 15px;
        }

        .remove {
          background: none;
          border: none;
          color: #d46b6b;
          margin-left: 15px;
        }

        .remove:hover {
          color: #ff9b9b;
        }

        .total {
          display: flex;
          justify-content: space-between;
          margin-top: 25px;
          font-size: 22px;
          color: #d6b86a;
        }

        .footer {
          background: #080807;
          color: #aaa;
          text-align: center;
          padding: 48px 20px;
        }

        .footer strong {
          color: #d6b86a;
          letter-spacing: 5px;
          font-family: Georgia, serif;
        }

        @media(max-width: 900px) {
          .products {
            grid-template-columns: repeat(2, 1fr);
          }

          .aboutgrid {
            grid-template-columns: 1fr;
          }
        }

        @media(max-width: 800px) {
          .navlinks {
            display: none;
          }

          .mobilebutton {
            display: block;
          }

          .navlinks.open {
            display: flex;
            position: absolute;
            top: 76px;
            left: 0;
            right: 0;
            background: #11110f;
            flex-direction: column;
            padding: 20px 25px;
            gap: 20px;
            border-bottom: 1px solid #514421;
          }
        }

        @media(max-width: 600px) {
          .products {
            grid-template-columns: 1fr;
          }

          .section {
            padding: 70px 18px;
          }

          .sectiontitle h2 {
            font-size: 34px;
          }

          .about h2 {
            font-size: 40px;
          }

          .hero {
            min-height: 590px;
          }

          .hero h1 {
            font-size: 48px;
          }

          .cartitem {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="topbar">
        FREE WORLDWIDE SHIPPING ON ORDERS OVER $75
      </div>

      <header className="header">
        <nav className="nav">
          <button className="logo" onClick={() => scrollTo("home")}>
            K
          </button>

          <div className={`navlinks ${menuOpen ? "open" : ""}`}>
            <button onClick={() => scrollTo("home")}>Home</button>
            <button onClick={() => scrollTo("shop")}>Shop</button>
            <button onClick={() => scrollTo("about")}>About</button>
            <button onClick={() => scrollTo("cart")}>
              Cart ({cart.length})
            </button>
          </div>

          <button
            className="mobilebutton"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="eyebrow">
              Rare Seed House · Est. for Collectors & Growers
            </div>

            <h1>
              Rare & Exotic
              <br />
              <span>Seeds</span> for Your Garden
            </h1>

            <p>
              Hand-selected tropical fruit seeds sourced from heritage
              growers across Sri Lanka, Japan, Thailand, India and beyond.
              Packed with care and shipped worldwide.
            </p>

            <div className="buttons">
              <button
                className="goldbutton"
                onClick={() => scrollTo("shop")}
              >
                SHOP COLLECTION
              </button>

              <button
                className="outlinebutton"
                onClick={() => scrollTo("about")}
              >
                OUR STORY
              </button>
            </div>
          </div>
        </section>

        <section className="section" id="shop">
          <div className="sectiontitle">
            <small>Featured Rarities</small>
            <h2>This Season's Selection</h2>
          </div>

          <div className="products">
            {products.map((product) => (
              <article className="product" key={product.id}>
                <div
                  className="productimage"
                  style={{
                    background: `
                      radial-gradient(
                        circle at 50% 50%,
                        ${product.color},
                        #172116 85%
                      )
                    `,
                  }}
                >
                  <div className="badge">{product.category}</div>

                  <div className="botanical">
                    {product.icon}
                  </div>

                  <div className="number">
                    0{product.id}
                  </div>
                </div>

                <div className="productinfo">
                  <div className="origin">
                    {product.origin}
                  </div>

                  <h3>{product.name}</h3>

                  <div className="scientific">
                    {product.scientific}
                  </div>

                  <div className="price">
                    ${product.price.toFixed(2)}
                    <small> · {product.pack}</small>
                  </div>

                  <div className="productbuttons">
  <button
    className="detailsbutton"
    onClick={() => setSelectedProduct(product)}
  >
    VIEW DETAILS
  </button>

  <button
    className="addbutton"
    .productbuttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.detailsbutton {
  width: 100%;
  background: transparent;
  color: #111;
  border: 1px solid #b8aa83;
  padding: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  transition: 0.25s;
}

.detailsbutton:hover {
  background: #eee8d9;
  border-color: #96772f;
}

.productbuttons .addbutton {
  width: 100%;
}
    onClick={() => addToCart(product)}
  >
    ADD TO CART
  </button>
</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about" id="about">
          <div className="section aboutgrid">
            <div>
              <div className="eyebrow">The Khancraftz Story</div>

              <h2>
                Seeds,
                <br />
                Sourced With
                <br />
                Reverence.
              </h2>

              <p>
                Khancraftz was created for growers and collectors who want
                something truly special.
              </p>

              <p>
                We focus on rare and exotic tropical fruit seeds, carefully
                selected from trusted growers and heritage varieties.
              </p>

              <p>
                Every seed represents the beginning of something remarkable:
                a tree, a harvest, and a story that can continue for
                generations.
              </p>
            </div>

            <div className="values">
              <div className="value">
                <h3>Hand Selected</h3>
                <p>
                  Carefully selected varieties for collectors and serious
                  growers.
                </p>
              </div>

              <div className="value">
                <h3>Global Shipping</h3>
                <p>
                  Carefully packed orders prepared for international
                  delivery.
                </p>
              </div>

              <div className="value">
                <h3>Grower Support</h3>
                <p>
                  Practical growing information included with every variety.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="cartsection" id="cart">
          <div className="section">
            <div className="sectiontitle">
              <small>Your Selection</small>
              <h2 style={{ color: "white" }}>
                Shopping Cart
              </h2>
            </div>

            <div className="cartbox">
              {cart.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    color: "#aaa",
                  }}
                >
                  Your cart is empty.
                </p>
              ) : (
                <>
                  {cart.map((item, index) => (
                    <div
                      className="cartitem"
                      key={`${item.id}-${index}`}
                    >
                      <span>{item.name}</span>

                      <span>
                        ${item.price.toFixed(2)}

                        <button
                          className="remove"
                          onClick={() => removeFromCart(index)}
                        >
                          Remove
                        </button>
                      </span>
                    </div>
                  ))}

                  <div className="total">
                    <span>Total</span>
                    <strong>${total.toFixed(2)}</strong>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <strong>KHANCRAFTZ</strong>

        <p style={{ marginTop: "15px" }}>
          Rare & Exotic Tropical Seeds
        </p>

        <p style={{ marginTop: "20px", fontSize: "12px" }}>
          © {new Date().getFullYear()} Khancraftz. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default App;
