import React from "react";
import "./Header.css";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = ({ setSidebarOpen }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            className="mobile-menu-button"
            onClick={() => setSidebarOpen(true)}
          >
            <RxHamburgerMenu />
          </button>
        </div>

        {/* Actions */}
        <div className="header-actions">
          {/* Notification */}
          <div className="relative">
            <button className="notification-button">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <span className="notification-badge"></span>
          </div>

          {/* User avatar */}
          <div className="relative">
            <button className="user-button">
              <div className="user-avatar">JD</div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
