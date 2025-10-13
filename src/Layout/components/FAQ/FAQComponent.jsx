import React, { useEffect, useState } from 'react';
import './FAQComponent.css';
import { Link, useNavigate } from 'react-router-dom';
import useFetchData from '../../../Utilities/getFunction';
import moment from 'moment/moment';

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
  // const topics = ['All', 'Account', 'Billing', 'Software', 'Hardware', 'Network'];

  const { data, isPending, error } = useFetchData("generals/faqs");

  console.log("data", data)

  const faqs = [
    {
      id: 1,
      question: 'How do I reset my password?',
      topic: 'Account',
      date: '2023-10-15',
      shortContent: 'To reset your password, go to the login page and click "Forgot Password". Enter your email address and follow the instructions sent to your inbox.',
      hasMedia: true
    },
    {
      id: 2,
      question: 'How do I become a partner?',
      topic: 'Becoming a Partner',
      date: '2023-10-12',
      shortContent: 'To become a partner, visit our Partners page and fill out the application form. Our team will review your application and get back to you within 5-7 business days.',
      hasMedia: false
    },
    {
      id: 3,
      question: 'How do I sell sim as a partner?',
      topic: 'Selling Sim',
      date: '2023-10-10',
      shortContent: 'To sell vitel wireless sim as a partner, you need to download and install a the required applications: Vitel Partner App, Vitel Agent App and Vitel KYC App.',
      hasMedia: true
    },
    
  ];

  const filteredFAQs = activeTopic === 'All' ? data?.data : data?.data.filter(faq => faq.id == activeTopic);



  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  console.log("Active Topic:", filteredFAQs);

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
            <option value="All">All</option>
            {data?.data?.map(top => (

              <option key={top.id} value={top.id}>{top.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="faq-list">
        {filteredFAQs?.length == 0 && !isPending &&
          <div className="no-tickets">
            <p>No  FAQ found.</p>
          </div>}

        { 
          isPending ? <div className="loader-div-Ticket"> 
          <span className="loader"></span> </div> : null
        }

        {filteredFAQs?.map(faq => (
          <div key={faq.id} className="faq-item">
            <div
              className="faq-question"
              onClick={() => toggleQuestion(faq.id)}>
              <h3>{faq.question}</h3>
              <span className="indicator">
                {expandedQuestion === faq.id ? '−' : '+'}
              </span>
            </div>  

            {expandedQuestion === faq.id && (
              <div className="faq-answer">
                <div className="faq-meta">
                  <span className="topic-badge">{faq.title}</span>
                  <span className="date">
                Updated: {moment(faq.createdAt).format("lll")}</span>
                </div>
                <p>{faq.shortDescription}</p>
                {faq.imageUrl || faq.videoUrl ? (
                  <div className="media-notice">
                    {/* <span className="media-icon">🖼️</span> */}
                    This article contains helpful graphics and videos
                  </div>
                   ) : (null)
                }
                <Link
                  to={{
                    pathname: `/segametric-dashboard/faq-details/${faq.id}`,
                  }}
                  state={{ faq }}
                  className="read-full-article-btn"
                >
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