import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Books from "./components/pages/Books";
import BookInfo from "./components/pages/BookInfo";
import Nav from "./components/Nav";
import { books } from "./data";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/pages/Cart";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([])
  return (
    <Router>
      <div className='App'>
        <Nav />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/books' element={<Books books={books} />} />
          <Route path='/books/:id' element={<BookInfo books={books} />} />
          <Route path='/cart' element={<Cart books={books} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
