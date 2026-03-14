import React from 'react';
import { ChevronDown, ChevronRight, Folder, FileText, ExternalLink } from 'lucide-react';
import styles from './FileTreeNode.module.scss';

interface FileTreeNodeProps {
  node: {
    id: string;
    name: string;
    type: 'folder' | 'file';
    count?: number;
    workflow?: 'Manual' | 'Automatic';
    children?: Array<{
      id: string;
      name: string;
      type: 'folder' | 'file';
      count?: number;
      workflow?: 'Manual' | 'Automatic';
      link?: string;
    }>;
    link?: string;
  };
  isExpanded: boolean;
  onToggle: (id: string) => void;
  depth?: number;
}

export const FileTreeNode: React.FC<FileTreeNodeProps> = ({ 
  node, 
  isExpanded, 
  onToggle, 
  depth = 0 
}) => {
  const handleLinkClick = (e: React.MouseEvent) => {
    if (node.link) {
      e.stopPropagation();
      window.open(`http://${node.link}`, '_blank');
    }
  };

  return (
    <div className={styles.selectNone}>
      <div
        onClick={() => node.type === 'folder' && onToggle(node.id)}
        className={`${styles.fileTreeItem} ${node.type === 'folder' ? styles.cursorPointer : styles.cursorDefault}`}
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
      >
        <div className={styles.fileTreeToggle}>
          {node.type === 'folder' &&
            (isExpanded ? (
              <ChevronDown className={styles.chevronDown} />
            ) : (
              <ChevronRight className={styles.chevronRight} />
            ))}
        </div>

        <div
          className={`${styles.fileTreeIcon} ${
            node.type === 'folder' ? styles.folderIcon : styles.fileIcon
          }`}
        >
          {node.type === 'folder' ? (
            <Folder className={styles.folderIcon} />
          ) : (
            <FileText className={styles.fileIcon} />
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span
            className={`${styles.fileName} ${
              node.type === 'folder' ? styles.folderName : styles.fileText
            } ${node.link ? styles.linkText : ''}`}
            onClick={handleLinkClick}
            style={{ cursor: node.link ? 'pointer' : 'default' }}
          >
            {node.name}
          </span>
          
          {node.link && (
            <ExternalLink 
              size={12} 
              className={styles.externalLink} 
              onClick={handleLinkClick}
              style={{ cursor: 'pointer' }}
            />
          )}
        </div>

        {node.count !== undefined && (
          <span className={styles.fileCount}>{node.count}</span>
        )}
      </div>

      {node.type === 'folder' &&
        isExpanded &&
        node.children &&
        node.children.map((child) => (
          <FileTreeNode
            key={child.id}
            node={child}
            isExpanded={false}
            onToggle={onToggle}
            depth={depth + 1}
          />
        ))}
    </div>
  );
};

export default FileTreeNode;