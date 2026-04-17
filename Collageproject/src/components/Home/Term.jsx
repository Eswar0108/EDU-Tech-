import React from "react";

function Rules() {
  return (
    <div className="min-h-screen mt-30 bg-gray-100 py-10 px-4">

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-[#ff6b35] mb-6">
          Our Rules & Guidelines
        </h1>

        <p className="text-gray-600 mb-6 text-center">
          When you use <span className="font-semibold">Exameets SeniorGuide</span>,
          you are joining a community built on honesty. Please follow these
          simple rules to keep the platform safe for everyone.
        </p>


        {/* Section 1 */}
        <Section
          title="1. Who can join us?"
          content={[
            "Seekers: Any student or parent looking for real information about colleges.",
            "SeniorGuides: Must be a current student or someone who graduated within the last year.",
            "We verify College ID cards. Fake IDs will lead to immediate account ban."
          ]}
        />

        {/* Section 2 */}
        <Section
          title='2. What happens in a "Truth Session"?'
          content={[
            "₹99 gives you 15 minutes of a SeniorGuide’s time.",
            "The payment is shared between the SeniorGuide, Ambassador, and Exameets platform.",
            "This payment is only for honest advice. Admission or job guarantees are NOT included."
          ]}
        />

        {/* Section 3 */}
        <Section
          title="3. The Stay Safe Rules"
          content={[
            "Do not share phone numbers, WhatsApp, Instagram IDs, or personal addresses.",
            "No abusive language, bullying, or disrespectful behavior.",
            "SeniorGuides must give honest reviews. Paid promotional reviews are strictly prohibited."
          ]}
        />

        {/* Section 4 */}
        <Section
          title="4. Money and Payments"
          content={[
            "Seekers: Payments are via UPI and are non-refundable after session completion.",
            "SeniorGuides: Earn ₹50 per successful call and withdraw after minimum balance.",
            "Ambassadors: Earn ₹5 royalty per call from referred SeniorGuides."
          ]}
        />

        {/* Section 5 */}
        <Section
          title="5. What we are responsible for"
          content={[
            "Exameets connects students with verified Seniors.",
            "Advice shared is personal experience of the SeniorGuide.",
            "College rules or situations may change after your session."
          ]}
        />

        {/* Section 6 */}
        <Section
          title="6. Updates to these Rules"
          content={[
            "Rules may change as the platform grows.",
            "Updates will be posted here or shared via email.",
            "Continuing to use the platform means you accept the latest rules."
          ]}
        />


        {/* Support Section */}
        <div className="mt-8 border-t pt-6 text-center">

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Have a question about the rules?
          </h2>

          <p className="text-gray-600">
            Contact our support team:
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
    <div className="mb-6">

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

export default Rules;