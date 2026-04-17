import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../../Apiroute";

function AdminLogin() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    try {

      setLoading(true);

      const res = await adminLogin(form);

      // store token
      localStorage.setItem(
        "adminToken",
        res.data.access_token
      );

      // store role
      localStorage.setItem(
        "role",
        res.data.role
      );

      navigate("/admin-dashboard");

    } catch (err) {

      console.error(err);

      alert("Invalid Admin Credentials");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#54545454]">

      <div className="bg-white p-8 rounded-xl shadow-lg w-80">

        <h2 className="text-2xl font-bold mb-6 text-center text-[#ff6b35]">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#ff6b35] text-white py-2 rounded hover:bg-[#e55a2b]"
        >

          {loading ? "Logging in..." : "Login"}

        </button>

      </div>

    </div>

  );

}

export default AdminLogin;