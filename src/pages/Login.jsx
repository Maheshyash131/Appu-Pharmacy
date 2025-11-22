import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage.jsx"

function Login() {
  // ---------- HERO SLIDES ----------
  const slides = [
    {
      img: "/images/pharmacy2.jpg",
      title: "Smart Health Management",
      desc: "Manage your medical needs efficiently with our intuitive E-Pharmacy platform.",
    },
    {
      img: "/images/pharmacy4.jpg",
      title: "Authentic & Trusted Brand",
      desc: "We source 100% genuine medicines and wellness products from verified suppliers.",
    },
    {
      img: "/images/pharmacy1.jpg",
      title: "We Care For You",
      desc: "Experience personalized care and dedicated support at every step.",
    },
  ];
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((p) => (p + 1) % slides.length);
        setFade(true);
      }, 400);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // ---------- STATES ----------
  const [loginOpen, setLoginOpen] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    if (!accepted) {
      alert("Please accept Terms & Conditions");
      return;
    }

    navigate("/home");   // ✅ Works now
  };



  useEffect(() => {
    document.body.style.overflow = loginOpen || showTerms ? "hidden" : "auto";
  }, [loginOpen, showTerms]);

  // ---------- FEATURES ----------
  const allFeatures = [
    { title: "Order Medicines Online", img: "/images/online medicines purchase.png" },
    { title: "Upload Prescriptions", img: "/images/upload preception.png" },
    { title: "Track Orders", img: "/images/track images.png" },
    { title: "Refill Reminders", img: "/images/remainders.png" },
    { title: "Consult Pharmacists", img: "/images/best doctors.png" },
    { title: "Secure Payments", img: "/images/secure payment.png" },
    { title: "24/7 Support", img: "/images/service.png" },
    { title: "Health Articles", img: "/images/health article.png" },
    { title: "Online Support", img: "/images/discount.png" },
    { title: "AI-Based Medicine Suggestions", img: "/images/ai suggestion.png"},
    { title: "Smart Health Montoring", img: "/images/health tracker.png"},
    { title: "Online Consultations", img: "/images/online doctor.png"},
  ];

  // ---------- AUTO-SCROLL STRIP ----------
  // replace smallPhotos array with exactly 7 images
const smallPhotos = [
  "/images/track.png",
  "/images/heal.png",
  "/images/heal2.png",
  "/images/dis.png",
  "/images/eat.png",
  "/images/doc.png",
];

  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let position = 0;
    const speed = 0.8;
    const scroll = () => {
      position += speed;
      if (position >= el.scrollWidth / 2) position = 0;
      el.scrollLeft = position;
      requestAnimationFrame(scroll);
    };
    scroll();
  }, []);

  // ---------- CATEGORIES ----------
  const categories = [
    { name: "Proteins", img: "/images/protein.png", desc: "hello this is mahesh" },
    { name: "Health Monitors", img: "/images/monitors.png", desc: "" },
    { name: "Vitamins", img: "/images/vitamins.png", desc: "" },
    { name: "Immunity Boosters", img: "/images/immunity booster.png", desc: "" },
    { name: "Baby Care", img: "/images/baby product.png", desc: "" },
    { name: "Skin Care", img: "/images/skin care.png", desc: "" },
    { name: "Fitness", img: "/images/fitness.png", desc: "" },
    { name: "Women’s Health", img: "/images/women health.png", desc: "" },
    { name: "Auyrvedic Products", img: "/images/auyrvedic medicine.png"},
    { name: "First Aid", img: "/images/first aid.png"},
    { name: "Tablets", img: "/images/tablets.png"},
    { name: "Syrup", img:"/images/scrup.png"}
  ];

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-primary text-white flex items-center justify-between px-4 sm:px-6 py-3 shadow-md animate-fadeDown">
        <h1 className="text-lg sm:text-2xl font-bold tracking-wide hover:scale-105 transition-transform">
          💊 E-Pharmacy
        </h1>
        <div className="flex items-center gap-5 text-sm font-medium">
          <a href="#" className="hover:text-accent transition">Home</a>
          <a href="#" className="hidden sm:inline hover:text-accent transition">About</a>
          <a href="#" className="hover:text-accent transition">Contact</a>
          <button
            onClick={() => setLoginOpen(true)}
            className="bg-white text-primary px-4 py-2 rounded-lg font-semibold shadow hover:bg-accent hover:text-white transition-transform"
          >
            Login
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main
        className={`pt-20 bg-secondary text-text font-sans min-h-screen overflow-x-hidden ${
          loginOpen ? "filter blur-sm pointer-events-none" : ""
        }`} >

      {/* HERO SECTION */}
