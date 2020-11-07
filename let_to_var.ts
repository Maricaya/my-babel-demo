import { parse } from "@babel/parser"
import traverse from "@babel/traverse"
import generate from "@babel/generator"

// 1. parse 代码转换为 AST
const code = `let a = 'let'; let b = 2`
const ast = parse(code, { sourceType: 'module' })

// 2. traverse 遍历
traverse(ast, {
  enter: item => {
    if (item.node.type === 'VariableDeclaration') {
      if (item.node.kind === 'let') {
        item.node.kind = 'var'
      }
    }
  }
})

// 3. generate
const result = generate(ast, {}, code)
console.log(result.code)
