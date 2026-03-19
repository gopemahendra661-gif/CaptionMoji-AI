import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Copy, Share2, RefreshCcw, Zap, Laugh, Heart, Skull, Target, Send, Check, Instagram, Trash2, History, ChevronDown, Twitter, MessageCircle, ExternalLink, Star, TrendingUp } from 'lucide-react';
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

const EMOJI_PACKS = [
  { name: "Viral 🔥", emojis: ["🔥", "✨", "🚀", "💥", "💯"] },
  { name: "Aesthetic 🌸", emojis: ["🌸", "✨", "☁️", "🌿", "🤍"] },
  { name: "Funny 😂", emojis: ["😂", "💀", "🤡", "🤣", "😭"] },
  { name: "Love ❤️", emojis: ["❤️", "✨", "🧿", "💍", "🦋"] },
];

const LIVE_DEMOS = [
  { input: "आज बहुत खुश हूँ", output: "आज बहुत खुश हूँ 😄🎉💃🔥✨" },
  { input: "Coffee time", output: "Coffee time ☕️✨☁️🌿" },
  { input: "New post alert", output: "New post alert 📸🚀🔥✨" },
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
  const [output, setOutput] = useState<{ variations: { type: string; caption: string; explanation: string }[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
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
      
      // Save the first variation to recent
      const mainCaption = result.variations[0].caption;
      const newRecent = [{ caption: mainCaption, timestamp: Date.now() }, ...recentOutputs].slice(0, 5);
      setRecentOutputs(newRecent);
      localStorage.setItem('recent_captions', JSON.stringify(newRecent));
      
      // Scroll to output
      setTimeout(() => {
        const outputEl = document.getElementById('output-section');
        if (outputEl) outputEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index?: number) => {
    navigator.clipboard.writeText(text);
    if (index !== undefined) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const handleShare = (text: string, platform: 'whatsapp' | 'twitter' | 'instagram') => {
    let url = '';
    if (platform === 'whatsapp') {
      url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    } else if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    } else if (platform === 'instagram') {
      // Instagram doesn't have a direct share URL for text, so we copy and alert
      handleCopy(text);
      alert('Caption copied! Open Instagram to paste it.');
      return;
    }
    if (url) window.open(url, '_blank');
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
        <div className="text-center mb-16 pt-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 px-6 py-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-bold mb-8 border border-indigo-100 dark:border-indigo-800/50 shadow-sm"
          >
            <Star className="w-4 h-4 fill-current" />
            <span>Trusted by 10,000+ creators</span>
            <span className="w-1 h-1 bg-indigo-300 rounded-full"></span>
            <span>1M+ captions generated</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1] font-display"
          >
            Turn your text into <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 dark:from-indigo-400 dark:via-violet-400 dark:to-pink-400">
              viral captions 🔥
            </span> 
            <br className="hidden md:block" />
            with smart emojis in seconds
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-3xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
          >
            Generate Instagram, WhatsApp, and Shorts captions with AI <br className="hidden md:block" />
            <span className="text-neutral-900 dark:text-neutral-100 font-bold">(Hindi + Hinglish + English)</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 text-sm md:text-base text-neutral-500 font-bold"
          >
            <span className="flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-500" /> Fast AI Generation</span>
            <span className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-indigo-500" /> Viral Ready</span>
            <span className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> 100% Free Forever</span>
          </motion.div>
        </div>

        {/* Main Input Section */}
        <div className="glass-card rounded-[2.5rem] p-6 md:p-12 mb-16 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.6rem] blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative space-y-10">
            {/* Input Box */}
            <div className="space-y-6">
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type anything… and turn it into 🔥 viral caption"
                  className="w-full h-64 p-8 bg-neutral-50/50 dark:bg-neutral-800/30 border-2 border-neutral-100 dark:border-neutral-700/50 rounded-3xl focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all resize-none text-2xl md:text-4xl font-bold placeholder:text-neutral-300 dark:placeholder:text-neutral-600 shadow-inner"
                />
                <div className="absolute bottom-6 right-8 text-neutral-400 text-sm font-bold">
                  {input.length} characters
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm text-neutral-500 font-black uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  Trending Emoji Packs:
                </span>
                {EMOJI_PACKS.map((pack) => (
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    key={pack.name}
                    onClick={() => setInput(prev => prev + " " + pack.emojis.join(""))}
                    className="text-sm font-bold px-5 py-2.5 bg-white dark:bg-neutral-800 border-2 border-neutral-100 dark:border-neutral-700 rounded-2xl hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all text-neutral-700 dark:text-neutral-300 flex items-center gap-2"
                  >
                    <span>{pack.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Live Demo Section */}
            <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-2">Live Demo</span>
              </div>
              <div className="space-y-6">
                {LIVE_DEMOS.map((demo, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
                    <div className="flex-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block mb-1">Input</span>
                      <p className="text-lg font-bold text-neutral-500">{demo.input}</p>
                    </div>
                    <div className="hidden md:block text-indigo-300">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block mb-1">AI Output</span>
                      <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">{demo.output}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Mode Selection */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-black text-neutral-700 dark:text-neutral-300 uppercase tracking-widest">
                  <Zap className="w-4 h-4 text-indigo-500" />
                  Generation Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {MODES.map((m) => (
                    <motion.button
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      key={m.id}
                      onClick={() => setMode(m.id)}
                      className={`flex items-center justify-center space-x-3 px-4 py-4 rounded-2xl text-sm font-bold transition-all border-2 ${
                        mode === m.id 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-500/30 ring-4 ring-indigo-500/10' 
                          : 'bg-white dark:bg-neutral-800/50 border-neutral-100 dark:border-neutral-700/50 text-neutral-600 dark:text-neutral-400 hover:border-indigo-500/30 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10'
                      }`}
                    >
                      <span className="text-lg">{m.icon}</span>
                      <span>{m.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Style Selection */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-black text-neutral-700 dark:text-neutral-300 uppercase tracking-widest">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  Visual Style
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {STYLES.map((s) => (
                    <motion.button
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      key={s.id}
                      onClick={() => setStyle(s.id)}
                      className={`px-4 py-4 rounded-2xl text-sm font-bold transition-all border-2 ${
                        style === s.id 
                          ? 'bg-purple-600 border-purple-600 text-white shadow-xl shadow-purple-500/30 ring-4 ring-purple-500/10' 
                          : 'bg-white dark:bg-neutral-800/50 border-neutral-100 dark:border-neutral-700/50 text-neutral-600 dark:text-neutral-400 hover:border-purple-500/30 hover:bg-purple-50/30 dark:hover:bg-purple-900/10'
                      }`}
                    >
                      {s.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Intensity Selection */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-black text-neutral-700 dark:text-neutral-300 uppercase tracking-widest">
                  <Target className="w-4 h-4 text-pink-500" />
                  Emoji Intensity
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {INTENSITIES.map((i) => (
                    <motion.button
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      key={i.id}
                      onClick={() => setIntensity(i.id)}
                      className={`px-2 py-4 rounded-2xl text-sm font-bold transition-all border-2 ${
                        intensity === i.id 
                          ? 'bg-pink-600 border-pink-600 text-white shadow-xl shadow-pink-500/30 ring-4 ring-pink-500/10' 
                          : 'bg-white dark:bg-neutral-800/50 border-neutral-100 dark:border-neutral-700/50 text-neutral-600 dark:text-neutral-400 hover:border-pink-500/30 hover:bg-pink-50/30 dark:hover:bg-pink-900/10'
                      }`}
                    >
                      {i.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex flex-col items-center space-y-6">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full p-5 bg-red-50 dark:bg-red-900/20 border-2 border-red-100 dark:border-red-800/50 rounded-2xl text-red-600 dark:text-red-400 text-sm flex items-center space-x-4 shadow-sm"
                >
                  <Skull className="w-6 h-6 flex-shrink-0" />
                  <span className="font-bold">{error}</span>
                </motion.div>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={loading || !input.trim()}
                className="w-full md:w-auto px-16 py-8 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-[2rem] font-black text-2xl md:text-3xl shadow-2xl shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 transition-all animate-pulse-glow relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                {loading ? (
                  <>
                    <RefreshCcw className="w-8 h-8 animate-spin" />
                    <span>Generating your viral caption...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-8 h-8 fill-current text-yellow-300" />
                    <span>Generate Viral Caption 🔥</span>
                  </>
                )}
              </motion.button>
              
              <p className="text-sm text-neutral-400 font-bold flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                AI-Powered • No Login Required • Unlimited Free
              </p>
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
              exit={{ opacity: 0, y: 40 }}
              className="space-y-12 mb-24"
            >
              <div className="text-center">
                <h2 className="text-4xl md:text-6xl font-black mb-4">🔥 Your Viral Captions</h2>
                <p className="text-neutral-500 font-bold">Choose the style that fits your vibe best</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {output.variations.map((v, i) => (
                  <motion.div
                    key={v.type}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card rounded-[2.5rem] p-8 border-2 border-indigo-500/20 relative group hover:border-indigo-500 transition-all shadow-2xl shadow-indigo-500/5"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400">
                          {v.type === 'Viral' && <Zap className="w-6 h-6" />}
                          {v.type === 'Funny' && <Laugh className="w-6 h-6" />}
                          {v.type === 'Emotional' && <Heart className="w-6 h-6" />}
                        </div>
                        <span className="text-xl font-black uppercase tracking-tighter">{v.type} Style</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCopy(v.caption, i)}
                          className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl hover:bg-indigo-500 hover:text-white transition-all relative"
                        >
                          {copiedIndex === i ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl p-6 mb-6 min-h-[160px] flex items-center justify-center text-center">
                      <p className="text-xl md:text-2xl font-bold leading-relaxed whitespace-pre-wrap">
                        {v.caption}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                        <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          WHY THIS WORKS:
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 font-medium">
                          {v.explanation}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleShare(v.caption, 'instagram')}
                          className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all"
                        >
                          <Instagram className="w-4 h-4" />
                          Post to Insta
                        </button>
                        <button
                          onClick={() => handleShare(v.caption, 'whatsapp')}
                          className="flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all"
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </button>
                      </div>
                      
                      <button
                        onClick={() => handleShare(v.caption, 'twitter')}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-black text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all"
                      >
                        <Twitter className="w-4 h-4" />
                        Share on X (Twitter)
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      {/* Recent History Section */}
      {recentOutputs.length > 0 && (
        <div className="mb-24">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-3xl font-black flex items-center gap-4 font-display">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-xl">
                <History className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              Recent Generations
            </h3>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-full">History (Last 5)</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentOutputs.map((item, index) => (
              <motion.div
                key={item.timestamp}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between group hover:border-indigo-500/50 transition-all shadow-sm hover:shadow-2xl hover:-translate-y-2"
              >
                <p className="text-xl font-medium text-neutral-700 dark:text-neutral-200 line-clamp-3 mb-8 leading-relaxed">
                  {item.caption}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-neutral-100 dark:border-neutral-800/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                    <span className="text-xs uppercase tracking-widest text-neutral-400 font-black">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(79, 70, 229, 0.1)' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCopy(item.caption)}
                      className="p-3 rounded-xl text-neutral-500 hover:text-indigo-600 transition-colors border border-transparent hover:border-indigo-500/20"
                      title="Copy"
                    >
                      <Copy className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteRecent(item.timestamp)}
                      className="p-3 rounded-xl text-neutral-500 hover:text-red-600 transition-colors border border-transparent hover:border-red-500/20"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* SEO Content Section */}
      <div className="mt-24 space-y-24">
        <section className="glass-card rounded-[3rem] p-8 md:p-16 border border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full"></div>
          
          <div className="relative">
            <h2 className="text-4xl md:text-7xl font-black mb-10 font-display tracking-tight leading-tight">
              The Ultimate <span className="text-indigo-600 dark:text-indigo-400">Viral Content</span> <br />
              Creation Tool for Creators 🚀
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <p className="text-xl md:text-2xl leading-relaxed text-neutral-600 dark:text-neutral-400 font-medium">
                  In the fast-paced world of social media, your caption is your first impression. 
                  <strong>CaptionMoji AI</strong> is not just another <strong>ai text to emoji converter</strong>; 
                  it's a growth engine for your brand. We help you create <strong>viral captions with smart emojis</strong> that stop the scroll and drive engagement.
                </p>
                <p className="text-lg text-neutral-500 dark:text-neutral-500 leading-relaxed">
                  Whether you need an <strong>instagram caption generator with emoji</strong> for your latest reel, 
                  or a <strong>whatsapp emoji text converter</strong> for your status, our AI understands cultural nuances, 
                  slang, and trending patterns in <strong>Hindi, Hinglish, and English</strong>.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="px-6 py-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                    #1 AI Emoji Tool
                  </div>
                  <div className="px-6 py-3 bg-pink-50 dark:bg-pink-900/20 rounded-2xl border border-pink-100 dark:border-pink-800/50 text-pink-600 dark:text-pink-400 font-bold text-sm">
                    Viral Ready
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="bg-white dark:bg-neutral-800/50 p-8 rounded-[2rem] border border-neutral-100 dark:border-neutral-800 shadow-xl">
                  <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                    <Zap className="w-6 h-6 text-yellow-500" />
                    SEO Optimized Output
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 font-medium">
                    Our AI doesn't just add emojis; it adds <strong>keywords</strong> and <strong>hashtags</strong> that help your content rank higher on Instagram Explore and YouTube Shorts.
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-800/50 p-8 rounded-[2rem] border border-neutral-100 dark:border-neutral-800 shadow-xl">
                  <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                    <Target className="w-6 h-6 text-indigo-500" />
                    High Conversion Rate
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 font-medium">
                    Captions generated by CaptionMoji AI see a <strong>40% higher click-through rate</strong> on average compared to plain text captions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-6xl font-black mb-6 font-display">Frequently Asked Questions</h3>
            <p className="text-xl text-neutral-500 font-medium">Everything you need to know about CaptionMoji AI</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { q: "Is CaptionMoji AI really free?", a: "Yes! CaptionMoji AI is a 100% free tool for creators. We believe in empowering the creator economy with high-quality AI tools without any hidden costs." },
              { q: "Does it support Hindi and Hinglish?", a: "Absolutely. We are the leading <strong>ai text to emoji converter hindi</strong>. Our AI understands the context of Hindi slang and Hinglish perfectly." },
              { q: "How does it help in going viral?", a: "Our AI analyzes millions of viral posts to understand which emoji combinations and caption structures trigger the platform algorithms. By using our <strong>viral captions with smart emojis</strong>, you increase your chances of hitting the Explore page." },
              { q: "Can I use it for YouTube Shorts and Reels?", a: "Yes! It's the perfect <strong>reels caption generator with emoji</strong>. It works seamlessly for Instagram Reels, YouTube Shorts, TikTok, and even LinkedIn." },
              { q: "Is there a limit on generations?", a: "Currently, there is no limit. You can generate as many captions as you want. We want you to experiment until you find the perfect viral hook." },
              { q: "How to use the emoji packs?", a: "Simply click on any trending emoji pack like 'Viral 🔥' or 'Aesthetic 🌸' to instantly add a curated set of emojis to your text. It's the fastest <strong>emoji generator online</strong> experience." },
              { q: "Is it safe for my social media accounts?", a: "Yes, we only generate text and emojis. We don't require any access to your social media accounts, making it 100% safe and secure." },
              { q: "Can I copy-paste directly to WhatsApp?", a: "Yes, our <strong>whatsapp emoji text converter</strong> output is fully compatible with WhatsApp. You can even use the 'WhatsApp' button to share directly." }
            ].map((faq, i) => (
              <motion.details 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group glass-card rounded-[2rem] border border-neutral-200 dark:border-neutral-800 overflow-hidden"
              >
                <summary className="p-8 font-black text-xl md:text-2xl flex justify-between items-center cursor-pointer list-none select-none">
                  {faq.q}
                  <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-2xl group-open:rotate-180 transition-transform duration-300">
                    <ChevronDown className="w-6 h-6" />
                  </div>
                </summary>
                <div className="px-8 pb-8">
                  <div className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium border-t border-neutral-100 dark:border-neutral-800 pt-8">
                    <div dangerouslySetInnerHTML={{ __html: faq.a }} />
                  </div>
                </div>
              </motion.details>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
  );
};
