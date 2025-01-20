import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="flex bg-stone-500 rounded">
        <nav>

            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/cart">Cart</Link>
        </nav>
        </div>
    )
}

export default Navbar;