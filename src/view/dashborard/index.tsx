"use client";
import React from "react";
import { fileTreeData } from "./mock";
import styles from "./index.module.scss";

// Import modular components
import DashboardHeader from "./components/DashboardHeader";
import MetricCard from "./components/MetricCard";
import MigrationFlow from "./components/MigrationFlow";
import FileTreeSection from "./components/FileTreeSection";

export const Dashboard = () => {
	// Define migration steps data
	const migrationSteps = [
		{ number: "9871", title: "Analysis Completed" },
		{ number: "9871", title: "Conversion Completed" },
		{ number: "9871", title: "Code Validation Completed" },
		{ number: "36", title: "Data Validation Completed", isMigrated: true },
		{ number: "36", title: "Optimization Completed", isMigrated: true },
		{ number: "36", title: "Migration Completed", isMigrated: true },
	];

	return (
		<div className={styles.dashboard}>
			<div className={styles.dashboardContent}>
				{/* Dashboard Header */}
				<DashboardHeader title="SAS Modernization Dashboard" />

				{/* Metrics Section */}
				<section className={styles.metricsSection}>
					<div className={styles.sasMetricsGrid}>
						<MetricCard
							number="1676852"
							title="No. of SAS Programs To Be Converted"
							badge="Pending"
						/>
						<MetricCard
							number="9871"
							title="No. of SAS Programs Converted"
							badge="Completed"
						/>
						<MetricCard
							number="36"
							title="No. of SAS Programs Migrated"
							badge="Migrated"
						/>
					</div>

					{/* Migration Flow */}
					<MigrationFlow steps={migrationSteps} />
				</section>

				{/* File Tree Section */}
				<FileTreeSection fileTreeData={fileTreeData} />
			</div>
		</div>
	);
};

export default Dashboard;
