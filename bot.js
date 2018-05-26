const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log('Bot is ready! Super Bot');
    
    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch(e){
        console.log(e.stack);
    }
});

var jokes = [
    "What do you call Kennen stunned in Lightning Rush? Static Electricity.",
    "Why can't Sivir win the spelling bee? She can only spell shield!",
    "Why is Yasuo never locked out? He Hasaki!",
    "What's Vayne's favourite website? Tumblr.",
    "Why do chefs like cooking for Ekko? He always goes back four seconds!",
    "Why does Teemo live in a small house? He doesn't need mushroom."
];

var compliments = [
    "You look great today!",
    "I'm only a bot, but you make me blush!",
    "I just know you'll achieve great things!",
    "You'll climb the ladder for sure!",
    "I just know you'll carry the team!",
    "If you were a champion I'd play you all day!",
    "I wish I could be your friend!"
];

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    
    if(!command.startsWith(prefix)) return;
    
    if(command === `${prefix}userinfo`) {
        let embed = new Discord.RichEmbed()
                .setAuthor(message.author.username)
                .setDescription("This is the user's info!")
                .setColor("#FFA500")
                .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
                .addField("ID", message.author.id)
                .addField("Created At", message.author.createdAt);
        
        message.channel.sendEmbed(embed);
        
        return;
        
        
    }
    
    if(command === `${prefix}joke`) {
        var selection = jokes[Math.floor(Math.random() * jokes.length)];
        message.channel.send(selection);
    }
    
    if(command === `${prefix}compliment`){
        var selection = compliments[Math.floor(Math.random() * compliments.length)];
        message.channel.send(selection);
        
    }
    
    if(command === `${prefix}bothelp`){
        message.channel.send("Hi! This is a simple bot written by Ethan/Yue Yang.");
        message.channel.send("Press !userinfo to see your info.");
        message.channel.send("Press !joke to see a joke.");
        message.channel.send("Press !compliment to see a compliment.");
        message.channel.send("Message yy with any errors or suggestions!");
    }
});

bot.login(botSettings.token);