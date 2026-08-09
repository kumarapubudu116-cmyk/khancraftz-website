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
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div className="app">

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
          background: #0b0b0a;
          color: #d6b86a;
          text-align: center;
          padding: 9px;
          font-size: 12px;
          letter-spacing: 1px;
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
          border: none;
          background: none;
          color: #d6b86a;
          font-size: 20px;
          font-weight: bold;
          letter-spacing: 5px;
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

        .cartbutton {
          border: 1px solid #80692e;
          padding: 10px 15px;
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
            radial-gradient(circle at center, #302a18, #080807 70%);
          color: white;
          min-height: 620px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 80px 20px;
        }

        .hero-content {
          max-width: 850px;
        }

        .eyebrow {
          color: #d6b86a;
          text-transform: uppercase;
          letter-spacing: 4px;
          font-size: 12px;
          margin-bottom: 20px;
        }

        .hero h1 {
          font-family: Georgia, serif;
          font-size: clamp(45px, 7vw, 82px);
          line-height: 1;
          margin-bottom: 25px;
        }

        .hero h1 span {
          color: #d6b86a;
        }

        .hero p {
          color: #c9c6b9;
          max-width: 650px;
          margin: auto;
          line-height: 1.8;
          font-size: 17px;
        }

        .buttons {
          margin-top: 35px;
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .goldbutton {
          background: #c6a15b;
          color: #111;
          border: none;
          padding: 15px 28px;
          font-weight: bold;
          letter-spacing: 1px;
        }

        .outlinebutton {
          background: transparent;
          color: white;
          border: 1px solid #aaa;
          padding: 15px 28px;
        }

        .section {
          max-width: 1200px;
          margin: auto;
          padding: 90px 25px;
        }

        .sectiontitle {
          text-align: center;
          margin-bottom: 50px;
        }

        .sectiontitle small {
          color: #96772f;
          text-transform: uppercase;
          letter-spacing: 3px;
        }

        .sectiontitle h2 {
          font-family: Georgia, serif;
          font-size: 42px;
          margin-top: 10px;
        }

        .products {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }

        .product {
          background: white;
          border: 1px solid #e2dccb;
        }

        .productimage {
          height: 270px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .seed {
          width: 110px;
          height: 150px;
          border-radius: 55% 45% 50% 50%;
          transform: rotate(25deg);
          background: rgba(255,255,255,.12);
          border: 2px solid rgba(255,255,255,.4);
        }

        .badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: #111;
          color: #d6b86a;
          padding: 7px 10px;
          font-size: 10px;
          text-transform: uppercase;
        }

        .productinfo {
          padding: 22px;
        }

        .origin {
          color: #9b7d37;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .productinfo h3 {
          font-family: Georgia, serif;
          font-size: 21px;
          margin: 8px 0;
        }

        .scientific {
          color: #888;
          font-size: 13px;
          font-style: italic;
        }

        .price {
          font-family: Georgia, serif;
          font-size: 23px;
          margin: 18px 0;
        }

        .addbutton {
          width: 100%;
          background: #111;
          color: #d6b86a;
          border: 1px solid #111;
          padding: 13px;
          font-weight: bold;
        }

        .addbutton:hover {
          background: #c6a15b;
          color: #111;
        }

        .about {
          background: #eee8d9;
        }

        .aboutgrid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 70px;
          align-items: center;
        }

        .about h2 {
          font-family: Georgia, serif;
          font-size: 45px;
          margin-bottom: 20px;
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
          padding: 25px;
          border-left: 3px solid #c6a15b;
        }

        .value h3 {
          font-family: Georgia, serif;
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
          padding: 15px 0;
          border-bottom: 1px solid #39372d;
        }

        .remove {
          background: none;
          border: none;
          color: #d46b6b;
          margin-left: 15px;
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
          padding: 45px 20px;
        }

        .footer strong {
          color: #d6b86a;
          letter-spacing: 4px;
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
          }

          .products {
            grid-template-columns: 1fr;
          }

          .aboutgrid {
            grid-template-columns: 1fr;
          }

          .sectiontitle h2 {
            font-size: 34px;
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
                    background: `linear-gradient(145deg, ${product.color}, #172116)`,
                  }}
                >
                  <div className="badge">
                    {product.category}
                  </div>

                  <div className="seed"></div>
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

                  <button
                    className="addbutton"
                    onClick={() => addToCart(product)}
                  >
                    ADD TO CART
                  </button>

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

                <p style={{ textAlign: "center", color: "#aaa" }}>
                  Your cart is empty.
                </p>

              ) : (

                <>
                  {cart.map((item, index) => (

                    <div className="cartitem" key={`${item.id}-${index}`}>

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

    </div>
  );
}

export default App;
