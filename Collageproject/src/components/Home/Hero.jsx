import heroImg from "./assets/bg-collage.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, MessageCircle, Award, Star, Users, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="relative min-h-screen w-full" style={{ backgroundColor: "#fffbed" }}>
      
      {/* Simple Navbar - No Login/Signup */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: scrolled ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
        style={{ 
          backgroundColor: scrolled ? "rgba(255, 251, 237, 0.95)" : "rgba(255, 251, 237, 0.9)",
          borderColor: "rgba(84, 84, 84, 0.1)"
        }}
      >
       
      </motion.nav>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full py-24">
          
          {/* Left Column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ backgroundColor: "rgba(255, 107, 53, 0.1)" }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "#ff6b35" }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "#ff6b35" }}></span>
              </span>
              <span className="text-sm font-medium" style={{ color: "#545454" }}>Trusted by 5000+ Students</span>
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: "#545454" }}>
              Connect with Verified
              <span className="block" style={{ color: "#ff6b35" }}>Senior Guides</span>
              for College Insights
            </motion.h1>

            {/* Description */}
            <motion.p variants={fadeUp} className="text-lg max-w-lg" style={{ color: "#545454" }}>
              Talk to experienced seniors anonymously for just ₹99. Get real insights about colleges, courses, and careers.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link to="/seeker">
                <button className="flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white shadow-md transition-all hover:scale-105" style={{ backgroundColor: "#ff6b35" }}>
                  Find a Seeker <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to="/guide">
                <button className="px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 border" style={{ borderColor: "#ff6b35", color: "#ff6b35" }}>
                  Become a SeniorGuide
                </button>
              </Link>
            </motion.div>

            {/* Features */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-4">
              {[
                { icon: MessageCircle, text: "Anonymous Chats" },
                { icon: Shield, text: "Verified Experts" },
                { icon: Award, text: "Affordable Pricing" }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: "rgba(84, 84, 84, 0.05)" }}>
                  <feature.icon className="w-4 h-4" style={{ color: "#ff6b35" }} />
                  <span className="text-sm" style={{ color: "#545454" }}>{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex gap-8 pt-4">
              {[
                { icon: Users, value: "5000+", label: "Happy Students" },
                { icon: Star, value: "200+", label: "Expert Guides" },
                { icon: TrendingUp, value: "98%", label: "Satisfaction" }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <stat.icon className="w-5 h-5 mx-auto mb-1" style={{ color: "#ff6b35" }} />
                  <div className="text-xl font-bold" style={{ color: "#545454" }}>{stat.value}</div>
                  <div className="text-xs" style={{ color: "#545454", opacity: 0.6 }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg border" style={{ borderColor: "rgba(84, 84, 84, 0.1)" }}>
              <img src={heroImg} alt="Hero" className="w-full h-auto object-cover" />
              
              {/* Simple Badges */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#ff6b35" }}></span>
                  <span className="text-xs font-medium" style={{ color: "#545454" }}>5 Online Now</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 rounded-lg px-4 py-1.5 shadow-sm" style={{ backgroundColor: "#ff6b35" }}>
                <span className="text-white font-semibold text-sm">₹99 / session</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Simple Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-1 opacity-50">
          <span className="text-xs" style={{ color: "#545454" }}>Scroll</span>
          <div className="w-4 h-6 border rounded-full flex justify-center" style={{ borderColor: "#545454" }}>
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1 h-2 rounded-full mt-1" style={{ backgroundColor: "#ff6b35" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;