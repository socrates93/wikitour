> **This README assumes that you already have Docker and NodeJS installed on your computer**.

# Instructions

To run this project as standalone you need to do the following:

0. Create an .env file following the .env.template file.
1. From the root folder of the project, install modules with the command `npm install`.
2. Run `npx prisma migrate dev --name init` to generate the db and schema.
3. Run the project with `npm run start`.

### Note:

This project will be running in port 3000 by default.

## LibreTranslate Translation Service

To have the translation service up and running, you need to run this command and wait until it finish the language files download:
`docker run -ti --rm -p 5000:5000 libretranslate/libretranslate`
