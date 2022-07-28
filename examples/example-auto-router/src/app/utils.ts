export const getEnv = (key: string) => {
	const value = process.env[key];
	if (!value) throw new Error(`Missing environment variable ${key}`);

	return value;
};
