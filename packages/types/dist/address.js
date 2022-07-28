import { utils } from "ethers";
export const isAddress = (address) => typeof address === "string" && utils.isAddress(address);
//# sourceMappingURL=address.js.map