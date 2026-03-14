import React, { useState, useMemo } from "react";
import {
	Search,
	Folder,
	FileText,
	ShieldCheck,
	Lock,
	ChevronUp,
	ChevronDown,
	ChevronRight,
	ExternalLink,
} from "lucide-react";
import FileTreeNode from "./FileTreeNode";
import styles from "./FileTreeSection.module.scss";

interface FileTreeNodeType {
	id: string;
	name: string;
	type: "folder" | "file";
	count?: number;
	link?: string;
	children?: FileTreeNodeType[];
}

interface FileTreeSectionProps {
	fileTreeData: FileTreeNodeType[];
}

export const FileTreeSection: React.FC<FileTreeSectionProps> = ({
	fileTreeData,
}) => {
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

		const filterNodes = (nodes: FileTreeNodeType[]): FileTreeNodeType[] => {
			return nodes.reduce((acc: FileTreeNodeType[], node) => {
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
	}, [searchTerm, fileTreeData]);

	const handleLinkClick = (e: React.MouseEvent, link: string) => {
		e.stopPropagation();
		window.open(`http://${link}`, "_blank");
	};

	return (
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
							SAS Server Migration latest Update
						</h2>
					</div>
				</div>
				<div className={styles.fileTreeSectionHeaderRight}>
					<div className={styles.fileTreeSectionHeaderStatus}></div>
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
									{expandedFolders.has(rootNode.id) && rootNode.children && (
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
													<div
														style={{
															display: "flex",
															alignItems: "center",
															gap: "4px",
														}}
													>
														<span
															className={`${styles.fileTreeNodeChildrenItemName} ${child.link ? styles.linkText : ""}`}
															onClick={(e) =>
																child.link && handleLinkClick(e, child.link)
															}
															style={{
																cursor: child.link ? "pointer" : "default",
															}}
														>
															{child.name}
														</span>
														{child.link && (
															<ExternalLink
																size={12}
																className={styles.externalLink}
																onClick={(e) => handleLinkClick(e, child.link!)}
																style={{ cursor: "pointer" }}
															/>
														)}
													</div>
													{child.count !== undefined && (
														<span
															className={styles.fileTreeNodeChildrenItemCount}
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
	);
};

export default FileTreeSection;
