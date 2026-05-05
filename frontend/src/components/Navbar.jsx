import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentState, setCurrentState] = useState("Login");

  return (
    <>
      <nav className="bg-gradient-to-r from-[#6E1A37] to-[#8E2C4A] text-white shadow-lg">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          
          {/* Logo */}
          <h1 className="text-2xl font-bold tracking-wide cursor-pointer">
            Bidyarthi
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-10 text-lg">
            <li className="cursor-pointer hover:text-[#72BAA9] transition">Home</li>
            <li className="cursor-pointer hover:text-[#72BAA9] transition">About</li>
            <li className="cursor-pointer hover:text-[#72BAA9] transition">Contact</li>
          </ul>

          {/* Login Button */}
          <button
            onClick={() => setIsFormOpen(true)}
            className="hidden md:block bg-[#72BAA9] px-5 py-2 rounded-full font-semibold hover:bg-[#5aa897] transition shadow-md"
          >
            Login
          </button>

          {/* Mobile Icon */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#6E1A37] px-6 pb-4">
            <ul className="flex flex-col gap-4 text-lg">
              <li className="hover:text-[#72BAA9] cursor-pointer">Home</li>
              <li className="hover:text-[#72BAA9] cursor-pointer">About</li>
              <li className="hover:text-[#72BAA9] cursor-pointer">Contact</li>
            </ul>

            <button
              onClick={() => setIsFormOpen(true)}
              className="mt-4 w-full bg-[#72BAA9] py-2 rounded-full font-semibold hover:bg-[#5aa897]"
            >
              Login
            </button>
          </div>
        )}
      </nav>

      
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          
          <div className="bg-white text-black w-[70%] max-w-md rounded-2xl p-6 shadow-xl ">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl text-[#8E2C4A] font-bold">{currentState}</h2>
              <X
                className="cursor-pointer"
                onClick={() => setIsFormOpen(false)}
              />
            </div>

            {/* Form */}
            <form className="flex flex-col gap-6">
              
              {currentState === "Sign Up" && (
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE2448]"
                />
              )}

              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE2448]"
              />

              <input
                type="password"
                placeholder="Password"
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE2448]"
              />

              <button className="bg-[#AE2448] text-white py-2 rounded-lg font-semibold hover:bg-[#C94A6A] transition">
                {currentState}
              </button>
            </form>

            {/* Switch Login/Signup */}
            <p className="text-sm mt-4 text-center">
              {currentState === "Login" ? (
                <>
                  Don't have an account?{" "}
                  <span
                    onClick={() => setCurrentState("Sign Up")}
                    className="text-[#AE2448] cursor-pointer font-semibold"
                  >
                    Sign Up
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={() => setCurrentState("Login")}
                    className="text-[#AE2448] cursor-pointer font-semibold"
                  >
                    Login
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;