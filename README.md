<h1 align="center">CyberBot</h1>
<p align="center">Discord bot with gambling, moderation and other interesting things. In development...</p>

### Configuration

Rename the file `example.env` located in the main folder to `.env`.

```javascript
token="your-bot-token"
database_url="your-database-url"
bot_status="online|idle|dnd|invisible"
bot_activity="any-text"
```

- `token`, the token of the bot available on the [Discord Developers](https://discordapp.com/developers/applications).
- `database_url`, url for connecting to the database. You can use any database.

### Installation

To launch the bot, you must have an installed [Node JS](https://nodejs.org/en/).

1. First you need to install dependencies with npm (or other package manager) with `npm install`.
2. To create tables in the database, use `npm run-script init_db`.
3. Then dependencies are set and tables are created, you may start the program with `npm start`.

Please do not revoke the license and keep credits for this project. 
If you still want to withdraw the credits, a small donation is accepted.