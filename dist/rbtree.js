"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RBColor;
(function (RBColor) {
    // RED = 0,
    // BLACK = 1,
    RBColor["RED"] = "RED";
    RBColor["BLACK"] = "BLACK";
})(RBColor = exports.RBColor || (exports.RBColor = {}));
class RBNode {
    constructor(key) {
        this.parent = null;
        this.left = null;
        this.right = null;
        this.color = RBColor.RED;
        this.key = key;
    }
}
exports.RBNode = RBNode;
class RBTree {
    constructor() {
        this.root = null;
    }
    checkRbTree() {
        if (this.root == null) {
            return true;
        }
        if (this.root.color == RBColor.RED) {
            console.error("根节点为红色");
            return false;
        }
        let blackCount = 0; // 黑色节点数基准
        let cur = this.root;
        while (cur) {
            if (cur.color == RBColor.BLACK) {
                blackCount++;
            }
            cur = cur.left;
        }
        return this._checkRbTree(this.root, blackCount, 0);
    }
    _checkRbTree(root, blackCount, currBlackCount) {
        if (root == null) {
            return true;
        }
        let p = root.parent;
        if (root.color == RBColor.RED && p.color == RBColor.RED) {
            console.error("存在连续红结点");
            return false; // 连续红结点
        }
        if (p) {
            if (root == p.left) {
                if (!(root.key < p.key)) {
                    console.error("不是bst");
                    return false; // is not bst
                }
            }
            else {
                if (!(root.key > p.key)) {
                    console.error("不是bst");
                    return false; // is not bst
                }
            }
        }
        if (root.color == RBColor.BLACK) {
            currBlackCount++;
        }
        if (root.left == null || root.right == null) {
            if (blackCount != currBlackCount) {
                console.error("黑色结点个数不一样");
                return false; // 黑色结点个数不一样
            }
        }
        return this._checkRbTree(root.left, blackCount, currBlackCount)
            && this._checkRbTree(root.right, blackCount, currBlackCount);
    }
    isBlackOrNull(node) {
        return node == null || node.color == RBColor.BLACK;
    }
    isLeftNode(node) {
        return node.parent.left == node;
    }
    sibling(node) {
        let p = node.parent;
        if (p) {
            if (p.left == node) {
                return p.right;
            }
            else if (p.right == node) {
                return p.left;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
    prev(node) {
        let prev = node.left;
        while (prev.right) {
            prev = prev.right;
        }
        return prev;
    }
    leftRotate(node) {
        let parent = node.parent;
        let nodeIsLeftNode = parent ? this.isLeftNode(node) : false;
        let right = node.right;
        let right_left = right.left;
        right.left = node;
        right.left.parent = right;
        node.right = right_left;
        if (node.right) {
            node.right.parent = node;
        }
        if (parent) {
            if (nodeIsLeftNode) {
                parent.left = right;
                parent.left.parent = parent;
            }
            else {
                parent.right = right;
                parent.right.parent = parent;
            }
        }
        else {
            this.root = right;
            this.root.parent = null;
        }
        return right;
    }
    rightRotate(node) {
        let parent = node.parent;
        let nodeIsLeftNode = parent ? this.isLeftNode(node) : false;
        let left = node.left;
        let left_right = left.right;
        left.right = node;
        left.right.parent = left;
        node.left = left_right;
        if (node.left) {
            node.left.parent = node;
        }
        if (parent) {
            if (nodeIsLeftNode) {
                parent.left = left;
                parent.left.parent = parent;
            }
            else {
                parent.right = left;
                parent.right.parent = parent;
            }
        }
        else {
            this.root = left;
            this.root.parent = null;
        }
        return left;
    }
    init(arr) {
        this.root = null;
        for (let i = 0; i < arr.length; i++) {
            const key = arr[i];
            this.insert(key);
        }
    }
    insert(key) {
        if (!this.root) {
            this.root = new RBNode(key);
        }
        else {
            this._insert(this.root, key);
        }
        this.root.color = RBColor.BLACK;
    }
    _insert(root, key) {
        while (true) {
            if (key < root.key) {
                if (root.left) {
                    root = root.left;
                }
                else {
                    root.left = new RBNode(key);
                    root.left.parent = root;
                    this.insert_blance(root.left);
                    break;
                }
            }
            else if (key > root.key) {
                if (root.right) {
                    root = root.right;
                }
                else {
                    root.right = new RBNode(key);
                    root.right.parent = root;
                    this.insert_blance(root.right);
                    break;
                }
            }
            else { // 已经存在
                break;
            }
        }
    }
    insert_blance(node) {
        if (node.color == RBColor.RED) {
            let parent = node.parent;
            if (parent) {
                if (parent.color == RBColor.RED) { // has grandparent
                    let pp = parent.parent;
                    let uncle = this.sibling(parent);
                    if (this.isBlackOrNull(uncle)) {
                        if (this.isLeftNode(parent)) {
                            if (this.isLeftNode(node)) { // case1
                                pp.color = RBColor.RED;
                                parent.color = RBColor.BLACK;
                                this.rightRotate(pp);
                                return;
                            }
                            else { // case2
                                this.leftRotate(parent); // to case1
                                this.insert_blance(parent);
                                return;
                            }
                        }
                        else {
                            if (!this.isLeftNode(node)) { // case4
                                pp.color = RBColor.RED;
                                parent.color = RBColor.BLACK;
                                this.leftRotate(pp);
                                return;
                            }
                            else { // case4
                                this.rightRotate(parent); // to case3
                                this.insert_blance(parent);
                                return;
                            }
                        }
                    }
                    else { // unclec.color == red
                        parent.color = RBColor.BLACK;
                        uncle.color = RBColor.BLACK;
                        pp.color = RBColor.RED;
                        this.insert_blance(pp);
                    }
                } // if (parent.color == RBColor.RED)
            }
            else {
                node.color = RBColor.BLACK; // is root
            } // if (parent)
        } // if (node.color == RBColor.RED)
    } // insert_blance
    delete(key) {
        this._delete(this.root, key);
        if (this.root) {
            this.root.color = RBColor.BLACK;
        }
    }
    _delete(root, key) {
        while (root) {
            if (key < root.key) {
                root = root.left;
            }
            else if (key > root.key) {
                root = root.right;
            }
            else { // key == root.key
                this.delete_node(root);
                return;
            }
        }
    }
    delete_node(root) {
        let parent = root.parent;
        if (!root.left && !root.right) {
            if (root.color == RBColor.BLACK) {
                // case 1.1
                if (!parent) {
                    this.root = null;
                    return;
                }
                else {
                    // parent must be exist,and sibling must be exist
                    if (this.isLeftNode(root)) {
                        parent.left = null;
                        this.delete_balance(parent.left, parent);
                        return;
                    }
                    else {
                        parent.right = null;
                        this.delete_balance(parent.right, parent);
                        return;
                    }
                }
            }
            else {
                // case 1.2
                // parent must be exist
                if (this.isLeftNode(root)) {
                    parent.left = null;
                }
                else {
                    parent.right = null;
                }
                return;
            }
        }
        else if ((!root.left && root.right) || (root.left && !root.right)) {
            // (root.left|| root.left).color == RBColor.RED
            if (root.left) { // case 2.1
                root.key = root.left.key;
                root.left = null;
            }
            else { // case 2.2
                root.key = root.right.key;
                root.right = null;
            }
            return;
        }
        else { // case 3
            // has two child
            let prev = this.prev(root);
            root.key = prev.key;
            this.delete_node(prev);
            return;
        }
    }
    delete_balance(x, p) {
        // return;
        if (x && x == this.root) {
            x.color = RBColor.BLACK;
            return;
        }
        if (x == p.left) {
            let s = p.right;
            let sl = s.left;
            let sr = s.right;
            if (s.color == RBColor.BLACK) {
                if (p.color == RBColor.RED) {
                    // case 1
                    if (this.isBlackOrNull(sl) && this.isBlackOrNull(sr)) {
                        // case 1.1
                        p.color = RBColor.BLACK;
                        s.color = RBColor.RED;
                        return;
                    }
                    else if (sr && sr.color == RBColor.RED) {
                        // case 1.2
                        p.color = RBColor.BLACK;
                        sr.color = RBColor.BLACK;
                        s.color = RBColor.RED;
                        this.leftRotate(p);
                        return;
                    }
                    else { // sl.color == RBColor.RED && this.isBlackOrNull(sr)
                        // case 1.3
                        sl.color = RBColor.BLACK;
                        s.color = RBColor.RED;
                        this.rightRotate(s); // to case 1.2
                        this.delete_balance(x, p);
                        return;
                    }
                }
                else {
                    // case 2
                    if (this.isBlackOrNull(sl) && this.isBlackOrNull(sr)) {
                        // case 2.1
                        s.color = RBColor.RED;
                        this.delete_balance(p, p.parent);
                        return;
                    }
                    else if (sr && sr.color == RBColor.RED) {
                        // case 2.2
                        p.color = RBColor.BLACK;
                        sr.color = RBColor.BLACK;
                        s.color = RBColor.BLACK;
                        this.leftRotate(p);
                        return;
                    }
                    else { // sl.color == RBColor.RED && this.isBlackOrNull(sr)
                        // case 2.3
                        sl.color = RBColor.BLACK;
                        s.color = RBColor.RED;
                        this.rightRotate(s); // to case 2.2
                        this.delete_balance(x, p);
                        return;
                    }
                }
            }
            else { // s.color == RBColor.RED ,p.color must be RBColor.BLACK
                // case 3
                p.color = RBColor.RED;
                s.color = RBColor.BLACK;
                this.leftRotate(p); // to case 1
                this.delete_balance(x, p);
                return;
            } //if (s.color == RBColor.BLACK)
        }
        else {
            // symmetric  x == p.left
            let s = p.left;
            let sl = s.left;
            let sr = s.right;
            if (s.color == RBColor.BLACK) {
                if (p.color == RBColor.RED) {
                    // case 1
                    if (this.isBlackOrNull(sl) && this.isBlackOrNull(sr)) {
                        // case 1.1
                        p.color = RBColor.BLACK;
                        s.color = RBColor.RED;
                        return;
                    }
                    else if (sl && sl.color == RBColor.RED) {
                        // case 1.2
                        p.color = RBColor.BLACK;
                        sl.color = RBColor.BLACK;
                        s.color = RBColor.RED;
                        this.rightRotate(p);
                        return;
                    }
                    else { // sr.color == RBColor.RED && this.isBlackOrNull(sl)
                        // case 1.3
                        sr.color = RBColor.BLACK;
                        s.color = RBColor.RED;
                        this.leftRotate(s); // to case 1.2
                        this.delete_balance(x, p);
                        return;
                    }
                }
                else {
                    // case 2
                    if (this.isBlackOrNull(sl) && this.isBlackOrNull(sr)) {
                        // case 2.1
                        s.color = RBColor.RED;
                        this.delete_balance(p, p.parent);
                        return;
                    }
                    else if (sl && sl.color == RBColor.RED) {
                        // case 2.2
                        p.color = RBColor.BLACK;
                        sl.color = RBColor.BLACK;
                        s.color = RBColor.BLACK;
                        this.rightRotate(p);
                        return;
                    }
                    else { // sr.color == RBColor.RED && this.isBlackOrNull(sl)
                        // case 2.3
                        sr.color = RBColor.BLACK;
                        s.color = RBColor.RED;
                        this.leftRotate(s); // to case 2.2
                        this.delete_balance(x, p);
                        return;
                    }
                }
            }
            else { // s.color == RBColor.RED ,p.color must be RBColor.BLACK
                // case 3
                p.color = RBColor.RED;
                s.color = RBColor.BLACK;
                this.rightRotate(p); // to case 1
                this.delete_balance(x, p);
                return;
            } //if (s.color == RBColor.BLACK)
        }
    }
} // class
exports.RBTree = RBTree;
//# sourceMappingURL=rbtree.js.map