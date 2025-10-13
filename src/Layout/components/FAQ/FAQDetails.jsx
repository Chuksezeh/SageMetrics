import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import "./FAQDetails.css";

const FAQDetails = () => {
  const { id } = useParams();
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const userdata = JSON.parse(localStorage.getItem("SageData") || "{}");
  const navigate = useNavigate();
  const location = useLocation();

  const { faq } = location.state || {};
  const content = faq;

  useEffect(() => {
    if (!userdata) {
      navigate("/");
    }
  }, [userdata, navigate]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Function to safely render HTML content
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent || "" };
  };

  // Function to extract text content for image alt tags
  const getImageAltText = (title) => {
    return title ? `Illustration for ${title}` : "FAQ related image";
  };

  // Function to get video title
  const getVideoTitle = (title) => {
    return title ? `Video tutorial for ${title}` : "FAQ related video";
  };

  if (!content) {
    return (
      <div className="faq-details-container">
        <div className="error-state">
          <h2>Article Not Found</h2>
          <p>The requested FAQ article could not be loaded.</p>
          <Link to="/admin-dashboard/trending-faq" className="back-link">
            ← Back to Trending FAQ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="faq-details-container">
      <div className="article-header">
        <h1 className="article-title">{content?.title}</h1>
      </div>

    
      <article className="article-content">
        <div dangerouslySetInnerHTML={createMarkup(content?.fullDescription)} />
      </article>

      {content?.imageUrl && !imageError && (
        <div className="media-section image-section">
          <div className="media-container">
            <img
              src={content.imageUrl}
              alt={getImageAltText(content.title)}
              onError={() => setImageError(true)}
              className="article-image"
            />
            <p className="media-caption">Related image for {content.title}</p>
          </div>
        </div>
      )}


      {content?.videoUrl && !videoError && (
        <div className="media-section video-section">
          <div className="video-container">
            <h3>Video Tutorial</h3>
            <video
              controls
              className="article-video"
              title={getVideoTitle(content.title)}
              onError={() => setVideoError(true)}
            >
              <source src={content.videoUrl} type="video/mp4" />
              <source src={content.videoUrl} type="video/webm" />
              <source src={content.videoUrl} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
            <p className="media-caption">Video tutorial for {content.title}</p>
          </div>
        </div>
      )}

      {content?.imageUrl && imageError && (
        <div className="media-error">
          <p> Image could not be loaded</p>
        </div>
      )}

      {content?.videoUrl && videoError && (
        <div className="media-error">
          <p> Video could not be loaded</p>
        </div>
      )}


      <div className="helpful-section">
        <h3>Was this article helpful?</h3>
        <div className="helpful-buttons">
          <button className="helpful-btn helpful-yes">Yes</button>
          <button className="helpful-btn helpful-no">No</button>
        </div>
      </div>

      <div className="back-to-faq">
        {/* <Link to="/admin-dashboard/trending-faq" className="back-link">
          ← Back to Trending FAQ
        </Link> */}
      </div>
    </div>
  );
};

export default FAQDetails;
