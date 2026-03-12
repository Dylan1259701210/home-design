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
	ChevronUp,
	ChevronLeft,
	BarChart3,
	GitBranch,
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
	const [isFileTreeExpanded, setIsFileTreeExpanded] = useState(true);

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
					className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-slate-100 ${
						node.type === "folder" ? "cursor-pointer" : "cursor-default"
					}`}
					style={{ paddingLeft: `${depth * 16 + 12}px` }}
				>
					<div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
						{node.type === "folder" &&
							(expandedFolders.has(node.id) ? (
								<ChevronDown className="w-3.5 h-3.5 text-slate-500" />
							) : (
								<ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-500 transition-colors" />
							))}
					</div>

					<div
						className={`flex-shrink-0 transition-colors duration-200 ${
							node.type === "folder"
								? "text-amber-500 group-hover:text-amber-600"
								: "text-cyan-500 group-hover:text-cyan-600"
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
								? "text-slate-700 font-medium group-hover:text-slate-900"
								: "text-slate-600 group-hover:text-slate-800"
						}`}
					>
						{node.name}
					</span>

					{node.count !== undefined && (
						<span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded">
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
		<div className="min-h-screen relative overflow-hidden bg-slate-50">
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#e2e8f0_0%,_#f1f5f9_50%,_#f8fafc_100%)]" />
			<div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
			<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

			<div className="relative z-10 p-6 md:p-8 font-[family-name:var(--font-geist-sans)]">
				<header className="mb-8 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div className="relative flex h-11 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 shadow-lg shadow-cyan-500/20">
							<div className="absolute inset-0 rounded-xl bg-gradient-to-t from-white/10 to-transparent" />
							<Database className="w-5 h-5 text-white relative z-10" />
						</div>
						<div>
							<h1 className="text-2xl font-bold tracking-tight text-slate-900">
								SAS Modernization Dashboard
							</h1>
							{/* <p className="text-xs text-slate-500 mt-0.5">
								Real-time migration analytics
							</p> */}
						</div>
					</div>
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
							<Activity className="w-3.5 h-3.5 text-emerald-600" />
							<span className="text-xs font-medium text-emerald-600">
								System Active
							</span>
						</div>
						<div className="flex items-center gap-1.5 text-xs text-slate-500">
							<ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
							<span>SOC 2</span>
						</div>
					</div>
				</header>

				<section className="mb-6">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
						<div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200/60 p-6 cursor-pointer transition-all duration-200 hover:shadow-xl hover:shadow-slate-200/50 hover:border-cyan-300">
							<div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
							<div className="relative z-10">
								<div className="flex items-center gap-3 mb-4">
									<div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200 group-hover:bg-cyan-100 transition-colors duration-200">
										<Database className="h-4 w-4 text-cyan-600" />
									</div>
									<p className="text-sm text-slate-600 leading-tight">
										Total Lines of Code
									</p>
								</div>
								<div className="flex items-baseline gap-2 mb-4">
									<p className="text-3xl font-mono font-semibold text-slate-900 tracking-tight">
										{animatedNumbers.totalLines.toLocaleString()}
									</p>
									<span className="text-xs text-slate-500">lines</span>
								</div>
							</div>
						</div>

						<div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200/60 p-6 cursor-pointer transition-all duration-200 hover:shadow-xl hover:shadow-slate-200/50 hover:border-indigo-300">
							<div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
							<div className="relative z-10">
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center gap-3">
										<div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 group-hover:bg-indigo-100 transition-colors duration-200">
											<Folder className="h-4 w-4 text-indigo-600" />
										</div>
										<p className="text-sm text-slate-600 leading-tight">
											Workspace Count
										</p>
									</div>
									<span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-200">
										<TrendingUp className="w-3 h-3" />
										+8.5%
									</span>
								</div>
								<div className="flex items-baseline gap-2">
									<p className="text-3xl font-mono font-semibold text-slate-900 tracking-tight">
										{animatedNumbers.workspaceCount}
									</p>
									<span className="text-xs text-slate-500">workspaces</span>
								</div>
							</div>
						</div>

						<div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200/60 p-6 cursor-pointer transition-all duration-200 hover:shadow-xl hover:shadow-slate-200/50 hover:border-emerald-300">
							<div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
							<div className="relative z-10">
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center gap-3">
										<div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 group-hover:bg-emerald-100 transition-colors duration-200">
											<TrendingUp className="h-4 w-4 text-emerald-600" />
										</div>
										<p className="text-sm text-slate-600 leading-tight">
											Cost Savings (YTD)
										</p>
									</div>
									<span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
										<TrendingUp className="w-3 h-3" />
										+12.3%
									</span>
								</div>
								<div className="flex items-baseline gap-2">
									<p className="text-3xl font-mono font-semibold text-slate-900 tracking-tight">
										${animatedNumbers.costSavings.toLocaleString()}
									</p>
								</div>
							</div>
						</div>

						<div className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200/60 p-6 cursor-pointer transition-all duration-200 hover:shadow-xl hover:shadow-slate-200/50 hover:border-orange-300">
							<div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
							<div className="relative z-10">
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center gap-3">
										<div className="p-2.5 rounded-xl bg-orange-50 border border-orange-200 group-hover:bg-orange-100 transition-colors duration-200">
											<TrendingDown className="h-4 w-4 text-orange-600" />
										</div>
										<p className="text-sm text-slate-600 leading-tight">
											Cost Per Line of Code
										</p>
									</div>
									<span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-200 group-hover:bg-orange-100 transition-colors duration-200">
										<TrendingDown className="w-3 h-3" />
										-27.5%
									</span>
								</div>
								<div className="flex items-baseline gap-2">
									<p className="text-3xl font-mono font-semibold text-slate-900 tracking-tight">
										${animatedNumbers.costPerLine.toFixed(4)}
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
					<div className="rounded-xl bg-white/80 backdrop-blur-xl border border-slate-200/60 p-5">
						<div className="flex items-center gap-3 mb-5">
							<div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-500">
								<GitBranch className="h-4 w-4 text-white" />
							</div>
							<div>
								<h2 className="text-base font-semibold text-slate-900">
									Migration Pipeline
								</h2>
								<p className="text-xs text-slate-500">4 stages in progress</p>
							</div>
						</div>

						<div className="space-y-3">
							{migrationStages.map((stage, idx) => (
								<div
									key={idx}
									className="group relative rounded-lg bg-slate-50/80 border border-slate-200/60 p-4 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300"
								>
									<div className="flex items-center gap-3 mb-3">
										<div
											className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold ${
												stage.type === "Automatic"
													? "bg-emerald-50 text-emerald-600 border border-emerald-200"
													: "bg-amber-50 text-amber-600 border border-amber-200"
											}`}
										>
											{getStatusIcon(stage.type)}
											<span>{stage.type}</span>
										</div>
										<h3 className="text-sm font-medium text-slate-900 flex-1">
											{stage.title}
										</h3>
										{stage.count > 0 && (
											<span className="text-[10px] text-slate-500 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
												{stage.count.toLocaleString()}
											</span>
										)}
									</div>

									<div className="flex flex-wrap items-center gap-2">
										{stage.steps.map((step, stepIdx) => (
											<React.Fragment key={stepIdx}>
												<div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600">
													{step.label}
												</div>
												{stepIdx < stage.steps.length - 1 && (
													<ArrowRight className="w-3 h-3 text-slate-400" />
												)}
											</React.Fragment>
										))}
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="rounded-xl bg-white/80 backdrop-blur-xl border border-slate-200/60 p-5">
						<div className="flex items-center gap-3 mb-5">
							<div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500">
								<BarChart3 className="h-4 w-4 text-white" />
							</div>
							<div>
								<h2 className="text-base font-semibold text-slate-900">
									Cost Analytics
								</h2>
								<p className="text-xs text-slate-500">12-month trend</p>
							</div>
						</div>

						<div className="flex gap-3 mb-4">
							<div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200">
								<div className="h-2 w-2 rounded-full bg-cyan-500" />
								<span className="text-[10px] font-medium text-slate-600">
									Actual
								</span>
							</div>
							<div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200">
								<div className="h-2 w-2 rounded-full bg-violet-500" />
								<span className="text-[10px] font-medium text-slate-600">
									Projected
								</span>
							</div>
						</div>

						<div className="h-[360px] w-full">
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
											<stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
											<stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
										</linearGradient>
										<linearGradient
											id="colorProjected"
											x1="0"
											y1="0"
											x2="0"
											y2="1"
										>
											<stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
											<stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
										</linearGradient>
									</defs>
									<CartesianGrid
										vertical={false}
										stroke="#e2e8f0"
										strokeDasharray="4 4"
										opacity={0.8}
									/>
									<XAxis
										dataKey="name"
										stroke="#64748b"
										style={{ fontSize: "10px" }}
										tick={{ fill: "#64748b" }}
										axisLine={false}
										tickLine={false}
									/>
									<YAxis
										axisLine={false}
										tickLine={false}
										tick={{ fill: "#64748b", fontSize: 10 }}
										tickFormatter={(value) =>
											`$${(value / 10000).toFixed(0)}0k`
										}
									/>
									<Tooltip
										contentStyle={{
											backgroundColor: "#ffffff",
											border: "1px solid #e2e8f0",
											borderRadius: "8px",
											color: "#0f172a",
											boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
											padding: "8px 12px",
										}}
										itemStyle={{ color: "#475569", padding: "2px 0" }}
										formatter={(value: number) =>
											`$${(value / 1000).toFixed(1)}k`
										}
									/>
									<Line
										type="monotone"
										tension={0.4}
										dataKey="actual"
										stroke="#06b6d4"
										strokeWidth={2}
										dot={{
											r: 3,
											fill: "#06b6d4",
											strokeWidth: 2,
											stroke: "#ffffff",
										}}
										activeDot={{ r: 5, strokeWidth: 2 }}
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
										strokeWidth={2}
										strokeDasharray="4 4"
										dot={{
											r: 3,
											fill: "#8b5cf6",
											strokeWidth: 2,
											stroke: "#ffffff",
										}}
										activeDot={{ r: 5, strokeWidth: 2 }}
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

				<section className="rounded-xl bg-white/80 backdrop-blur-xl border border-slate-200/60 overflow-hidden">
					<button
						onClick={() => setIsFileTreeExpanded(!isFileTreeExpanded)}
						className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors duration-200"
					>
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
								<Folder className="h-4 w-4 text-white" />
							</div>
							<div className="text-left">
								<h2 className="text-base font-semibold text-slate-900">
									Source Files
								</h2>
								<p className="text-xs text-slate-500">
									{fileTreeData.length} workspaces •{" "}
									{filteredFileTree.reduce(
										(acc, node) => acc + (node.count || 0),
										0,
									)}{" "}
									files
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-2 text-xs text-slate-500">
								<ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
								<span>SOC 2</span>
								<Lock className="w-3 h-3.5 text-cyan-500 ml-2" />
								<span>Encrypted</span>
							</div>
							{isFileTreeExpanded ? (
								<ChevronUp className="w-4 h-4 text-slate-400" />
							) : (
								<ChevronDown className="w-4 h-4 text-slate-400" />
							)}
						</div>
					</button>

					{isFileTreeExpanded && (
						<div className="border-t border-slate-200">
							<div className="p-4">
								<div className="relative mb-4 group">
									<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
									<input
										type="text"
										placeholder="Search files or folders..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="w-full rounded-lg bg-slate-50 border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 hover:border-slate-300"
									/>
									{searchTerm && (
										<button
											onClick={() => setSearchTerm("")}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
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

								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2">
									{filteredFileTree.map((rootNode) => (
										<div
											key={rootNode.id}
											className="rounded-lg bg-slate-50/50 border border-slate-200/60 p-3"
										>
											<div
												onClick={() => toggleFolder(rootNode.id)}
												className="flex items-center gap-2 cursor-pointer group"
											>
												<div className="w-4 h-4 flex items-center justify-center">
													{expandedFolders.has(rootNode.id) ? (
														<ChevronDown className="w-3.5 h-3.5 text-slate-500" />
													) : (
														<ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-500" />
													)}
												</div>
												<Folder className="w-4 h-4 text-amber-500" />
												<span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 flex-1 truncate">
													{rootNode.name}
												</span>
												{rootNode.count !== undefined && (
													<span className="text-[10px] text-slate-500 font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">
														{rootNode.count}
													</span>
												)}
											</div>
											{expandedFolders.has(rootNode.id) &&
												rootNode.children && (
													<div className="mt-2 pl-6 space-y-1">
														{rootNode.children.slice(0, 3).map((child) => (
															<div
																key={child.id}
																className="flex items-center gap-2 py-1"
															>
																{child.type === "folder" ? (
																	<Folder className="w-3.5 h-3.5 text-amber-400" />
																) : (
																	<FileText className="w-3.5 h-3.5 text-cyan-400" />
																)}
																<span className="text-xs text-slate-600 truncate">
																	{child.name}
																</span>
																{child.count !== undefined && (
																	<span className="text-[9px] text-slate-400 font-mono">
																		{child.count}
																	</span>
																)}
															</div>
														))}
														{rootNode.children.length > 3 && (
															<span className="text-[10px] text-slate-400 pl-5">
																+{rootNode.children.length - 3} more...
															</span>
														)}
													</div>
												)}
										</div>
									))}
								</div>
							</div>
						</div>
					)}
				</section>
			</div>
		</div>
	);
};

export default Dashboard;
