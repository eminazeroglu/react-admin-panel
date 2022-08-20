#!/usr/bin/env node
const {Command} = require('commander');
const program = new Command();
const {service, createModule, page} = require('./bin/command')

program
    .command('service')
    .argument('name')
    .option('--back')
    .action((name, options) => service(name, options))

program
    .command('module')
    .argument('name')
    .option('--back')
    .action((name, options) => createModule(name, options))

program
    .command('page')
    .argument('name')
    .option('--back')
    .action((name, options) => page(name, options))


program.parse(process.argv)