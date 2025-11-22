// src/pages/HomePage.jsx
import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

/**
 * HomePage.jsx (JavaScript)
 *
 * - Search bar placed below navbar (desktop & mobile)
 * - Logo left-aligned
 * - Mobile search narrower + margin below
 * - Hero slides below search
 * - Categories: show 6 initially, 9 when See More clicked
 * - Category modal: 3x3, larger images, removed Close button and "No more items" text
 * - Popular Picks: centered header; price above, Add to Cart below price
 * - Laptop: reduced card/image sizes for tighter layout
 */

export default function HomePage() {
  const navigate = useNavigate();

  // ---------- UI STATE ----------
  const [search, setSearch] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [catPage, setCatPage] = useState(1); // for see more inside category modal
  const [seeMoreCats, setSeeMoreCats] = useState(false);
  const [offersIndex, setOffersIndex] = useState(0);
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [seeMoreDepts, setSeeMoreDepts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Instagram-like popup

  // freeze page when overlays are open (but allow modal inner scroll)
  const frozen =
    userMenuOpen || cartOpen || !!activeCategory || !!selectedProduct || showDoctorForm;

  useEffect(() => {
    document.body.style.overflow = frozen ? "hidden" : "auto";
  }, [frozen]);

  // ---------- DATA ----------
  const categories = [
    { key: "tablets",  name: "Tablets",         img: "/images/tablets.png" },
    { key: "proteins", name: "Proteins",        img: "/images/protein.png" },
    { key: "vitamins", name: "Vitamins",        img: "/images/vitamins.png" },
    { key: "immunity", name: "Immunity",        img: "/images/immunity booster.png" },
    { key: "monitor",  name: "Health Monitors", img: "/images/monitors.png" },
    { key: "baby",     name: "Baby Care",       img: "/images/baby product.png" },
    { key: "skin",     name: "Skin Care",       img: "/images/skin care.png" },
    { key: "fitness",  name: "Fitness",         img: "/images/fitness.png" },
    { key: "ayurveda", name: "Ayurvedic",       img: "/images/auyrvedic medicine.png" },
  ];

  // helper
  const P = (id, cat, name, use, price, img, desc) => ({ id, cat, name, use, price, img, desc });

  // Full catalog (>=6 per category) + 12 popular
  const allProducts = [
    // Tablets
    P("tab1","tablets","Paracetamol 650mg","Fever & mild pain",49,"/images/prod_paracetamol.jpg","Fast-acting analgesic."),
    P("tab2","tablets","Ibuprofen 400mg","Pain & inflammation",79,"/images/prod_ibuprofen.jpg","NSAID relief."),
    P("tab3","tablets","Cetirizine 10mg","Allergy relief",39,"/images/prod_cetirizine.jpg","Antihistamine."),
    P("tab4","tablets","Azithromycin 500mg","Antibiotic (Rx)",149,"/images/prod_azithro.jpg","Use as directed."),
    P("tab5","tablets","Pantoprazole 40mg","Acidity control",89,"/images/prod_panto.jpg","Proton pump inhibitor."),
    P("tab6","tablets","Dolo 650","Pain & fever",55,"/images/prod_dolo.jpg","Popular analgesic."),

    // Proteins
    P("pro1","proteins","Whey Protein 1kg","Muscle recovery",1999,"/images/prod_whey.jpg","24g protein/serving."),
    P("pro2","proteins","Isolate 900g","Lean protein",2599,"/images/prod_isolate.jpg","Low carbs & fat."),
    P("pro3","proteins","Casein 1kg","Overnight repair",2299,"/images/prod_casein.jpg","Slow-release."),
    P("pro4","proteins","Plant Protein 1kg","Vegan blend",1899,"/images/prod_plant.jpg","Pea + rice."),
    P("pro5","proteins","Mass Gainer 3kg","Calorie surplus",2199,"/images/prod_gainer.jpg","With creatine."),
    P("pro6","proteins","BCAA 300g","Intra-workout",1199,"/images/prod_bcaa.jpg","2:1:1 formula."),

    // Vitamins
    P("vit1","vitamins","Vitamin C 1000mg","Immunity support",159,"/images/prod_vitc.jpg","Zinc + Amla."),
    P("vit2","vitamins","Vitamin D3 60k IU","Bone health",99,"/images/prod_vitd.jpg","Weekly dose."),
    P("vit3","vitamins","Multivitamin Men","Daily wellness",299,"/images/prod_multimen.jpg","23 nutrients."),
    P("vit4","vitamins","Multivitamin Women","Daily wellness",299,"/images/prod_multiwomen.jpg","Iron + folate."),
    P("vit5","vitamins","Biotin 10000mcg","Hair & nails",249,"/images/prod_biotin.jpg","With keratin."),
    P("vit6","vitamins","Omega-3 1000mg","Heart health",349,"/images/prod_omega3.jpg","EPA/DHA."),

    // Immunity
    P("imm1","immunity","Zinc 25mg","Immune support",189,"/images/prod_zinc.jpg","Chelated zinc."),
    P("imm2","immunity","Giloy Tablets","Ayurvedic immunity",199,"/images/prod_giloy.jpg","Antioxidant."),
    P("imm3","immunity","Chyawanprash 1kg","Daily tonic",349,"/images/prod_chyawan.jpg","Classic recipe."),
    P("imm4","immunity","Tulsi Drops","Respiratory care",149,"/images/prod_tulsi.jpg","5 Tulsi mix."),
    P("imm5","immunity","Probiotic 30B CFU","Gut immunity",499,"/images/prod_probiotic.jpg","10 strains."),
    P("imm6","immunity","Echinacea Caps","Cold support",299,"/images/prod_echinacea.jpg","Herbal blend."),

    // Monitors
    P("mon1","monitor","Digital Thermometer","Fever check",399,"/images/prod_thermo.jpg","1s quick read."),
    P("mon2","monitor","BP Monitor","Blood pressure",1499,"/images/prod_bp.jpg","Cuff M size."),
    P("mon3","monitor","Pulse Oximeter","SpO2 monitor",999,"/images/prod_oximeter.jpg","OLED display."),
    P("mon4","monitor","Glucose Meter","Blood sugar",1299,"/images/prod_glucometer.jpg","Starter kit."),
    P("mon5","monitor","Weighing Scale","Body weight",799,"/images/prod_scale.jpg","Tempered glass."),
    P("mon6","monitor","Nebulizer","Respiratory care",1899,"/images/prod_nebulizer.jpg","Adult/child mask."),

    // Baby
    P("baby1","baby","Baby Lotion 200ml","Gentle moisturizing",199,"/images/prod_babylotion.jpg","Derm-tested."),
    P("baby2","baby","Baby Shampoo 200ml","Tear-free",179,"/images/prod_babyshampoo.jpg","pH balanced."),
    P("baby3","baby","Diaper Rash Cream","Soothing care",149,"/images/prod_rash.jpg","Zinc oxide."),
    P("baby4","baby","Baby Wipes (72)","Soft & safe",129,"/images/prod_wipes.jpg","Aloe vera."),
    P("baby5","baby","Feeding Bottle 250ml","BPA-free",249,"/images/prod_bottle.jpg","Anti-colic."),
    P("baby6","baby","Baby Soap (4x75g)","Mild cleansing",199,"/images/prod_babysoap.jpg","Shea butter."),

    // Skin
    P("sk1","skin","Hydrating Face Cream","Dry skin",299,"/images/prod_cream.jpg","Ceramide complex."),
    P("sk2","skin","Sunscreen SPF 50","UV protection",449,"/images/prod_sunscreen.jpg","PA++++."),
    P("sk3","skin","Niacinamide Serum","Oil control",399,"/images/prod_niacinamide.jpg","10% formula."),
    P("sk4","skin","Vitamin C Serum","Brightening",499,"/images/prod_vitcserum.jpg","20% L-AA."),
    P("sk5","skin","Lip Balm 4.5g","Moisturize",99,"/images/prod_lipbalm.jpg","Shea + vit E."),
    P("sk6","skin","Aloe Vera Gel","Soothing",199,"/images/prod_aloe.jpg","99% pure."),

    // Fitness
    P("fit1","fitness","Resistance Bands Set","Home workouts",499,"/images/prod_bands.jpg","5 levels."),
    P("fit2","fitness","Yoga Mat 6mm","Anti-slip",799,"/images/prod_yogamat.jpg","NBR foam."),
    P("fit3","fitness","Foam Roller","Recovery",699,"/images/prod_foamroller.jpg","EVA high-density."),
    P("fit4","fitness","Skipping Rope","Cardio",199,"/images/prod_rope.jpg","Adjustable."),
    P("fit5","fitness","Knee Support","Compression",299,"/images/prod_knee.jpg","Breathable."),
    P("fit6","fitness","Hand Grip","Forearm strength",249,"/images/prod_grip.jpg","20–60kg."),

    // Ayurvedic
    P("ay1","ayurveda","Ashwagandha Caps","Stress support",349,"/images/prod_ashwa.jpg","KSM-66."),
    P("ay2","ayurveda","Shatavari","Women’s wellness",299,"/images/prod_shatavari.jpg","Root extract."),
    P("ay3","ayurveda","Triphala Tabs","Digestion",249,"/images/prod_triphala.jpg","Traditional blend."),
    P("ay4","ayurveda","Brahmi Caps","Memory support",289,"/images/prod_brahmi.jpg","Bacopa extract."),
    P("ay5","ayurveda","Moringa Tabs","Vitamins & minerals",239,"/images/prod_moringa.jpg","Leaf extract."),
    P("ay6","ayurveda","Neem Tabs","Skin support",229,"/images/prod_neem.jpg","Purifying."),

    // Popular (12)
    P("pop1","popular","Hand Sanitizer 500ml","Hygiene",149,"/images/prod_sanitizer.jpg","Kills 99.9% germs."),
    P("pop2","popular","Face Mask (50)","Protection",299,"/images/prod_mask.jpg","3-ply disposable."),
    P("pop3","popular","Pain Relief Spray","Sprain relief",199,"/images/prod_spray.jpg","Instant cooling."),
    P("pop4","popular","Electrolyte 1L","Rehydration",99,"/images/prod_electrolyte.jpg","Orange flavor."),
    P("pop5","popular","Bandages (20)","First aid",89,"/images/prod_bandage.jpg","Flexible fabric."),
    P("pop6","popular","Antiseptic Liquid 500ml","Disinfectant",179,"/images/prod_antiseptic.jpg","Household grade."),
    P("pop7","popular","Steam Inhaler","Cold relief",799,"/images/prod_steamer.jpg","Quick mist."),
    P("pop8","popular","Heating Pad","Pain therapy",999,"/images/prod_heatingpad.jpg","Auto cutoff."),
    P("pop9","popular","Oral Rehydration Salts","ORS",35,"/images/prod_ors.jpg","WHO formula."),
    P("pop10","popular","Throat Lozenges (24)","Sore throat",129,"/images/prod_lozenge.jpg","Menthol eucalyptus."),
    P("pop11","popular","Hand Wash 500ml","Hygiene",139,"/images/prod_handwash.jpg","Moisturizing."),
    P("pop12","popular","Cotton Balls (100)","First aid",79,"/images/prod_cotton.jpg","Soft & absorbent."),
  ];

  // ---------- SEARCH ----------
  const [showSearchDrop, setShowSearchDrop] = useState(false);
  const searchBoxRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!searchBoxRef.current) return;
      if (!searchBoxRef.current.contains(e.target)) setShowSearchDrop(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return [];
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.use.toLowerCase().includes(term) ||
        p.desc.toLowerCase().includes(term)
    );
  }, [search]);

  // ---------- CART + OFFERS ----------
  const [cart, setCart] = useState([]); // [{id, qty}]
  const addToCart = (product) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === product.id);
      if (ex) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { id: product.id, qty: 1 }];
    });
  };
  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const changeQty = (id, delta) =>
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartSubtotal = cart.reduce(
    (s, i) => s + i.qty * (allProducts.find((p) => p.id === i.id)?.price || 0),
    0
  );

  const offers = [
    { code: "SAVE50", label: "₹50 off — Min order ₹499", min: 499, type: "flat", amount: 50 },
    { code: "FIT10", label: "10% off Fitness — Min ₹999", min: 999, type: "percent", amount: 10 },
    { code: "IMMUNITY20", label: "₹200 off Immunity — Min ₹1499", min: 1499, type: "flat", amount: 200 },
  ];
  const [appliedOffer, setAppliedOffer] = useState(null);
  const discount = appliedOffer
    ? appliedOffer.type === "flat"
      ? appliedOffer.amount
      : Math.floor((appliedOffer.amount / 100) * cartSubtotal)
    : 0;
  const cartTotal = Math.max(0, cartSubtotal - discount);
  const tryApplyOffer = (o) => {
    if (cartSubtotal < o.min) return alert(`Minimum order ₹${o.min} required for ${o.code}`);
    setAppliedOffer(o);
  };
  const removeOffer = () => setAppliedOffer(null);

  // ---------- HERO SLIDES ----------
  const heroSlides = [
    { img: "/images/hero1.jpg", title: "Up to 30% OFF — Cold & Flu", cat: "immunity" },
    { img: "/images/hero2.jpg", title: "Shop Medicines Online",      cat: "tablets"  },
    { img: "/images/hero3.jpg", title: "Fitness & Wellness Deals",   cat: "fitness"  },
  ];
  useEffect(() => {
    const t = setInterval(() => setOffersIndex((i) => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  // ---------- CATEGORY HELPERS ----------
  // pageSize for modal "See More" (we keep pageSize 9 to show up to 9)
  const pageSize = 9;
  // catProducts for the active category
  const catProducts = useMemo(
    () => (activeCategory ? allProducts.filter((p) => p.cat === activeCategory) : []),
    [activeCategory]
  );
  const pagedCatProducts = catProducts.slice(0, pageSize * catPage);
  const hasMoreCat = pagedCatProducts.length < catProducts.length;

  // ---------- LAYOUT ----------
  return (
    <div className={`min-h-screen bg-secondary text-text ${frozen ? "overflow-hidden" : ""}`}>
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-primary text-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 py-3">
          {/* Left: Logo (left aligned) */}
          <div className="flex items-center gap-3">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide">💊 <span className="align-middle">E-Pharmacy</span></h1>
          </div>

          {/* Right controls (profile & cart) */}
          <nav className="flex items-center gap-3 md:gap-5 text-sm font-medium">
            <a className="hover:text-accent hidden md:inline" href="#home">Home</a>
            <a className="hover:text-accent hidden md:inline" href="#about">About</a>
            <a className="hover:text-accent hidden md:inline" href="#contact">Contact</a>

            <button
              onClick={() => setCartOpen(true)}
              className="relative bg-white text-primary px-3 py-1 rounded-lg font-semibold hover:bg-accent hover:text-white transition flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M7 4h-.75a.75.75 0 0 0-.74.64L4.1 14.3A2.25 2.25 0 0 0 6.33 16.87H18a.75.75 0 0 0 0-1.5H6.33a.75.75 0 0 1-.74-.86L6.2 11h10.83a2.25 2.25 0 0 0 2.18-1.66l.93-3.5A.75.75 0 0 0 19.43 5H6.53l.17-1.02A.75.75 0 0 0 7 3.5H20a.75.75 0 0 0 0-1.5H7z"/>
              </svg>
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 grid place-items-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setUserMenuOpen(true)}
              className="flex items-center gap-2 bg-white text-primary px-2 py-1 rounded-full hover:scale-[1.02] hover:bg-accent hover:text-white transition shadow"
            >
              <img src="/images/user_avatar.jpg" alt="user" className="w-8 h-8 rounded-full object-cover" />
              <span className="hidden sm:inline font-semibold">Mahesh</span>
            </button>
          </nav>
        </div>
      </header>

      {/* SEARCH SECTION (moved below navbar) */}
      <div className="pt-20"> {/* spacer to account for fixed navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4">
          {/* Desktop search: full width centered under nav */}
          <div className="hidden md:flex justify-center">
            <div
              className="relative flex-1 max-w-3xl bg-white rounded-2xl px-3 py-2 shadow"
              ref={searchBoxRef}
            >
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowSearchDrop(true);
                }}
                onFocus={() => setShowSearchDrop(true)}
                placeholder="Search medicines, wellness, devices..."
                className="w-full outline-none text-sm text-gray-800"
              />
              <button
                onClick={() => setShowSearchDrop(true)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-accent transition"
              >
                Search
              </button>

              {/* Dropdown under search */}
              {showSearchDrop && search.trim() && (
                <div className="absolute top-[44px] left-0 right-0 bg-white rounded-xl shadow-2xl border border-primary/20 overflow-hidden max-h-[60vh] overflow-y-auto z-30">
                  {filteredProducts.slice(0, 6).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedProduct(p);
                        setShowSearchDrop(false);
                      }}
                      className="w-full text-left flex items-center gap-3 px-3 py-2 hover:bg-primary/5"
                    >
                      <img src={p.img} alt={p.name} className="w-10 h-10 rounded object-cover" />
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-primary">{p.name}</div>
                        <div className="text-xs text-gray-600 line-clamp-1">{p.use}</div>
                      </div>
                      <div className="text-xs font-semibold">₹{p.price}</div>
                    </button>
                  ))}
                  {filteredProducts.length === 0 && (
                    <div className="px-4 py-3 text-sm text-gray-600">No results found.</div>
                  )}
                  {filteredProducts.length > 6 && (
                    <div className="px-3 py-2 text-xs text-gray-600">
                      Showing top 6. Use the main Results section below to see more.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile search: narrower + margin below */}
          <div className="md:hidden flex justify-center px-4 mt-3">
            <div className="flex items-center bg-white rounded-xl px-2 py-2 shadow w-full max-w-xs">
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search..."
                className="flex-1 outline-none text-sm text-gray-800 max-w-[70%]"
              />
              <button
                onClick={() => setShowSearchDrop(true)}
                className="bg-primary text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-accent transition"
              >
                Go
              </button>
            </div>
          </div>
        </div>

        {/* HERO SLIDES (now below search) */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 mt-6">
          <div className="relative h-[180px] sm:h-[230px] md:h-[260px] rounded-2xl overflow-hidden shadow-2xl">
            {heroSlides.map((o, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveCategory(o.cat);
                  setCatPage(1);
                }}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${offersIndex === i ? "opacity-100" : "opacity-0"}`}
                aria-label={o.title}
              >
                <img src={o.img} alt={o.title} className="w-full h-full object-cover" />
              </button>
            ))}
            <div className="absolute inset-x-0 bottom-0 bg-black/40 text-white p-3 sm:p-4 text-sm sm:text-base">
              {heroSlides[offersIndex].title}
            </div>
          </div>
        </section>
      </div>

      {/* CONTENT */}
      <main className={`pt-8 ${frozen ? "filter blur-sm pointer-events-none" : ""}`}>
        {/* APPOINTMENT (two columns; see more keeps 2/row) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
          <div className="bg-white rounded-2xl border border-primary/20 p-4 sm:p-6 shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-primary">Book an Appointment</h2>
              <button
                onClick={() => setShowDoctorForm(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent transition"
              >
                Book Now
              </button>
            </div>
            <p className="text-gray-700 text-sm mt-2">
              Consult top doctors online for general medicine, dermatology, pediatrics & more.
            </p>

            {(() => {
              const departments = [
                "General Medicine", "Dermatology", "Pediatrics", "Orthopedics",
                "Cardiology", "ENT", "Neurology", "Gynecology",
              ];
              const list = seeMoreDepts ? departments : departments.slice(0, 4);
              return (
                <>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {list.map((d) => (
                      <div
                        key={d}
                        className="border border-primary/20 rounded-xl p-3 hover:shadow-md transition bg-primary/5"
                      >
                        <div className="font-semibold text-primary text-sm">{d}</div>
                        <div className="text-xs text-gray-600">Available today</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-right">
                    <button
                      onClick={() => setSeeMoreDepts((s) => !s)}
                      className="text-primary font-semibold hover:text-accent"
                    >
                      {seeMoreDepts ? "Show Less" : "See More"}
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </section>

        {/* CATEGORIES — always 3x3; show 6 then 9 on See More */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-2xl font-bold text-primary">Shop by Categories</h3>
            <button
              onClick={() => setSeeMoreCats((s) => !s)}
              className="text-primary font-semibold hover:text-accent"
            >
              {seeMoreCats ? "Show Less" : "See More"}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {(seeMoreCats ? categories : categories.slice(0, 6)).map((c) => (
              <button
                key={c.key}
                onClick={() => {
                  setActiveCategory(c.key);
                  setCatPage(1);
                }}
                className="bg-white border border-primary/20 rounded-xl overflow-hidden shadow hover:shadow-lg hover:scale-[1.02] transition"
              >
                <div className="w-full aspect-square overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.name}
                    className="w-full h-full object-contain p-2 sm:p-3 lg:p-4"
                  />
                </div>
                <div className="px-3 pb-3">
                  <div className="text-primary font-semibold text-sm text-center">{c.name}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* SEARCH RESULTS SECTION BELOW SEARCH (main page, attractive grid) */}
        {search.trim() && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold text-primary">Results for “{search}”</h4>
              <button
                onClick={() => setSearch("")}
                className="text-sm bg-primary text-white px-3 py-1 rounded-md hover:bg-accent"
              >
                Clear
              </button>
            </div>
            <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl border border-primary/20 shadow hover:shadow-lg transition flex flex-col"
                >
                  <button onClick={() => setSelectedProduct(p)} aria-label={p.name}>
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-36 md:h-32 lg:h-28 object-cover"
                    />
                  </button>
                  <div className="p-3 flex-1 flex flex-col">
                    <div className="font-semibold text-primary line-clamp-1">{p.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{p.use}</div>
                    <div className="mt-auto flex flex-col items-stretch gap-2 pt-3">
                      <span className="font-bold">₹{p.price}</span>
                      <button
                        onClick={() => addToCart(p)}
                        className="bg-primary text-white text-sm px-3 py-1 rounded-md hover:bg-accent"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center text-sm text-gray-600">
                  No products found.
                </div>
              )}
            </div>
          </section>
        )}

        {/* POPULAR PICKS (12 products) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 mb-20">
          <h4 className="text-xl font-bold text-primary mb-4 text-center">Popular Picks</h4>
          <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {allProducts
              .filter((p) => p.cat === "popular")
              .slice(0, 12)
              .map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl border border-primary/20 shadow hover:shadow-lg transition flex flex-col"
                >
                  <button onClick={() => setSelectedProduct(p)} aria-label={p.name}>
                    <img src={p.img} alt={p.name} className="w-full h-44 md:h-36 lg:h-32 object-cover" />
                  </button>
                  <div className="p-3 flex-1 flex flex-col">
                    <div className="font-semibold text-primary line-clamp-1">{p.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{p.use}</div>
                    <div className="mt-auto flex flex-col items-stretch gap-2 pt-3">
                      <span className="font-bold">₹{p.price}</span>
                      <button
                        onClick={() => addToCart(p)}
                        className="bg-primary text-white text-sm px-3 py-2 rounded-md hover:bg-accent"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-primary text-white py-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-lg font-bold mb-2">E-Pharmacy</h3>
              <p className="text-sm">
                Your trusted online partner for health and wellness. Order securely from the comfort
                of your home.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Quick Links</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="#home" className="hover:text-accent transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#shop" className="hover:text-accent transition">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-accent transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Support</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="#faq" className="hover:text-accent transition">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-accent transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="hover:text-accent transition">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Contact Us</h3>
              <p className="text-sm">📞 +91 98765 43210</p>
              <p className="text-sm">📧 support@epharmacy.com</p>
              <p className="text-sm">📍 Bengaluru, India</p>
            </div>
          </div>
          <div className="text-center text-xs mt-8 border-t border-white/20 pt-3">
            © 2025 E-Pharmacy. All rights reserved.
          </div>
        </footer>
      </main>

      {/* USER MENU (attractive & interactive) */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setUserMenuOpen(false)} />
          <div className="absolute right-4 top-20 bg-white rounded-2xl shadow-2xl w-[92%] sm:w-[380px] p-4 animate-[fadeIn_.2s_ease]">
            <div className="flex items-center gap-3 border-b pb-3">
              <img
                src="/images/user_avatar.jpg"
                alt="user"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary"
              />
              <div>
                <div className="font-semibold text-primary">Mahesh</div>
                <div className="text-xs text-gray-600">mahesh@example.com</div>
              </div>
            </div>
            <ul className="py-2 text-sm space-y-2">
              {[{ label: "Profile", icon: "👤" },
                { label: "Orders", icon: "📦" },
                { label: "Saved Addresses", icon: "🏠" },
                { label: "Payment Methods", icon: "💳" },
                { label: "Settings", icon: "⚙️" },
              ].map((it) => (
                <li key={it.label}>
                  <button className="w-full text-left px-3 py-2 rounded-xl border border-primary/10 hover:border-primary/40 hover:bg-primary/5 active:scale-[0.98] transition flex items-center gap-3">
                    <span className="text-base">{it.icon}</span>
                    <span>{it.label}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setUserMenuOpen(false)}
                className="flex-1 bg-gray-200 text-gray-800 rounded-lg py-2 active:scale-[0.98]"
              >
                Close
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex-1 bg-primary text-white rounded-lg py-2 hover:bg-accent active:scale-[0.98]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER (with Apply Offers) */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setCartOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-[92%] sm:w-[420px] bg-white shadow-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="text-lg font-bold text-primary">Your Cart ({cartCount})</h4>
              <button onClick={() => setCartOpen(false)} className="text-gray-600 hover:text-accent">
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto divide-y">
              {cart.map((item) => {
                const p = allProducts.find((x) => x.id === item.id);
                if (!p) return null;
                return (
                  <div key={item.id} className="flex items-center gap-3 py-3">
                    <img src={p.img} alt={p.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-semibold text-primary line-clamp-1">{p.name}</div>
                      <div className="text-xs text-gray-600">₹{p.price}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => changeQty(item.id, -1)}
                          className="w-6 h-6 rounded bg-gray-200"
                        >
                          -
                        </button>
                        <span className="text-sm w-6 text-center">{item.qty}</span>
                        <button
                          onClick={() => changeQty(item.id, 1)}
                          className="w-6 h-6 rounded bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹{p.price * item.qty}</div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-500 mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
              {cart.length === 0 && (
                <div className="text-sm text-gray-600 py-6 text-center">Your cart is empty.</div>
              )}
            </div>

            {/* Apply Offers */}
            <div className="border-t pt-3 space-y-2">
              <div className="text-sm font-semibold text-primary">Apply Offers</div>
              <div className="grid grid-cols-1 gap-2">
                {offers.map((o) => (
                  <button
                    key={o.code}
                    onClick={() => tryApplyOffer(o)}
                    className={`text-left px-3 py-2 rounded-lg border active:scale-[0.98] transition ${
                      appliedOffer?.code === o.code
                        ? "border-green-500 bg-green-50"
                        : "border-primary/20 hover:border-primary/40"
                    }`}
                  >
                    <div className="text-sm font-semibold">{o.code}</div>
                    <div className="text-xs text-gray-600">{o.label}</div>
                  </button>
                ))}
              </div>
              {appliedOffer && (
                <div className="flex items-center justify-between text-xs bg-green-50 border border-green-500/40 rounded-lg px-3 py-2">
                  <span>
                    Applied: <b>{appliedOffer.code}</b>
                  </span>
                  <button onClick={removeOffer} className="text-red-600">
                    Remove
                  </button>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{cartSubtotal}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Discount</span>
                <span className="text-green-600">- ₹{discount}</span>
              </div>
              <div className="flex items-center justify-between font-semibold text-base border-t pt-2">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
              <button
                disabled={cart.length === 0}
                className={`w-full mt-3 py-2 rounded-lg font-semibold ${
                  cart.length === 0 ? "bg-gray-300 text-gray-500" : "bg-primary text-white hover:bg-accent"
                }`}
              >
                Checkout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* DOCTOR APPOINTMENT MODAL */}
      {showDoctorForm && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowDoctorForm(false)} />
          <div className="absolute inset-0 grid place-items-center p-4">
            <div className="bg-white w-[95%] sm:w-[560px] rounded-2xl shadow-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xl font-bold text-primary">Book Appointment</h4>
                <button onClick={() => setShowDoctorForm(false)} className="text-gray-600 hover:text-accent">
                  ✕
                </button>
              </div>
              <form className="grid gap-3">
                <input className="border rounded-md p-2" placeholder="Your Name" />
                <input className="border rounded-md p-2" placeholder="Phone" />
                <select className="border rounded-md p-2">
                  <option>Department</option>
                  {[
                    "General Medicine",
                    "Dermatology",
                    "Pediatrics",
                    "Orthopedics",
                    "Cardiology",
                    "ENT",
                    "Neurology",
                    "Gynecology",
                  ].map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
                <input type="date" className="border rounded-md p-2" />
                <textarea rows={3} className="border rounded-md p-2" placeholder="Symptoms / Notes" />
                <button type="button" className="bg-primary text-white rounded-lg py-2 font-semibold hover:bg-accent">
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY FULLSCREEN MODAL (3x3 + see more + removed Close & 'No more items' text) */}
      {activeCategory && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70" onClick={() => setActiveCategory(null)} />
          {/* Make the inner box scrollable */}
          <div className="absolute inset-0 grid place-items-center p-4 overflow-y-auto">
            <div className="bg-white w-[96%] sm:w-[90%] max-w-6xl rounded-2xl shadow-2xl p-4 sm:p-6">
              <div className="flex items-center justify-between pb-3 border-b">
                <div className="text-lg sm:text-xl font-bold text-primary">
                  {categories.find((c) => c.key === activeCategory)?.name}
                </div>
                {/* Removed explicit close button (overlay click closes modal) */}
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-4">
                {pagedCatProducts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-xl border border-primary/20 shadow hover:shadow-lg transition flex flex-col"
                  >
                    <button onClick={() => setSelectedProduct(p)} aria-label={p.name}>
                      <img src={p.img} alt={p.name} className="w-full aspect-square object-cover h-[220px]" />
                    </button>
                    <div className="p-3 flex-1 flex flex-col">
                      <div className="font-semibold text-primary text-sm line-clamp-1">{p.name}</div>
                      <div className="text-[12px] text-gray-600 mt-1">{p.use}</div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <span className="font-bold text-sm">₹{p.price}</span>
                        <button
                          onClick={() => addToCart(p)}
                          className="bg-primary text-white text-sm px-3 py-1 rounded-md hover:bg-accent"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end mt-4 gap-3">
                {hasMoreCat && (
                  <button
                    onClick={() => setCatPage((p) => p + 1)}
                    className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-accent"
                  >
                    See More
                  </button>
                )}
              </div>

              {/* also show some uncategorized below */}
              <div className="mt-6">
                <h5 className="text-sm sm:text-base font-semibold text-primary mb-2">You might also like</h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {allProducts
                    .filter((p) => p.cat === "popular")
                    .slice(0, 3)
                    .map((p) => (
                      <div
                        key={p.id}
                        className="bg-white rounded-xl border border-primary/20 shadow p-2 flex items-center gap-2"
                      >
                        <img src={p.img} alt={p.name} className="w-16 h-16 object-cover rounded" />
                        <div className="text-xs">
                          <div className="font-semibold text-primary line-clamp-1">{p.name}</div>
                          <div className="text-gray-600">₹{p.price}</div>
                        </div>
                        <button
                          onClick={() => addToCart(p)}
                          className="ml-auto bg-primary text-white text-[10px] px-2 py-1 rounded"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT LIGHTBOX (Instagram-style) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70" onClick={() => setSelectedProduct(null)} />
          <div className="absolute inset-0 grid place-items-center p-4">
            <div className="bg-white w-[96%] sm:w-[680px] rounded-2xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="bg-black/5">
                  <img
                    src={selectedProduct.img}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 sm:p-5 flex flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-primary">{selectedProduct.name}</h3>
                    <button onClick={() => setSelectedProduct(null)} className="text-gray-600 hover:text-accent">
                      ✕
                    </button>
                  </div>
                  <div className="text-sm text-gray-700 mt-2">{selectedProduct.desc}</div>
                  <div className="text-sm text-gray-600 mt-1">Use: {selectedProduct.use}</div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="font-extrabold text-xl">₹{selectedProduct.price}</span>
                    <button
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
