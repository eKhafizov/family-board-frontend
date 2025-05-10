import { useEffect } from 'react';
import PropTypes from 'prop-types';
import AdSense from 'react-adsense';
import styles from './AdBanner.module.css';

export default function AdBanner({ role }) {
  // выбираем нужные из env
  const client = process.env[
    role === 'parent'
      ? 'REACT_APP_AD_CLIENT_PARENT'
      : 'REACT_APP_AD_CLIENT_CHILD'
  ];
  const slot = process.env[
    role === 'parent'
      ? 'REACT_APP_AD_SLOT_PARENT'
      : 'REACT_APP_AD_SLOT_CHILD'
  ];

  // Убедимся, что <ins> перерисовывается
  useEffect(() => {
    if (window.adsbygoogle) window.adsbygoogle.push({});
  }, [role]);

  return (
    <div className={styles.wrapper}>
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
