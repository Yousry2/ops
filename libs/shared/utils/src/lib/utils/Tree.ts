import { RawData, TreeNode } from './Types';

// The function buildFolderTree takes raw data and builds a tree structure of folders and items.
export function buildFolderTree(data: RawData): TreeNode[] {
    const nodeMap = new Map<number, TreeNode>();
    const roots: TreeNode[] = [];

    // Step 1: Create folder nodes first
    for (const [id, title, parentId] of data.folders.data) {
        const folder: TreeNode = {
            id,
            title,
            parentId,
            isFolder: true,
            children: [],
        };
        nodeMap.set(id, folder);
    }

    // Step 2: Create item nodes and link them to folders
    for (const [id, title, folderId] of data.items.data) {
        const item: TreeNode = {
            id,
            title,
            parentId: folderId,
            isFolder: false,
        };

        const parent = nodeMap.get(folderId);
        if (parent && parent.isFolder && parent.children) {
            parent.children.push(item);
        }
    }

    for (const folder of nodeMap.values()) {
        if (folder.parentId === null) {
            roots.push(folder);
        } else {
            const parent = nodeMap.get(folder.parentId);
            if (parent && parent.isFolder && parent.children) {
                parent.children.push(folder);
            }
        }
    }

    return roots;
}
