import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Copy, Share2, RefreshCcw, Zap, Laugh, Heart, Skull, Target, Send, Check, Instagram, Trash2, History } from 'lucide-react';
import { generateCaption } from '../services/aiService';
import { SEO } from '../components/Layout';

const MODES = [
  { id: 'normal', name: 'Normal', icon: <Zap className="w-4 h-4" /> },
  { id: 'viral', name: 'Viral 🔥', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'funny', name: 'Funny 😂', icon: <Laugh className="w-4 h-4" /> },
  { id: 'romantic', name: 'Romantic ❤️', icon: <Heart className="w-4 h-4" /> },
  { id: 'sad', name: 'Sad 💔', icon: <Skull className="w-4 h-4" /> },
  { id: 'hook', name: 'Hook 🎯', icon: <Target className="w-4 h-4" /> },
];

const STYLES = [
  { id: 'aesthetic', name: 'Aesthetic 🌸' },
  { id: 'fire', name: 'Fire 🔥' },
  { id: 'dark', name: 'Dark 🌑' },
  { id: 'minimal', name: 'Minimal ⚪' },
];

const INTENSITIES = [
  { id: 'low', name: 'Low' },
  { id: 'medium', name: 'Medium' },
  { id: 'high', name: 'High' },
];

const SUGGESTIONS = [
  { text: "आज बहुत खुश हूँ", emoji: "😄" },
  { text: "breakup हो गया", emoji: "💔" },
  { text: "funny mood", emoji: "😂" },
  { text: "life is amazing", emoji: "🔥" },
];

const FloatingEmoji = ({ emoji, delay }: { emoji: string, delay: number }) => (
  <motion.div
    initial={{ y: 0, opacity: 0 }}
    animate={{ 
      y: [-20, 20, -20],
      opacity: [0.2, 0.5, 0.2],
      rotate: [0, 10, -10, 0]
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut" 
    }}
    className="absolute pointer-events-none text-2xl md:text-4xl select-none hidden lg:block"
    style={{ 
      left: `${Math.random() * 100}%`, 
      top: `${Math.random() * 100}%` 
    }}
  >
    {emoji}
  </motion.div>
);

