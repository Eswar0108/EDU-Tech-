import React, { useState } from "react";

const faqData = [
  {
    category: "For Students & Parents (Seekers)",
    questions: [
      {
        q: "Is my ₹99 safe if the Senior doesn’t pick up?",
        a: "Yes, 100%. If the Senior doesn't join the call, your money stays safe. You can either book another Senior or request a full refund by emailing support@exameets.in.",
      },
      {
        q: "Can the Senior see my phone number or real name?",
        a: "No. Calls are connected privately. Your phone number and real name are never shown. You stay completely anonymous.",
      },
      {
        q: "How do I know the Senior is telling the truth?",
        a: "Every SeniorGuide is verified using their College ID. After each call, you can rate them. If anyone shares misleading information, they are removed from the platform.",
      },
      {
        q: "What should I ask during the 15-minute call?",
        a: "You can ask about placements, hostel food quality, faculty strictness, campus facilities like Wi-Fi, labs, and real student experiences.",
      },
      {
        q: "Can I record the call?",
        a: "No. Recording is not allowed for privacy reasons. Please keep a notebook ready to note important details.",
      },
    ],
  },
  {
    category: "For College Students (SeniorGuides)",
    questions: [
      {
        q: "When will I receive my ₹50 for the call?",
        a: "After the 15-minute session ends, earnings are added to your Exameets wallet. You can withdraw them to your UPI account once minimum balance is reached.",
      },
      {
        q: "Will my college find out that I am sharing 'Brutal Truths'?",
        a: "No. You use an Alias (nickname). As long as you don’t reveal your identity during the call, your college will not know it is you.",
      },
      {
        q: "What if the Seeker is rude or asks for my personal Instagram/WhatsApp?",
        a: "You can end the call immediately and report the user. We follow a zero‑tolerance harassment policy. Never share personal contact details.",
      },
      {
        q: "Do I have to be 'Live' all day to get calls?",
        a: "No. You can switch your availability ON whenever you are free and receive calls only when convenient.",
      },
    ],
  },
  {
    category: "For Ambassadors",
    questions: [
      {
        q: "How do I track my ₹5 royalties?",
        a: "Your dashboard shows real‑time updates whenever a referred Senior completes a call and your ₹5 royalty is credited.",
      },
      {
        q: "Is there a limit to how many Seniors I can refer?",
        a: "No limit. The more Seniors you refer, the more passive income you earn monthly.",
      },
      {
        q: "What if a Senior I referred gets banned for lying?",
        a: "If a referred Senior is banned for violating rules, future royalties from their calls will stop. Always refer honest Seniors.",
      },
    ],
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let counter = 0;

  return (
    <div className="min-h-screen mt-30 bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Frequently Asked Questions 
        </h1>

        {faqData.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {section.category}
            </h2>

            {section.questions.map((item, i) => {
              const index = counter++;

              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow mb-3"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left px-6 py-4 font-medium flex justify-between items-center"
                  >
                    {item.q}
                    <span>
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </button>

                  {openIndex === index && (
                    <div className="px-6 pb-4 text-gray-600">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        <div className="text-center mt-12 bg-white shadow rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-2">
            Still have a question? 
          </h3>
          <p className="text-gray-600">
            Email us at support@exameets.in (Mon–Sat, 9 AM to 9 PM).
          </p>
        </div>
      </div>
    </div>
  );
}
