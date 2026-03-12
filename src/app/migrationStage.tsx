"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

// 独立抽离 Migration Stage 类型（建议放到单独的 types.ts 文件中）
export interface MigrationStep {
    label: string;
}

export interface MigrationStage {
    title: string;
    count: number;
    steps: MigrationStep[];
}

// 独立组件：Migration Stage 卡片
export const MigrationStageCard = ({
    stage,
    index,
}: {
    stage: MigrationStage;
    index: number;
}) => {
    const hasItems = stage.count > 0;

    return (
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
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg 
                       bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 
                       group-hover:border-cyan-500/60 transition-colors">
                        <span className="text-sm font-bold text-cyan-400">{index + 1}</span>
                    </div>

                    {/* 标题和数量 */}
                    <div>
                        <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 
                       transition-colors capitalize">
                            {stage.title}
                        </h3>
                        {hasItems && (
                            <p className="text-xs text-slate-400 mt-1">
                                <span className="font-semibold text-cyan-400">
                                    {stage.count.toLocaleString()}
                                </span>{" "}
                                items ready
                            </p>
                        )}
                    </div>
                </div>

                {/* 右侧箭头 */}
                <ChevronRight
                    className="w-5 h-5 text-slate-600 group-hover:text-cyan-500 
                   transition-colors transform group-hover:translate-x-1"
                />
            </div>

            {/* 垂直步骤列表（核心优化） */}
            <div className="ml-14 pl-4 border-l-2 border-slate-700/30 
                   group-hover:border-cyan-500/30 transition-colors">
                <div className="space-y-4 py-1">
                    {stage.steps.map((step, stepIdx) => (
                        <div key={stepIdx} className="relative">
                            {/* 步骤项 */}
                            <div className="flex items-center gap-3 py-1 px-2 rounded 
                           hover:bg-slate-800/30 transition-colors cursor-pointer">
                                <div className="w-2 h-2 rounded-full bg-cyan-500/40 
                             group-hover:bg-cyan-500 transition-colors"></div>
                                <span className="text-sm text-slate-300 hover:text-slate-200 transition-colors">
                                    {step.label}
                                </span>
                            </div>

                            {/* 步骤间的连接线（仅在非最后一步显示） */}
                            {stepIdx < stage.steps.length - 1 && (
                                <div className="absolute left-[-22px] top-6 w-0.5 h-8 bg-slate-700/30 
                             group-hover:bg-cyan-500/20 transition-colors"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

