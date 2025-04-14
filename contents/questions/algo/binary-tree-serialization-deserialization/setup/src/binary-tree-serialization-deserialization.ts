class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(
    val: number,
    left: TreeNode | null = null,
    right: TreeNode | null = null,
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function serializeImpl(root: TreeNode | null, str: string): string {
  // Base case: if the node is null, add "null," to the string
  if (root === null) {
    str += 'null,';
  } else {
    // Otherwise, add the current node's value to the string
    str += root.val.toString() + ',';
    // Recursively serialize the left and right subtrees
    str = serializeImpl(root.left, str);
    str = serializeImpl(root.right, str);
  }
  return str;
}

export function serializeBinaryTree(root: TreeNode | null): string {
  return serializeImpl(root, '');
}

function deserializeImpl(dataList: string[]): TreeNode | null {
  // Base case: if the current element is "null", remove it and return null
  if (dataList[0] === 'null') {
    dataList.shift(); // Remove the first element from the list
    return null;
  }

  // Otherwise, create a new TreeNode with the first element of the list
  const root = new TreeNode(Number(dataList[0]));
  dataList.shift(); // Remove the first element from the list

  // Recursively deserialize the left and right subtrees
  root.left = deserializeImpl(dataList);
  root.right = deserializeImpl(dataList);

  return root;
}

export function deserializeBinaryTree(data: string): TreeNode | null {
  // Split the serialized string into a list of strings
  const dataArray = data.split(',');
  const dataList = dataArray.filter((item) => item !== ''); // Remove any empty strings

  return deserializeImpl(dataList);
}
