import React from "react";
import styles from "./MetricCard.module.scss";

interface MetricCardProps {
	number: string;
	title: string;
	badge?: string;
	isMigrated?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
	number,
	title,
	isMigrated = false,
}) => {
	return (
		<div
			className={
				isMigrated ? styles.sasMetricCardMigrated : styles.sasMetricCard
			}
		>
			<div className={styles.sasMetricCardContent}>
				<p className={styles.sasMetricNumber}>{number}</p>
				<p className={styles.sasMetricTitle}>{title}</p>
			</div>
		</div>
	);
};

export default MetricCard;