export const Home: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('viral');
  const [style, setStyle] = useState('aesthetic');
  const [intensity, setIntensity] = useState('medium');
  const [output, setOutput] = useState<{ caption: string; explanation?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [recentOutputs, setRecentOutputs] = useState<{ caption: string; timestamp: number }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('recent_captions');
    if (saved) {
      setRecentOutputs(JSON.parse(saved));
    }
  }, []);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await generateCaption(input, mode, intensity, style);
      setOutput(result);
      const newRecent = [{ caption: result.caption, timestamp: Date.now() }, ...recentOutputs].slice(0, 5);
      setRecentOutputs(newRecent);
      localStorage.setItem('recent_captions', JSON.stringify(newRecent));
      
      // Scroll to output
      setTimeout(() => {
        const outputEl = document.getElementById('output-section');
        if (outputEl) outputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (text: string) => {
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleDeleteRecent = (timestamp: number) => {
    const newRecent = recentOutputs.filter(item => item.timestamp !== timestamp);
    setRecentOutputs(newRecent);
    localStorage.setItem('recent_captions', JSON.stringify(newRecent));
  };

  return (
    <div className="relative overflow-hidden">
      {/* Floating Background Emojis */}
      <FloatingEmoji emoji="🔥" delay={0} />
      <FloatingEmoji emoji="✨" delay={1} />
      <FloatingEmoji emoji="🚀" delay={2} />
      <FloatingEmoji emoji="📸" delay={3} />
      <FloatingEmoji emoji="❤️" delay={4} />
      <FloatingEmoji emoji="😂" delay={5} />

      <div className="max-w-4xl mx-auto relative z-10">
        <SEO 
          title="AI Text to Emoji Converter & Viral Caption Generator (Free)"
          description="Turn your text into viral captions 🔥 with smart emojis in seconds. Best AI emoji generator for Instagram, WhatsApp, and Shorts (Hindi + Hinglish + English)."
          keywords="ai text to emoji converter, emoji generator online, caption with emoji generator, ai text to emoji converter hindi, funny emoji caption generator, whatsapp emoji text converter, reels caption generator with emoji"
        />

        {/* Hero Section */}
        <div className="text-center mb-16 pt-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium mb-6 border border-indigo-100 dark:border-indigo-800"
          >
            <Sparkles className="w-4 h-4" />
            <span>Trusted by 10,000+ creators</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
          >
            Turn your text into <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">viral captions 🔥</span> with smart emojis in seconds
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-8"
          >
            Generate Instagram, WhatsApp, and Shorts captions with AI <br className="hidden md:block" />
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">(Hindi + Hinglish + English)</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-neutral-500 font-medium"
          >
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-yellow-500" /> Generate in seconds</span>
            <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-red-500" /> Trending emoji styles</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> 100% Free to use</span>
          </motion.div>
        </div>

        {/* Main Input Section */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 p-6 md:p-10 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          
          <div className="space-y-8">
            {/* Input Box */}
            <div className="space-y-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type anything… and turn it into 🔥 viral caption"
                className="w-full h-56 p-6 bg-neutral-50 dark:bg-neutral-800/50 border-2 border-neutral-100 dark:border-neutral-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none text-xl md:text-2xl font-medium placeholder:text-neutral-400"
              />
              <div className="flex flex-wrap gap-3">
                <span className="text-sm text-neutral-500 font-semibold flex items-center mr-2">Quick Ideas:</span>
                {SUGGESTIONS.map((s) => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={s.text}
                    onClick={() => setInput(s.text)}
                    className="text-sm px-4 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:bg-white dark:hover:bg-neutral-700 hover:shadow-md transition-all text-neutral-700 dark:text-neutral-300 flex items-center gap-2"
                  >
                    <span>{s.emoji}</span>
                    <span>{s.text}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Mode Selection */}
              <div>
                <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-3">Generation Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  {MODES.map((m) => (
                    <motion.button
                      whileHover={{ y: -2 }}
                      key={m.id}
                      onClick={() => setMode(m.id)}
                      className={`flex items-center justify-center space-x-2 px-3 py-3 rounded-xl text-sm font-semibold transition-all border-2 ${
                        mode === m.id 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                          : 'bg-neutral-50 dark:bg-neutral-800 border-transparent text-neutral-600 dark:text-neutral-400 hover:border-neutral-200 dark:hover:border-neutral-600'
                      }`}
                    >
                      {m.icon}
                      <span>{m.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Style Selection */}
              <div>
                <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-3">Visual Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {STYLES.map((s) => (
                    <motion.button
                      whileHover={{ y: -2 }}
                      key={s.id}
                      onClick={() => setStyle(s.id)}
                      className={`px-3 py-3 rounded-xl text-sm font-semibold transition-all border-2 ${
                        style === s.id 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                          : 'bg-neutral-50 dark:bg-neutral-800 border-transparent text-neutral-600 dark:text-neutral-400 hover:border-neutral-200 dark:hover:border-neutral-600'
                      }`}
                    >
                      {s.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Intensity Selection */}
              <div>
                <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-3">Emoji Intensity</label>
                <div className="grid grid-cols-3 gap-2">
                  {INTENSITIES.map((i) => (
                    <motion.button
                      whileHover={{ y: -2 }}
                      key={i.id}
                      onClick={() => setIntensity(i.id)}
                      className={`px-3 py-3 rounded-xl text-sm font-semibold transition-all border-2 ${
                        intensity === i.id 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                          : 'bg-neutral-50 dark:bg-neutral-800 border-transparent text-neutral-600 dark:text-neutral-400 hover:border-neutral-200 dark:hover:border-neutral-600'
                      }`}
                    >
                      {i.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="pt-4">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 text-sm flex items-center space-x-3"
                >
                  <Skull className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{error}</span>
                </motion.div>
              )}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(79, 70, 229, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={loading || !input.trim()}
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/30 transition-all flex items-center justify-center space-x-3 text-xl uppercase tracking-wider relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {loading ? (
                  <RefreshCcw className="w-7 h-7 animate-spin" />
                ) : (
                  <>
                    <Zap className="w-7 h-7 fill-current" />
                    <span>⚡ Generate Viral Caption</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>

      {/* Output Section */}
      <AnimatePresence>
        {output && (
          <motion.div
            id="output-section"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-16 scroll-mt-24"
          >
            <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border-2 border-indigo-500/20 dark:border-indigo-500/30 overflow-hidden">
              <div className="bg-indigo-600 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-white">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-wider text-sm">Your Viral Caption</span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleCopy(output.caption)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={() => handleShare(output.caption)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
                    title="Share to WhatsApp"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-8 md:p-10">
                <div className="text-2xl md:text-3xl font-medium text-neutral-800 dark:text-neutral-100 leading-relaxed whitespace-pre-wrap mb-8">
                  {output.caption}
                </div>

                {output.explanation && (
                  <div className="p-6 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
                    <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" /> Why this works
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {output.explanation}
                    </p>
                  </div>
                )}

                <div className="mt-10 flex flex-col md:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCopy(output.caption)}
                    className="flex-1 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold rounded-xl flex items-center justify-center space-x-2 hover:opacity-90 transition-all"
                  >
                    <Copy className="w-5 h-5" />
                    <span>Copy Caption</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGenerate}
                    className="flex-1 py-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border-2 border-neutral-200 dark:border-neutral-700 font-bold rounded-xl flex items-center justify-center space-x-2 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all"
                  >
                    <RefreshCcw className="w-5 h-5" />
                    <span>Regenerate</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent History Section */}
      {recentOutputs.length > 0 && (
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <History className="w-6 h-6 text-indigo-500" />
              Recent Generations
            </h3>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Your last 5 creations</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentOutputs.map((item) => (
              <motion.div
                key={item.timestamp}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between group hover:border-indigo-500/30 transition-all shadow-sm hover:shadow-md"
              >
                <p className="text-neutral-700 dark:text-neutral-300 line-clamp-3 mb-6 leading-relaxed">
                  {item.caption}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <span className="text-[10px] uppercase tracking-tighter text-neutral-400 font-bold">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCopy(item.caption)}
                      className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-indigo-600 transition-colors"
                      title="Copy"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteRecent(item.timestamp)}
                      className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-neutral-500 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* SEO Content Section */}
      <div className="prose dark:prose-invert max-w-none mt-20 p-8 md:p-12 glass-card rounded-3xl border border-neutral-200 dark:border-neutral-800">
        <h2 className="text-4xl font-black mb-8 font-display">Why use CaptionMoji AI?</h2>
        <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 mb-8">
          In the world of social media, a caption is more than just text—it's your voice, your brand, and your engagement driver. 
          CaptionMoji AI is a premium <strong>ai text to emoji converter</strong> designed to help you create <strong>viral captions with smart emojis</strong> in seconds. 
          Whether you're looking for an <strong>emoji generator online</strong> or a specific <strong>instagram caption generator with emoji</strong>, our tool uses advanced AI to understand the context and emotion of your text.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div className="bg-indigo-50 dark:bg-indigo-900/10 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Instagram className="w-6 h-6 text-pink-500" />
              Instagram Caption Generator
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Boost your Reels and posts with aesthetic captions that stop the scroll. Our <strong>reels caption generator with emoji</strong> knows exactly which emojis trend on Instagram right now.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/10 p-8 rounded-2xl border border-green-100 dark:border-green-900/30">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Send className="w-6 h-6 text-green-500" />
              WhatsApp Emoji Converter
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Make your status updates and messages more expressive. Our <strong>whatsapp emoji text converter</strong> transforms plain Hindi or English text into emoji-rich messages instantly.
            </p>
          </div>
        </div>

        <h3 className="text-3xl font-black mb-6 font-display">Premium Features of our AI Emoji Generator</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="flex items-start space-x-3">
            <div className="p-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mt-1">
              <Check className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="font-bold">Multi-language Support</p>
              <p className="text-sm text-neutral-500">Works perfectly with Hindi, Hinglish, and English for local reach.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="p-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mt-1">
              <Check className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="font-bold">Emotion Detection</p>
              <p className="text-sm text-neutral-500">Understands if you're happy, sad, romantic, or funny automatically.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="p-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mt-1">
              <Check className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="font-bold">Smart Combinations</p>
              <p className="text-sm text-neutral-500">Uses emoji pairings that look professional, aesthetic and viral-ready.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="p-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mt-1">
              <Check className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="font-bold">SEO Optimized</p>
              <p className="text-sm text-neutral-500">Helps your content rank better with relevant keywords and trending tags.</p>
            </div>
          </div>
        </div>

        <h3 className="text-3xl font-black mt-12 mb-8 font-display">Frequently Asked Questions (FAQ)</h3>
        <div className="space-y-4">
          <details className="p-6 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-800 cursor-pointer group">
            <summary className="font-bold text-lg flex justify-between items-center list-none">
              Is this AI emoji generator free?
              <span className="group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">Yes, CaptionMoji AI is 100% free for everyone. You can generate unlimited viral captions and emoji combinations without any cost.</p>
          </details>
          <details className="p-6 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-800 cursor-pointer group">
            <summary className="font-bold text-lg flex justify-between items-center list-none">
              Can I generate Hindi captions?
              <span className="group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">Absolutely! We are the best <strong>ai text to emoji converter hindi</strong>. We specialize in Hindi and Hinglish captions with appropriate Indian cultural emojis.</p>
          </details>
          <details className="p-6 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-800 cursor-pointer group">
            <summary className="font-bold text-lg flex justify-between items-center list-none">
              How to create viral captions with emojis?
              <span className="group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">Simply type your text in the box above, select "Viral 🔥" mode, and click generate. Our AI will analyze trending patterns to create the perfect <strong>caption with emoji generator</strong> output.</p>
          </details>
          <details className="p-6 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-800 cursor-pointer group">
            <summary className="font-bold text-lg flex justify-between items-center list-none">
              Is it safe for Instagram and WhatsApp?
              <span className="group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">Yes, our captions use standard emojis and text that are safe and compatible with all major social media platforms including Instagram, WhatsApp, Facebook, and YouTube.</p>
          </details>
          <details className="p-6 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-800 cursor-pointer group">
            <summary className="font-bold text-lg flex justify-between items-center list-none">
              What is Hook Mode?
              <span className="group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">Hook Mode is specifically designed for <strong>reels caption generator with emoji</strong>. it creates attention-grabbing first lines that increase your video's watch time and engagement.</p>
          </details>
        </div>
      </div>
    </div>
  </div>
  );
};
