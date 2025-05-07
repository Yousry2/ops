export type FolderRow = [id: number, title: string, parentId: number | null];
export type ItemRow = [id: number, title: string, folderId: number];

/**
 * Interface representing the raw data structure from the response.json file.
 * Contains collections of folders and items with their column definitions.
 */
export interface RawData {
    folders: {
        columns: ['id', 'title', 'parent_id'];
        data: FolderRow[];
    };
    items: {
        columns: ['id', 'title', 'folder_id'];
        data: ItemRow[];
    };
}

/**
 * Type representing a node in the tree structure for the application.
 * Can be either a folder node (with children) or an item node (without children).
 * Both types share common properties like id, title, and parentId.
 */
export type TreeNode =
    | {
          id: number;
          title: string;
          parentId: number | null;
          isFolder: false;
      }
    | {
          id: number;
          title: string;
          parentId: number | null;
          /** Collection of child nodes (only folders have children) */
          children: TreeNode[];
          isFolder: true;
      };
