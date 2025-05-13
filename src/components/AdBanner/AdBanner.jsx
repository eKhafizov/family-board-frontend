import React from 'react';
import PropTypes from 'prop-types';
import AdSense from 'react-adsense';
import styles from './AdBanner.module.css';

export default function AdBanner({ role }) {
  const clientKey =
    role === 'parent'
      ? 'REACT_APP_AD_CLIENT_PARENT'
      : 'REACT_APP_AD_CLIENT_CHILD';
  const slotKey =
    role === 'parent'
      ? 'REACT_APP_AD_SLOT_PARENT'
      : 'REACT_APP_AD_SLOT_CHILD';

  const client = process.env[clientKey];
  const slot = process.env[slotKey];

  if (!client || !slot) return null;

  return (
    <div className={styles.banner}>
      <AdSense.Google
        client={client}
        slot={slot}
        style={{ display: 'block' }}
        format="auto"
        responsive="true"
      />
    </div>
  );
}

AdBanner.propTypes = {
  role: PropTypes.oneOf(['parent', 'child']).isRequired,
};
