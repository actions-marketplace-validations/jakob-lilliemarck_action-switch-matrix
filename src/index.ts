import { getInput, setFailed } from '@actions/core';
import { spawn } from 'child_process'

const execute = (cmd: string, ...args: Array<string>) => {
    return new Promise((resolve) => {
        const child = spawn(cmd, args)
        child.stdout.setEncoding('utf8')
        child.stdout.on('data', (chunk) => {
            console.log(chunk)
        })
        child.on('close', (code) => {
            if (code !== 0) {
                throw new Error(`Command returned non-zero exit code: ${code}`)
            } else {
                resolve(0)
            }
        })
    })
}

const getCommand = (key: string, instruction: string) => {
    const p = RegExp(`(?:\n*key=${key},cmd=)(?<cmd>(?<=cmd=).*)(?:\n*)`, 'm')
    const m = instruction.match(p)

    if (!m) throw {
        message: `Command not found for key: ${key}`,
        key,
    }
    return m.groups.cmd.split(' ').map((s) => s.trim())
}

try {
    const key = getInput("key");
    const instruction = getInput("instruction");


    let c: Array<string>;
    try {
        c = getCommand(key, instruction)
    } catch (e) {
        console.info(e.message)
        console.info(`Attempting default command`)
        c = getCommand('default', instruction)
    }

    console.info(`Running command: ${c}`)
    const [cmd, ...args] = c
    await execute(cmd, ...args)
} catch (e) {
    setFailed(e.message);
}