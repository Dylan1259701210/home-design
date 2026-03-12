"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
	Search,
	Folder,
	FileText,
	ShieldCheck,
	ChevronRight,
	ChevronDown,
	Lock,
	TrendingUp,
	TrendingDown,
	ArrowRight,
	Database,
	Activity,
	CheckCircle2,
	Clock,
	AlertCircle,
} from "lucide-react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { fileTreeData, migrationStages, costData, FileTreeNode } from "./mock";

const Dashboard = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [animatedNumbers, setAnimatedNumbers] = useState({
		totalLines: 0,
		workspaceCount: 0,
		costSavings: 0,
		costPerLine: 0,
	});

	useEffect(() => {
		const animateNumbers = () => {
			const targetValues = {
				totalLines: 122558,
				workspaceCount: 47,
				costSavings: 187420,
				costPerLine: 0.0087,
			};

			let progress = 0;
			const duration = 1500;
			const steps = 60;
			const interval = duration / steps;

			const timer = setInterval(() => {
				progress += 1;
				const easeOut = 1 - Math.pow(1 - progress / steps, 3);

				setAnimatedNumbers({
					totalLines: Math.floor(targetValues.totalLines * easeOut),
					workspaceCount: Math.floor(targetValues.workspaceCount * easeOut),
					costSavings: Math.floor(targetValues.costSavings * easeOut),
					costPerLine: targetValues.costPerLine * easeOut,
				});

				if (progress >= steps) {
					clearInterval(timer);
					setAnimatedNumbers(targetValues);
				}
			}, interval);
		};

		animateNumbers();
	}, []);

	const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
		new Set(),
	);

	const toggleFolder = (id: string) => {
		const newExpanded = new Set(expandedFolders);
		if (newExpanded.has(id)) {
			newExpanded.delete(id);
		} else {
			newExpanded.add(id);
		}
		setExpandedFolders(newExpanded);
	};

	const filteredFileTree = useMemo(() => {
		if (!searchTerm) return fileTreeData;

		const filterNodes = (nodes: FileTreeNode[]): FileTreeNode[] => {
			return nodes.reduce((acc: FileTreeNode[], node) => {
				const matchesSearch = node.name
					.toLowerCase()
					.includes(searchTerm.toLowerCase());

				if (node.children) {
					const filteredChildren = filterNodes(node.children);
					if (filteredChildren.length > 0 || matchesSearch) {
						acc.push({
							...node,
							children:
								filteredChildren.length > 0 ? filteredChildren : node.children,
						});
					}
				} else if (matchesSearch) {
					acc.push(node);
				}

				return acc;
			}, []);
		};

		return filterNodes(fileTreeData);
	}, [searchTerm]);

	const renderFileTree = (nodes: FileTreeNode[], depth: number = 0) => {
		return nodes.map((node) => (
			<div key={node.id} className="select-none">
				<div
					onClick={() => node.type === "folder" && toggleFolder(node.id)}
					className={`group flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/5 ${
						node.type === "folder" ? "cursor-pointer" : "cursor-default"
					}`}
					style={{ paddingLeft: `${depth * 16 + 12}px` }}
				>
					<div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
						{node.type === "folder" &&
							(expandedFolders.has(node.id) ? (
								<ChevronDown className="w-3.5 h-3.5 text-slate-400" />
							) : (
								<ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-400 transition-colors" />
							))}
					</div>

					<div
						className={`flex-shrink-0 transition-colors duration-200 ${
							node.type === "folder"
								? "text-amber-400 group-hover:text-amber-300"
								: "text-cyan-400 group-hover:text-cyan-300"
						}`}
					>
						{node.type === "folder" ? (
							<Folder className="w-4 h-4" />
						) : (
							<FileText className="w-4 h-4" />
						)}
					</div>

					<span
						className={`flex-1 text-sm truncate transition-colors duration-200 ${
							node.type === "folder"
								? "text-slate-200 font-medium group-hover:text-white"
								: "text-slate-300 group-hover:text-slate-200"
						}`}
					>
						{node.name}
					</span>

					{node.count !== undefined && (
						<span className="text-[10px] text-slate-500 font-mono bg-slate-800/40 px-2 py-0.5 rounded">
							{node.count}
						</span>
					)}
				</div>

				{node.type === "folder" &&
					expandedFolders.has(node.id) &&
					node.children &&
					renderFileTree(node.children, depth + 1)}
			</div>
		));
	};

	const getStatusIcon = (type: string) => {
		switch (type) {
			case "Automatic":
				return <CheckCircle2 className="w-3.5 h-3.5" />;
			case "Manual":
				return <Clock className="w-3.5 h-3.5" />;
			default:
				return <AlertCircle className="w-3.5 h-3.5" />;
		}
	};

	return (
		<div className="min-h-screen relative overflow-hidden bg-[#020617]">
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1e293b_0%,_#0f172a_50%,_#020617_100%)]" />
			<div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyLjUiIGZpbGw9IiM5NGEzYjgiIGZpbGwtb3BhY2l0eT0iMC4zIi8+Cjwvc3ZnPg==')]" />
			<div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
			<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />

			<div className="relative z-10 p-6 md:p-10 font-[family-name:var(--font-geist-sans)]">
				<header className="mb-10 flex items-center justify-between">
					<div className="flex items-center gap-5">
						<div className="relative flex h-12 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-600 to-indigo-600 shadow-2xl shadow-cyan-500/20">
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/10 to-transparent" />
							<Database className="w-6 h-6 text-white relative z-10" />
						</div>
						<div>
							<h1 className="text-3xl font-bold tracking-tight text-white">
								SAS Modernization Dashboard
							</h1>
						</div>
					</div>
					<div className="flex items-center gap-6">
						<div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
							<Activity className="w-4 h-4 text-emerald-400" />
							<span className="text-sm font-medium text-emerald-400">
								System Active
							</span>
						</div>
						<div className="flex items-center gap-2 text-sm text-slate-400">
							<ShieldCheck className="w-4 h-4 text-cyan-400" />
							<span>SOC 2 Compliant</span>
						</div>
					</div>
				</header>

				<main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					<section className="lg:col-span-8 space-y-8">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
							<div className="group relative overflow-hidden rounded-2xl bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-[rgba(100,116,139,0.3)] p-6 cursor-pointer transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
								<div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								<div className="relative z-10">
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center gap-3">
											<div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors duration-300">
												<Database className="h-4 w-4 text-cyan-400" />
											</div>
											<p className="text-sm text-slate-400 leading-tight">
												Total Lines of Code
											</p>
										</div>
										{/* <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
											<TrendingUp className="w-3 h-3" />
											+2.4%
										</span> */}
									</div>
									<div className="flex items-baseline gap-2">
										<p className="text-3xl font-mono font-semibold text-white tracking-tight">
											{animatedNumbers.totalLines.toLocaleString()}
										</p>
										<span className="text-xs text-slate-500">lines</span>
									</div>
								</div>
							</div>

							<div className="group relative overflow-hidden rounded-2xl bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-[rgba(100,116,139,0.3)] p-6 cursor-pointer transition-all duration-300 hover:border-indigo-400/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]">
								<div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								<div className="relative z-10">
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center gap-3">
											<div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors duration-300">
												<Folder className="h-4 w-4 text-indigo-400" />
											</div>
											<p className="text-sm text-slate-400 leading-tight">
												Workspace Count
											</p>
										</div>
										<span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
											<TrendingUp className="w-3 h-3" />
											+8.5%
										</span>
									</div>
									<div className="flex items-baseline gap-2">
										<p className="text-3xl font-mono font-semibold text-white tracking-tight">
											{animatedNumbers.workspaceCount}
										</p>
										<span className="text-xs text-slate-500">workspaces</span>
									</div>
								</div>
							</div>

							<div className="group relative overflow-hidden rounded-2xl bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-[rgba(100,116,139,0.3)] p-6 cursor-pointer transition-all duration-300 hover:border-emerald-400/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]">
								<div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								<div className="relative z-10">
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center gap-3">
											<div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors duration-300">
												<TrendingUp className="h-4 w-4 text-emerald-400" />
											</div>
											<p className="text-sm text-slate-400 leading-tight">
												Cost Savings (YTD)
											</p>
										</div>
										<span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
											<TrendingUp className="w-3 h-3" />
											+12.3%
										</span>
									</div>
									<div className="flex items-baseline gap-2">
										<p className="text-3xl font-mono font-semibold text-white tracking-tight">
											${animatedNumbers.costSavings.toLocaleString()}
										</p>
									</div>
								</div>
							</div>

							<div className="group relative overflow-hidden rounded-2xl bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-[rgba(100,116,139,0.3)] p-6 cursor-pointer transition-all duration-300 hover:border-orange-400/50 hover:shadow-[0_0_40px_rgba(251,146,60,0.15)]">
								<div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								<div className="relative z-10">
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center gap-3">
											<div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 group-hover:bg-orange-500/20 transition-colors duration-300">
												<TrendingDown className="h-4 w-4 text-orange-400" />
											</div>
											<p className="text-sm text-slate-400 leading-tight">
												Cost Per Line of Code
											</p>
										</div>
										<span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-orange-500/10 border border-orange-500/20 group-hover:bg-orange-500/20  text-orange-400 border border-emerald-500/20">
											<TrendingDown className="w-3 h-3" />
											-27.5%
										</span>
									</div>
									<div className="flex items-baseline gap-2">
										<p className="text-3xl font-mono font-semibold text-white tracking-tight">
											${animatedNumbers.costPerLine.toFixed(4)}
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<div className="flex items-center gap-4 mb-6">
								<div className="h-8 w-1 bg-gradient-to-b from-cyan-500 to-indigo-500 rounded-full" />
								<div>
									<h2 className="text-xl font-semibold text-white">
										Migration Status Pipeline
									</h2>
								</div>
							</div>

							<div className="space-y-3">
								{migrationStages.map((stage, idx) => (
									<React.Fragment key={idx}>
										<div className="group relative rounded-2xl bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-[rgba(100,116,139,0.3)] p-6 transition-all duration-300 hover:border-slate-500/50">
											<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
											<div className="flex items-center gap-4 mb-5">
												<div
													className={`flex items-center gap-2 px-2.5 py-1 rounded-lg ${
														stage.type === "Automatic"
															? "bg-emerald-500/10 border border-emerald-500/20"
															: "bg-amber-500/10 border border-amber-500/20"
													}`}
												>
													<span
														className={`${
															stage.type === "Automatic"
																? "text-emerald-400"
																: "text-amber-400"
														}`}
													>
														{getStatusIcon(stage.type)}
													</span>
													<span
														className={`text-[10px] font-semibold uppercase tracking-wider ${
															stage.type === "Automatic"
																? "text-emerald-400"
																: "text-amber-400"
														}`}
													>
														{stage.type}
													</span>
												</div>
												<h3 className="text-sm font-semibold text-white">
													{stage.title}
												</h3>
												{stage.count > 0 && (
													<span className="text-[11px] text-slate-400 font-mono bg-slate-800/60 px-2.5 py-1 rounded-md ml-auto">
														{stage.count.toLocaleString()} items
													</span>
												)}
											</div>

											<div className="flex flex-wrap items-center gap-3">
												{stage.steps.map((step, stepIdx) => (
													<React.Fragment key={stepIdx}>
														<div className="group/step relative">
															<div className="px-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 transition-all duration-300 hover:bg-slate-800 hover:border-slate-600/50">
																<div className="text-sm text-slate-300 group-hover/step:text-white transition-colors whitespace-nowrap">
																	{step.label}
																</div>
															</div>
														</div>

														{stepIdx < stage.steps.length - 1 && (
															<div className="flex items-center">
																<ArrowRight className="w-4 h-4 text-slate-600" />
															</div>
														)}
													</React.Fragment>
												))}
											</div>
										</div>

										{idx < migrationStages.length - 1 && (
											<div className="flex justify-center">
												<div className="w-px h-6 bg-gradient-to-b from-slate-600 to-slate-700" />
											</div>
										)}
									</React.Fragment>
								))}
							</div>
						</div>

						<div className="rounded-2xl bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-[rgba(100,116,139,0.3)] p-6">
							<div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
								<div>
									<h2 className="text-xl font-bold text-white">
										Cost & Billing Analytics
									</h2>
									<p className="text-sm text-slate-400 mt-1">
										12-month performance trend analysis
									</p>
								</div>
								<div className="flex gap-4">
									<div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-800/40 border border-slate-700/50">
										<div className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/30" />
										<span className="text-sm font-medium text-slate-300">
											Actual Cost
										</span>
									</div>
									<div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-800/40 border border-slate-700/50">
										<div className="h-2.5 w-2.5 rounded-full bg-violet-400 shadow-lg shadow-violet-400/30" />
										<span className="text-sm font-medium text-slate-300">
											Projected Cost
										</span>
									</div>
								</div>
							</div>

							<div className="h-[300px] w-full">
								<ResponsiveContainer width="100%" height="100%">
									<LineChart
										data={costData}
										margin={{ top: 5, right: 10, left: -15, bottom: 5 }}
									>
										<defs>
											<linearGradient
												id="colorActual"
												x1="0"
												y1="0"
												x2="0"
												y2="1"
											>
												<stop
													offset="5%"
													stopColor="#22d3ee"
													stopOpacity={0.2}
												/>
												<stop
													offset="95%"
													stopColor="#22d3ee"
													stopOpacity={0}
												/>
											</linearGradient>
											<linearGradient
												id="colorProjected"
												x1="0"
												y1="0"
												x2="0"
												y2="1"
											>
												<stop
													offset="5%"
													stopColor="#8b5cf6"
													stopOpacity={0.2}
												/>
												<stop
													offset="95%"
													stopColor="#8b5cf6"
													stopOpacity={0}
												/>
											</linearGradient>
										</defs>
										<CartesianGrid
											vertical={false}
											stroke="#334155"
											strokeDasharray="4 4"
											opacity={0.3}
										/>
										<XAxis
											dataKey="name"
											stroke="#64748b"
											style={{ fontSize: "12px" }}
											tick={{ fill: "#94a3b8" }}
											axisLine={false}
											tickLine={false}
										/>
										<YAxis
											axisLine={false}
											tickLine={false}
											tick={{ fill: "#64748b", fontSize: 12 }}
											tickFormatter={(value) =>
												`$${(value / 10000).toFixed(0)}0k`
											}
										/>
										<Tooltip
											contentStyle={{
												backgroundColor: "#1e293b",
												border: "1px solid #334155",
												borderRadius: "12px",
												color: "#f8fafc",
												boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
												padding: "12px 16px",
											}}
											itemStyle={{ color: "#cbd5e1", padding: "4px 0" }}
											formatter={(value: number) =>
												`$${(value / 1000).toFixed(1)}k`
											}
										/>
										<Line
											type="monotone"
											tension={0.4}
											dataKey="actual"
											stroke="#22d3ee"
											strokeWidth={2.5}
											dot={{
												r: 4,
												fill: "#22d3ee",
												strokeWidth: 2,
												stroke: "#0f172a",
											}}
											activeDot={{ r: 6, strokeWidth: 2 }}
											isAnimationActive={true}
											animationDuration={1500}
											fillOpacity={1}
											fill="url(#colorActual)"
										/>
										<Line
											type="monotone"
											tension={0.4}
											dataKey="projected"
											stroke="#8b5cf6"
											strokeWidth={2.5}
											strokeDasharray="5 5"
											dot={{
												r: 4,
												fill: "#8b5cf6",
												strokeWidth: 2,
												stroke: "#0f172a",
											}}
											activeDot={{ r: 6, strokeWidth: 2 }}
											isAnimationActive={true}
											animationDuration={1500}
											animationBegin={300}
											fillOpacity={1}
											fill="url(#colorProjected)"
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>
						</div>
					</section>

					<aside className="lg:col-span-4">
						<div className="rounded-2xl bg-[rgba(30,41,59,0.7)] backdrop-blur-xl border border-[rgba(100,116,139,0.3)] p-6 shadow-xl flex flex-col h-full sticky top-6">
							<div className="mb-6">
								<h2 className="text-xl font-bold text-white">Source Files</h2>
								<p className="text-sm text-slate-400 mt-1">
									Manage migration file list
								</p>
							</div>

							<div className="relative mb-6 group">
								<Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 group-hover:text-slate-400 transition-colors pointer-events-none" />
								<input
									type="text"
									placeholder="Search files or folders..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full rounded-xl bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 py-3 pl-11 pr-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 hover:border-slate-600/80"
								/>
								{searchTerm && (
									<button
										onClick={() => setSearchTerm("")}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
									>
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								)}
							</div>

							<div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
								<div className="space-y-1">
									{renderFileTree(filteredFileTree)}
								</div>
							</div>

							<div className="mt-6 pt-5 border-t border-slate-700/30">
								<div className="flex items-center justify-between text-xs text-slate-500">
									<div className="flex items-center gap-2">
										<ShieldCheck className="w-4 h-4 text-emerald-400" />
										<span>SOC 2 Compliant</span>
									</div>
									<div className="flex items-center gap-1">
										<Lock className="w-3.5 h-3.5 text-cyan-400" />
										<span>Encrypted</span>
									</div>
								</div>
							</div>
						</div>
					</aside>
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