<section className="relative flex flex-col lg:flex-row justify-center items-center px-6 py-16 overflow-hidden animate-fadeIn">
  {/* Left button */}
  <button
    onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
    className="absolute left-3 lg:left-10 top-1/2 -translate-y-1/2 z-20 bg-white/90 rounded-full p-3 shadow hover:bg-accent hover:text-white transition"
  >
    ◀
  </button>

  {/* Image container (medium, centered, tighter spacing) */}
  <div
    className={`relative w-[90%] sm:w-[460px] lg:w-[420px] h-[200px] sm:h-[300px] lg:h-[280px] transition-all duration-700 ${
      fade ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
    }`}
  >
    <img
      src={slides[current].img}
      alt={slides[current].title}
      className="rounded-3xl shadow-2xl w-full h-full object-cover object-center mx-auto"
    />
  </div>

  <div
    className={`max-w-md mt-8 lg:mt-0 lg:ml-6 text-center lg:text-left transition-all duration-700 ${
      fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`}
  >
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary mb-3 leading-snug">
      {slides[current].title}
    </h2>
    <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
      {slides[current].desc}
    </p>
  </div>

  {/* Right button */}
  <button
    onClick={() => setCurrent((c) => (c + 1) % slides.length)}
    className="absolute right-3 lg:right-10 top-1/2 -translate-y-1/2 z-20 bg-white/90 rounded-full p-3 shadow hover:bg-accent hover:text-white transition"
  >
    ▶
  </button>
</section>

{/* HEALTH CHECKUP PACKAGES SECTION */}
<section className="w-full bg-white py-6">
  <h2 className="text-3xl font-bold text-primary text-center mb-6">
    Health Checkup Packages
  </h2>

  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 px-6">

    {/* PACKAGE 1 */}
    <div className="bg-primary/5 border border-primary/20 rounded-2xl shadow-md p-4 flex flex-col justify-center hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer">
      
      <div className="flex items-center gap-3 justify-center">
        <h3 className="text-lg font-semibold text-primary">
          Full Body Checkup
        </h3>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed text-center mt-2">
        Complete screening including CBC, Sugar, Thyroid, Kidney & Liver tests.
      </p>

      <button className="mt-4 bg-primary text-white rounded-lg py-2 px-4 hover:bg-accent transition mx-auto">
        Book Now
      </button>
    </div>

    {/* PACKAGE 2 */}
    <div className="bg-primary/5 border border-primary/20 rounded-2xl shadow-md p-4 flex flex-col justify-center hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer">
      
      <div className="flex items-center gap-3 justify-center">
        <h3 className="text-lg font-semibold text-primary">
          Heart Care Package
        </h3>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed text-center mt-2">
        ECG, Cholesterol Profile, BP Check & essential heart screening.
      </p>

      <button className="mt-4 bg-primary text-white rounded-lg py-2 px-4 hover:bg-accent transition mx-auto">
        Book Now
      </button>
    </div>

  </div>
</section>

{/* SHOP BY CATEGORIES SECTION */}
{/* <section className="py-12 bg-primary/5 text-center animate-fadeUp">
  <h2 className="text-3xl font-bold text-primary mb-8">Shop by Categories</h2>

  <div className="max-w-6xl mx-auto flex flex-col items-center px-6">

    <div
      className={`grid gap-6 w-full justify-items-center transition-all duration-700 ease-in-out overflow-hidden ${
        showAllCategories
          ? "grid-cols-3 sm:grid-cols-3 lg:grid-cols-4"   
          : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"   
      }`}
    >
      {(showAllCategories ? categories : categories.slice(0, 5)).map(
        (c, i, arr) => (
          <div
            key={i}
            onClick={() => setSelectedCategory(c)}
            className={`
              bg-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col items-center
              hover:shadow-lg hover:scale-105 transition-all duration-500 cursor-pointer feature-item
              w-full max-w-[150px] h-[200px]             
              sm:max-w-[160px] sm:h-[210px]                
              lg:max-w-[180px] lg:h-[220px]               

              ${
                
                !showAllCategories && i === arr.length - 1
                  ? "col-span-2 sm:col-span-2 lg:col-span-4 justify-self-center"
                  : ""
              }
            `}
          >
        
            <img
              src={c.img}
              alt={c.name}
              className="
                w-full h-[110px] object-cover rounded-lg shadow-md   
                sm:h-[120px]                                           
                lg:h-[130px]                                           
              "
            />

            
            <p className="mt-2 px-2 text-lg lg:text-xl font-semibold text-primary text-center flex-1 flex items-center justify-center">
              {c.name}
            </p>
          </div>
        )
      )}
    </div>

    
    <div className="mt-10">
      <button
        onClick={() => setShowAllCategories(!showAllCategories)}
        className="px-6 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-accent transition-transform duration-500 hover:scale-105"
      >
        {showAllCategories ? "Show Less" : "See More"}
      </button>
    </div>
  </div>
</section> */}




