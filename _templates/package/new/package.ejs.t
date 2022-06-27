---
to: packages/<%= h.changeCase.param(name) %>/package.json
---
{
  "name": "@phuture/<%= h.changeCase.param(name) %>",
  "version": "0.1.0",
  "main": "dist/src/index.js",
  "types": "dist/src/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
  	"test": "jest",
    "prepublishOnly": "npm build",
    "build": "tsc",
    "clean": "rimraf dist"
  },
  "devDependencies": {
  	"@types/chai": "4.3.1",
	"@types/jest": "28.1.1",
	"chai": "4.3.6",
	"jest": "28.1.0",
    "ts-node": "10.8.1",
    "typescript": "4.7.2"
  },
  "jest": {
    "preset": "ts-jest",
    "testMatch": ["**/test/*.test.ts"]
  }
}
