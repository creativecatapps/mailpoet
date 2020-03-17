import React from 'react';
import { t } from 'settings/utils';
import { Label, Inputs, PagesSelect } from 'settings/components';
import { useSetting } from 'settings/store/hooks';

export default function ConfirmationPage() {
  const [enabled] = useSetting('signup_confirmation', 'enabled');
  const [page, setPage] = useSetting('subscription', 'pages', 'confirmation');

  if (!enabled) return null;
  return (
    <>
      <Label
        title={t`confirmationPage`}
        description={t`confirmationPageDescription`}
        htmlFor="subscription-pages-confirmation"
      />
      <Inputs>
        <PagesSelect
          value={page}
          preview="confirm"
          setValue={setPage}
          id="subscription-pages-confirmation"
          linkAutomationId="preview_page_link"
        />
      </Inputs>
    </>
  );
}
