---
to: packages/<%= h.changeCase.param(name) %>/tsconfig.json
---
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "lib": ["es6", "dom"],
    "declaration": true,
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": [
    "node_modules",
    "dist"
  ]
}