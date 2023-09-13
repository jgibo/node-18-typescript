import test from 'ava';
import esmock from 'esmock'
import { asyncGreet, greet } from "./index.ts";

test('greet', t => {
	const name = "Bot"
	t.is(greet(name), `Hello ${name}!`);
});

test('async greet', async t => {
	const name = "Bot"
	t.is(await asyncGreet(name), `Hello ${name}!`);
});

test('async fetcher', async t => {
	const mod = await esmock('./index.ts', {
		// mock the import of ./fetcher that ./index does
		'./fetcher.ts': {
			slowFetcher: () => Promise.resolve({data: "mocked data"})
		}
	}) as typeof import('./index.ts');

	const data = await mod.runSlowFetcher();
	t.deepEqual(data, {data: "mocked data"});
});