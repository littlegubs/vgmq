# VGMQ API

## Installation

### Start Docker images

```bash
$ make start
```

### Install dependencies

```bash
$ npm install
```

### Create a `.env.local` file

Copy the `.env` file and name it `.env.local`.
This is used to override the variables set in the `.env` file. It is ignored by Git.

### (optional) Retrieve your Twitch access id/secret

While optional, this is useful for instantiating the database with games, and overall import games.

Follow the [IGDB documentation](https://api-docs.igdb.com/#getting-started) to create your account and retrieve your access id and secret.

Then, set these values in their respective variables in `.env.local`:
```bash
TWITCH_CLIENT_ID=YOUR_TWITCH_CLIENT_ID
TWITCH_CLIENT_SECRET=YOUR_TWITCH_CLIENT_SECRET
```


### Instantiate the database

```bash
$ npm db:create
$ npm db:update-schema
$ npm db:seed
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Accounts

The fake database comes with 5 accounts with the same password: `yoyo`
- superadmin@vgmq.com
- admin1@vgmq.com
- admin2@vgmq.com
- user1@vgmq.com
- user2@vgmq.com
- user3@vgmq.com


## database

the database can be seen at http://localhost:8080/ (user: root, password: yoyo)

## Updating the database schema

When updating an Entity, TypeORM will not update the database automatically, as it is unsafe to do so. We work with migrations.

for TypeORM to be aware of Entity changes, run:
```bash
$ npm run typeorm migration:generate src/migration/whateverTitleYouWant
```
This command will create a file with the queries necessary to synchronize the database with your Entity.

Once this file is created, run:
```bash
$ npm run typeorm migration:run
```
This will run the queries inside the `src/migration/whateverTitleYouWant`file

and you're done!

learn more about migrations [here](https://typeorm.io/migrations)