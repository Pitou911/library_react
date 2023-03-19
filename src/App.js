import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Books from "./components/pages/Books";
import BookInfo from "./components/pages/BookInfo";
import Nav from "./components/Nav";
import { books } from "./data";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/pages/Cart";
import React, { useState } from "react";

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

  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) =>
        item.id === book.id
          ? {
              ...item,
              quantity: +quantity,
            }
          : item
      )
    );
  }

  function removeItem(item) {
    setCart(cart.filter((book) => book.id !== item.id));
  }

  function numberOfItem() {
    let counter = 0;
    cart.forEach((item) => {
      counter += item.quantity;
    });
    return counter;
  }

  // useEffect(() => {
  //   console.log(cart);
  // }, [cart]);
  return (
    <Router>
      <div className='App'>
        <Nav numberOfItem={numberOfItem()} />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/books' element={<Books books={books} />} />
          <Route
            path='/books/:id'
            element={<BookInfo books={books} addToCart={addToCart} />}
          />
          <Route
            path='/cart'
            element={
              <Cart
                books={books}
                cart={cart}
                changeQuantity={changeQuantity}
                removeItem={removeItem}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
