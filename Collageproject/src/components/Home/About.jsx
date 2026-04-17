import React, { useEffect, useRef, useState } from "react";

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  // Animation on scroll
  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Counter animation for stats
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let start = 0;
            const increment = end / (duration / 16);
            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                setCount(end);
                clearInterval(timer);
              } else {
                setCount(Math.floor(start));
              }
            }, 16);
            return () => clearInterval(timer);
          }
        },
        { threshold: 0.5 }
      );

      if (countRef.current) observer.observe(countRef.current);
      return () => observer.disconnect();
    }, [end, duration]);

    return { count, countRef };
  };

  const stats = [
    { value: 500, suffix: "+", label: "Verified Guides" },
    { value: 10000, suffix: "+", label: "Students Helped" },
    { value: 50, suffix: "+", label: "Partner Colleges" },
    { value: 4.9, suffix: "", label: "Rating ★", prefix: true },
  ];

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Header with Logo */}
      <div className="relative bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 animate-slide-down">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-[#ff6b35] to-orange-400 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <svg className="w-7 h-7 text-white animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Senior<span className="text-[#ff6b35]">Guide</span>
                </h1>
                <p className="text-sm text-gray-500">Trusted Peer-to-Peer Guidance Platform</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-green-700">500+ Active Guides</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section with Animation */}
        <div className={`text-center mb-20 transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="inline-flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full mb-6 animate-bounce-slow">
            <span className="w-2 h-2 bg-[#ff6b35] rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-[#ff6b35]">Since 2024 • Trusted by Thousands</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">About </span>
            <span className="bg-gradient-to-r from-[#ff6b35] to-orange-500 bg-clip-text text-transparent animate-gradient">SeniorGuide</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
            Exameets connects students with verified SeniorGuides from top
            colleges to help them make smarter academic and career decisions.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Mission Card */}
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="h-1.5 bg-gradient-to-r from-[#ff6b35] to-orange-400 group-hover:h-2 transition-all duration-300"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg">
                  <svg className="w-8 h-8 text-[#ff6b35] animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#ff6b35] transition-colors">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our mission is to provide trusted peer-to-peer guidance for students
                  preparing for competitive exams and college admissions. Through our
                  verified SeniorGuide network, we ensure students receive real
                  experiences instead of confusing internet advice.
                </p>
                <div className="mt-6 flex items-center gap-2 text-[#ff6b35] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Learn more</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="h-1.5 bg-gradient-to-r from-[#ff6b35] to-orange-400 group-hover:h-2 transition-all duration-300"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg">
                  <svg className="w-8 h-8 text-[#ff6b35] animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#ff6b35] transition-colors">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  We aim to build India's most trusted student guidance ecosystem where
                  seekers can confidently connect with experienced seniors for
                  real-world insights on exams, colleges, and career paths.
                </p>
                <div className="mt-6 flex items-center gap-2 text-[#ff6b35] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Learn more</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <div className="text-center mb-12 animate-on-scroll opacity-0 transition-all duration-700">
            <div className="inline-flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full mb-4">
              <span className="text-[#ff6b35] text-sm font-medium">What Makes Us Different</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Three Pillars of Our{" "}
              <span className="text-[#ff6b35]">Ecosystem</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Built on trust, accessibility, and security</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                ),
                title: "Verified Guidance",
                description: "Every SeniorGuide completes manual ID verification before helping students on the platform.",
                delay: 0,
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: "Affordable Access",
                description: "Students can book expert sessions at an accessible ₹99 support fee.",
                delay: 200,
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                ),
                title: "Secure Platform",
                description: "All communication stays protected. We never share personal contact details between users.",
                delay: 400,
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700"
                style={{ transitionDelay: `${feature.delay}ms` }}
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-gradient-to-br group-hover:from-[#ff6b35] group-hover:to-orange-500 transition-all duration-500 group-hover:shadow-xl">
                    <svg className="w-10 h-10 text-[#ff6b35] group-hover:text-white transition-colors duration-500 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {feature.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#ff6b35] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                  <div className="mt-4 w-12 h-0.5 bg-gradient-to-r from-[#ff6b35] to-transparent mx-auto group-hover:w-20 transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 mb-20">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10">
                <div className="inline-flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full mb-5">
                  <span className="w-1.5 h-1.5 bg-[#ff6b35] rounded-full animate-pulse"></span>
                  <span className="text-[#ff6b35] text-sm font-medium">Why Choose Us</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Why Choose{" "}
                  <span className="bg-gradient-to-r from-[#ff6b35] to-orange-500 bg-clip-text text-transparent">Exameets?</span>
                </h2>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  We're building India's most trusted student guidance ecosystem with a focus on quality, security, and accessibility.
                </p>
                <ul className="space-y-4">
                  {[
                    "Direct interaction with real college seniors",
                    "Affordable student-friendly booking system",
                    "Manual verification for trusted profiles",
                    "Secure and privacy-focused communication",
                    "Dedicated support team availability",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#ff6b35] to-orange-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 shadow-md group-hover/item:scale-110 transition-transform">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600 group-hover/item:text-gray-800 transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-8 px-6 py-3 bg-gradient-to-r from-[#ff6b35] to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform flex items-center gap-2 group">
                  <span>Get Started Today</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
              <div className="relative bg-gradient-to-br from-[#ff6b35] to-orange-500 p-8 md:p-10 flex flex-col justify-center items-center text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full animate-ping-slow"></div>
                  <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/5 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full animate-float-slow"></div>
                </div>
                <div className="relative z-10">
                  <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mb-6 animate-float">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">Join Our Community</h3>
                  <p className="text-orange-100 mb-6 max-w-sm">
                    Become part of India's fastest growing student guidance network
                  </p>
                  <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                    <span>✨ 5000+ active students</span>
                    <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                    <span>⭐ 4.9 rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="animate-on-scroll opacity-0 transition-all duration-700">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => {
                const { count, countRef } = useCounter(stat.value, 2000);
                return (
                  <div key={idx} className="text-center group">
                    <div ref={countRef} className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#ff6b35] to-orange-500 bg-clip-text text-transparent mb-2">
                      {stat.prefix ? "" : ""}
                      {stat.value >= 1000 ? `${(count / 1000).toFixed(1)}k` : stat.value === 4.9 ? "4.9" : count}
                      {stat.suffix}
                    </div>
                    <div className="text-sm text-gray-500 group-hover:text-[#ff6b35] transition-colors">{stat.label}</div>
                    <div className="mt-2 w-12 h-0.5 bg-gradient-to-r from-[#ff6b35] to-transparent mx-auto group-hover:w-20 transition-all duration-300"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 SeniorGuide • Making education accessible for everyone
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes slide-down {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-gradient { background-size: 200% auto; animation: gradient 3s linear infinite; }
        .animate-slide-down { animation: slide-down 0.5s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-on-scroll.animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}