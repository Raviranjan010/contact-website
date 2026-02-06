import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaHeart, FaPaperPlane, FaSpinner } from 'react-icons/fa';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        relationshipStatus: 'Select One',
        extraAnswers: {
            lookingFor: '',
            idealDate: '',
            hobbies: '',
            whyMessage: '',
        },
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (['lookingFor', 'idealDate', 'hobbies', 'whyMessage'].includes(name)) {
            setFormData((prev) => ({
                ...prev,
                extraAnswers: { ...prev.extraAnswers, [name]: value },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            // Use environment variable or default to localhost for dev
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/submit';

            await axios.post(apiUrl, formData);
            setStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
                relationshipStatus: 'Select One',
                extraAnswers: { lookingFor: '', idealDate: '', hobbies: '', whyMessage: '' },
            });
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    const isSingle = formData.relationshipStatus === 'Single';

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
            >
                {/* Decorative Background Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                <h1 className="text-4xl font-cursive text-center text-primary-500 mb-2">Get in Touch</h1>
                <p className="text-center text-gray-500 mb-8 font-light">I'd love to hear from you!</p>

                {status === 'success' ? (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center py-10"
                    >
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                            <FaHeart size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h2>
                        <p className="text-gray-500">Thanks for reaching out. I'll get back to you soon!</p>
                        <button
                            onClick={() => setStatus(null)}
                            className="mt-6 text-primary-500 hover:text-primary-600 font-medium underline"
                        >
                            Send another message
                        </button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary-300 focus:ring focus:ring-primary-100 focus:outline-none transition-all bg-white/50"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary-300 focus:ring focus:ring-primary-100 focus:outline-none transition-all bg-white/50"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary-300 focus:ring focus:ring-primary-100 focus:outline-none transition-all bg-white/50"
                                placeholder="+1 234 567 890"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Relationship Status</label>
                            <select
                                name="relationshipStatus"
                                value={formData.relationshipStatus}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary-300 focus:ring focus:ring-primary-100 focus:outline-none transition-all bg-white/50"
                            >
                                <option disabled>Select One</option>
                                <option value="Single">Single</option>
                                <option value="In a Relationship">In a Relationship</option>
                                <option value="Married">Married</option>
                                <option value="Complicated">It's Complicated</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </div>

                        <AnimatePresence>
                            {isSingle && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden space-y-4 border-l-4 border-primary-300 pl-4 py-2 bg-primary-50/50 rounded-r-xl"
                                >
                                    <h3 className="text-primary-500 font-semibold flex items-center gap-2">
                                        <FaHeart className="animate-pulse" /> A few extra questions for you...
                                    </h3>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">What are you looking for?</label>
                                        <input
                                            type="text"
                                            name="lookingFor"
                                            value={formData.extraAnswers.lookingFor}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary-300 focus:ring focus:ring-primary-100 focus:outline-none transition-all bg-white/80"
                                            placeholder="Friendship, Relationship, etc."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">What's your ideal date?</label>
                                        <textarea
                                            name="idealDate"
                                            value={formData.extraAnswers.idealDate}
                                            onChange={handleChange}
                                            rows="2"
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary-300 focus:ring focus:ring-primary-100 focus:outline-none transition-all bg-white/80"
                                            placeholder="Dinner, Hike, Movie night..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Hobbies & Interests</label>
                                        <input
                                            type="text"
                                            name="hobbies"
                                            value={formData.extraAnswers.hobbies}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary-300 focus:ring focus:ring-primary-100 focus:outline-none transition-all bg-white/80"
                                            placeholder="Reading, Traveling, Coding..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Why did you decide to message me?</label>
                                        <textarea
                                            name="whyMessage"
                                            rows="2"
                                            value={formData.extraAnswers.whyMessage}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary-300 focus:ring focus:ring-primary-100 focus:outline-none transition-all bg-white/80"
                                            placeholder="Just curious..."
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea
                                name="message"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary-300 focus:ring focus:ring-primary-100 focus:outline-none transition-all bg-white/50"
                                placeholder="Type your message here..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary-400 to-primary-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-primary-300/50 transform hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? <FaSpinner className="animate-spin" /> : <><FaPaperPlane /> Send Message</>}
                        </button>

                        {status === 'error' && (
                            <p className="text-red-500 text-center text-sm mt-2">
                                Something went wrong. Please try again.
                            </p>
                        )}
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default ContactForm;
