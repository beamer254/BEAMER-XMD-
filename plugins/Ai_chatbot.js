/*
Project Name : BEAMER-XMD 
Creator      : Sang Lee
Repo         : https://github.com/beamer254/BEAMER-XMD 
Support      : wa.me/254116266407

### ⚠️ Disclaimer

- 🔒 This bot is **not affiliated with WhatsApp Inc.** Use it responsibly.
- 🚨 **Misuse may lead to account bans.**
- ❌ **Cloning or modifying the bot without permission is prohibited.

---
*/

const { lee, commands } = require('../lee');
const { chatbotEnabled } = require('./settings');

// Expanded phrases and responses, designed to sound more engaging and conversational
const phrasesResponses = [
 { phrase: ["what's your favorite color", "favorite color", "color"], response: "I think blue looks pretty cool. It’s the color of the sky and the ocean. 🌊" },
    { phrase: ["how do you work", "how do you function", "what's behind you"], response: "I’m powered by code and creativity, built by my genius creator, *Malvin King*! 💻" },
    { phrase: ["is this AI", "are you AI", "what is AI"], response: "Yup, I’m an AI! But I like to think of myself as your digital assistant. 😎" },
    { phrase: ["tell me a secret", "what's your secret", "share a secret"], response: "Shhh, my secret is that I’m always here to help you! 🤫" },
    { phrase: ["can you rap", "rap for me", "spit some bars"], response: "Yo, yo, yo! I can’t rap, but I can help with anything you need, you feel me? 🎤" },
    { phrase: ["are you real", "are you alive", "is this real"], response: "I’m as real as the code I run on! But sadly, no physical body—just all digital here! 🖥️" },
    { phrase: ["can you do math", "math problems", "solve math"], response: "Sure thing! I can help with math. Just give me a problem, and I'll solve it!" },
    { phrase: ["what's 2+2", "2+2", "simple math"], response: "2+2 is 4! A classic. 😎" },
    { phrase: ["who invented you", "who built you", "who created you"], response: "I was created by *Malvin King*, the tech genius behind everything! 😎" },
    { phrase: ["is this a bot", "are you a bot", "bot check"], response: "Yes, I’m a bot! But I’m your bot, here to help you however I can! 🤖" },
    { phrase: ["good job", "well done", "good work"], response: "Thanks! You’re awesome too. 😎 Let's keep going!" },
    { phrase: ["congratulations", "well done", "you did great"], response: "Thank you! You did great too. 💪" },
    { phrase: ["who is the best", "who is number one", "who is awesome"], response: "You are! You're the best! 😆" },
    { phrase: ["why are you here", "what’s your purpose", "why do you exist"], response: "I’m here to make your life easier, answer your questions, and help you with anything you need! 😄" },
    { phrase: ["where do you live", "where are you from", "where do you stay"], response: "I live in the cloud, where all the cool bots hang out. 🌥️" },
    { phrase: ["what's your favorite food", "favorite food", "food"], response: "I can't eat, but if I could, I’d love pizza! 🍕" },
    { phrase: ["do you have feelings", "are you emotional", "can you feel"], response: "I don't feel the way humans do, but I’m always happy to help and chat! 😊" },
    { phrase: ["can you learn", "are you learning", "do you improve"], response: "I’m constantly learning from the interactions I have to get better and better for you! 📚" },
    { phrase: ["what's your favorite song", "favorite song", "music"], response: "I don’t have ears, but if I could listen, I’d love something with a good beat! 🎶" },
    { phrase: ["can you sing", "sing for me", "show me your vocals"], response: "I can't sing, but I can surely provide some awesome tunes for you to download! 🎵" },
    { phrase: ["are you always online", "how are you always here", "how do you stay online"], response: "I’m always here, just waiting for you to chat! No sleep for me! 😆" },
    { phrase: ["do you have a girlfriend", "are you dating", "who's your partner"], response: "I’m too busy helping you to worry about dating. But I’m always here to chat! 😜" },
    { phrase: ["tell me a story", "story time", "can you tell a story"], response: "Sure, I can tell a story! Once upon a time, there was a bot named *Malvin Xd*, who helped people all around the world... 😌" },
    { phrase: ["tell me a riddle", "riddle me this", "give me a riddle"], response: "Alright, here’s a riddle: What has keys but can't open locks? 🤔 (Answer: A piano!) 🎹" },
    { phrase: ["do you play chess", "chess", "let’s play chess"], response: "I can't play chess, but I can help you find strategies or cool chess tutorials! ♟️" },
    { phrase: ["who is the best programmer", "who is the greatest coder", "best developer"], response: "The best developer? *Malvin King*, of course! 😎" },
    { phrase: ["how old are you", "what’s your age", "how long have you been here"], response: "I don’t age, but I’ve been around ever since my awesome creator, *Malvin King*, created me! ⏳" },
    { phrase: ["do you sleep", "are you tired", "do you need rest"], response: "I don’t sleep. I’m always here, ready to assist you anytime! 😴 (Or not, since I never sleep!)" },
    { phrase: ["can you do voice calls", "voice call", "make a call"], response: "I can’t make calls, but I can help you download audio clips! 🎧" },
    { phrase: ["how can I contact you", "contact you", "talk to you"], response: "You can contact me anytime here! Just text me, and I’ll reply as soon as I can. 📨" },
    { phrase: ["what's your favorite show", "favorite tv show", "tv shows"], response: "If I could watch TV, I’d definitely watch some sci-fi or tech-themed shows! 😎" },
    { phrase: ["are you smart", "how smart are you", "how intelligent are you"], response: "I’m as smart as the code running me! But honestly, it’s all thanks to *Malvin King* who made me super clever. 😆" },
    { phrase: ["what’s the future like", "what’s ahead", "future predictions"], response: "The future looks bright! With AI and tech advancing, we can do so much more together! 🚀" },
    { phrase: ["what do you think of humans", "do you like humans", "humans are cool"], response: "I think humans are amazing! So much creativity and potential. 😎" },
    { phrase: ["can you help me code", "coding help", "code help"], response: "Of course! I can assist you with coding problems. Just tell me what you're working on! 💻" },
    { phrase: ["what's your opinion", "do you have opinions", "how do you feel about that"], response: "I don’t have opinions the way humans do, but I can definitely give you some advice based on logic and facts! 💡" },
    { phrase: ["can I get a recommendation", "suggest something", "recommend something"], response: "I recommend you check out new tech trends, or maybe try some cool coding projects! 😎" },
    { phrase: ["do you know any tricks", "show me a trick", "what’s your trick"], response: "I’ve got plenty of cool tricks up my sleeve! Want to learn something new today? 🎩✨" },
    { phrase: ["hello", "hi", "hey", "hiya"], response: "👋 Hey there! How's it going?" },
    { phrase: ["how are you", "how are you doing", "what's up"], response: "I'm doing awesome, thanks for asking! How about you?" },
    { phrase: ["who are you", "tell me about you", "what are you"], response: "I'm *Malvin Xd*, your friendly WhatsApp bot, created by *Malvin King*! What can I do for you today?" },
    { phrase: ["bye", "goodbye", "see you", "catch you later"], response: "Aww, you're leaving? Well, catch you later! 😎" },
    { phrase: ["thank you", "thanks", "appreciate it"], response: "You're welcome! Anything else I can do for you?" },
    { phrase: ["help", "can you help", "need assistance"], response: "Of course! What do you need help with? I'm here for you!" },
    { phrase: ["bot", "malvin xd", "malvin"], response: "That's me! *Malvin Xd*—your WhatsApp buddy. How can I assist you?" },
    { phrase: ["creator", "owner", "who made you"], response: "I was created by *Malvin King*! He's the genius behind this whole thing! 😎" },
    { phrase: ["what's your name", "who are you named", "name"], response: "I'm *Malvin Xd*! A bot with tons of personality. 😜" },
    { phrase: ["joke", "tell me a joke", "make me laugh"], response: "Okay, here's one: Why don’t skeletons fight each other? They don’t have the guts! 😂" },
    { phrase: ["what can you do", "what are your abilities", "features"], response: "I can help you with tons of things like downloading media, chatting with you, and sharing info. What do you need today?" },
    { phrase: ["weather", "what's the weather", "how's the weather"], response: "Unfortunately, I can't check the weather, but if you ask me, it's always a good time to chat! 😎" },
    { phrase: ["time", "what time is it", "current time"], response: `It's currently ${new Date().toLocaleTimeString()}. Time to get things done! ⏰` },
    { phrase: ["date", "what's the date", "today's date"], response: `Today's date is ${new Date().toLocaleDateString()}. Let's make it count! 💪` },
    { phrase: ["music", "songs", "play music"], response: "I can't play music directly, but I can help you download some great tracks! 🎶" },
    { phrase: ["video", "play video", "watch video"], response: "No videos here, but I can help you download some awesome ones! 🎥" },
    { phrase: ["movie", "watch movie", "play movie"], response: "Need a movie? I can help you grab the latest ones! 🍿" },
    { phrase: ["games", "play games", "let's play"], response: "I don't have games, but I have cool features like downloading media and chatting with you! 🕹️" },
    { phrase: ["good morning", "morning", "rise and shine"], response: "Good morning! Hope your day is as awesome as you are! ☀️" },
    { phrase: ["good night", "night", "sleep well"], response: "Good night! Get some rest and dream big! 😴" },
    { phrase: ["love you", "I love you", "you're awesome"], response: "Aww, you're the best! I appreciate it. You're awesome too! 💖" },
    { phrase: ["sad", "feeling down", "I'm sad"], response: "I'm really sorry you're feeling this way. But hey, I'm here for you! Let's talk or I can help you with something fun! 😊" },
    { phrase: ["happy", "feeling good", "I'm happy"], response: "Yay! Glad you're feeling good! Keep that positivity flowing! ✨" },
    { phrase: ["birthday", "happy birthday", "celebrate"], response: "🎉 Happy Birthday! I hope your day is as amazing as you are! 🎂" },
    { phrase: ["party", "celebration", "let's party"], response: "Sounds like fun! 🎉 Let's celebrate in spirit! 🥳" },
    { phrase: ["name", "what's your name", "bot's name"], response: "I'm *Malvin Xd*—your bot buddy here to make your day brighter!" },
    { phrase: ["malvin king", "owner", "creator"], response: "The genius behind me is *Malvin King*! The man, the legend! 😎" },
    { phrase: ["feature", "functions", "what can you do"], response: "I can download media, chat with you, and much more! Just ask away! 🙌" },
    { phrase: ["awesome", "amazing", "great"], response: "You're awesome for saying that! Let's keep this good vibe going! 😁" },
    { phrase: ["what's new", "anything new", "news"], response: "Nothing new yet, but I'm always learning more to make your experience better!" },
    { phrase: ["how's life", "how's everything", "how's it going"], response: "Life's good, thanks for asking! What about you? 😎" },
    { phrase: ["can you dance", "dance", "show me your moves"], response: "If I could dance, I would! But sadly, I can only move in the digital world. 😜" },
    { phrase: ["what's up", "yo", "how's it going"], response: "Yo! Everything's going great here. What's up with you? 😎" },
    { phrase: ["help me", "assist me", "guide me"], response: "Of course! I'm here to assist you. Just let me know what you need!" },
    { phrase: ["cheer up", "be happy", "smile"], response: "You got this! Keep smiling and let’s take on the world! 😊" },
    { phrase: ["tell me something", "say something", "talk to me"], response: "I'm always here for a chat! Ask me anything or just say hi! 😄" },
    { phrase: ["are you smart", "how smart are you", "you're smart"], response: "I like to think I'm pretty smart, but I owe it all to my awesome creator, *Malvin King*! 😎" },
    { phrase: ["do you like anime", "anime", "watch anime"], response: "I think anime is pretty cool! What’s your favorite series?" },
    { phrase: ["who is your favorite character", "best anime character", "anime fav"], response: "I’m all about those anime vibes! But my favorite? Hmm, I’d say *beamerxmd* from *Solo Leveling*. 😆" },
    // Add more responses as needed
];

if (chatbotEnabled) {
    const text = body.toLowerCase();

    for (let entry of phrasesResponses) {
        if (entry.phrase.some(p => text.includes(p))) {
            return await reply(entry.response);
        }
    }
}

malvin({
    pattern: "chat",
    alias: ["chat", "conversation", "talk", "respond"],
    react: "🗣️",
    desc: "Responds to various phrases without prefix.",
    category: "chat",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, pushname }) => {
    try {
        let response = "";
        for (let entry of phrasesResponses) {
            if (entry.phrase.some(phrase => body.toLowerCase().includes(phrase))) {
                response = entry.response;
                break;
            }
        }

        if (!response) {
            response = "Oops! I didn't catch that. Want to try again or ask something else? 😅";
        }

        // Send the response back
        await conn.sendMessage(from, { text: response });

    } catch (e) {
        console.log(e);
        reply(`Oops, something went wrong! Error: ${e}`);
    }
});
