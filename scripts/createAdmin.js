const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
const prompt = require('prompt-sync')({sigint: true});

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

async function main() {
    console.log("Creating admin");

    //get username
    let username = prompt('> Username ? : ').toString();

    //get password
    let password = prompt('> Password ? : ', {echo: '*'}).toString();

    //hash password
    const hash = await bcrypt.hash(password, 10);
    //create admin
    const admin = await prisma.admin.create({
        data: {
            username: username,
            password: hash
        }
    });
    console.log("Admin created");
    console.log(admin);
    process.exit(0);
}

main()