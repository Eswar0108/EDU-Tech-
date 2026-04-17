import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen mt-30 bg-gray-50 px-6 py-12">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-orange-500 mb-4">
          Our Privacy Commitment 
        </h1>
        <p className="text-gray-600 text-lg">
          At Exameets SeniorGuide, we follow a privacy-first approach so you can
          speak freely about real college experiences without worrying about
          your identity or personal data.
        </p>
      </div>

      {/* Section 1 */}
      <div className="max-w-5xl mx-auto bg-white shadow rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          1. Stay 100% Anonymous 
        </h2>
        <div className="space-y-3 text-gray-600">
          <p>
            If you are a student searching for advice, the SeniorGuide will never
            see your name or phone number.
          </p>
          <p>
            If you are a SeniorGuide, users will only see your username and
            college name. Your real identity always stays private.
          </p>
        </div>
      </div>

      {/* Section 2 */}
      <div className="max-w-5xl mx-auto bg-white shadow rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          2. What Information Do We Actually Need? 
        </h2>
        <div className="space-y-3 text-gray-600">
          <p>
            <strong>Your Profile:</strong> We collect your name and phone number
            only to create your account and process secure UPI payments.
          </p>
          <p>
            <strong>College ID (SeniorGuides Only):</strong> Used only for
            verification. This stays with our internal team and is never shared
            publicly.
          </p>
          <p>
            <strong>Payment History:</strong> Maintained to ensure accurate ₹99
            bookings and SeniorGuide earnings tracking.
          </p>
        </div>
      </div>

      {/* Section 3 */}
      <div className="max-w-5xl mx-auto bg-white shadow rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          3. Keeping Your Conversations Safe 
        </h2>
        <div className="space-y-3 text-gray-600">
          <p>
            <strong>Masked Calling:</strong> Calls are connected privately so
            your phone number stays hidden.
          </p>
          <p>
            <strong>No Outside Contact:</strong> Sharing Instagram, WhatsApp, or
            personal details is not allowed. Please report such requests.
          </p>
          <p>
            <strong>Safety Checks:</strong> If issues are reported, our support
            team may review conversations to maintain respectful interactions.
          </p>
        </div>
      </div>

      {/* Section 4 */}
      <div className="max-w-5xl mx-auto bg-white shadow rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          4. We Respect Your Data 
        </h2>
        <p className="text-gray-600">
          Your information is used only for verification and payment processing.
          We never sell your data to colleges, advertisers, or marketing
          companies. Your data stays securely within Exameets.
        </p>
      </div>

      {/* Section 5 */}
      <div className="max-w-5xl mx-auto bg-white shadow rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          5. Your Control 
        </h2>
        <p className="text-gray-600">
          You can request details about the information we store or ask us to
          delete your account anytime. If you ever feel someone is trying to
          identify your private details, contact our support team immediately.
        </p>
      </div>

      {/* Contact Support */}
      <div className="max-w-5xl mx-auto bg-white shadow rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-semibold mb-3">
          Questions about Privacy? 
        </h2>
        <p className="text-gray-600">
          Email us at support@exameets.in (Mon–Sat, 9 AM to 9 PM). We are always
          here to help.
        </p>
      </div>
    </div>
  );
}
