import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductContainer from './components/ProductContainer';


function App() {
  return (
    <div className='App'>
      <ProductContainer />

      <footer>
        <p>&copy; 2024 My E-Commerce Store</p>
       </footer>
    </div>
  );
}

export default App;
