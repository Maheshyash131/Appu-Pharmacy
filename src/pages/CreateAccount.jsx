import { useState } from "react";

function CreateAccount() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary text-text font-sans">
      <nav className="w-full bg-primary text-white flex items-center justify-between px-8 py-4 shadow-md">
        <h1 className="text-2xl font-bold tracking-wide hover:scale-105 transition-transform duration-300">💊 E-Pharmacy</h1>
        <div className="space-x-8 text-sm font-medium">
          <a href="/" className="hover:text-highlight transition">Home</a>
          <a href="/login" className="hover:text-highlight transition">Login</a>
          <a href="/contact" className="hover:text-highlight transition">Contact</a>
        </div>
      </nav>

      <div className="flex flex-1">
        <div className="hidden md:flex w-1/2 justify-center items-center"><img src="/images/pharmacy3.jpg" alt="Pharmacy" className="rounded-[20px] shadow-lg w-[600px] h-[400px] object-cover" /></div>
        <div className="flex justify-center items-center w-full md:w-1/2">
          <form onSubmit={handleSubmit} className="bg-white w-[85%] md:w-[50%] p-6 rounded-xl shadow-xl border border-highlight animate-slide-up">
            <h3 className="text-2xl font-bold text-primary mb-6 text-center">Create Your Account</h3>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full mb-3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary text-sm outline-none" />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full mb-3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary text-sm outline-none" />
            <input type="text" name="phone" placeholder="Mobile Number" value={formData.phone} onChange={handleChange} className="w-full mb-3 p-2  border border-gray-300 rounded-md focus:ring-2 focus:ring-primary text-sm outline-none" />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full mb-3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary text-sm outline-none" />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full mb-6 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary text-sm outline-none" />
            <button type="submit" className="w-full py-3 bg-primary text-white font-semibold rounded-md hover:bg-accent hover:scale-[1.02] transition-all duration-300">Create Account</button>
            <p className="text-xs text-gray-500 text-center mt-3">Already have an account? <a href="/login" className="text-primary font-semibold hover:underline">Login here</a></p>
          </form>
        </div>
      </div>

      <footer className="bg-primary text-white py-6 text-center mt-auto text-sm">
        <p>© 2025 E-Pharmacy. Your trusted healthcare partner.</p>
      </footer>
    </div>
  );
}

export default CreateAccount;
