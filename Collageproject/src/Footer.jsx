import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { useState } from "react";

function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const socials = [
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      url: "https://linkedin.com/company/exameets",
      color: "hover:bg-[#0077B5]",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: "https://instagram.com/seniorguide.exameets",
      color: "hover:bg-[#E4405F]",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      url: "https://twitter.com/exameets",
      color: "hover:bg-[#1DA1F2]",
    },
    {
      name: "Facebook",
      icon: <FaFacebook />,
      url: "https://facebook.com/exameets",
      color: "hover:bg-[#1877F2]",
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      url: "https://youtube.com/@exameets",
      color: "hover:bg-[#FF0000]",
    },
  ];

  const quickLinks = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "How It Works", link: "/how-it-works" },
    { name: "Become a Guide", link: "/become-guide" },
    { name: "FAQ", link: "/faq" },
    { name: "Contact", link: "/contact" },
  ];

  const services = [
    "1:1 College Guidance",
    "Verified Senior Interaction",
    "₹99 Booking Sessions",
    "Campus Reality Insights",
    "Career Roadmap Planning",
    "Mock Interview Prep",
  ];

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <footer className="relative" style={{ backgroundColor: "#0f172a" }}>
      {/* Decorative Top Border */}
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, #ff6b35, #545454, #ff6b35)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-extrabold mb-4" style={{ color: "#ff6b35" }}>
           SeniorGuide
            </h2>

            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Connect with verified SeniorGuides from real colleges. Book
              affordable ₹99 calls and get honest insights before choosing
              your future.
            </p>

            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <MdLocationOn style={{ color: "#ff6b35" }} size={16} />
              <span>India | Remote First</span>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2 mt-5">
              {socials.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-full transition-all duration-300 ${s.color} bg-white/10 hover:text-white`}
                  style={{ color: "#cbd5e1" }}
                  aria-label={s.name}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-5 text-white relative inline-block">
              Quick Links
              <span 
                className="absolute -bottom-2 left-0 w-12 h-0.5 rounded-full"
                style={{ backgroundColor: "#ff6b35" }}
              />
            </h3>

            <ul className="space-y-3 text-sm">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.link}
                    className="text-gray-300 hover:text-[#ff6b35] transition-all duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-[#ff6b35] transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Platform Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-5 text-white relative inline-block">
              Platform Services
              <span 
                className="absolute -bottom-2 left-0 w-12 h-0.5 rounded-full"
                style={{ backgroundColor: "#ff6b35" }}
              />
            </h3>

            <ul className="space-y-3 text-sm">
              {services.map((service, i) => (
                <li key={i}>
                  <span className="text-gray-300 hover:text-[#ff6b35] transition-all duration-200 cursor-pointer flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-[#ff6b35] transition-all" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-5 text-white relative inline-block">
              Support
              <span 
                className="absolute -bottom-2 left-0 w-12 h-0.5 rounded-full"
                style={{ backgroundColor: "#ff6b35" }}
              />
            </h3>

            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <MdEmail style={{ color: "#ff6b35" }} size={18} />
                <span>support@exameets.in</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <MdPhone style={{ color: "#ff6b35" }} size={18} />
                <span>+91 98765 43210</span>
              </div>
              <div className="text-gray-300 text-sm">
                <p>Mon – Sat</p>
                <p className="text-[#ff6b35]">9 AM – 9 PM IST</p>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">
                Subscribe to Newsletter
              </h4>
              <form onSubmit={handleNewsletter} className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-200 pr-12"
                  style={{ 
                    backgroundColor: "#1e293b",
                    color: "white",
                    border: "1px solid #334155"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#ff6b35"}
                  onBlur={(e) => e.target.style.borderColor = "#334155"}
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: "#ff6b35", color: "white" }}
                >
                  <MdEmail size={16} />
                </button>
              </form>
              {isSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs mt-2"
                  style={{ color: "#10b981" }}
                >
                  ✅ Subscribed successfully!
                </motion.p>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t" style={{ borderColor: "#1e293b" }} />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-gray-400 text-center">
            © {new Date().getFullYear()} Exameets SeniorGuide. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-6">
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-[#ff6b35] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-400 hover:text-[#ff6b35] transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="text-gray-400 hover:text-[#ff6b35] transition-colors duration-200"
            >
              Cookie Policy
            </Link>
            <Link
              to="/help"
              className="text-gray-400 hover:text-[#ff6b35] transition-colors duration-200"
            >
              Help Center
            </Link>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
          style={{ backgroundColor: "#ff6b35", color: "white" }}
          aria-label="Scroll to top"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
}

export default Footer;