// Navbar UI
// Login and Register user with handlers

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
  //form data
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");

  //api from .env
  const API = import.meta.env.VITE_API;
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentState, setCurrentState] = useState("Login");

  // LOGIN HANDLER
  const loginHandler = async () => {
    try {
      if (!email || !password) {
        toast.error("Enter all fields");
        return;
      }
      const res = await axios.post(`${API}/user/login`, {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("role", res.data.user.role);
         localStorage.setItem("token", res.data.token);
        toast.success("Login successful");
        setEmail("");
        setPassword("");
        setIsFormOpen(false);

        if (res.data.user.role === "teacher") {
          navigate("/teacher/dashboard");
        } else {
          navigate("/student/dashboard");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      console.log("error in loginHandler", err);
    }
  };

  // REGISTER HANDLER
  const registerHandler = async () => {
    try {
      if (!email || !password || !name) {
        toast.error("Enter all fields");
        return;
      }

      const res = await axios.post(`${API}/user/register`, {
        name,
        email,
        password,
        role,
      });

      if (res.data.success) {
        toast.success("Account created! Please login");

        setName("");
        setEmail("");
        setPassword("");
        setRole("student");
        setIsFormOpen(false);
        setCurrentState("Login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      console.log("error in registerHandler", err);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-gradient-to-r from-[#6E1A37] to-[#8E2C4A] text-white shadow-lg">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <h1 className="text-2xl font-bold">Bidyarthi</h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-10 text-lg">
            <li className="cursor-pointer hover:text-[#72BAA9]">Home</li>
            <li className="cursor-pointer hover:text-[#72BAA9]">About</li>
            <li className="cursor-pointer hover:text-[#72BAA9]">Contact</li>
          </ul>

          {/* Login Button */}
          <button
            onClick={() => setIsFormOpen(true)}
            className="hidden md:block bg-[#72BAA9] px-5 py-2 rounded-full font-semibold"
          >
            Login
          </button>

          {/* Mobile Menu */}
          <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-4">
            <ul className="flex flex-col gap-4">
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>

            <button
              onClick={() => setIsFormOpen(true)}
              className="mt-4 w-full bg-[#72BAA9] py-2 rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </nav>

      {/* MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-2xl p-6">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#8E2C4A]">
                {currentState}
              </h2>
              <X
                className="cursor-pointer"
                onClick={() => setIsFormOpen(false)}
              />
            </div>

            {/* FORM */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                currentState === "Login" ? loginHandler() : registerHandler();
              }}
              className="flex flex-col gap-4"
            >
              {currentState === "Sign Up" && (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="border p-2 rounded"
                />
              )}

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                className="border p-2 rounded"
              />

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                className="border p-2 rounded"
              />

              {/* ROLE SELECT */}
              {currentState === "Sign Up" && (
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-gray-200 p-2 rounded"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              )}

              <button className="bg-[#AE2448] text-white py-2 rounded">
                {currentState === "Login" ? "Login" : "Sign Up"}
              </button>
            </form>

            {/* SWITCH */}
            <p className="text-sm text-center mt-4">
              {currentState === "Login" ? (
                <>
                  Don't have an account?{" "}
                  <span
                    onClick={() => setCurrentState("Sign Up")}
                    className="text-[#AE2448] cursor-pointer"
                  >
                    Sign Up
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={() => setCurrentState("Login")}
                    className="text-[#AE2448] cursor-pointer"
                  >
                    Login
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default Navbar;
