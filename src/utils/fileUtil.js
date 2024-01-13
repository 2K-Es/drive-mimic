export class FilesTree {
  constructor(name, isFolder, parent = null) {
    this.name = name;
    this.isFolder = isFolder;
    this.parent = parent;
    this.children = [];
    this.pathElements = this.calculatePathElements();
  }

  calculatePathElements() {
    let pathElements = [];
    let current = this;
    while (current && !current.isRoot()) {
      pathElements.unshift(current.name);
      current = current.parent;
    }
    return pathElements;
  }

  getPathElements() {
    return this.pathElements;
  }

  addChild(childName, isFolder) {
    const child = new FilesTree(childName, isFolder, this);
    this.children.push(child);
  }

  deleteChild(childName) {
    const childToDelete = this.children.find(child => child.name === childName);
    if (childToDelete) {
      this.children = this.children.filter(child => child.name !== childName);
    }
  }

  getChild(childName) {
    return this.children.find(child => child.name === childName);
  }

  getChildren() {
    return this.children;
  }

  getParent() {
    return this.parent;
  }

  isRoot() {
    return !this.parent;
  }

  isFolder() {
    return this.isFolder;
  }

  traverseToParent(parentName) {
    if (parentName === "Root") {
      return this.traverseToRoot();
    }
    let current = this;
    while (current && current.name !== parentName) {
      current = current.parent;
    }
    return current;
  }

  traverseToRoot() {
    let current = this;
    while (current && !current.isRoot()) {
      current = current.parent;
    }
    return current;
  }

  renameChild(oldName, newName) {
    const childToRename = this.children.find(child => child.name === oldName);
    if (childToRename) {
      childToRename.name = newName;
    }
  }
}

