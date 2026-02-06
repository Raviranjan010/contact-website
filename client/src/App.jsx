import React from 'react';
import ContactForm from './components/ContactForm';

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <div className="text-2xl font-bold font-cursive text-primary-600">Contact Me</div>
        {/* You can add more nav items here if needed */}
      </nav>

      <main className="w-full z-10 pt-20">
        <ContactForm />
      </main>

      <footer className="text-center text-primary-700/50 text-sm py-6 relative z-10">
        <p>© {new Date().getFullYear()} Made with with Love 💖</p>
      </footer>
    </div>
  );
}

export default App;
