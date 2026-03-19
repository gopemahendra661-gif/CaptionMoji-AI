import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Copy, Share2, RefreshCcw, Zap, Laugh, Heart, Skull, Target, Send, Check, Instagram, Trash2 } from 'lucide-react';
import { generateCaption } from '../services/aiService';
import { SEO } from '../components/Layout';

const MODES = [
  { id: 'normal', name: 'Normal', icon: <Zap className="w-4 h-4" /> },
  { id: 'viral', name: 'Viral 🔥', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'funny', name: 'Funny 😂', icon: <Laugh className="w-4 h-4" /> },
  { id: 'romantic', name: 'Romantic ❤️', icon: <Heart className="w-4 h-4" /> },
  { id: 'sad', name: 'Sad 💔', icon: <Skull className="w-4 h-4" /> },
  { id: 'hook', name: 'Hook Mode 🎯', icon: <Target className="w-4 h-4" /> },
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

const EXAMPLES = [
  "आज बहुत खुश हूँ",
  "Life is beautiful",
  "Working on something big",
  "Missing home",
  "Coffee and code",
];

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
    <div className="max-w-4xl mx-auto">
      <SEO 
        title="AI Caption & Emoji Generator Free Online (Hindi + Viral)"
        description="CaptionMoji AI: Free online tool to convert text into viral captions with smart emoji combinations for Instagram, WhatsApp, and YouTube Shorts. Support for Hindi, Hinglish, and English."
        keywords="ai text to emoji converter, emoji generator online, caption with emoji generator, emoji converter ai free, instagram emoji caption generator, whatsapp emoji text converter"
      />

      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400"
        >
          CaptionMoji AI
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
        >
          Free AI Caption & Emoji Generator for Viral Content.
          Support for Hindi, Hinglish, and English.
        </motion.p>
      </div>

      {/* Main Input Section */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 p-6 md:p-8 mb-8">
        <div className="space-y-6">
          {/* Input Box */}
          <div className="space-y-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your text here (English, Hindi, or Hinglish)..."
              className="w-full h-40 p-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none text-lg"
            />
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-neutral-500 flex items-center">Try these:</span>
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setInput(ex)}
                  className="text-xs px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all text-neutral-600 dark:text-neutral-400"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mode Selection */}
            <div>
              <label className="block text-sm font-semibold mb-2">Mode</label>
              <div className="grid grid-cols-2 gap-2">
                {MODES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all ${
                      mode === m.id 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {m.icon}
                    <span>{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Style Selection */}
            <div>
              <label className="block text-sm font-semibold mb-2">Style</label>
              <div className="grid grid-cols-2 gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      style === s.id 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Intensity Selection */}
            <div>
              <label className="block text-sm font-semibold mb-2">Emoji Intensity</label>
              <div className="grid grid-cols-3 gap-2">
                {INTENSITIES.map((i) => (
                  <button
                    key={i.id}
                    onClick={() => setIntensity(i.id)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      intensity === i.id 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {i.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="space-y-4">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center space-x-2"
              >
                <Skull className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
            <button
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center space-x-2 text-lg"
            >
              {loading ? (
                <RefreshCcw className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Zap className="w-6 h-6" />
                  <span>Generate Viral Caption</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Output Section */}
      <AnimatePresence>
        {output && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border-2 border-indigo-500/20 p-6 md:p-8 mb-8"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <span>Your AI Caption</span>
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleCopy(output.caption)}
                  className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => handleShare(output.caption)}
                  className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  title="Share to WhatsApp"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-xl text-xl font-medium leading-relaxed mb-4">
              {output.caption}
            </div>
            {output.explanation && (
              <p className="text-sm text-neutral-500 italic">
                {output.explanation}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Outputs */}
      {recentOutputs.length > 0 && (
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-4">Recent Captions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentOutputs.map((item) => (
              <div key={item.timestamp} className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 flex justify-between items-center group">
                <p className="text-sm truncate mr-4 flex-1">{item.caption}</p>
                <div className="flex items-center space-x-1">
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
            ))}
          </div>
        </div>
      )}

      {/* SEO Content Section */}
      <div className="prose dark:prose-invert max-w-none mt-20 p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <h2 className="text-3xl font-bold mb-6">Why use CaptionMoji AI?</h2>
        <p>
          In the world of social media, a caption is more than just text—it's your voice, your brand, and your engagement driver. 
          CaptionMoji AI is designed to help you create <strong>viral captions with smart emojis</strong> in seconds. 
          Whether you're posting on Instagram, WhatsApp, or YouTube Shorts, our AI understands the context and emotion of your text to provide the perfect emoji combinations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Instagram className="w-5 h-5 text-pink-500" />
              Instagram Emoji Caption Generator
            </h3>
            <p className="text-sm">
              Boost your Reels and posts with aesthetic captions that stop the scroll. Our AI knows exactly which emojis trend on Instagram.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border border-green-100 dark:border-green-900/30">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Send className="w-5 h-5 text-green-500" />
              WhatsApp Emoji Text Converter
            </h3>
            <p className="text-sm">
              Make your status updates and messages more expressive. Convert plain Hindi or English text into emoji-rich messages instantly.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">Features of our AI Emoji Generator</h3>
        <ul>
          <li><strong>Multi-language Support:</strong> Works perfectly with Hindi, Hinglish, and English.</li>
          <li><strong>Emotion Detection:</strong> Understands if you're happy, sad, romantic, or funny.</li>
          <li><strong>Smart Combinations:</strong> Uses emoji pairings that look professional and aesthetic.</li>
          <li><strong>SEO Optimized:</strong> Helps your content rank better with relevant keywords and tags.</li>
        </ul>

        <h3 className="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions (FAQ)</h3>
        <div className="space-y-4">
          <details className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg cursor-pointer">
            <summary className="font-semibold">Is CaptionMoji AI free to use?</summary>
            <p className="mt-2 text-sm">Yes, CaptionMoji AI is 100% free for everyone. You can generate unlimited captions and emojis.</p>
          </details>
          <details className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg cursor-pointer">
            <summary className="font-semibold">Does it support Hindi captions?</summary>
            <p className="mt-2 text-sm">Absolutely! We specialize in Hindi and Hinglish captions with appropriate Indian cultural emojis.</p>
          </details>
          <details className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg cursor-pointer">
            <summary className="font-semibold">Can I use it for YouTube Shorts?</summary>
            <p className="mt-2 text-sm">Yes, use the "Hook Mode" to generate attention-grabbing titles and captions for your YouTube Shorts and Reels.</p>
          </details>
        </div>
      </div>
    </div>
  );
};
