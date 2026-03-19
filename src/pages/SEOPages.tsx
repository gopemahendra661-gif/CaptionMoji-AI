import React from 'react';
import { SEO } from '../components/Layout';
import { motion } from 'motion/react';
import { Instagram, MessageCircle, Zap, Laugh, Heart, Sparkles, Send, CheckCircle2 } from 'lucide-react';

interface SEOPageProps {
  title: string;
  seoTitle: string;
  description: string;
  keywords: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export const SEOPage: React.FC<SEOPageProps> = ({ title, seoTitle, description, keywords, icon, content }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <SEO title={seoTitle} description={description} keywords={keywords} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center justify-center p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl mb-6 text-indigo-600 dark:text-indigo-400">
          {icon}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{title}</h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          {description}
        </p>
      </motion.div>

      <div className="prose dark:prose-invert max-w-none bg-white dark:bg-neutral-900 p-8 md:p-12 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
        {content}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center p-12 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl text-white shadow-xl shadow-indigo-500/20">
        <h2 className="text-3xl font-bold mb-4">Ready to boost your engagement?</h2>
        <p className="text-indigo-100 mb-8 text-lg">Try our AI Caption & Emoji Generator for free today!</p>
        <a 
          href="/" 
          className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all shadow-lg"
        >
          <Sparkles className="w-5 h-5" />
          <span>Start Generating Now</span>
        </a>
      </div>
    </div>
  );
};

export const InstagramPage = () => (
  <SEOPage
    title="Emoji for Instagram Captions"
    seoTitle="Emoji for Instagram Captions Generator - AI CaptionMoji"
    description="Get the best aesthetic emojis for your Instagram captions, Reels, and stories. Our AI understands Instagram trends and provides viral emoji combinations."
    keywords="emoji for instagram captions, aesthetic instagram emojis, instagram emoji combinations, viral instagram captions"
    icon={<Instagram className="w-12 h-12" />}
    content={
      <>
        <h2>The Ultimate Guide to Instagram Emojis</h2>
        <p>
          Instagram is a visual-first platform, and your captions need to match that energy. Using the right emojis can increase your engagement rate by up to 48%. 
          But choosing the right ones can be tricky. That's where <strong>CaptionMoji AI</strong> comes in.
        </p>
        
        <h3>Why Instagram Emojis Matter</h3>
        <ul>
          <li><strong>Visual Appeal:</strong> Emojis break up long blocks of text and make your captions more readable.</li>
          <li><strong>Emotional Context:</strong> They convey tone and emotion that words alone sometimes can't.</li>
          <li><strong>Brand Personality:</strong> Consistent emoji use helps define your brand's aesthetic.</li>
        </ul>

        <h3>Top Viral Instagram Emoji Combinations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <h4 className="font-bold mb-2">Aesthetic & Soft</h4>
            <p className="text-2xl">✨☁️🦋🌸🐚</p>
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <h4 className="font-bold mb-2">Hype & Energy</h4>
            <p className="text-2xl">🔥🚀⚡💎💸</p>
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <h4 className="font-bold mb-2">Moody & Dark</h4>
            <p className="text-2xl">🌑🥀🖤⛓️🕸️</p>
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <h4 className="font-bold mb-2">Travel & Adventure</h4>
            <p className="text-2xl">🌍✈️🏔️📸🌊</p>
          </div>
        </div>

        <h3>How to use our Instagram Emoji Generator</h3>
        <p>
          Simply type your caption in the input box on our home page, select the "Viral" or "Aesthetic" mode, and let our AI do the magic. 
          It will improve your sentence structure and add the most relevant emojis based on current Instagram trends.
        </p>
      </>
    }
  />
);

