// const contacts = require('./contacts');

// const main = async () => {
//     const nama = await contacts.tulisPertanyaan('Masukan nama anda : ');
//     const email = await contacts.tulisPertanyaan('Masukan email anda : ');
//     const noHP = await contacts.tulisPertanyaan('Masukan no hp anda : ');
    
//     contacts.simpanContact(nama, email, noHP);
// };

// main();

// const { demandOption } = require('yargs');
const yargs = require('yargs');
const contacts = require('./contacts');

yargs.command({
    command: 'add',
    describe: 'menambahkan contact baru',
    builder: {
        nama: {
            type: 'string',
            describe: 'Nama Lengkap',
            demandOption: true
        },
        email: {
            describe: 'Email anda',
            demandOption: false,
            type: 'string'
        },
        noHP: {
            describe: 'Nomer Hp Anda',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const contact = {
            nama: argv.nama,
            email: argv.email,
            noHP: argv.noHP,
        };
        contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    },
    });

yargs.parse();