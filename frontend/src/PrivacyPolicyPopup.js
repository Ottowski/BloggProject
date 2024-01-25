// PrivacyPolicyPopup.js
import React from 'react';

const PrivacyPolicyPopup = ({ onClose }) => {
  return (
    <div className="privacy-policy-popup">
      <h4>Privacy Policy for BlogHomePage</h4>
      <h6>Last updated: 2024-01-23</h6>
      <h5>Introduction</h5>
      <p>Welcome to our BlogHomePage. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
      By accessing or using our services, you consent to the terms outlined in this policy.</p>
      <h5>Information We Collect</h5>
      <p>Personal Information
         We may collect personally identifiable information, such as your name, email address, and username, when you voluntarily submit it while using our website. This information is used for communication and identification purposes.
         Non-personal Information
         We may collect non-personal information, such as browser type, language preference, and referring site, to enhance user experience and analyze website performance.</p>
      <h5>How We Use Your Information</h5>
      <p>We use the collected information for various purposes, including:

         Providing and maintaining our website
         Improving, personalizing, and expanding our services
         Communicating with you, including responding to comments and inquiries
         Preventing, detecting, and addressing technical issues
         Complying with legal obligations</p>
      <h5>Cookies and Tracking Technologies</h5>
      <p>Our website may use cookies and similar technologies to enhance your experience. You have the option to control cookie preferences in your browser settings.</p>
      <h5>Third-Party Services</h5>
      <p>We may use third-party services that collect, monitor, and analyze information to improve our website's functionality.</p>
      <h5>Data Security</h5>
      <p>We prioritize the security of your data but cannot guarantee absolute security. Please be cautious when sharing personal information online.</p>
      <h5>Your Rights</h5>
      <p>You have the right to:

         Access your personal information
         Correct inaccuracies in your information
         Request the deletion of your information</p>
      <h5>Changes to This Privacy Policy</h5>
      <p>We reserve the right to update this Privacy Policy periodically. The latest version will be posted on this page with the effective date.</p>
      <h5>Contact Us</h5>
      <p>If you have questions or concerns about this Privacy Policy, please contact us at bloghomepage@BlogHomePage.com.

         Remember, it's crucial to adapt this template to your specific practices and applicable laws. Consider consulting with a legal professional to ensure compliance with privacy regulations in your jurisdiction. </p>
      <button variant="secondary"onClick={onClose}>Close</button>
    </div>
  );
};

export default PrivacyPolicyPopup;
