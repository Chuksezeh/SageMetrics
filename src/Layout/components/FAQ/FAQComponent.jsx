import React, { useEffect, useState } from 'react';
import './FAQComponent.css';
import { Link, useNavigate } from 'react-router-dom';

const FAQComponent = () => {
  const [activeTopic, setActiveTopic] = useState('All');
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const userdata = JSON.parse(localStorage.getItem("SageData" || "{}"));
 const navigate = useNavigate();

  useEffect(() => {
    if (!userdata) {
        navigate("/");
    }
}, [userdata]);

  // Sample data
  const topics = ['All', 'Account', 'Billing', 'Software', 'Hardware', 'Network'];
  
  const faqs = [
    {
      id: 1,
      question: 'How do I reset my password?',
      topic: 'Account',
      date: '2023-10-15',
      content: 'To reset your password, go to the login page and click "Forgot Password". Enter your email address and follow the instructions sent to your inbox.',
      hasMedia: true
    },
    {
      id: 2,
      question: 'Why is my invoice different than expected?',
      topic: 'Billing',
      date: '2023-10-12',
      content: 'Invoice discrepancies can occur due to prorated charges, taxes, or additional services. Check your billing statement details or contact our support team for a detailed breakdown.',
      hasMedia: false
    },
    {
      id: 3,
      question: 'How to update to the latest software version?',
      topic: 'Software',
      date: '2023-10-10',
      content: 'To update your software: 1. Open Settings > System 2. Click "Check for Updates" 3. If an update is available, click "Download and Install" 4. Restart your application when prompted.',
      hasMedia: true
    },
    {
      id: 4,
      question: 'My device won\'t turn on, what should I do?',
      topic: 'Hardware',
      date: '2023-10-05',
      content: 'First, check that your device is properly connected to a power source. Try a different power outlet or cable. If the issue persists, it may indicate a hardware problem requiring professional assistance.',
      hasMedia: true
    },
    {
      id: 5,
      question: 'How to improve my internet connection stability?',
      topic: 'Network',
      date: '2023-10-01',
      content: 'For better connection stability: 1. Position your router centrally 2. Reduce interference from other devices 3. Use a wired connection when possible 4. Update your router firmware 5. Contact your ISP if issues continue.',
      hasMedia: false
    },
    {
      id: 6,
      question: 'How do I change my subscription plan?',
      topic: 'Billing',
      date: '2023-09-28',
      content: 'You can change your subscription plan at any time by visiting the Billing section of your account dashboard. Select the plan you want and confirm the changes. The new rate will apply from your next billing cycle.',
      hasMedia: false
    }
  ];

  const filteredFAQs = activeTopic === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.topic === activeTopic);

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our products and services</p>
      </div>
      
      <div className="trending-section">
        <h2>Trending FAQ's</h2>
        <div className="filter-container">
          <span>Filter by Topic:</span>
          <select 
            value={activeTopic} 
            onChange={(e) => setActiveTopic(e.target.value)}
            className="topic-filter"
          >
            {topics.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="faq-list">
        {filteredFAQs.map(faq => (
          <div key={faq.id} className="faq-item">
            <div 
              className="faq-question"
              onClick={() => toggleQuestion(faq.id)}
            >
              <h3>{faq.question}</h3>
              <span className="indicator">
                {expandedQuestion === faq.id ? '−' : '+'}
              </span>
            </div>
            
            {expandedQuestion === faq.id && (
              <div className="faq-answer">
                <div className="faq-meta">
                  <span className="topic-badge">{faq.topic}</span>
                  <span className="date">Updated: {faq.date}</span>
                </div>
                <p>{faq.content}</p>
                {faq.hasMedia && (
                  <div className="media-notice">
                    {/* <span className="media-icon">🖼️</span> */}
                    This article contains helpful graphics and videos
                  </div>
                )}
                <Link to={`/segametric-inside/faq-details/${faq.id}`} className="read-full-article-btn">
                  Read Full Article →
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQComponent;