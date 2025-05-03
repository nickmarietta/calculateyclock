{/*Edited By :Nickmarietta*/}

import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem(
      data.email,
      JSON.stringify({
        name: data.name,
        password: data.password,
      })
    );
    console.log(JSON.parse(localStorage.getItem(data.email)));
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <p className="text-xl font-semibold mb-6">Register Account</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <input
          className="border border-gray-300 p-2 rounded"
          type="text"
          placeholder="Name"
          {...register("name")}
        />

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
          {...register("password")}
        />

        <input
          className="bg-cyan-200 hover:bg-cyan-300 p-2 rounded cursor-pointer"
          type="submit"
          value="Register"
        />
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
