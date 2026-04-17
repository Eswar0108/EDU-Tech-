import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getGuideTestQuestions,
  submitGuideTest
} from "../../../Apiroute";

function GuideTest() {

  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Load questions from backend
  useEffect(() => {

    const loadQuestions = async () => {

      try {

        const res = await getGuideTestQuestions();

        setQuestions(res.data);

      } catch (err) {

        console.error(err);
        alert("Unable to load questions");

      }

    };

    loadQuestions();

  }, []);


  const handleSelect = (qid, value) => {

    setAnswers(prev => ({
      ...prev,
      [qid]: value
    }));

  };


  const handleSubmit = async () => {

    if (Object.keys(answers).length !== questions.length) {

      alert("⚠️ Answer all questions");
      return;

    }

    try {

      setSubmitting(true);

      const res = await submitGuideTest({

        q1: answers[1],
        q2: answers[2],
        q3: answers[3],
        q4: answers[4],
        q5: answers[5],
        q6: answers[6]

      });

      const status = res.data.status;

      if (status === "ACTIVE") {

        alert("Test Passed ✅");
        navigate("/guide-dashboard");

      }

      else if (status === "ELIGIBLE_TEST") {

        alert("Try again ❌");
        navigate("/guide-test");

      }

      else if (status === "REJECTED") {

        alert("Max attempts reached ❌");
        navigate("/");

      }

    } catch (err) {

      console.error(err);
      alert("Submission failed");

    } finally {

      setSubmitting(false);

    }

  };


  return (

    <div className="min-h-screen py-12 px-4 bg-[#fffbed]">

      <div className="max-w-3xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-6">
          Senior Guide Eligibility Test
        </h2>


        <div className="bg-white rounded-2xl shadow-xl p-8">

          {questions.map((q, index) => (

            <div key={q.id} className="mb-6">

              <p className="font-semibold mb-2">
                {index + 1}. {q.question}
              </p>

              <input
                type="text"
                placeholder="Type answer..."
                className="w-full border rounded-xl p-3"
                value={answers[q.id] || ""}
                onChange={(e) =>
                  handleSelect(q.id, e.target.value)
                }
              />

            </div>

          ))}


          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full py-3 rounded-xl text-white font-semibold bg-[#ff6b35]"
          >

            Submit Test

          </button>

        </div>

      </div>

    </div>

  );

}

export default GuideTest;