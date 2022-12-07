import Solver from "../Contracts/Solver";
import parser from "../Parser";

class S implements Solver {
  public expectedResult: number[] = [95437, 0];
  public day: number = 7;
  public part: number = 1;
  public inputs: Promise<string>[];

  constructor() {
    this.inputs = [];
    this.inputs.push(parser.parse(this.day, 1));
    this.inputs.push(parser.parse(this.day, 2));
  }

  public async solve(number: number): Promise<number> {
    const fs = new FileSystem();
    const lines = (await this.inputs[number - 1]).split("\n");
    for (let index = 0; index < lines.length; index++) {
      if (lines[index].length === 0) {
        continue;
      }
      const line = lines[index];
      if (line.startsWith("$ cd ")) {
        const path = line.slice(5);
        fs.cd(path);
      } else if (line.startsWith("dir ")) {
        // do nothing
      } else if (line === "$ ls") {
        // do nothing
      } else {
        const size = parseInt(line);
        const name = line.slice(line.indexOf(" ") + 1);
        const file = new File(name, fs.current, size);
        fs.current.add(file);
      }
    }

    let size = 0;
    const stack: Folder[] = [fs.root];
    while (stack.length > 0) {
      const folder = stack.pop();
      if (folder === undefined) {
        break;
      }
      for (const child of folder.children) {
        if (child instanceof Folder) {
          stack.push(child);
        }
      }
      if (folder.size <= 100000) {
        size += folder.size;
      }
    }

    return size;
  }
}

abstract class Node {
  name: string;
  _size: number;
  parent: Folder | null;

  constructor(name: string, parent: Folder | null = null, size: number = 0) {
    this.name = name;
    this.parent = parent;
    this._size = size ?? 0;
  }

  get size(): number {
    return this._size;
  }
}

class File extends Node {
  constructor(name: string, parent: Folder | null = null, size: number = 0) {
    super(name, parent, size);
  }

  public toString(): string {
    return `- ${this.name} ${this.size}\n`;
  }
}

class Folder extends Node {
  children: Node[];

  constructor(name: string, parent: Folder | null = null) {
    super(name, parent);
    this.children = [];
  }

  public add(node: Node): void {
    this.children.push(node);
  }

  get size(): number {
    let size = 0;
    for (const key in this.children) {
      const child = this.children[key];
      size += child.size;
    }
    return size;
  }

  public toString(): string {
    let childrenList = `- <DIR> ${this.name} ${this.size}\n`;
    if (this.children.length === 0) {
      return childrenList;
    }
    for (const key in this.children) {
      if (Object.prototype.hasOwnProperty.call(this.children, key)) {
        const child = this.children[key];
        childrenList += child.toString();
      }
    }
    return childrenList;
  }
}

class FileSystem {
  root: Folder;
  current: Folder;

  constructor() {
    this.root = new Folder("/");
    this.current = this.root;
  }

  public cd(path: string): void {
    if (path === ".." && this.current.parent !== null) {
      this.current = this.current.parent;
    } else if (path === "/") {
      this.current = this.root;
    } else {
      const folder = this.current.children.find((child) => child.name === path);
      if (folder && folder instanceof Folder) {
        this.current = folder;
      } else {
        const newFolder = new Folder(path, this.current);
        this.current.add(newFolder);
        this.current = newFolder;
      }
    }
  }

  toString(): string {
    return this.root.toString();
  }
}

export default new S();
