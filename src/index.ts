import { getInput, setFailed } from '@actions/core';
import { Octokit } from '@octokit/action';
import { spawn } from 'child_process'

const octokit = new Octokit()

try {
    const instruction = getInput("instruction");
    console.log('instruction', instruction)
} catch (e) {
    setFailed(e.message);
}

//const red = "\x1b[31m"
//const child = spawn('ls',)
//child.stdout.setEncoding('utf8')
//child.stdout.on('data', (chunk) => {
//    console.log(chunk)
//});
//child.on('close', (code) => {
//    if (code !== 0) {
//        console.log(`child process exited with code ${code}`);
//    }
//});