import React from 'react';
import styles from './MigrationStep.module.scss';

interface MigrationStepProps {
  number: string;
  title: string;
  isMigrated?: boolean;
}

const formatNumber = (num: string): string => {
  const number = parseFloat(num);
  if (isNaN(number)) return num;
  return number.toLocaleString();
};

export const MigrationStep: React.FC<MigrationStepProps> = ({ 
  number, 
  title, 
  isMigrated = false 
}) => {
  const formattedNumber = formatNumber(number);
  return (
    <div className={isMigrated ? styles.migrationFlowStepMigrated : styles.migrationFlowStep}>
      <div className={styles.migrationFlowStepContent}>
        <p className={styles.migrationFlowStepNumber}>{formattedNumber}</p>
        <p className={styles.migrationFlowStepTitle}>{title}</p>
      </div>
    </div>
  );
};

export default MigrationStep;