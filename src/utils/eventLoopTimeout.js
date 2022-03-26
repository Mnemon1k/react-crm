export default async function eventLoopTimeout(ms = 200) {
	await new Promise(resolve => setTimeout(resolve, ms));
}