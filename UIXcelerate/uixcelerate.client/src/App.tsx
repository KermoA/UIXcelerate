import './App.css';
import 'monaco-editor/min/vs/editor/editor.main.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import NavbarComponent from './components/Navbar';
import Home from './pages/Home';
import Elements from './pages/Elements';
import Element from './pages/Element';
import About from './pages/About';
import AddElementForm from "./components/AddElementForm";
import ElementEditor from "./pages/ElementEditor";


function App() {

    return (
            <Router>
                <NavbarComponent />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/elements" element={<Elements />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/element/:id" element={<Element />} />
                    <Route path="/admin-login" element={<AdminLogin />} />

                    <Route element={<PrivateRoute />}>
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/add-element" element={<AddElementForm />} />
                        <Route path="/element-editor/:id" element={<ElementEditor />} />
                    </Route>
                </Routes>
            </Router>
    );

    
}

export default App;
