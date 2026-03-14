import React from "react";
import styles from "./MigrationStep.module.scss";
import {
	CheckCircle,
	CheckCircle2,
	BadgeCheck,
	Award,
	Check,
} from "lucide-react";

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
	isMigrated = false,
}) => {
	const formattedNumber = formatNumber(number);
	return (
		<div
			className={
				isMigrated ? styles.migrationFlowStepMigrated : styles.migrationFlowStep
			}
		>
			<div className={styles.migrationFlowStepContent}>
				<p className={styles.migrationFlowStepNumber}>{formattedNumber}</p>
				<div className={styles.migrationFlowStepTitleContainer}>
					<p className={styles.migrationFlowStepTitle}>
						{title.replace(" Complete", "")}
					</p>
					<div
						className={`${styles.migrationFlowStepIcon} ${isMigrated ? styles.migrationFlowStepIconCompleted : ""}`}
					>
						<CheckCircle2 size={18} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MigrationStep;
