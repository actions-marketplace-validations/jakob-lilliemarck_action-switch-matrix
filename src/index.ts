import { tryExec } from "./lib";
import { getInput, setFailed } from '@actions/core';

try {
    const key = getInput("key");
    const instruction = getInput("instruction");
    await tryExec(key, instruction)
} catch (e) {
    setFailed(e.message);
}