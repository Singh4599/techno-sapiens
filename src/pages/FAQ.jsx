import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';

const faqData = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is Techno Sapiens?',
        a: 'Techno Sapiens is an annual college tech fest featuring hackathons, workshops, competitions, and tech talks. It brings together students, professionals, and tech enthusiasts to celebrate innovation and technology.'
      },
      {
        q: 'When and where is the event?',
        a: 'The event will be held on March 15-17, 2025, at Tech Campus. Check the schedule page for detailed timings and venue information.'
      },
    ]
  },
  {
    category: 'Registration',
    questions: [
      {
        q: 'How do I register for events?',
        a: 'You can register by creating an account on our website, browsing the events page, and clicking the "Register" button on your desired event. Some events may require a registration fee.'
      },
      {
        q: 'Can I register for multiple events?',
        a: 'Yes! You can register for as many events as you like, as long as they don\'t have conflicting schedules. Check the schedule page to plan your participation.'
      },
      {
        q: 'What is the registration deadline?',
        a: 'Registration deadlines vary by event. Most events close registration 2-3 days before the event date. Register early to secure your spot!'
      },
    ]
  },
  {
    category: 'Events',
    questions: [
      {
        q: 'What types of events are there?',
        a: 'We offer hackathons, workshops, coding competitions, tech talks, gaming tournaments, and cultural events. Visit the Events page to see the complete lineup.'
      },
      {
        q: 'Are events free?',
        a: 'Some events are free while others require a registration fee. The fee details are mentioned on each event\'s page.'
      },
    ]
  },
  {
    category: 'Workshops',
    questions: [
      {
        q: 'Do I need prior experience for workshops?',
        a: 'It depends on the workshop. Each workshop page lists the prerequisites and skill level required. We have workshops for beginners as well as advanced participants.'
      },
      {
        q: 'Will I receive a certificate?',
        a: 'Yes, all workshop participants will receive a certificate of participation upon completion.'
      },
    ]
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(item =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-text-secondary text-lg">
            Find answers to common questions about Techno Sapiens
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background-surface border border-white/10 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </motion.div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {filteredFAQs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-2xl font-orbitron font-bold gradient-text mb-4">
                {category.category}
              </h2>
              
              <div className="space-y-3">
                {category.questions.map((item, questionIndex) => {
                  const index = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openIndex === index;

                  return (
                    <div
                      key={questionIndex}
                      className="glass-strong rounded-xl border border-white/10 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                      >
                        <span className="text-lg font-medium text-text-primary pr-4">
                          {item.q}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-6 pb-6 text-text-secondary">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-text-secondary text-lg">No questions found matching your search.</p>
          </motion.div>
        )}

        {/* Contact Section */}
        <motion.div
          className="mt-16 text-center glass-strong rounded-xl p-8 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold gradient-text mb-4">
            Still have questions?
          </h3>
          <p className="text-text-secondary mb-6">
            Can't find the answer you're looking for? Feel free to reach out to our team.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary-light transition-colors"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
