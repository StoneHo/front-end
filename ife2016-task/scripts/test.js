var data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

function Node(text) {
  this.text = text;
  this.left = null;
  this.right = null;
}
function createNodes(nodes,i) {
  var leftChild = i*2 + 1
  var rightChild = i*2 + 2
  if (leftChild < data.length) {
    var node = new Node(data[leftChild])
    nodes.left = node
    createNodes(node,leftChild)
  }
  if (rightChild < data.length) {
    var node = new Node(data[rightChild])
    nodes.right = node
    createNodes(node,rightChild)
  }
}
var node = new Node(data[0])
createNodes(node,0)

//前序
var x = []
function BF(nd) {
  if (nd != null) {
    alert(nd.text)
  }
  while (nd.left != null) {
    if (nd.right != null) {
      x.push(nd.right)
    }
    BF(nd.left)
  }
  while (nd.right != null) {
    BF(nd.right)
  }
  BF(x.pop())
}


//中序
var y = []
function MF(nd) {
  
  while (nd.left != null) {
    y.push(nd)
    MF(nd.left)
  }
  while (nd.right != null) {
    MF(nd.right)
  }
  if (nd != null) {
    alert(nd.text)
  }
  alert((y[y.length-1]).text)
  MF((y.pop()).right)
}


//后序
var z = []
var z1 = []
function LF(nd) {

  while (nd.left != null) {
    z.push(nd)
    z.push(nd.right)
    LF(nd.left)
  }
  while (nd.right != null) {
    LF(nd.right)
  }

}
LF(node)