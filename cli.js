#!/usr/bin/env node

'use strict'

const Ace = require('@adonisjs/ace')

Ace.addCommand(require('./commands/crud'))
Ace.addCommand(require('./commands/init'))
Ace.addCommand(require('./commands/db'))

Ace.addCommand(require('./commands/controller'))
Ace.addCommand(require('./commands/model'))
Ace.addCommand(require('./commands/migration'))
Ace.addCommand(require('./commands/migrate'))
Ace.addCommand(require('./commands/auth'))



// Boot ace to execute commands
Ace.wireUpWithCommander()
Ace.invoke()
