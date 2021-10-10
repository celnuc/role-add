const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const wait = require('util').promisify(setTimeout);

client.once('ready', async () => {
    client.application.commands.set([
        {
            name: '일괄지급',
            description: '역할을 일괄지급 합니다.',
        },
    ])
    .catch(console.error);

	console.log('봇이 실행되었습니다.');
});

client.on('interactionCreate', async interaction => {
    interaction.deferReply()
	if (!interaction.isCommand()) return;

    if (interaction.user.id != 286114148331421704) return

    if (interaction.commandName === '일괄지급') {
        const members = await interaction.guild.members.fetch()
        for (const member of members) {
            if (member[1].roles) return

            member[1].roles.add('846711159809245204').catch(console.error);
            await wait(100)
        }

        interaction.editReply({ content: '작업 완료' });
    }
});


client.login(token);