const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

//membuat folder data
const dirPath = './data';
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

//membuat file contact.json jika tidak ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// rl.question('Masukan Nama Anda :', (nama) => {
//     rl.question('Masukan No HP Anda :', (noHp) => {
//         const contact = {nama, noHp};
//         const file = fs.readFileSync('data/contacts.json', 'utf-8');
//         const contacts = JSON.parse(file);
        
//         contacts.push(contact);

//         fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));

//         console.log('Terima Kasih Sudah Memasukan Data');

//     rl.close();
//     });
// });

// const tulisPertanyaan = (pertanyaan) => {
//     return new Promise((resolve, reject) => {
//         rl.question(pertanyaan, (nama) => {
//             resolve(nama);
//         });
//     });
// };

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const simpanContact = (nama, email, noHP) => {
    const contact = {nama, email, noHP};
    const contacts = loadContact();

    //cek data kembar
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if(duplikat) {
        console.log(chalk.red.inverse.bold('Contact sudah terdaftar, gunakan nama lain!'));
        return false;
    }

    //cek email
    if(email) {
        if(!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold('Email tidak valid'));
            return false;
        }
    }

    //cek no HP
    if(!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log(chalk.red.inverse.bold('No hp tidak valid'));
        return false;
    }
        
    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));

    console.log(chalk.green.inverse.bold('Terima Kasih Sudah Memasukan Data'));

};


const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold('Daftar Contacts: '));
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
    });
};

const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    if (!contact) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
        return false;
    }

    console.log(chalk.blue.inverse.bold(contact.nama));
    console.log(contact.noHP);
    if (contact.email){
        console.log(contact.email);
    }
    
};

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

    if (contacts.length === newContacts.length) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts, null, 2));

    console.log(chalk.green.inverse.bold(`data contact ${nama} berhasil dihapus`));

}


module.exports = { simpanContact, listContact, detailContact, deleteContact };