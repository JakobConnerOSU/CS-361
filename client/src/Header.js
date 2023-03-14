import { Link, useLocation } from 'react-router-dom';

function Header() {
    const { pathname } = useLocation();

    return(
        <div className="navbar navbar-expand-lg bg-dark mb-5">
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="#">CS 361 Project</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to="/" className={`nav-link text-white ${pathname === "/" ? " text-decoration-underline" : ""}`}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/budget" className={`nav-link text-white ${pathname === "/budget" ? " text-decoration-underline" : ""}`}>
                                Budget
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/plans" className={`nav-link text-white ${pathname === "/plans" ? " text-decoration-underline" : ""}`}>
                                Plans
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;