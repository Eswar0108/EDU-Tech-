import { applySeniorGuide } from "../../../Apiroute";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SeniorGuideForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    college_name: "",
    branch: "",
    year_of_study: "",
    aadhaar_number: "",
    college_id: "",
    hall_ticket: "",
    aadhaar_file: null,
    college_id_file: null,
    hall_ticket_file: null,
  });

  const [fileName, setFileName] = useState({
    aadhaar_file: "",
    college_id_file: "",
    hall_ticket_file: "",
  });

  const handleChange = (e) => {
    const { name, files, value } = e.target;

    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
      setFileName((prev) => ({
        ...prev,
        [name]: files[0]?.name || "",
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("college_name", form.college_name);
    formData.append("branch", form.branch);
    formData.append("year_of_study", form.year_of_study);
    formData.append("aadhaar_number", form.aadhaar_number);

    // correct file keys (match backend)
    formData.append("aadhaar", form.aadhaar_file);
    formData.append("college_id", form.college_id_file);
    formData.append("hall_ticket", form.hall_ticket_file);

    const response = await applySeniorGuide(formData);

    alert("Application submitted successfully ✅");
    navigate("/pending-approval");

  } catch (error) {
    console.log(error.response?.data);
    alert(JSON.stringify(error.response?.data));
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{ backgroundColor: "#fffbed" }}
    >
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold" style={{ color: "#545454" }}>
            Senior Guide Registration
          </h2>

          <p className="mt-2 text-md" style={{ color: "#545454" }}>
            Join our mentorship program and guide juniors
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl"
        >
          <div className="px-6 py-8">

            {/* COLLEGE NAME */}
            <div className="mb-5">
              <label className="block text-sm font-medium">
                College Name *
              </label>

              <input
                name="college_name"
                required
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg"
              />
            </div>

            {/* BRANCH */}
            <div className="mb-5">
              <label className="block text-sm font-medium">
                Branch *
              </label>

              <input
                name="branch"
                required
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg"
              />
            </div>

            {/* YEAR */}
            <div className="mb-5">
              <label className="block text-sm font-medium">
                Year of Study *
              </label>

              <input
                name="year_of_study"
                required
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg"
              />
            </div>

            {/* AADHAAR */}
            <div className="mb-5">
              <label className="block text-sm font-medium">
                Aadhaar Number *
              </label>

              <input
                name="aadhaar_number"
                maxLength={12}
                required
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg"
              />
            </div>

            {/* COLLEGE ID */}
            <div className="mb-5">
              <label className="block text-sm font-medium">
                College ID *
              </label>

              <input
                name="college_id"
                required
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg"
              />
            </div>

            {/* HALL TICKET */}
            <div className="mb-5">
              <label className="block text-sm font-medium">
                Hall Ticket *
              </label>

              <input
                name="hall_ticket"
                required
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg"
              />
            </div>

            {/* FILE UPLOADS */}

            <input
              type="file"
              name="aadhaar_file"
              required
              onChange={handleChange}
              className="mb-4"
            />

            <input
              type="file"
              name="college_id_file"
              required
              onChange={handleChange}
              className="mb-4"
            />

            <input
              type="file"
              name="hall_ticket_file"
              required
              onChange={handleChange}
              className="mb-6"
            />

            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full font-semibold py-3 rounded-xl"
              style={{
                backgroundColor: "#ff6b35",
                color: "white",
              }}
            >
              {loading ? "Submitting..." : "Register as Senior Guide"}
            </button>

          </div>
        </form>

      </div>
    </div>
  );
}

export default SeniorGuideForm;