import { spawn } from 'child_process'

interface Command {
    cmd: string,
    args: Array<string>
}

export const execCommand = ({ cmd, args }: Command): Promise<0> => {
    console.info(`Executing command: "${cmd}"`)
    console.info(`With arguments: ${args}`)
    return new Promise((resolve) => {
        const child = spawn(cmd, args)

        child.stdout.setEncoding('utf8')
        child.stdout.on('data', (chunk) => {
            console.info(chunk)
        })

        child.stderr.setEncoding('utf8')
        child.stderr.on('data', (chunk) => {
            console.error(chunk)
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

export const parseInstruction = (key: string, instruction: string): Command => {
    const p = RegExp(`(?:\n*key=${key},cmd=)(?<cmd>(?<=cmd=).*)(?:\n*)`, 'm')
    const m = instruction.match(p)

    if (!m) throw {
        message: `Command not found for key: ${key}`,
        key,
    }

    const [cmd, ...args] = m.groups.cmd.split(' ').map((s) => s.trim())
    return { cmd, args }
}

export const tryExec = (key: string, instruction: string) => {
    let c: Command;
    try {
        c = parseInstruction(key, instruction)
    } catch (e) {
        console.info(e.message)
        console.info(`Attempting default command`)
        c = parseInstruction('default', instruction)
    }
    return execCommand(c)
}

