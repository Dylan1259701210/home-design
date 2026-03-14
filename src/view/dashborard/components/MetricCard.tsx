import React from "react";
import styles from "./MetricCard.module.scss";

interface MetricCardProps {
	number: string;
	title: string;
	badge?: string;
	isMigrated?: boolean;
}

const formatNumber = (num: string): string => {
	const number = parseFloat(num);
	if (isNaN(number)) return num;
	return number.toLocaleString();
};

export const MetricCard: React.FC<MetricCardProps> = ({
	number,
	title,
	isMigrated = false,
}) => {
	const formattedNumber = formatNumber(number);
	return (
		<div
			className={
				isMigrated ? styles.sasMetricCardMigrated : styles.sasMetricCard
			}
		>
			<div className={styles.sasMetricCardContent}>
				<p className={styles.sasMetricNumber}>{formattedNumber}</p>
				<p className={styles.sasMetricTitle}>{title}</p>
			</div>
		</div>
	);
};

export default MetricCard;
