import React from 'react';
import styles from './DashboardHeader.module.scss';

interface DashboardHeaderProps {
  title: string;
}

const HSBCIcon: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className} style={{ 
    width: '24px', 
    height: '24px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#F9E000',
    borderRadius: '2px'
  }}>
    <span style={{ 
      fontSize: '16px', 
      fontWeight: 'bold', 
      color: '#002F6C',
      fontFamily: 'Arial, sans-serif'
    }}>
      HSBC
    </span>
  </div>
);

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerLeft}>
          <HSBCIcon className={styles.headerIcon} />
          <h1 className={styles.headerTitle}>{title}</h1>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;