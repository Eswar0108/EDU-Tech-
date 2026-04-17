import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { submitCollegeFeedback } from "../../../Apiroute";

function CollegeFeedback() {

  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    faculty_rating: 1,
    placement_rating: 1,
    infrastructure_rating: 1,
    hidden_fees: "",
    strict_attendance: "",
    ragging_situation: "",
    comments: ""
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]:
        name.includes("rating")
          ? Number(value)
          : value
    }));

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const payload = {
        faculty_rating: formData.faculty_rating,
        placement_rating: formData.placement_rating,
        infrastructure_rating: formData.infrastructure_rating,
        hidden_fees: formData.hidden_fees.trim(),
        strict_attendance: formData.strict_attendance.trim(),
        ragging_situation: formData.ragging_situation.trim(),
        comments: formData.comments.trim() || "No comments"
      };

      console.log("Sending payload:", payload);

      await submitCollegeFeedback(
        bookingId,
        payload
      );

      alert("College feedback submitted successfully ✅");

      navigate("/guide-dashboard");

    } catch (error) {

      console.error(
        "Feedback error:",
        error.response?.data
      );

      if (Array.isArray(error.response?.data?.detail)) {

        const fields =
          error.response.data.detail
            .map(e => e.loc[1])
            .join(", ");

        alert(`Missing fields: ${fields}`);

      } else {

        alert(
          error.response?.data?.detail ||
          "Submission failed ❌"
        );

      }

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg p-6 rounded-xl">

      <h2 className="text-xl font-bold mb-4">
        Submit College Feedback
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="number"
          min="1"
          max="5"
          name="faculty_rating"
          value={formData.faculty_rating}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          type="number"
          min="1"
          max="5"
          name="placement_rating"
          value={formData.placement_rating}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          type="number"
          min="1"
          max="5"
          name="infrastructure_rating"
          value={formData.infrastructure_rating}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          name="hidden_fees"
          placeholder="Hidden Fees (Yes / No)"
          value={formData.hidden_fees}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          name="strict_attendance"
          placeholder="Strict Attendance (Yes / No)"
          value={formData.strict_attendance}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          name="ragging_situation"
          placeholder="Ragging Situation"
          value={formData.ragging_situation}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <textarea
          name="comments"
          placeholder="Additional Comments"
          value={formData.comments}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded w-full"
        >
          {loading
            ? "Submitting..."
            : "Submit Feedback"}
        </button>

      </form>

    </div>

  );

}

export default CollegeFeedback;