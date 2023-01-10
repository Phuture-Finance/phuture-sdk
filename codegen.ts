import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "https://api.thegraph.com/subgraphs/name/phuture-finance/phuture-v1",
	generates: {
		"./src/subgraph/generated/": {
			preset: "client",
			plugins: ["typescript"],
			config: {
				dedupeFragments: true,
				namingConvention: {
					enumValues: "keep",
				}
			}
		}
	}
};

export default config;
