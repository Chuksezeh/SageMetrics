import React, { useEffect, useState } from "react";
import "./LearnHowTo.css";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

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
      { id: "sell-sim", name: "How to sell a SIM card" },
      { id: "activate-sim", name: "How to activate a SIM card" },
      { id: "replace-sim", name: "How to replace a SIM card/welcome pack" },
      { id: "number-porting", name: "How to port a number" },
    ],
    device: [
      { id: "setup-phone", name: "How to set up a new phone" },
      { id: "troubleshoot-device", name: "Device troubleshooting" },
    ],
    billing: [
      { id: "payment-options", name: "Payment options" },
      // { id: "reading-bill", name: "Understanding your bill" },
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
    "sell-sim": {
      title: "How to sell a SIM card",
      steps: [
        "Log into vitel wireless partner app",
        "Click on sell sim",

        "Select sim type",
        "Select category",
        "Select serial number",
        "Select MSISDN",
        "Click on purchase",
        "Top up airtime 'optional'",
        "Top up data 'optional'",
        "Click on proceed to make payment",
        "On success, proceed to sim activation",
      ],
      tips: [
        "Take note of the customer code on the receipt",
        "The customer code will be used for sim activation",
        "Keep SIM cards secure when not in use",
        "Record the transaction in the system for tracking",
      ],
    },
    "activate-sim": {
      title: "How to activate a SIM card",
      steps: [
        "Log into vitel wireless KYC app",
        "Click on the icon on the left top corner of your screen",
        "Click on New Verification",
        "Enter your NIN number for authentication",
        "Enter your NIN number for authentication",
        "Position your head on the circle to take a shut",
        "Start capture, if turned green, capture image ",
        "Submit for NIN verification ",
        "On success proceed to sim activation ",
      ],
      tips: [
        "Keep SIM cards secure when not in use",
        "Record the transaction in the system for tracking",
      ],
    },
    "replace-sim": {
      title: "How to replace a SIM card/welcome pack",
      steps: [
        "Log into vitel wireless partner app",
        "Click on the icon on the left top corner of your screen",
        "Click on Welcome Pack",
        "Click on Add New",
        "Fill the form ",
        "Capture customer image, for NIN verification",
        "On success select sim type",
        "Select category",
        "Select serial number ",
        "Click on purchase",
        "Top up airtime 'optional'",
        "Top up data 'optional'",
        "Click on proceed to make payment",
        "On success click on eye icon ",
        "Click on Process to begin processing of your welcome pack",
        "Once done, the status will change to 'Completed' ",
      ],
      tips: [
        "Keep SIM cards secure when not in use",
        "Record the transaction in the system for tracking",
      ],
    },

    "number-porting": {
      title: "How to port a number",
      steps: [
        "Log into vitel wireless partner app",
        "Click on the icon on the left top corner of your screen",
        "Click on Number Porting",
        "Click on Add New",
        "Fill the form ",
        "Wait for approval, if approved",
        // "Select category",
        // "Select serial number ",
        //  "Click on purchase",
        //  "Top up airtime 'optional'",
        //  "Top up data 'optional'",
        //  "Click on proceed to make payment",
        //  "On success click on eye icon ",
        "Click on Process to begin processing of your welcome pack",
        "Once done, the status will change to 'Completed' ",
      ],

      tips: [
        "Keep SIM cards secure when not in use",
        "Record the transaction in the system for tracking",
      ],
    },

    "setup-phone": {
      title: "How to set up a new phone",

      steps: [
        "Locate the SIM tray, usually on the side of the phone, using a SIM ejector tool or paperclip to open the small hole. ",
        "Place the SIM card onto the tray, matching the cut corner to the tray's outline. ",
        "Gently reinsert the SIM tray into the phone until it snaps into place. ",
        "The phone will automatically detect the new SIM card. ",
      ],

      tips: [
        "If you have issues with SIM recognition, ensure it's inserted correctly and restart your phone. ",
        "If activation fails, contact customer support.",
        "You may need to update your phone's software to support the SIM card. ",
      ],
    },

    "troubleshoot-device": {
      title: "Device troubleshooting",

      steps: [
        "Check the SIM card's placement: Ensure the SIM is correctly seated in the SIM tray and properly aligned with the phone's SIM slot.  ",
        "Remove and reinsert the SIM: Take the SIM card out and reinsert it into the tray.  ",
        "Inspect the SIM card: Look for scratches on the gold contacts, which can cause connectivity problems.  ",
        "Clean the SIM contacts: Gently wipe the gold contact points on the SIM card with a soft, dry cloth or cotton swab.  ",
        "Toggle Airplane Mode: Turn airplane mode on for a few seconds, then turn it off to reset network connections. ",
        "Restart your phone: A simple restart can resolve temporary glitches and prompt the device to detect the new SIM. ",
        "Test the SIM in another device: Try the SIM card in a different phone to determine if the issue is with the SIM itself or your device. ",
      ],

      tips: [
        "Check for phone updates: Outdated device software can cause compatibility problems; ensure your phone's operating system is up-to-date. ",

        ,
      ],
    },

    "payment-options": {
      title: "Payment options",
      steps: [
        "Sim Purchase = Card, Wallet, Bank Transfer, USSD",
        "Airtime Top-up = Card, Wallet, Bank Transfer, USSD",
        "Data Top-up = Card, Wallet, Bank Transfer, USSD, Airtime Balance",
        "X-phone Top-up = Card, Wallet, Bank Transfer, USSD, Airtime Balance",
        "Wallet Top-up = Card, Bank Transfer, USSD ",
        "Device Purchase = Card, Bank Transfer,USSD, Pay on Delivery",
        "IOT = Card, Bank Transfer, USSD",
        "VAS = Card, Bank Transfer, USSD",
      ],
      tips: [
        "Buy Airtime → Select amount → Choose “Pay with Wallet” or “Pay with Card”.",
        "Buy Data → Select amount → Choose “Pay with Wallet”, “Pay with Card” or “Pay with Airtime Balance”.",
        "Top-up Wallet → Choose “Bank Transfer (Virtual Account)” or Card.",
        "Buy Device → Choose “Pay with Card”, “Pay on Delivery”.",
      ],
    },

    "signal-issues": {
      title: "Fixing signal issues",
      steps: [
        "Check for coverage: Move to a different location, preferably outdoors, to see if signal strength improves. ",
        "Restart your phone: A simple reboot can often resolve temporary software glitches affecting your network connection. ",
        "Toggle Airplane Mode: Turn Airplane Mode on for a few seconds, then turn it off to force your device to find the best available signal. ",
        "Remove accessories: Take off any phone cases or accessories, as some can interfere with your phone's antenna. ",
        "Manually select your network: Go to your phone's network settings and choose to manually select your network provider, rather than having it set to automatic.  ",
        "Update software and carrier settings: Check for and install any available software updates for your device and update your carrier settings. ",

        "Reset network settings: Resetting your network settings can fix issues caused by incorrect network configurations, though it will remove saved Wi-Fi passwords. ",
      ],

      tips: [
        "Contact support: If the problem continues after trying all the steps, contact support from a working phone for further assistance. ",
        "Visit a professional: If the issue persists, there might be a hardware problem with your device's antenna or radio chip, and you may need to take it to a professional repair service. ",
      ],
    },

    "data-problems": {
      title: "Mobile data problems",
      steps: [
        "Ensure Mobile Data is On: Go to your phone's settings (e.g., Settings > Network & internet > Mobile data) to confirm it's enabled. ",
        "Reset network settings: This will reset your Wi-Fi, Bluetooth, and mobile data settings to their defaults and can resolve persistent connection problems. ",
        "Check APN Settings: If mobile data is still not working, reset your Access Point Name (APN), as incorrect APN settings can prevent data from working. ",
      ],

      tips: [
        "Restart your phone: A simple restart can resolve temporary glitches affecting your network connection. ",
        // "Record the transaction in the system for tracking",
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

            <div className="topics-list">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`topic-item ${
                    selectedCategory === category.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="topic-bullet">•</span>
                  <span className="topic-name">{category.name}</span>
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
                  <span className="topic-name">{topic.name} </span>
                </div>
              ))}
            </div>
          </div>
        );

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
                <a
                  href="https://www.vitelwireless.com/vitel-wireless-support"
                  target="_blank"
                >
                  {" "}
                  <button className="support-button">Contact Support</button>
                </a>
              </div>
            </div>
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
    </div>
  );
};

export default LearnHowTo;