{/* CATEGORY MODAL */}
{/* {selectedCategory && (
  <div
    className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 animate-fadeIn"
    onClick={() => setSelectedCategory(null)}
  >
    <div
      className="bg-white p-5 rounded-2xl shadow-2xl max-w-sm w-[90%] relative animate-scaleUp"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setSelectedCategory(null)}
        className="absolute top-3 right-3 text-gray-500 hover:text-accent text-xl font-bold"
      >
        ✕
      </button>

      <img
        src={selectedCategory.img}
        alt={selectedCategory.name}
        className="rounded-xl w-full h-60 object-cover mb-4"
      />
      
      <h3 className="text-xl font-bold text-primary text-center">
        {selectedCategory.name}
      </h3>

      <p className="text-gray-700 text-sm mt-3 text-center leading-relaxed">
        {selectedCategory.desc || "No description available."}
      </p>
    </div>
  </div>
)} */}


{/* AUTO-SCROLL STRIP (ONLY 6 IMAGES CIRCULAR + MOBILE OPTIMIZED) */}
<section className="py-6 bg-secondary/5 animate-fadeUp">
  <div
    ref={scrollRef}
    className="max-w-7xl mx-auto px-4 overflow-hidden whitespace-nowrap"
  >
    <div className="inline-flex gap-4 sm:gap-6">
      {[...smallPhotos.slice(0, 6), ...smallPhotos.slice(0, 6)].map(
        (src, i) => (
          <img
            key={i}
            src={src}
            alt={`scroll-${i}`}
            className="
              w-full h-24        
              sm:w-42 sm:h-28    
              lg:w-84 lg:h-40   
              bg-primary/5 rounded-lg object-cover shadow-md 
              hover:scale-105 transition-transform duration-500
            "
          />
        )
      )}
    </div>
  </div>
</section>


{/* FEATURES SECTION */}
<section className="py-16 bg-white text-center animate-fadeUp">
  <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-10">
    What You Can Do On Our Website
  </h2>

  <div className="max-w-7xl mx-auto flex flex-col items-center px-4">
    {/* GRID */}
    <div
      className={`grid gap-6 w-full justify-items-center transition-all duration-700 ease-in-out overflow-hidden ${
        showAllFeatures
          ? "grid-cols-3 sm:grid-cols-3 lg:grid-cols-4"
          : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
      }`}
    >
      {(showAllFeatures ? allFeatures : allFeatures.slice(0, 5)).map(
        (f, i, arr) => (
          <div
            key={i}
            onClick={() => setSelectedFeature(f)}
            className={`bg-secondary/5 border border-primary/20 rounded-xl p-6 flex flex-col items-center gap-4 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer feature-item ${
              !showAllFeatures && i === arr.length - 1
                ? "col-span-2 sm:col-span-2 lg:col-span-4 justify-self-center"
                : ""
            }`}
            style={{
              width:
                !showAllFeatures && i === arr.length - 1
                  ? "60%"
                  : "100%",
              maxWidth: "320px",
            }}
          >
            {/* FULL-WIDTH IMAGE ON MOBILE, NORMAL ON LAPTOP */}
            <img
              src={f.img}
              alt={f.title}
              className="w-full sm:w-32 sm:h-32 lg:w-32 lg:h-32 h-auto object-cover rounded-lg shadow-md transition-transform duration-500"
            />

            <div className="text-lg lg:text-xl font-semibold text-primary text-center">
              {f.title}
            </div>
          </div>
        )
      )}
    </div>

    {/* SEE MORE / SHOW LESS BUTTON */}
    <div className="mt-10">
      <button
        onClick={() => setShowAllFeatures(!showAllFeatures)}
        className="px-6 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-accent transition-transform duration-500 hover:scale-105"
      >
        {showAllFeatures ? "Show Less" : "See More"}
      </button>
    </div>
  </div>
</section>

