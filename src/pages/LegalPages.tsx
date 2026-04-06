import React from 'react';
import { SEO } from '../components/Layout';
import { motion } from 'motion/react';
import { Shield, FileText, Mail, Sparkles } from 'lucide-react';

interface LegalPageProps {
  title: string;
  seoTitle: string;
  description: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const LegalPage: React.FC<LegalPageProps> = ({ title, seoTitle, description, icon, content }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <SEO title={seoTitle} description={description} />
      
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
    </div>
  );
};

export const PrivacyPolicy = () => (
  <LegalPage
    title="Privacy Policy"
    seoTitle="Privacy Policy - CaptionMoji AI"
    description="How we handle your data and protect your privacy at CaptionMoji AI."
    icon={<Shield className="w-12 h-12" />}
    content={
      <>
        <p>Last Updated: March 19, 2026</p>
        <h2>1. Introduction</h2>
        <p>
          Welcome to <strong>CaptionMoji AI</strong>. We respect your privacy and are committed to protecting your personal data. 
          This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
        </p>

        <h2>2. The Data We Collect</h2>
        <p>
          We do not require users to create an account to use our basic services. However, we may collect:
        </p>
        <ul>
          <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
          <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting, and location.</li>
          <li><strong>Input Data:</strong> The text you provide to generate captions (this is processed by AI and not stored permanently by us).</li>
        </ul>

        <h2>3. How We Use Your Data</h2>
        <p>
          We use your data to:
        </p>
        <ul>
          <li>Provide and maintain our service.</li>
          <li>Improve our AI models and website functionality.</li>
          <li>Respond to your inquiries via email.</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.
        </p>

        <h2>5. Contact Us</h2>
        <p>
          If you have any questions about this privacy policy, please contact us at: <strong>chillforai@gmail.com</strong>
        </p>
      </>
    }
  />
);

export const TermsOfService = () => (
  <LegalPage
    title="Terms of Service"
    seoTitle="Terms of Service - CaptionMoji AI"
    description="The rules and regulations for using the CaptionMoji AI platform."
    icon={<FileText className="w-12 h-12" />}
    content={
      <>
        <p>Last Updated: March 19, 2026</p>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, 
          all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily use the materials (information or software) on CaptionMoji AI's website for personal, non-commercial transitory viewing only.
        </p>
        <p>You may not:</p>
        <ul>
          <li>Modify or copy the materials.</li>
          <li>Use the materials for any commercial purpose.</li>
          <li>Attempt to decompile or reverse engineer any software contained on the website.</li>
          <li>Remove any copyright or other proprietary notations from the materials.</li>
        </ul>

        <h2>3. Disclaimer</h2>
        <p>
          The materials on CaptionMoji AI's website are provided on an 'as is' basis. CaptionMoji AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>

        <h2>4. Limitations</h2>
        <p>
          In no event shall CaptionMoji AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on CaptionMoji AI's website.
        </p>

        <h2>5. Governing Law</h2>
        <p>
          Any claim relating to CaptionMoji AI's website shall be governed by the laws of the service provider's jurisdiction without regard to its conflict of law provisions.
        </p>

        <h2>6. Contact</h2>
        <p>Questions about the Terms of Service should be sent to: <strong>chillforai@gmail.com</strong></p>
      </>
    }
  />
);

export const ContactUs = () => (
  <LegalPage
    title="Contact Us"
    seoTitle="Contact Us - CaptionMoji AI"
    description="Get in touch with the CaptionMoji AI team for support or inquiries."
    icon={<Mail className="w-12 h-12" />}
    content={
      <>
        <div className="text-center py-8">
          <p className="text-lg mb-6">
            Have questions, feedback, or need support? We're here to help! 
            Reach out to us via email and we'll get back to you as soon as possible.
          </p>
          
          <div className="inline-block p-8 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl border border-indigo-100 dark:border-indigo-800">
            <h3 className="text-2xl font-bold mb-2 text-indigo-600 dark:text-indigo-400">Email Support</h3>
            <a 
              href="mailto:chillforai@gmail.com" 
              className="text-xl font-medium hover:underline text-neutral-800 dark:text-neutral-200"
            >
              chillforai@gmail.com
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
              <h4 className="font-bold mb-2">Support</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">For technical issues or help using the tool.</p>
            </div>
            <div className="p-6 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
              <h4 className="font-bold mb-2">Feedback</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Tell us how we can improve CaptionMoji AI.</p>
            </div>
            <div className="p-6 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
              <h4 className="font-bold mb-2">Business</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">For partnership or commercial inquiries.</p>
            </div>
          </div>
        </div>
      </>
    }
  />
);
