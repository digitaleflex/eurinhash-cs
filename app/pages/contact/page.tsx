"use client";
import { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaUser, FaRegCommentDots } from 'react-icons/fa';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = '22951070555';
    const text = encodeURIComponent(
      `Nouveau message depuis le site EurinHash :\n\nNom : ${name}\nEmail : ${email}\nMessage : ${message}`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0A0F2C] via-[#1A1F3C] to-[#007CF0] px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 hero-title text-center">Contact</h1>
      <p className="text-lg text-gray-200 text-center mb-8">
        Remplissez le formulaire ci-dessous, votre message sera envoyé directement sur WhatsApp !
      </p>
      <form onSubmit={handleSubmit} className="max-w-xl w-full bg-[#1A1F3C]/80 rounded-2xl shadow-lg p-8 flex flex-col gap-6 items-center">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="name" className="text-gray-300 flex items-center gap-2"><FaUser /> Nom</label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0A0F2C]/50 border border-[#007CF0]/30 text-white focus:outline-none focus:border-[#007CF0]"
            placeholder="Votre nom"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="email" className="text-gray-300 flex items-center gap-2"><FaEnvelope /> Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0A0F2C]/50 border border-[#007CF0]/30 text-white focus:outline-none focus:border-[#007CF0]"
            placeholder="Votre email"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="message" className="text-gray-300 flex items-center gap-2"><FaRegCommentDots /> Message</label>
          <textarea
            id="message"
            required
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0A0F2C]/50 border border-[#007CF0]/30 text-white focus:outline-none focus:border-[#007CF0]"
            placeholder="Votre message..."
            rows={4}
          />
        </div>
        <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 text-lg">
          <FaWhatsapp className="text-2xl" /> Envoyer sur WhatsApp
        </button>
      </form>
    </main>
  );
} 