{selectedFeature && (
  <div
    className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 animate-fadeIn"
    onClick={() => setSelectedFeature(null)}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl p-5 w-[90%] sm:w-[450px] md:w-[500px] relative animate-scaleUp"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        onClick={() => setSelectedFeature(null)}
        className="absolute top-3 right-3 text-gray-600 hover:text-accent text-xl"
      >
        ✕
      </button>

      {/* Image */}
      <img
        src={selectedFeature.img}
        alt={selectedFeature.title}
        className="w-full h-auto rounded-xl object-cover shadow-md"
      />

      {/* Title */}
      <h3 className="text-xl font-bold text-primary mt-4 text-center">
        {selectedFeature.title}
      </h3>

      {/* Description */}
      <p className="text-gray-700 text-sm mt-2 text-center leading-relaxed">
        {selectedFeature.desc ? selectedFeature.desc : "No description available."}
      </p>
    </div>
  </div>
)}



        {/* FOOTER */}
{/* FOOTER */}
<footer className="bg-primary text-white py-10 mt-auto animate-fade-in">
  {/* Container */}
  <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
    
    {/* E-Pharmacy */}
    <div>
      <h3 className="text-lg font-bold mb-2">E-Pharmacy</h3>
      <p className="text-sm">
        Your trusted online partner for health and wellness.  
        Order securely from the comfort of your home.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-bold mb-2">Quick Links</h3>
      <ul className="space-y-1 text-sm">
        <li><a href="#" className="hover:text-accent transition">Home</a></li>
        <li><a href="#" className="hover:text-accent transition">About Us</a></li>
        <li><a href="#" className="hover:text-accent transition">Shop</a></li>
        <li><a href="#" className="hover:text-accent transition">Contact</a></li>
      </ul>
    </div>

    {/* Support */}
    <div>
      <h3 className="text-lg font-bold mb-2">Support</h3>
      <ul className="space-y-1 text-sm">
        <li><a href="#" className="hover:text-accent transition">FAQs</a></li>
        <li><a href="#" className="hover:text-accent transition">Terms of Service</a></li>
        <li><a href="#" className="hover:text-accent transition">Privacy Policy</a></li>
        <li><a href="#" className="hover:text-accent transition">Refund Policy</a></li>
      </ul>
    </div>

    {/* Contact Us */}
    <div>
      <h3 className="text-lg font-bold mb-2">Contact Us</h3>
      <p className="text-sm">📞 +91 98765 43210</p>
      <p className="text-sm">📧 support@epharmacy.com</p>
      <p className="text-sm">📍 Bengaluru, India</p>
    </div>
  </div>

  {/* Bottom line */}
  <div className="text-center text-xs mt-8 border-t border-highlight pt-3">
    © 2025 E-Pharmacy. All rights reserved.
  </div>
</footer>



      </main>

      {/* LOGIN MODAL */}
      {loginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setLoginOpen(false)}
          />
          <div className="relative z-10 w-[90%] md:w-[70%] bg-white rounded-2xl shadow-2xl p-6 grid md:grid-cols-2 gap-6 items-center animate-scaleUp">
            <div className="flex justify-center">
              <img
                src="/images/pharmacy5.jpg"
                alt="Login illustration"
                className="w-full h-auto max-h-[400px] rounded-[20px] object-contain shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4 text-center">
                Login to Your Account
              </h2>
              <form className="flex flex-col items-center space-y-3">
               <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
                />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
              />

                <p
                  onClick={() => setShowTerms(true)}
                  className="text-xs text-primary font-semibold underline cursor-pointer"
                >
                  Read Terms & Conditions
                </p>
                {accepted && (
                  <p className="text-xs text-green-600 font-medium">✅ Terms Accepted</p>
                )}
               <button
  type="button"
  onClick={handleLogin}
  disabled={!accepted}
  className={`w-[70%] py-2 mt-3 text-sm font-semibold rounded-md ${
    accepted
      ? "bg-primary text-white hover:bg-accent"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  Login
</button>

              </form>
            </div>
            <button
              onClick={() => setLoginOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-accent"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* TERMS MODAL */}
      {showTerms && (
        <div className="fixed inset-0 z-[60] flex justify-center items-center animate-fadeIn">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowTerms(false)}
          />
          <div className="bg-white w-[90%] md:w-[600px] rounded-2xl shadow-2xl p-6 z-30 animate-scaleUp">
            <h3 className="text-xl font-semibold text-primary mb-3 text-center">
              Terms & Conditions
            </h3>
            <div className="p-3 text-xs text-gray-700 space-y-2 max-h-64 overflow-auto">
              <p>Welcome to E-Pharmacy! Please read these terms carefully.</p>
              <p>By using this platform, you agree to purchase for personal use only.</p>
              <p>Your data will be stored securely and used for order management.</p>
              <p>Misuse may result in account suspension.</p>
            </div>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowTerms(false)}
                className="text-gray-600 hover:text-accent text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setAccepted(true);
                  setShowTerms(false);
                }}
                className="px-4 py-2 text-sm font-semibold rounded-md bg-primary text-white hover:bg-accent transition-all"
              >
                I Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;