import React from 'react';
import EnableSignupConfirmation from './enable_signup_confirmation';
import EmailSubject from './EmailSubject';
import EmailContent from './EmailContent';
import ConfirmationPage from './ConfirmationPage';

export default function SignupConfirmation() {
  return (
    <div className="mailpoet-settings-grid">
      <EnableSignupConfirmation />
      <EmailSubject />
      <EmailContent />
    </div>
  );
}
