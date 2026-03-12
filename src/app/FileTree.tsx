"use client";
import React, { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FileCode } from "lucide-react";
import { FileTreeItemProps, FileTreeNode } from './mock';



export const FileTreeItem: React.FC<FileTreeItemProps> = ({ node, depth, onFileClick }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = node.children && node.children.length > 0;
    const isFolder = node.type === "folder";

    const handleToggle = () => {
        if (isFolder && hasChildren) {
            setIsExpanded(!isExpanded);
        } else {
            onFileClick?.(node);
        }
    };

    return (
        <div className="select-none">
            <div
                onClick={handleToggle}
                className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200
          ${isFolder ? 'hover:bg-slate-800/40' : 'hover:bg-cyan-500/10'}
        `}
                style={{ paddingLeft: `${depth * 16 + 12}px` }}
            >
                <div className="w-4 h-4 flex items-center justify-center">
                    {isFolder && hasChildren && (
                        isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
                        ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                        )
                    )}
                </div>

                <div className={`flex-shrink-0 ${isFolder ? 'text-amber-400' : 'text-cyan-400'}`}>
                    {isFolder ? (
                        <Folder className="w-4 h-4" />
                    ) : (
                        <FileCode className="w-4 h-4" />
                    )}
                </div>

                <span className={`flex-1 text-sm truncate ${isFolder ? 'text-slate-200 font-medium' : 'text-slate-300'
                    }`}>
                    {node.name}
                </span>

                {node.count !== undefined && node.count > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800/60 text-slate-400 border border-slate-700/50">
                        {node.count.toLocaleString()}
                    </span>
                )}

            </div>

            {isFolder && hasChildren && isExpanded && (
                <div className="relative">
                    <div
                        className="absolute left-0 top-0 bottom-2 w-px bg-gradient-to-b from-slate-700/50 to-transparent"
                        style={{ left: `${depth * 16 + 28}px` }}
                    />
                    {node.children!.map((child, idx) => (
                        <FileTreeItem
                            key={child.id}
                            node={child}
                            depth={depth + 1}
                            onFileClick={onFileClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

interface FileTreeProps {
    data: FileTreeNode[];
    onFileClick?: (node: FileTreeNode) => void;
    searchQuery?: string;
}

export const FileTree: React.FC<FileTreeProps> = ({ data, onFileClick, searchQuery }) => {
    const filterTree = (nodes: FileTreeNode[], query: string): FileTreeNode[] => {
        if (!query) return nodes;

        return nodes.reduce<FileTreeNode[]>((acc, node) => {
            const matches = node.name.toLowerCase().includes(query.toLowerCase());
            const filteredChildren = node.children ? filterTree(node.children, query) : [];

            if (matches || filteredChildren.length > 0) {
                acc.push({
                    ...node,
                    children: filteredChildren.length > 0 ? filteredChildren : node.children,
                });
            }
            return acc;
        }, []);
    };

    const filteredData = searchQuery ? filterTree(data, searchQuery) : data;

    return (
        <div className="space-y-1">
            {filteredData.length > 0 ? (
                filteredData.map((node) => (
                    <FileTreeItem
                        key={node.id}
                        node={node}
                        depth={0}
                        onFileClick={onFileClick}
                    />
                ))
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Folder className="w-8 h-8 text-slate-700 mb-3" />
                    <p className="text-sm text-slate-500">No files found</p>
                    <p className="text-xs text-slate-600 mt-1">Try a different search term</p>
                </div>
            )}
        </div>
    );
};