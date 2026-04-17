import React from "react";

export default function ContactUs() {
  return (
    <div className="min-h-screen mt-30 bg-gray-50 px-6 py-12">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-orange-500 mb-4">
          Get in Touch with Exameets SeniorGuide 
        </h1>
        <p className="text-gray-600 text-lg">
          We are committed to supporting students, parents, and SeniorGuides.
          Reach out through the appropriate channel below for quick assistance.
        </p>
      </div>

      {/* Support Channels */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl text-orange-500 font-semibold mb-2">Customer Support </h2>
          <p className="text-gray-600 mb-3">
            Help with ₹99 bookings, payment issues, or technical problems.
          </p>
          <p className="font-medium text-black">support@exameets.in</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl text-orange-500 font-semibold mb-2">
            SeniorGuide & Ambassador Relations 
          </h2>
          <p className="text-gray-600 mb-3">
            Student registrations, Ambassador program details, or College ID
            verification support.
          </p>
          <p className="font-medium text-black">
            seniorguide.exameets@gmail.com
          </p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl text-orange-500 font-semibold mb-2">General Inquiries </h2>
          <p className="text-gray-600 mb-3">
            Corporate partnerships, feedback, or general business communication.
          </p>
          <p className="font-medium text-black">exameets@gmail.com</p>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="max-w-5xl mx-auto bg-white shadow rounded-2xl p-8 mb-10">
        <h2 className="text-2xl text-orange-500 font-semibold mb-4">Operating Hours </h2>
        <p className="text-gray-600">
          Monday – Saturday: 9:00 AM to 9:00 PM (IST)
        </p>
        <p className="text-gray-600">Sunday: Closed</p>
        <p className="text-gray-500 mt-2">
          We aim to respond within 2–4 business hours during working time.
        </p>
      </div>

      {/* Support Policies */}
      <div className="max-w-5xl mx-auto bg-white shadow rounded-2xl p-8 mb-10">
        <h2 className="text-2xl text-orange-500 font-semibold mb-4">Support & Safety Policies </h2>

        <div className="space-y-4 text-gray-600">
          <p>
            <strong>Payment Security:</strong> If there is any issue during your
            ₹99 UPI transaction, email support@exameets.in with your Transaction
            ID for quick resolution.
          </p>

          <p>
            <strong>Data Privacy:</strong> Exameets never shares contact details
            between Seekers and SeniorGuides. All communication stays secure and
            anonymous.
          </p>

          <p>
            <strong>Verification:</strong> Every SeniorGuide goes through manual
            College ID verification before being listed. Pending approvals are
            communicated via email.
          </p>
        </div>
      </div>

      {/* Digital Presence */}
      <div className="max-w-5xl mx-auto bg-white shadow rounded-2xl p-8 text-center">
        <h2 className="text-2xl text-orange-500 font-semibold mb-4">Digital Presence </h2>
        <p className="text-gray-600 mb-2">
          Stay updated with the latest announcements from Exameets.
        </p>

        <div className="space-y-2">
          <p className="text-black font-medium">
            LinkedIn: Exameets EduNexus
          </p>
          <p className="text-black font-medium">
            Instagram: @seniorguide.exameets
          </p>
        </div>
      </div>
    </div>
  );
}
