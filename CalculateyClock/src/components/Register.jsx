import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    

    if (!email) {
      setIsLoading(false);
      return;
    }
    
    localStorage.setItem(
      email,
      JSON.stringify({
        name,
        password,
      })
    );
    
    console.log(JSON.parse(localStorage.getItem(email)));
    
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 500);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <img 
          src="/PayDayzLogo.png" 
          alt="Company Logo" 
          className="h-16"
        />
      </div>

      <p className="text-xl font-semibold mb-6">Register Account</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4"
      >
        <input
          className="border border-gray-300 p-2 rounded"
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          className="border border-gray-300 p-2 rounded"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="border border-gray-300 p-2 rounded"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button
          className="bg-cyan-200 hover:bg-cyan-300 p-2 rounded cursor-pointer"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
        <span>
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 underline hover:text-blue-700">
            Here!
          </Link>
        </span>
      </form>
    </div>
  );
}

export default RegisterForm;