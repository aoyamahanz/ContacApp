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
    }).demandCommand();

//menampilkan daftar semua nama dan no hp contact

yargs.command({
    command: 'list',
        describe: 'Menampilkan semua nama dan no hp contact',
        handler(){
            contacts.listContact();
        },
});

yargs.command({
    command: 'detail',
    describe: ' Menampilkan detail sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.detailContact(argv.nama);
    }
});

//menghapus contact berdasarkan nama

yargs.command({
    command: 'delete',
    describe: ' Menghapus sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.deleteContact(argv.nama);
    }
});

yargs.parse();