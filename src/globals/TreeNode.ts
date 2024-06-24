export interface TreeNode {
    id: number;
    name: string;
    item?: Record<string, any>;
    children: TreeNode[];
    selected: boolean;
    expanded: boolean;
}