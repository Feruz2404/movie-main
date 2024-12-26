import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (credentials.username === "admin" && credentials.password === "123456") {
      localStorage.setItem("token", "your_auth_token");
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-wrap flex-col justify-center items-center min-h-[100vh] bg-gray-100 dark:bg-black relative">
      <div className="w-full max-w-[35%] p-6 text-[20px] bg-white dark:bg-slate-800 rounded-md shadow-lg  ">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
         User Login
        </h1>
        {error && (
          <div className="text-red-500 text-center mb-4 absolute top-[75px] left-1/2 transform -translate-x-1/2">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-8 text-[20px]">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-red-600 hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </a>
        </p>
      </div>
        <div className="text-center pt-8 flex justify-end absolute top-0 right-10">
            <button onClick={() => navigate("/")} className="px-6 text-[20px] py-2 rounded-md hover:bg-red-900 border flex items-center gap-2"><FaHome/> <span>Home</span></button>
        </div>
    </div>
  );
};

export default Login;
