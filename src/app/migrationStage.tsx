"use client";

import React from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

// 独立抽离 Migration Stage 类型（建议放到单独的 types.ts 文件中）
export interface MigrationStep {
	label: string;
}

export interface MigrationStage {
	title: string;
	count: number;
	steps: MigrationStep[];
	type: "Manual" | "Automatic";
}

// 独立组件：Migration Stage 卡片
export const MigrationStageCard = ({
	stage,
	index,
	isLast,
}: {
	stage: MigrationStage;
	index: number;
	isLast?: boolean;
}) => {
	const hasItems = stage.count > 0;

	return (
		<div className="w-full">
			{/* 阶段卡片 */}
			<div
				key={index}
				className="group relative rounded-lg border border-slate-800/50 overflow-hidden 
                     bg-gradient-to-br from-slate-800/20 to-slate-900/20 
                     hover:border-cyan-500/30 hover:from-slate-800/40 hover:to-slate-900/40
                     transition-all duration-300 p-5"
			>
				{/* Stage 头部 */}
				<div className="flex items-start justify-between mb-4">
					<div className="flex items-start gap-4">
						{/* 序号徽章 */}
						<div
							className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg 
                           bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 
                           group-hover:border-cyan-500/60 transition-colors"
						>
							<span className="text-sm font-bold text-cyan-400">
								{index + 1}
							</span>
						</div>

						{/* 标题、数量和类型 */}
						<div>
							<div className="flex items-center gap-2">
								<h3
									className="text-base font-semibold text-white group-hover:text-cyan-300 
                               transition-colors"
								>
									{stage.title}
								</h3>
								{hasItems && (
									<span className="text-xs font-semibold text-cyan-400">
										({stage.count.toLocaleString()})
									</span>
								)}
								<span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-300">
									[{stage.type}]
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* 横向步骤列表 */}
				<div className="ml-14 flex items-center gap-2 flex-wrap">
					{stage.steps.map((step, stepIdx) => (
						<React.Fragment key={stepIdx}>
							<div
								className="flex items-center gap-2 py-1 px-3 rounded 
                                   bg-slate-700/20 hover:bg-slate-700/40 transition-colors cursor-pointer"
							>
								<span className="text-sm text-slate-300 hover:text-slate-200 transition-colors">
									[{step.label}]
								</span>
							</div>
							{stepIdx < stage.steps.length - 1 && (
								<ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-500 transition-colors" />
							)}
						</React.Fragment>
					))}
				</div>
			</div>

			{/* 阶段间向下箭头（非最后一个阶段） */}
			{!isLast && (
				<div className="flex justify-center my-4">
					<ChevronDown className="w-5 h-5 text-slate-600 group-hover:text-cyan-500 transition-colors" />
				</div>
			)}
		</div>
	);
};

// 迁移状态容器组件
export const MigrationStatus = ({ stages }: { stages: MigrationStage[] }) => {
	return (
		<div className="w-full max-w-4xl mx-auto p-4">
			<h2 className="text-xl font-bold text-white mb-6">Migration Status</h2>
			<div className="space-y-2">
				{stages.map((stage, index) => (
					<MigrationStageCard
						key={index}
						stage={stage}
						index={index}
						isLast={index === stages.length - 1}
					/>
				))}
			</div>
		</div>
	);
};
