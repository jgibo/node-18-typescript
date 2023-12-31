import { slowFetcher } from "./fetcher.js";

export function greet(name: string) {
	return `Hello ${name}!`;
}

export async function asyncGreet(name: string) {
	return Promise.resolve(`Hello ${name}!`);
}

export async function runSlowFetcher() {
	return await slowFetcher()
}
