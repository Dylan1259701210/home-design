import React from "react";
import { ArrowRight } from "lucide-react";
import MigrationStep from "./MigrationStep";
import styles from "./MigrationFlow.module.scss";

interface MigrationFlowProps {
	steps: Array<{
		number: string;
		title: string;
		isMigrated?: boolean;
	}>;
}

export const MigrationFlow: React.FC<MigrationFlowProps> = ({ steps }) => {
	// Split steps into left and right groups
	const leftSteps = steps.slice(0, 3);
	const rightSteps = steps.slice(3);

	return (
		<div className={styles.migrationFlow}>
			{/* All steps in one row */}
			<div className={styles.migrationFlowStepsContainer}>
				{/* Left Group */}
				<div className={styles.migrationFlowGroup}>
					<div className={styles.migrationFlowGroupSteps}>
						{leftSteps.map((step, index) => (
							<React.Fragment key={index}>
								<MigrationStep
									number={step.number}
									title={step.title}
									isMigrated={step.isMigrated}
								/>
								{index < leftSteps.length - 1 && (
									<ArrowRight className={styles.migrationFlowArrow} />
								)}
							</React.Fragment>
						))}
					</div>
					<div className={styles.migrationFlowGroupDescription}>
						Powered by Code Jarvis Automation
					</div>
				</div>

				{/* Middle Arrow */}
				<div className={styles.migrationFlowMiddleArrow}>
					<ArrowRight className={styles.migrationFlowArrow} />
				</div>

				{/* Right Group */}
				<div className={styles.migrationFlowGroup}>
					<div className={styles.migrationFlowGroupSteps}>
						{rightSteps.map((step, index) => (
							<React.Fragment key={index}>
								<MigrationStep
									number={step.number}
									title={step.title}
									isMigrated={step.isMigrated}
								/>
								{index < rightSteps.length - 1 && (
									<ArrowRight className={styles.migrationFlowArrow} />
								)}
							</React.Fragment>
						))}
					</div>
					<div className={styles.migrationFlowGroupDescription}>
						Managed by Human SME
					</div>
				</div>
			</div>
		</div>
	);
};

export default MigrationFlow;
