import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SignupInput } from "@marioduplin/medium-blog";
import axios from "axios";
import { BACKEND_URL } from "../config";
const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  async function sendRequest () {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
      postInputs
    );
    console.log("response", response.data);
    const jwt = response.data;
    localStorage.setItem("token", jwt);
    navigate("/blogs");
  } catch (e) {
    console.error(e);
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          {type === "signin" ? "Sign in" : "Create an Account"}
        </h2>
        <p className="text-center text-sm text-gray-500">
          {type === "signup" ? "Don't have an account?" : "Already have an account?"}
          <Link
            className="ml-1 text-sky-500 hover:text-sky-600 underline transition duration-150 ease-in-out"
            to={type === "signin" ? "/signup" : "/signin"}
          >
            {type === "signin" ? "Sign up" : "Sign in"}
          </Link>
        </p>

        {type === "signup" ? <Lableinput
          label="Name"
          placeholder="Your name"
          onChange={(e) =>
            setPostInputs((c) => ({
              ...postInputs,
              name: e.target.value,
            }))
          }
        />:null}

        <Lableinput
          label="Email"
          placeholder="yourname@gmail.com"
          onChange={(e) =>
            setPostInputs((c) => ({
              ...postInputs,
              username: e.target.value, // Feel free to replace 'name' with 'username' if needed
            }))
          }
        />

        <Lableinput
          label="Password"
          type="password"
          placeholder="••••••••"
          onChange={(e) =>
            setPostInputs((c) => ({
              ...postInputs,
              password: e.target.value, // You might want to map this to 'password'
            }))
          }
        />

        <button
          type="button"
          onClick={sendRequest}
          className="w-full bg-sky-600 text-white py-2.5 rounded-lg font-semibold hover:bg-sky-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          {type === "signup" ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

interface Labeltypes {
  label: string;
  type?: string;
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Lableinput({ label, placeholder, onChange, type }: Labeltypes) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sm text-gray-900"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Auth;