const config = require('../settings');
const { malvin, commands } = require('../malvin');

malvin({
    pattern: "ping",
    alias: ["speed", "pong", "ping2", "ping3"],
    use: '.ping',
    desc: "Check bot's response time.",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const startTime = Date.now();
        const reactionEmojis = ['🔥', '⚡', '🚀', '💨', '🎯', '🎉', '🌟', '💥', '🕐', '🔹'];
        const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '🌀', '🔱', '🛡️', '✨'];

        let reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        await conn.sendMessage(from, {
            react: { text: textEmoji, key: mek.key }
        });

        // Initial message with tiny progress bar
        let progressMessage = await conn.sendMessage(from, { text: `_Pinging... [·    ] 0%_` });

        const progressStages = [
            { text: "_Pinging... [··   ] 25%_", delay: 150 },
            { text: "_Pinging... [···  ] 50%_", delay: 150 },
            { text: "_Pinging... [···· ] 75%_", delay: 150 },
            { text: "_Pinging... [·····] 100%_", delay: 200 }
        ];

        for (const { text, delay } of progressStages) {
            await new Promise(resolve => setTimeout(resolve, delay));
            await conn.sendMessage(from, { text }, { edit: progressMessage.key });
        }

        const ping = Date.now() - startTime;

        // Final response
        await conn.sendMessage(from, {
            text: `> *ᴍᴀʟᴠɪɴ-xᴅ sᴘᴇᴇᴅ: ${ping}𝑚/𝑠 ${reactionEmoji}*`,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363398430045533@newsletter',
                    newsletterName: "Malvin King Tech",
                    serverMessageId: 143
                }
            }
        }, { quoted: progressMessage });

    } catch (e) {
        console.error("❌ Error in ping command:", e);
        reply(`⚠️ An error occurred: ${e.message}`);
    }
});
