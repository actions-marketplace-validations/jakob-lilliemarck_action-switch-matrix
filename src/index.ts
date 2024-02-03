import { getInput, setFailed } from '@actions/core';
import { spawn } from 'child_process'

const execute = (cmd) => {
    return new Promise((resolve) => {
        const child = spawn(cmd)
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

// const pattern = /^(?:key=)(?<key>(?<=key=)[^,]*)(?:,\s*cmd=)(?<cmd>(?<=cmd=).*)$/

const fmtRe = (key: string) => RegExp(`(?:\n*key=${key},cmd=)(?<cmd>(?<=cmd=).*)(?:\n*)`, 'm')

try {
    const key = getInput("key");

    const instruction = getInput("instruction");

    const m = instruction.match(fmtRe(key))

    if (!m) throw new Error(`Could not interpret cmd for key: ${key}`)

    await execute("echo foo")

    //instruction
    //.split("\n")
    //.filter((s) => s)
    //.reduce((a, s, i) => {
    //        const m = s.match(pattern)
    //        if (!m) throw new Error(`Line ${i} could not be interpreted.`)
    //        return m ? [...a, m.groups] : a
    //
    //, [] as Array<{ key: string, cmd: string }>)
    //.forEach(({ key, cmd }) => {
    //        if (_key === key) {
    //            execute(cmd)
    //
    //   }
    //
    //})
} catch (e) {
    setFailed(e.message);
}