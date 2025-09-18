import React, { useEffect, useState } from "react";
import "./LearnHowTo.css";
import { useNavigate } from "react-router-dom";

const LearnHowTo = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [currentStep, setCurrentStep] = useState(1); // 1: Category, 2: Topic, 3: Review


  const userdata = JSON.parse(localStorage.getItem("SageData" || "{}"));
const navigate = useNavigate();

  useEffect(() => {
    if (!userdata) {
        navigate("/");
    }
}, [userdata]);

  // Sample data
  const categories = [
    { id: "sim", name: "SIM Management" },
    { id: "device", name: "Device Setup" },
    { id: "billing", name: "Billing & Payments" },
    { id: "network", name: "Network Issues" },
    { id: "account", name: "Account Management" },
  ];

  const topics = {
    sim: [
      { id: "vend-sim", name: "How to vend a SIM card" },
      { id: "activate-sim", name: "How to activate a SIM card" },
      { id: "replace-sim", name: "How to replace a SIM card" },
    ],
    device: [
      { id: "setup-phone", name: "How to set up a new phone" },
      { id: "troubleshoot-device", name: "Device troubleshooting" },
    ],
    billing: [
      { id: "payment-options", name: "Payment options" },
      { id: "reading-bill", name: "Understanding your bill" },
    ],
    network: [
      { id: "signal-issues", name: "Fixing signal issues" },
      { id: "data-problems", name: "Mobile data problems" },
    ],
    account: [
      { id: "change-plan", name: "Changing your plan" },
      { id: "update-info", name: "Updating account information" },
    ],
  };

  const guideContent = {
    "vend-sim": {
      title: "How to vend a SIM card",
      steps: [
        "Ensure you have physical SIM cards with you",
        "Log into the vendor system with your credentials",
        "Select the customer's plan type and phone number",
        "Scan the SIM card barcode to register it",
        "Activate the SIM card in the system",
        "Provide the SIM card to the customer with instructions",
      ],
      tips: [
        "Always verify customer identity before vending SIM",
        "Keep SIM cards secure when not in use",
        "Record the transaction in the system for tracking",
      ],
    },
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedTopic("");
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
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>Select a Category</h2>
            <p>Choose the category that best matches what you need help with</p>
            <div className="category-grid">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`category-card ${
                    selectedCategory === category.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {/* <div className="category-icon">
                    {getCategoryIcon(category.id)}
                  </div> */}
                  <h3>{category.name}</h3>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h2>Select a Topic</h2>
            <p>Choose the specific topic you need assistance with</p>
            <div className="topics-list">
              {topics[selectedCategory]?.map((topic) => (
                <div
                  key={topic.id}
                  className={`topic-item ${
                    selectedTopic === topic.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedTopic(topic.id)}
                >
                  <span className="topic-bullet">•</span>
                  <span className="topic-name">{topic.name}</span>
                </div>
              ))}
            </div>
          </div>
        );

//     case 2:
//   return (
//     <div className="step-content">
//       <h2>Select a Topic</h2>
//       <p>Choose the specific topic you need assistance with</p>
      
//       <div className="topics-table-container">
//         <table className="topics-table">
//           <thead>
//             <tr>
//               <th className="table-header">Topic Name</th>
//               <th className="table-header">Category</th>
//               <th className="table-header">Last Updated</th>
//               <th className="table-header">Difficulty</th>
//               <th className="table-header actions-header">Select</th>
//             </tr>
//           </thead>
//           <tbody>
//             {topics[selectedCategory]?.map((topic) => (
//               <tr 
//                 key={topic.id} 
//                 className={`topic-row ${selectedTopic === topic.id ? 'selected' : ''}`}
//                 onClick={() => setSelectedTopic(topic.id)}
//               >
//                 <td className="topic-name-cell">
//                   <div className="topic-name-content">
//                     <span className="topic-icon">📄</span>
//                     <span className="topic-name">{topic.name}</span>
//                   </div>
//                 </td>
//                 <td className="topic-category">
//                   <span className="category-badge">
//                     {categories.find(c => c.id === selectedCategory)?.name}
//                   </span>
//                 </td>
//                 <td className="topic-updated">2 days ago</td>
//                 <td className="topic-difficulty">
//                   <span className="difficulty-badge easy">Easy</span>
//                 </td>
//                 <td className="topic-actions">
//                   <button 
//                     className={`select-button ${selectedTopic === topic.id ? 'selected' : ''}`}
//                     onClick={() => setSelectedTopic(topic.id)}
//                   >
//                     {selectedTopic === topic.id ? 'Selected' : 'Select'}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
//       {topics[selectedCategory]?.length === 0 && (
//         <div className="no-topics-message">
//           <p>No topics available for this category.</p>
//         </div>
//       )}
//     </div>
//   );

      case 3:
        const guide = guideContent[selectedTopic];
        return (
          <div className="step-content">
            <h2>{guide?.title}</h2>
            <div className="guide-content">
              <h3>Steps:</h3>
              <ol className="steps-list">
                {guide?.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>

              {guide?.tips && (
                <>
                  <h3>Pro Tips:</h3>
                  <ul className="tips-list">
                    {guide.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </>
              )}

              <div className="additional-help">
                <h3>Need more help?</h3>
                <p>
                  If you're still having trouble, contact our support team for
                  assistance.
                </p>
                <button className="support-button">Contact Support</button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

//   const getCategoryIcon = (categoryId) => {
//     const icons = {
//       sim: "📱",
//       device: "📟",
//       billing: "💰",
//       network: "📶",
//       account: "👤",
//     };
//     return icons[categoryId] || "❓";
//   };

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

      <div className="selection-display">
        {selectedCategory && (
          <span className="selection-pill">
            Category: {categories.find((c) => c.id === selectedCategory)?.name}
          </span>
        )}
        {selectedTopic && (
          <span className="selection-pill">
            Topic:{" "}
            {
              topics[selectedCategory]?.find((t) => t.id === selectedTopic)
                ?.name
            }
          </span>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">{renderStep()}</div>

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
              currentStep === 3
            }
          >
            {currentStep === 3 ? "Complete" : "Next →"}
          </button>

          <button className="nav-button home-button" onClick={handleHome}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnHowTo;
