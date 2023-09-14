import test from 'ava';
import * as td from "testdouble"
import { asyncGreet, greet } from "./index.js";

test.serial('greet', t => {
	const name = "Bot"
	t.is(greet(name), `Hello ${name}!`);
});

test.serial('async greet', async t => {
	const name = "Bot"
	t.is(await asyncGreet(name), `Hello ${name}!`);
});

test.serial('async fetcher', async t => {
	const fakeData = {data: "mocked data"}
	const mod = await td.replaceEsm('./fetcher.js');
	td.when(mod.slowFetcher()).thenResolve(fakeData);

	const { runSlowFetcher } = await import('./index.js');
	const data = await runSlowFetcher();
	t.deepEqual(data, {data: "mocked data"});
});