import type {CoreInterface} from "@phuture/types";

export function logRequest(core: CoreInterface) {
	core.hook.wrap("request", (request, options) => {
		core.log.debug("request", options);

		const start = Date.now();

		return (request as typeof core.request)(options)
			.then((response) => {
				core.log.info(
					`${response.status} in ${
						Date.now() - start
					}ms`
				);
				return response;
			})
			.catch((error) => {
				core.log.info(
					`${error.status} in ${
						Date.now() - start
					}ms`
				);
				throw error;
			});
	});
}
