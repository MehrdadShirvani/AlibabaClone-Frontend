import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-800 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* Left side: Logo and main links */}
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <img
          src="/images/alibaba.svg"
          alt="Alibaba Logo"
          className="h-10 w-auto"
        />

        {/* Main navigation links */}
        {["Home", "Search", "About"].map((link) => (
          <a
            key={link}
            href={`/${link.toLowerCase() === "home" ? "" : link.toLowerCase()}`}
            className="nav-link px-3 py-1 rounded-md transition-shadow duration-300
                       hover:text-white hover:shadow-md hover:shadow-blue-500/50"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Right side: User menu */}
      <div className="flex items-center space-x-6 text-sm">
        <span className="font-semibold nav-link">Username</span>
        <a
          href="/my-travels"
          className="nav-link px-3 py-1 rounded-md transition-shadow duration-300
                     hover:text-white hover:shadow-md hover:shadow-blue-500/50"
        >
          My Travels
        </a>
        <a
          href="/support"
          className="nav-link px-3 py-1 rounded-md transition-shadow duration-300
                     hover:text-white hover:shadow-md hover:shadow-blue-500/50"
        >
          Online Support
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
