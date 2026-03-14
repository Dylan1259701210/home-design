import React from 'react';
import styles from './DashboardHeader.module.scss';

interface DashboardHeaderProps {
  title: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.headerTitle}>{title}</h1>
      </div>
    </header>
  );
};

export default DashboardHeader;