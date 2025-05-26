/**
 * This plugin allows me to use the Next Image component in my .mdx files without specifying the height/width dimensions of the image.
 * Adapted from: https://www.skovy.dev/blog/nextjs-image-with-mdx-bundler
 * Notes/Modifications:
 *     - Used image-size/fromFile
 *     - Had to downgrade mdx-bundler to v9.x
 */

import { imageSizeFromFile } from 'image-size/fromFile'
import path from 'path';
import { Processor } from 'unified';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';
import { VFile } from 'vfile';

interface ImageNode extends Node {
  type: "element";
  tagName: "img";
  properties: {
    src: string;
    height?: number;
    width?: number;
  };
}

function isImageNode(node: Node): node is ImageNode {
  const img = node as ImageNode;
  return (
    img.type === "element" &&
    img.tagName === "img" &&
    img.properties &&
    typeof img.properties.src === "string"
  );
}

function filterImageNode(node: ImageNode): boolean {
  return node.properties.src.startsWith("/");
}

async function addMetadata(node: ImageNode): Promise<void> {
  const res = await imageSizeFromFile(path.join(process.cwd(), "public", node.properties.src));

  if (!res) throw Error(`Invalid image with src "${node.properties.src}"`);
  node.properties.width = res.width;
  node.properties.height = res.height;
}

export default function imageMetadata(this: Processor) {
  return async function transformer(tree: Node, _: VFile): Promise<Node> {
    const imgNodes: ImageNode[] = [];

    visit(tree, "element", (node) => {
      if (isImageNode(node) 
      && filterImageNode(node)
    ) {
        imgNodes.push(node);
      }
    });

    for (const node of imgNodes) {
      await addMetadata(node);
    }

    return tree;
  };
}