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
    console.log(m.groups.cmd.split(' '))
    return m.groups.cmd.split(' ').map((s) => s.trim())
}

//const key = 'foo'
//const instruction = `
//key=foo,cmd=echo FOO COMMAND
//key=bar,cmd=echo BAR COMMAND
//key=default,cmd=echo DEFAULT COMMAND
//`

try {
    const key = getInput("key");
    const instruction = getInput("instruction");


    let s: Array<string>;
    try {
        s = getCommand(key, instruction)
    } catch (e) {
        console.info(e.message)
        s = getCommand('default', instruction)
    }

    const [cmd, ...args] = s
    await execute(cmd, ...args)
} catch (e) {
    setFailed(e.message);
}