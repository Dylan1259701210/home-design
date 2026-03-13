"use client";
import React, { useState, useMemo } from "react";
import {
	Search,
	Folder,
	FileText,
	ShieldCheck,
	ChevronRight,
	ChevronDown,
	Lock,
	ArrowRight,
	ChevronUp,
} from "lucide-react";

import { fileTreeData, FileTreeNode } from "./mock";
import styles from "./index.module.scss";

export const Dashboard = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const [isFileTreeExpanded, setIsFileTreeExpanded] = useState(true);

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
			<div key={node.id} className={styles.selectNone}>
				<div
					onClick={() => node.type === "folder" && toggleFolder(node.id)}
					className={`${styles.fileTreeItem} ${node.type === "folder" ? styles.cursorPointer : styles.cursorDefault}`}
					style={{ paddingLeft: `${depth * 16 + 12}px` }}
				>
					<div className={styles.fileTreeToggle}>
						{node.type === "folder" &&
							(expandedFolders.has(node.id) ? (
								<ChevronDown className={styles.chevronDown} />
							) : (
								<ChevronRight className={styles.chevronRight} />
							))}
					</div>

					<div
						className={`${styles.fileTreeIcon} ${
							node.type === "folder" ? styles.folderIcon : styles.fileIcon
						}`}
					>
						{node.type === "folder" ? (
							<Folder className={styles.folderIcon} />
						) : (
							<FileText className={styles.fileIcon} />
						)}
					</div>

					<span
						className={`${styles.fileName} ${
							node.type === "folder" ? styles.folderName : styles.fileText
						}`}
					>
						{node.name}
					</span>

					{node.count !== undefined && (
						<span className={styles.fileCount}>{node.count}</span>
					)}
				</div>

				{node.type === "folder" &&
					expandedFolders.has(node.id) &&
					node.children &&
					renderFileTree(node.children, depth + 1)}
			</div>
		));
	};

	return (
		<div className={styles.dashboard}>
			<div className={styles.dashboardContent}>
				<header className={styles.header}>
					<div className={styles.headerContent}>
						<h1 className={styles.headerTitle}>SAS Modernization Dashboard</h1>
					</div>
				</header>

				<section className={styles.metricsSection}>
					<div className={styles.sasMetricsGrid}>
						<div className={styles.sasMetricCard}>
							<div className={styles.sasMetricCardContent}>
								<p className={styles.sasMetricNumber}>1,000</p>
								<p className={styles.sasMetricTitle}>
									No. of SAS Programs To Be Converted
								</p>
								<div className={styles.sasMetricBadge}>Pending</div>
							</div>
						</div>
						<div className={styles.sasMetricCard}>
							<div className={styles.sasMetricCardContent}>
								<p className={styles.sasMetricNumber}>2,345</p>
								<p className={styles.sasMetricTitle}>
									No. of SAS Programs Converted
								</p>
								<div className={styles.sasMetricBadge}>Completed</div>
							</div>
						</div>
						<div className={styles.sasMetricCardMigrated}>
							<div className={styles.sasMetricCardContent}>
								<p className={styles.sasMetricNumber}>36</p>
								<p className={styles.sasMetricTitle}>
									No. of SAS Programs Migrated
								</p>
								<div className={styles.sasMetricBadgeMigrated}>Migrated</div>
							</div>
						</div>
					</div>

					<div className={styles.migrationFlow}>
						<h3 className={styles.migrationFlowTitle}>Migration Pipeline</h3>
						<div className={styles.migrationFlowSteps}>
							<div className={styles.migrationFlowStep}>
								<div className={styles.migrationFlowStepContent}>
									<p className={styles.migrationFlowStepNumber}>1,000</p>
									<p className={styles.migrationFlowStepTitle}>
										Analysis Completed
									</p>
								</div>
							</div>
							<ArrowRight className={styles.migrationFlowArrow} />
							<div className={styles.migrationFlowStep}>
								<div className={styles.migrationFlowStepContent}>
									<p className={styles.migrationFlowStepNumber}>1,000</p>
									<p className={styles.migrationFlowStepTitle}>
										Code Conversion Completed
									</p>
								</div>
							</div>
							<ArrowRight className={styles.migrationFlowArrow} />
							<div className={styles.migrationFlowStep}>
								<div className={styles.migrationFlowStepContent}>
									<p className={styles.migrationFlowStepNumber}>1,345</p>
									<p className={styles.migrationFlowStepTitle}>
										Unit Test Completed
									</p>
								</div>
							</div>
							<ArrowRight className={styles.migrationFlowArrow} />
							<div className={styles.migrationFlowStepMigrated}>
								<div className={styles.migrationFlowStepContent}>
									<p className={styles.migrationFlowStepNumber}>1,345</p>
									<p className={styles.migrationFlowStepTitle}>
										Integration Test Completed
									</p>
								</div>
							</div>
							<ArrowRight className={styles.migrationFlowArrow} />
							<div className={styles.migrationFlowStepMigrated}>
								<div className={styles.migrationFlowStepContent}>
									<p className={styles.migrationFlowStepNumber}>1,345</p>
									<p className={styles.migrationFlowStepTitle}>
										Data Validation Completed
									</p>
								</div>
							</div>
							<ArrowRight className={styles.migrationFlowArrow} />
							<div className={styles.migrationFlowStepMigrated}>
								<div className={styles.migrationFlowStepContent}>
									<p className={styles.migrationFlowStepNumber}>1,345</p>
									<p className={styles.migrationFlowStepTitle}>
										Regression Completed
									</p>
								</div>
							</div>
						</div>

						<div className={styles.migrationFlowFooter}>
							<div className={styles.migrationFlowFooterLeft}>
								Powered by Code Jarvis Automation
							</div>
							<div className={styles.migrationFlowFooterRight}>
								Managed by Human SME
							</div>
						</div>
					</div>
				</section>

				<section className={styles.fileTreeSection}>
					<button
						onClick={() => setIsFileTreeExpanded(!isFileTreeExpanded)}
						className={styles.fileTreeSectionHeader}
					>
						<div className={styles.fileTreeSectionHeaderLeft}>
							<div className={styles.fileTreeSectionHeaderIcon}>
								<Folder className={styles.fileTreeSectionHeaderIconSvg} />
							</div>
							<div className={styles.fileTreeSectionHeaderText}>
								<h2 className={styles.fileTreeSectionHeaderTitle}>
									Source Files
								</h2>
								<p className={styles.fileTreeSectionHeaderSubtitle}>
									{fileTreeData.length} workspaces •{" "}
									{filteredFileTree.reduce(
										(acc, node) => acc + (node.count || 0),
										0,
									)}{" "}
									files
								</p>
							</div>
						</div>
						<div className={styles.fileTreeSectionHeaderRight}>
							<div className={styles.fileTreeSectionHeaderStatus}>
								<ShieldCheck className={styles.securityIcon} />
								<span>SOC 2</span>
								<Lock className={styles.lockIcon} />
								<span>Encrypted</span>
							</div>
							{isFileTreeExpanded ? (
								<ChevronUp className={styles.fileTreeSectionHeaderToggle} />
							) : (
								<ChevronDown className={styles.fileTreeSectionHeaderToggle} />
							)}
						</div>
					</button>

					{isFileTreeExpanded && (
						<div className={styles.fileTreeSectionContent}>
							<div className={styles.fileTreeSectionContentInner}>
								<div className={styles.fileTreeSectionContentSearch}>
									<Search className={styles.searchIcon} />
									<input
										type="text"
										placeholder="Search files or folders..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className={styles.searchInput}
									/>
									{searchTerm && (
										<button
											onClick={() => setSearchTerm("")}
											className={styles.searchClear}
										>
											<svg
												className={styles.searchClearIcon}
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

								<div className={styles.fileTreeSectionContentGrid}>
									{filteredFileTree.map((rootNode) => (
										<div key={rootNode.id} className={styles.fileTreeNode}>
											<div
												onClick={() => toggleFolder(rootNode.id)}
												className={styles.fileTreeNodeHeader}
											>
												<div className={styles.fileTreeNodeHeaderToggle}>
													{expandedFolders.has(rootNode.id) ? (
														<ChevronDown
															className={styles.fileTreeNodeHeaderToggleIcon}
														/>
													) : (
														<ChevronRight
															className={styles.fileTreeNodeHeaderToggleIcon}
														/>
													)}
												</div>
												<Folder className={styles.fileTreeNodeHeaderIcon} />
												<span className={styles.fileTreeNodeHeaderName}>
													{rootNode.name}
												</span>
												{rootNode.count !== undefined && (
													<span className={styles.fileTreeNodeHeaderCount}>
														{rootNode.count}
													</span>
												)}
											</div>
											{expandedFolders.has(rootNode.id) &&
												rootNode.children && (
													<div className={styles.fileTreeNodeChildren}>
														{rootNode.children.slice(0, 3).map((child) => (
															<div
																key={child.id}
																className={styles.fileTreeNodeChildrenItem}
															>
																{child.type === "folder" ? (
																	<Folder
																		className={`${styles.fileTreeNodeChildrenItemIcon} ${styles.folder}`}
																	/>
																) : (
																	<FileText
																		className={`${styles.fileTreeNodeChildrenItemIcon} ${styles.file}`}
																	/>
																)}
																<span
																	className={
																		styles.fileTreeNodeChildrenItemName
																	}
																>
																	{child.name}
																</span>
																{child.count !== undefined && (
																	<span
																		className={
																			styles.fileTreeNodeChildrenItemCount
																		}
																	>
																		{child.count}
																	</span>
																)}
															</div>
														))}
														{rootNode.children.length > 3 && (
															<span className={styles.fileTreeNodeChildrenMore}>
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
