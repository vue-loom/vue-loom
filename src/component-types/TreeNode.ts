export interface TreeNode {
    id: number;
    name: string;
    children: TreeNode[];
    selected: boolean;
    expanded: boolean;
}