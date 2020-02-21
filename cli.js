#!/usr/bin/env node

'use strict'

const Ace = require('@adonisjs/ace')

Ace.addCommand(require('./commands/crud'))
Ace.addCommand(require('./commands/init'))
Ace.addCommand(require('./commands/db'))
Ace.addCommand(require('./commands/model'))
Ace.addCommand(require('./commands/migration'))





// Boot ace to execute commands
Ace.wireUpWithCommander()
Ace.invoke()
