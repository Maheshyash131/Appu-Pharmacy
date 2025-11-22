import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: backend integration
    setSent(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary text-text font-sans">
      {/* ---------- NAVBAR ---------- */}
      <nav className="w-full bg-primary text-white flex items-center justify-between px-8 py-4 shadow-md">
        <h1 className="text-2xl font-bold tracking-wide hover:scale-105 transition-transform duration-300">
          💊 E-Pharmacy
        </h1>
        <div className="space-x-8 text-sm font-medium">
          <a href="/" className="hover:text-highlight transition">Home</a>
          <a href="/login" className="hover:text-highlight transition">Login</a>
          <a href="/create-account" className="hover:text-highlight transition">Sign Up</a>
        </div>
      </nav>

      {/* ---------- HERO ---------- */}
      <div className="text-center py-12 bg-gradient-to-b from-white to-secondary animate-fade-in">
        <h2 className="text-4xl font-bold text-primary mb-3">Reset Your Password</h2>
        <p className="text-gray-700 text-sm">
          Don’t worry! Just enter your registered email, and we’ll send you a link to reset it.
        </p>
      </div>

      {/* ---------- FORM ---------- */}
      <div className="flex justify-center items-center flex-1 py-10">
        {!sent ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white w-[90%] md:w-[450px] p-8 rounded-2xl shadow-xl border border-highlight animate-slide-up"
          >
            <h3 className="text-xl font-bold text-primary mb-6 text-center">
              Forgot Password
            </h3>

            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-6 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary text-sm outline-none"
            />

            <button
              type="submit"
              className="w-full py-2 bg-primary text-white font-semibold rounded-md hover:bg-accent hover:scale-[1.02] transition-all duration-300"
            >
              Send Reset Link
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              <a href="/login" className="text-primary font-semibold hover:underline">
                Back to Login
              </a>
            </p>
          </form>
        ) : (
          <div className="bg-white w-[90%] md:w-[450px] p-8 rounded-2xl shadow-xl border border-highlight text-center animate-fade-in">
            <h3 className="text-xl font-bold text-primary mb-3">
              Email Sent ✅
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              We’ve sent a password reset link to <span className="font-semibold">{email}</span>.
              Please check your inbox (and spam folder) for further instructions.
            </p>
            <a
              href="/login"
              className="text-primary font-semibold hover:underline text-sm"
            >
              Back to Login
            </a>
          </div>
        )}
      </div>

      {/* ---------- FOOTER ---------- */}
      <footer className="bg-primary text-white py-8 text-center mt-auto text-sm">
        <p>© 2025 E-Pharmacy. Your health, our priority.</p>
      </footer>
    </div>
  );
}

export default ForgotPassword;
