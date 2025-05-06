import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [loginStatus, setloginStatus] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userData = JSON.parse(localStorage.getItem(data.email));
    if (userData) {
      if (userData.password === data.password) {
        console.log(userData.name + " You Are Successfully Logged In");
        setloginStatus("");
        navigate("/home");
      } else {
        console.log("Email or Password is not matching with our record");
        setloginStatus("Email or Password is not matching our records.");
      }
    } else {
      console.log("Email or Password is not matching with our record");
      setloginStatus("Email or Password is not matching our records.");
    }
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
      <p className="text-xl font-semibold mb-6">Login</p>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="border border-gray-300 p-2 rounded"
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">
            *Email Field* is mandatory
          </span>
        )}
        <input
          className="border border-gray-300 p-2 rounded"
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            *Password Field* is mandatory
          </span>
        )}
        {loginStatus && (
          <span className="text-red-600 text-sm">{loginStatus}</span>
        )}
        <input
          className="bg-cyan-200 hover:bg-cyan-300 p-2 rounded cursor-pointer"
          type={"submit"}
          style={{ backgroundColor: "#a1eafb" }}
        />
        <span>
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 underline hover:text-blue-700"
          >
            Make One Here!
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;