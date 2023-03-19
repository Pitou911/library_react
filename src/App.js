import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Books from "./components/pages/Books";
import BookInfo from "./components/pages/BookInfo";
import Nav from "./components/Nav";
import { books } from "./data";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/pages/Cart";
import React, { useEffect, useState } from "react";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    // User can spam add to cart

    const dupeItem = cart.find((item) => +item.id === +book.id);
    if (dupeItem) {
      setCart(
        cart.map((item) => {
          if (item.id === dupeItem.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        })
      );
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }

    // setCart([...cart, book]);
  }

  useEffect(() => {
    console.log(cart);
  }, [cart]);
  return (
    <Router>
      <div className='App'>
        <Nav />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/books' element={<Books books={books} />} />
          <Route
            path='/books/:id'
            element={<BookInfo books={books} addToCart={addToCart} />}
          />
          <Route path='/cart' element={<Cart books={books} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
