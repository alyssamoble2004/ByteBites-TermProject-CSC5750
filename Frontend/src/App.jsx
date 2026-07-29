import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import Menu from "./pages/Menu/Menu";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import OrderHistory from "./pages/OrderHistory/OrderHistory";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/place-order" element={<PlaceOrder />} />
                <Route path="/order-history" element={<OrderHistory />} />
            </Routes>
        </Router>
    );
}

export default App;