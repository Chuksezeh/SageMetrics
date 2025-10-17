import React, { useEffect, useState } from "react";
import "./LearnHowTo.css";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { vitelWirelessSageMetrics } from "../../../Utilities/axios";

const LearnHowTo = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicDetails, setTopicDetails] = useState(null);
  const [loading, setLoading] = useState({
    categories: false,
    topics: false,
    topicDetails: false,
  });

  const userdata = JSON.parse(localStorage.getItem("SageData") || "{}");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userdata) {
      navigate("/");
    }
  }, [userdata]);

  // Fetch categories on component mount
  useEffect(() => {
    getAllCategory();
  }, []);

  // Fetch topics when category changes
  useEffect(() => {
    if (selectedCategory) {
      getCategoryTopic();
    }
  }, [selectedCategory]);

  // Fetch topic details when topic changes
  useEffect(() => {
    if (selectedTopic) {
      getTopicDetails();
    }
  }, [selectedTopic]);

  const getAllCategory = async () => {
    setLoading((prev) => ({ ...prev, categories: true }));
    try {
      const res = await vitelWirelessSageMetrics.get(
        "/generals/how-works-categories"
      );
      setCategories(res.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading((prev) => ({ ...prev, categories: false }));
    }
  };

  const getCategoryTopic = async () => {
    setLoading((prev) => ({ ...prev, topics: true }));
    try {
      const res = await vitelWirelessSageMetrics.get(
        `/generals/how-works-topics/${selectedCategory}`
      );
      setTopics(res.data.topics);
      setTopicDetails(null);
    } catch (error) {
      console.error("Error fetching topics:", error);
    } finally {
      setLoading((prev) => ({ ...prev, topics: false }));
    }
  };

  const getTopicDetails = async () => {
    setLoading((prev) => ({ ...prev, topicDetails: true }));
    try {
      const res = await vitelWirelessSageMetrics.get(
        `/generals/how-works-topic/${selectedTopic}`
      );
      console.log("res topic details ==> ", res.data.topic);
      setTopicDetails(res.data.topic);
    } catch (error) {
      console.error("Error fetching topic details:", error);
    } finally {
      setLoading((prev) => ({ ...prev, topicDetails: false }));
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedTopic("");
    setTopicDetails(null);
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleHome = () => {
    setSelectedCategory("");
    setSelectedTopic("");
    setCurrentStep(1);
    setTopicDetails(null);
  };

  // Loader component
  const Loader = ({ type = "default" }) => (
    <div className="loader-spinner"></div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>Select a Category</h2>
            <p>Choose the category that best matches what you need help with</p>

            {loading.categories ? (
              <Loader type="categories" />
            ) : (
              <div className="topics-list">
                {categories.map((category) => (
                  <div
                    key={category.categoryId}
                    className={`topic-item ${
                      selectedCategory === category.categoryId ? "selected" : ""
                    }`}
                    onClick={() => setSelectedCategory(category.categoryId)}
                  >
                    <span className="topic-bullet">•</span>
                    <span className="topic-name">{category.categoryName}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h2>Select a Topic</h2>
            <p>Choose the specific topic you need assistance with</p>

            {loading.topics ? (
              <Loader type="topics" />
            ) : (
              <div className="topics-list">
                {topics?.length > 0 ? (
                  topics.map((topic) => (
                    <div
                      key={topic.topicId}
                      className={`topic-item ${
                        selectedTopic === topic.topicId ? "selected" : ""
                      }`}
                      onClick={() => setSelectedTopic(topic.topicId)}
                    >
                      <span className="topic-bullet">•</span>
                      <span className="topic-name">{topic.topicName}</span>
                    </div>
                  ))
                ) : (
                  <div className="no-data-message">
                    No topics available for this category.
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            {loading.topicDetails ? (
              <Loader type="topicDetails" />
            ) : (
              <>
                <h2>{topicDetails?.topicName}</h2>
                <div className="guide-content">
                  {/* Use dangerouslySetInnerHTML to render the HTML content */}
                  <div
                    dangerouslySetInnerHTML={{ __html: topicDetails?.content }}
                    className="topic-content"
                  />

                  <div className="additional-help">
                    <h3>Need more help?</h3>
                    <p>
                      If you're still having trouble, contact our support team
                      for assistance.
                    </p>
                    <a
                      href="https://www.vitelwireless.com/vitel-wireless-support"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="support-button">
                        Contact Support
                      </button>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="learn-how-to-container">
      <div className="learn-header">
        <h1>Learn How To</h1>
        <p>
          Step-by-step guides to help you navigate our systems and processes
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="progress-indicator">
        <div className={`progress-step ${currentStep >= 1 ? "active" : ""}`}>
          <span className="step-number">1</span>
          <span className="step-label">Category</span>
        </div>
        <div className={`progress-step ${currentStep >= 2 ? "active" : ""}`}>
          <span className="step-number">2</span>
          <span className="step-label">Topic</span>
        </div>
        <div className={`progress-step ${currentStep >= 3 ? "active" : ""}`}>
          <span className="step-number">3</span>
          <span className="step-label">Review</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation-controls">
        <button
          className="nav-button prev-button"
          onClick={handlePrev}
          disabled={currentStep === 1}
        >
          ← Previous
        </button>

        <div className="right-buttons">
          <button
            className="nav-button next-button"
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !selectedCategory) ||
              (currentStep === 2 && !selectedTopic) ||
              currentStep === 3 ||
              loading.topics ||
              loading.topicDetails
            }
          >
            {currentStep === 3 ? "Complete" : "Next →"}
          </button>

          <button
            className="nav-button home-button"
            onClick={handleHome}
            disabled={
              loading.categories || loading.topics || loading.topicDetails
            }
          >
            Home
          </button>
        </div>
      </div>

      <div className="selection-display">
        {selectedCategory && (
          <span className="selection-pill">
            Category:{" "}
            {
              categories.find((c) => c.categoryId === selectedCategory)
                ?.categoryName
            }
          </span>
        )}
        {selectedTopic && (
          <span className="selection-pill">
            Topic: {topics?.find((t) => t.topicId === selectedTopic)?.topicName}
          </span>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">{renderStep()}</div>
    </div>
  );
};

export default LearnHowTo;
