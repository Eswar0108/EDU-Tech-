import React from "react";

function RefundPolicy() {
  return (
    <div className="min-h-screen mt-30 bg-gray-100 py-10 px-4">

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-[#ff6b35] mb-6">
          Refunds & Cancellations
        </h1>

        <p className="text-gray-600 mb-6 text-center">
          We understand that ₹99 is hard-earned money. Our goal is to make sure
          you receive the real story about your future college. If something
          goes wrong, here is how refunds and cancellations work.
        </p>


        {/* Section 1 */}
        <Section
          title="1. When can you ask for a refund?"
          content={[
            "Technical Glitches: Call did not connect or kept disconnecting due to system issues.",
            "No-Show: SeniorGuide did not join the call.",
            "Bad Behavior: SeniorGuide used rude language or refused to answer basic questions."
          ]}
        />


        {/* Section 2 */}
        <Section
          title="2. How to get your money back"
          content={[
            "Send an email to support@exameets.in within 24 hours.",
            "Attach screenshot of your UPI payment and Transaction ID.",
            "Explain briefly what happened during the issue.",
            "Once verified, your ₹99 will be refunded within 2–3 working days."
          ]}
        />


        {/* Section 3 */}
        <Section
          title="3. If you want to cancel"
          content={[
            "Before the call: Cancel inside the app and receive refund (small payment gateway fee ₹5–₹10 may apply).",
            "After the call: Refund not possible after completing the 15-minute session."
          ]}
        />


        {/* Section 4 */}
        <Section
          title="4. If the Senior cancels"
          content={[
            "If SeniorGuide cancels the booking, your ₹99 is refunded automatically.",
            "No need to submit a refund request."
          ]}
        />


        {/* Section 5 */}
        <Section
          title='5. A small note on "The Truth"'
          content={[
            "Refunds are not provided just because you didn’t like the information shared.",
            "SeniorGuides provide honest personal experiences about colleges.",
            "Our role is to connect you with real insights, even if the news is not positive."
          ]}
        />


        {/* Support Section */}
        <div className="mt-8 border-t pt-6 text-center">

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Still have questions?
          </h2>

          <p className="text-gray-600">
            If your refund is delayed or you need help, contact us:
          </p>

          <p className="text-[#ff6b35] font-semibold mt-2">
            support@exameets.in
          </p>

          <p className="text-gray-500 text-sm">
            (Mon–Sat, 9 AM to 9 PM)
          </p>

        </div>

      </div>

    </div>
  );
}


/* Reusable Section Component */
function Section({ title, content }) {
  return (
    <div className="mb-6 ">

      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        {title}
      </h2>

      <ul className="list-disc pl-5 space-y-1 text-gray-600">
        {content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

    </div>
  );
}

export default RefundPolicy;