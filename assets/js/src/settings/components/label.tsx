import React from 'react';

type Props = {
  title: string
  description: string
  htmlFor: string
}

export default ({ title, description, htmlFor }: Props) => (
  <div className="mailpoet-settings-label">
    <label className="mailpoet-settings-label-title" htmlFor={htmlFor}>{title}</label>
    <p className="description">{description}</p>
  </div>
);