export const WhatsAppPage = () => (
  <SEOPage
    title="Emoji for WhatsApp Status & Messages"
    seoTitle="WhatsApp Emoji Text Converter - AI CaptionMoji"
    description="Convert your plain WhatsApp messages and status updates into expressive, emoji-rich content. Perfect for Hindi and English users."
    keywords="emoji for whatsapp, whatsapp status emoji generator, emoji text converter whatsapp, hindi whatsapp emojis"
    icon={<MessageCircle className="w-12 h-12" />}
    content={
      <>
        <h2>Make Your WhatsApp Messages Stand Out</h2>
        <p>
          WhatsApp is personal. Whether it's a birthday wish, a status update, or a simple "How are you?", adding emojis makes it more human. 
          Our <strong>WhatsApp Emoji Text Converter</strong> helps you find the perfect balance.
        </p>

        <h3>Best Emojis for WhatsApp Status</h3>
        <p>
          Your status is your daily vibe. Here are some popular categories:
        </p>
        <ul>
          <li><strong>Morning Vibes:</strong> ☕☀️🌻🙏✨</li>
          <li><strong>Work Mode:</strong> 💻📈☕🔥🎯</li>
          <li><strong>Party/Celebration:</strong> 🥳🎉🥂💃🕺</li>
          <li><strong>Relaxing:</strong> 🧘‍♂️🍃📖☕🌙</li>
        </ul>

        <h3>Hindi WhatsApp Emoji Captions</h3>
        <p>
          Hindi and Hinglish messages often need specific cultural emojis. Our AI is trained to understand:
        </p>
        <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border border-green-100 dark:border-green-900/30 my-8">
          <p className="font-medium">"आज का दिन बहुत यादगार रहा" ➡️ "आज का दिन बहुत यादगार रहा 😄📸✨💖🙏"</p>
          <p className="font-medium mt-2">"मेहनत का फल मीठा होता है" ➡️ "मेहनत का फल मीठा होता है 💪🔥🎯🍎✨"</p>
        </div>

        <h3>Tips for WhatsApp Emojis</h3>
        <ol>
          <li><strong>Don't Overdo It:</strong> Keep it readable. 3-5 emojis are usually perfect.</li>
          <li><strong>End of Sentence:</strong> Place emojis at the end of sentences for better flow.</li>
          <li><strong>Context Matters:</strong> Use emojis that actually relate to what you're saying.</li>
        </ol>
      </>
    }
  />
);

export const FunnyPage = () => (
  <SEOPage
    title="Funny Emoji & Caption Generator"
    seoTitle="Funny Emoji Text Generator Online - AI CaptionMoji"
    description="Generate hilarious captions with funny emoji combinations. Perfect for memes, jokes, and witty social media posts."
    keywords="funny emoji generator, funny captions with emojis, meme emoji generator, witty captions ai"
    icon={<Laugh className="w-12 h-12" />}
    content={
      <>
        <h2>Level Up Your Humor with AI</h2>
        <p>
          Humor is all about timing and delivery. In the digital world, emojis are your delivery. 
          Our <strong>Funny Emoji Generator</strong> helps you find that perfect witty edge for your memes and jokes.
        </p>

        <h3>The "Funny" Emoji Starter Pack</h3>
        <p>These emojis are guaranteed to add a layer of irony or humor to your text:</p>
        <div className="flex flex-wrap gap-4 my-8">
          <span className="text-4xl p-4 bg-neutral-100 dark:bg-neutral-800 rounded-2xl">💀</span>
          <span className="text-4xl p-4 bg-neutral-100 dark:bg-neutral-800 rounded-2xl">🤡</span>
          <span className="text-4xl p-4 bg-neutral-100 dark:bg-neutral-800 rounded-2xl">🫠</span>
          <span className="text-4xl p-4 bg-neutral-100 dark:bg-neutral-800 rounded-2xl">👁️👄👁️</span>
          <span className="text-4xl p-4 bg-neutral-100 dark:bg-neutral-800 rounded-2xl">🚩</span>
        </div>

        <h3>Examples of Funny AI Enhancements</h3>
        <div className="space-y-4 my-8">
          <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10">
            <p className="text-sm text-neutral-500">Input: "I'm so tired"</p>
            <p className="font-bold">AI Output: "I'm so tired my coffee needs a coffee ☕💀🫠📉"</p>
          </div>
          <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10">
            <p className="text-sm text-neutral-500">Input: "Dieting is hard"</p>
            <p className="font-bold">AI Output: "My brain says gym, but my heart says 3 large pizzas 🍕🤡🚩🥗❌"</p>
          </div>
        </div>

        <h3>Why use Funny Mode?</h3>
        <p>
          Funny mode doesn't just add emojis; it rephrases your input to be more relatable and humorous. 
          It uses sarcasm, irony, and self-deprecating humor which are highly engaging on platforms like X (Twitter) and Instagram.
        </p>
      </>
    }
  />
);

