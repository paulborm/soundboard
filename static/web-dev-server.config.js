import cors from "@koa/cors";

/** @type {import('@web/dev-server').DevServerConfig} */
export default {
	port: 3002,
	middleware: [cors()],
};
