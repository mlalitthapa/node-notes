const yargs = require('yargs');

const notes = require('./notes');

var titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

var bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};

const yargv = yargs
    .command('add', 'Add new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes.')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;
var command = yargv._[0];

if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`${allNotes.length} note(s).`);
    allNotes.forEach(note => notes.logNote(note));
} else if (command === 'add') {
    var note = notes.addNote(yargv.title, yargv.body);
    if (note)
        notes.logNote(note);
    else
        console.log('Note not found');
} else if (command === 'read') {
    var note = notes.readNote(yargv.title);
    if (note) {
        notes.logNote(note);
    } else {
        console.log('Note not found.');
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(yargv.title);
    var message = noteRemoved ? 'Note removed' : 'Note not found';
    console.log(message);
} else {
    console.log('Command not found.');
}