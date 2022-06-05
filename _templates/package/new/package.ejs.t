---
to: packages/<%= h.changeCase.param(name) %>/package.json
---
{
  "name": "@phuture/<%= h.changeCase.param(name) %>",
  "version": "0.1.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
  	"test": "jest ./test/*.test.ts",
    "prepare": "npm run --silent build",
    "prepublishOnly": "npm lint",
    "build": "tsc",
    "clean": "rimraf dist",
    "lint": "xo",
    "lint:fix": "xo --fix"
  },
  "devDependencies": {
  	"@types/chai": "4.3.1",
	"@types/jest": "28.1.1",
	"chai": "4.3.6",
	"jest": "28.1.0",
    "ts-node": "10.8.1",
    "typescript": "4.7.2",
    "xo": "0.49.0"
  },
  "jest": {
  	"preset": "ts-jest"
  },
  "xo": {
    "prettier": true,
    "rules": {
      "import/extensions": 0
    }
  }
}