export const HindiPage = () => (
  <SEOPage
    title="Hindi & Hinglish Caption Generator"
    seoTitle="Hindi Emoji Caption Generator Online - AI CaptionMoji"
    description="The best AI tool for generating Hindi and Hinglish captions with emojis. Perfect for Indian creators on Instagram and WhatsApp."
    keywords="hindi emoji caption generator, hinglish captions for instagram, hindi text to emoji, indian emoji generator"
    icon={<Zap className="w-12 h-12" />}
    content={
      <>
        <h2>भारत का अपना AI Caption Generator</h2>
        <p>
          Hindi is a language of emotions. Whether you write in pure Hindi or Hinglish, our AI understands the cultural nuances of your words. 
          <strong>CaptionMoji AI</strong> is the first tool optimized specifically for Indian social media users.
        </p>

        <h3>Why Hindi Creators Love Us</h3>
        <ul>
          <li><strong>Cultural Context:</strong> We use emojis like 🙏, 🇮🇳, 🧿, 🪔, and 💃 that resonate with Indian audiences.</li>
          <li><strong>Hinglish Mastery:</strong> We understand "Aaj ka din mast tha" as much as "Today was a great day".</li>
          <li><strong>Emotional Depth:</strong> Hindi poetry and shayaris get the respect and emoji-rich treatment they deserve.</li>
        </ul>

        <h3>Popular Hindi Emoji Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="p-6 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-900/30">
            <h4 className="font-bold mb-2">Desi Swag</h4>
            <p className="text-xl">अपना टाइम आएगा 🔥💪😎🦁👑</p>
          </div>
          <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30">
            <h4 className="font-bold mb-2">Shayari & Love</h4>
            <p className="text-xl">तुम्हारी यादें... ❤️🥀✨🌙🦋</p>
          </div>
        </div>

        <h3>How to Rank Your Hindi Content</h3>
        <p>
          Using Hindi keywords in your captions helps you reach a massive audience in India. 
          Our AI includes relevant hashtags and keywords in the generated captions to help you trend on the "Explore" page.
        </p>
      </>
    }
  />
);

export const ViralPage = () => (
  <SEOPage
    title="Viral Caption & Hook Generator"
    seoTitle="Viral Caption Generator with Emoji - AI CaptionMoji"
    description="Generate high-engagement viral captions and hooks for your Reels, TikToks, and YouTube Shorts. Use AI to stop the scroll."
    keywords="viral caption generator, hook generator ai, high engagement captions, social media viral tool"
    icon={<Sparkles className="w-12 h-12" />}
    content={
      <>
        <h2>The Secret to Going Viral</h2>
        <p>
          What makes a post go viral? It's the <strong>Hook</strong>. The first 3 seconds of your video or the first line of your caption determine if someone stays or scrolls. 
          Our <strong>Viral Caption Generator</strong> is built on the psychology of attention.
        </p>

        <h3>What is Hook Mode?</h3>
        <p>
          Hook Mode focuses on creating a "Gap" in the reader's mind. It uses curiosity, controversy, or high-value promises to make people read more.
        </p>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/10 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-900/30 my-8">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
            Viral Hook Examples:
          </h4>
          <ul className="space-y-3">
            <li>"The one secret nobody tells you about..." 🎯🔥🤫</li>
            <li>"Stop doing this if you want to grow..." 🛑📉❌</li>
            <li>"How I went from 0 to 10k in 30 days..." 🚀📈💰</li>
            <li>"You won't believe what happened next..." 😱👀✨</li>
          </ul>
        </div>

        <h3>The Viral Emoji Strategy</h3>
        <p>
          Viral posts often use "High-Contrast" emojis. These are emojis that stand out against the white or dark background of the app. 
          Emojis like 🚨, 🛑, 💎, and 🔥 are proven to increase click-through rates.
        </p>

        <h3>Boost Your SEO with Viral Captions</h3>
        <p>
          Our AI doesn't just write for humans; it writes for algorithms. By including high-volume keywords naturally within your viral captions, 
          we help your content get indexed and recommended by social media search engines.
        </p>
      </>
    }
  />
);
