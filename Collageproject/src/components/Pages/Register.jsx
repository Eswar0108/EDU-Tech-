import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {registerUser} from "../../Apiroute"

function RegisterForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    mobile_number: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Browser validation already works because of "required"
    // If this runs, it means all fields are filled
    
    console.log(form);
    try {
  const response = await registerUser(form);
  console.log(response.data);
  navigate("/emailotp",{ state: { email: form.email } });
  
} catch (error) {
  console.log(error);
  alert("Registration failed");
}

  
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-8 rounded-2xl 
        bg-white/70 backdrop-blur-xl shadow-xl border border-white/30 space-y-5"
      >

        <h2 className="text-3xl font-bold text-center bg-[#ff6b35] bg-clip-text text-transparent">
          Registration Form
        </h2>

        {[
          { name: "full_name", type: "text", placeholder: "Full Name" },
          { name: "email", type: "email", placeholder: "Email ID" },
          { name: "mobile_number", type: "text", placeholder: "Mobile Number" },
          
        ].map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/60 border border-gray-300 
            focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}

       

        {[
         
        ].map((file) => (
          <div key={file.name}>
            <label className="text-sm text-gray-600">{file.label}</label>
            <input
              type="file"
              name={file.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-lg bg-white/60"
            />
          </div>
        ))}


        <button
          type="submit"
          className="w-full py-3 rounded-lg text-white font-semibold 
          bg-[#ff6b35] hover:scale-105 transition duration-300 shadow-lg"
        >
          Submit Registration
        </button>

      </form>
    </div>
  );
}

export default RegisterForm;