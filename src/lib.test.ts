import { describe, expect, test } from '@jest/globals';
import { parseInstruction, execCommand, tryExec } from './lib';

describe('lib module', () => {
    test(
        'It returns the matching command',
        () => {
            const instruction = `
            key=foo,cmd=echo foo
            key=bar,cmd=echo bar
            `
            expect(parseInstruction('foo', instruction))
                .toEqual({ cmd: 'echo', args: ['foo'] });
        }
    );

    test(
        'It returns 0 when calling well formed system commands',
        () => {
            return execCommand({ cmd: 'echo', args: ['foo'] }).then((code) => {
                expect(code).toBe(0)
            })
        }
    )

    test(
        'It runs the matching command',
        () => {
            const instruction = `
            key=foo,cmd=echo foo
            key=bar,cmd=echo bar
            `
            return tryExec('foo', instruction).then((code) => {
                expect(code).toBe(0)
            })
        }
    )

    test(
        'It runs default command if specified and no match is found',
        () => {
            const instruction = `
            key=foo,cmd=echo foo
            key=default,cmd=echo bar
            `
            return tryExec('bar', instruction).then((code) => {
                expect(code).toBe(0)
            })
        }
    )
});