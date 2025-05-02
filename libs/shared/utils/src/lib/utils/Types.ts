// The following code is a TypeScript type definition for the raw data structure in the response.json file.
export type FolderRow = [id: number, title: string, parentId: number | null];
export type ItemRow = [id: number, title: string, folderId: number];

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

// The following code is a TypeScript interface definition for the new folder and item structure that will be used in the tree in our application.
// It defines the structure of a folder and an item, including their properties and types.
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
          children: TreeNode[]; // folders have children; items don’t
          isFolder: true;
      };
