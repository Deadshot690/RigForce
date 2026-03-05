import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Builder", path: "/build" },
        { name: "Features", path: "/features" },
        { name: "About", path: "/about" },
    ];

    return (
        <nav className="absolute top-0 w-full z-50">
            <div className="container flex h-14 max-w-screen-2xl items-center px-4">
                <div className="mr-8 flex items-center gap-2">
                    <Link to="/" className="flex items-center space-x-3">
                        <img src="/RigForce.png" alt="RigForce Logo" className="w-16 h-16 object-contain" />
                        <span className="hidden font-mono font-bold text-lg sm:inline-block">
                            RigForce
                        </span>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`transition-colors hover:text-foreground/80 ${location.pathname === link.path
                                    ? "text-foreground"
                                    : "text-foreground/60"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="ml-4 flex items-center space-x-2">
                        <Link
                            to="/build"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                        >
                            Start Building
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
