import React from "react";
import { useParams, Link } from "react-router-dom";
import "./FAQDetails.css";

const FAQDetails = () => {
  const { id } = useParams();

  // Sample data - in a real app, this would come from an API
  const faqArticle = {
    id: 1,
    title: "How do I reset my password?",
    category: "Account",
    lastUpdated: "October 15, 2023",
    readTime: "5 min read",
    content: `
      <p>If you've forgotten your password or need to reset it for security reasons, follow these steps:</p>
      
      <h3>Steps to reset your password:</h3>
      <ol>
        <li>Go to the login page of our application</li>
        <li>Click on the "Forgot Password" link below the login form</li>
        <li>Enter the email address associated with your account</li>
        <li>Check your email inbox for a password reset link</li>
        <li>Click the link in the email (valid for 24 hours)</li>
        <li>Create a new strong password following our security guidelines</li>
        <li>Confirm your new password and save changes</li>
      </ol>
      
      <h3>Password requirements:</h3>
      <ul>
        <li>At least 8 characters long</li>
        <li>Include uppercase and lowercase letters</li>
        <li>Include at least one number</li>
        <li>Include at least one special character (!@#$%^&*)</li>
        <li>Should not be a password you've used previously</li>
      </ul>
      
      <div class="media-container">
        <img src="https://cdn.dribbble.com/userupload/15899497/file/original-200cc607a6574e27aa84714962f94db4.png?crop=0x0-3201x2401&format=webp&resize=400x300&vertical=center" alt="Password reset screen example" />
        <p class="media-caption">The password reset screen where you can request a new password</p>
      </div>
      
      <h3>Troubleshooting common issues:</h3>
      <p><strong>Not receiving the reset email?</strong> Check your spam folder or try requesting another reset after 5 minutes.</p>
      <p><strong>Reset link expired?</strong> Password reset links are only valid for 24 hours for security reasons. Request a new one if yours has expired.</p>
      <p><strong>Remembered your old password?</strong> You can simply go back to the login page and sign in with your current password.</p>
      
      <div class="video-container">
        <h3>Video tutorial:</h3>
        <div class="video-placeholder">
          <div class="play-button"></div>
          <p>Video: How to reset your password in 3 easy steps</p>
        </div>
      </div>
      
      <h3>Need additional help?</h3>
      <p>If you're still having trouble resetting your password, please contact our support team. Have your account information ready to verify your identity.</p>
    `,
    relatedFaqs: [
      { id: 2, title: "How to change account email address" },
      { id: 3, title: "Two-factor authentication setup guide" },
      { id: 4, title: "How to recover a locked account" },
    ],
    helpful: true, // Whether the article was helpful
    author: {
      name: "Sarah Johnson",
      role: "Security Specialist",
      avatar: "SJ",
    },
  };

  return (
    <div className="faq-details-container">
      {/* Breadcrumb Navigation */}
      {/* <nav className="breadcrumb">
        <Link to="/admin-dashboard/trending-faq">Trending FAQ</Link>
        <span className="breadcrumb-divider">/</span>
        <span>{faqArticle.category}</span>
        <span className="breadcrumb-divider">/</span>
        <span>{faqArticle.title}</span>
      </nav> */}

      {/* Article Header */}
      <div className="article-header">
        <h1 className="article-title">{faqArticle.title}</h1>
        {/* <div className="article-author">
          <div className="author-avatar">{faqArticle.author.avatar}</div>
          <div className="author-info">
            <span className="author-name">{faqArticle.author.name}</span>
            <span className="author-role">{faqArticle.author.role}</span>
          </div>
        </div> */}
      </div>

      {/* Article Content */}
      <article
        className="article-content"
        dangerouslySetInnerHTML={{ __html: faqArticle.content }}
      />

      {/* Helpfulness Rating */}
      <div className="helpful-section">
        <h3>Was this article helpful?</h3>
        <div className="helpful-buttons">
          <button className="helpful-btn helpful-yes">Yes</button>
          <button className="helpful-btn helpful-no">No</button>
        </div>
      </div>

      {/* Related Articles */}
      <div className="related-articles">
        <h2>Related Articles</h2>
        <ul className="related-list">
          {faqArticle.relatedFaqs.map((faq) => (
            <li key={faq.id}>
              <Link to={`/admin-dashboard/faq-details/${faq.id}`}>
                {faq.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Back to FAQ List */}
      <div className="back-to-faq">
        <Link to="/admin-dashboard/trending-faq" className="back-link">
          ← Back to Trending FAQ
        </Link>
      </div>
    </div>
  );
};

export default FAQDetails;
