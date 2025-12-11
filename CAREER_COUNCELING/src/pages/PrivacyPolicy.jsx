import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-200 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 sm:p-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Last updated: December 10, 2025</p>

          <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Introduction</h2>
              <p>
                Welcome to CareerPath. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at support@careerpath.com.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Information We Collect</h2>
              <p className="mb-2">
                We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website or otherwise when you contact us.
              </p>
              <p>
                The personal information that we collect depends on the context of your interactions with us and the website, the choices you make and the products and features you use. The personal information we collect may include the following:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Names</li>
                <li>Email Addresses</li>
                <li>Phone Numbers</li>
                <li>Job Titles</li>
                <li>Education History</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. How We Use Your Information</h2>
              <p>
                We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>To facilitate account creation and logon process.</li>
                <li>To send you marketing and promotional communications.</li>
                <li>To fulfill and manage your orders.</li>
                <li>To post testimonials.</li>
                <li>To deliver and facilitate delivery of services to the user.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Sharing Your Information</h2>
              <p>
                We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
                <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">5. Data Safety</h2>
              <p>
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">6. Contact Us</h2>
              <p>
                If you have questions or comments about this policy, you may email us at support@careerpath.com or by post to:
              </p>
              <address className="mt-2 not-italic">
                CareerPath Inc.<br />
                123 Innovation Drive,<br />
                Mumbai, India - 400001
              </address>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
