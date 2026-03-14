import React from 'react';
import styles from './MigrationStep.module.scss';

interface MigrationStepProps {
  number: string;
  title: string;
  isMigrated?: boolean;
}

export const MigrationStep: React.FC<MigrationStepProps> = ({ 
  number, 
  title, 
  isMigrated = false 
}) => {
  return (
    <div className={isMigrated ? styles.migrationFlowStepMigrated : styles.migrationFlowStep}>
      <div className={styles.migrationFlowStepContent}>
        <p className={styles.migrationFlowStepNumber}>{number}</p>
        <p className={styles.migrationFlowStepTitle}>{title}</p>
      </div>
    </div>
  );
};

export default MigrationStep;