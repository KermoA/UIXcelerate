import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import HomePage from './pages/HomePage';
import ElementsPage from './pages/ElementsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AddElementForm from "./components/AddElementForm";


function App() {

    return (
            <Router>
                <NavbarComponent />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/elements" element={<ElementsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/add-element" element={<AddElementForm />} />
                </Routes>
            </Router>
    );

    
}

export default App;
