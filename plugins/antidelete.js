/*
const { lee } = require('../lee');
const { downloadMediaMessage } = require('../lib/msg');
const fs = require("fs");

// 🔹 Chargement du fichier JSON pour stocker l'état de l'anti-delete
const settingsFile = "./data/antidelete.json";
let antiDeleteSettings = fs.existsSync(settingsFile) ? JSON.parse(fs.readFileSync(settingsFile)) : { enabled: false };

lee({
  pattern: "antidelete",
  desc: "Activate or deactivate anti-delete feature: Deleted messages will be sent to the owner's private chat.",
  category: "misc",
  filename: __filename,
}, async (conn, mek, m, { isOwner, reply, args }) => {
  if (!isOwner) return reply("❌ You are not the owner!");

  // Activation ou désactivation de l'Anti-Delete
  if (args[0] === "on") {
    antiDeleteSettings.enabled = true;
    fs.writeFileSync(settingsFile, JSON.stringify(antiDeleteSettings));
    return reply("✅ Anti-Delete activated! Deleted messages will be sent to the Owner's private chat.");
  }

  if (args[0] === "off") {
    antiDeleteSettings.enabled = false;
    fs.writeFileSync(settingsFile, JSON.stringify(antiDeleteSettings));
    return reply("🚫 Anti-Delete deactivated! Deleted messages will no longer be intercepted.");
  }

  reply(`ℹ️ *Anti-Delete Status:* ${antiDeleteSettings.enabled ? "✅ Enabled" : "❌ Disabled"}`);
});

// 🔹 Surveillance des suppressions de messages
conn.on('message-delete', async (deletedMessage) => {
  if (!antiDeleteSettings.enabled) return; // Ignore si désactivé

  try {
    const { key, message } = deletedMessage;
    if (!message) return; // Ignore si aucun message supprimé

    const sender = key.participant || key.remoteJid;
    const chatId = key.remoteJid;
    const ownerJid = "owner@s.whatsapp.net"; // 🔹 Remplace par le JID réel de l'Owner

    let mime = message.mimetype || "";
    let mediaType = "text";
    let mediaBuffer;

    if (mime.startsWith("image")) {
      mediaType = "image";
      mediaBuffer = await downloadMediaMessage(message);
    } else if (mime.startsWith("video")) {
      mediaType = "video";
      mediaBuffer = await downloadMediaMessage(message);
    } else if (mime.startsWith("audio")) {
      mediaType = "audio";
      mediaBuffer = await downloadMediaMessage(message);
    }

    const senderName = sender.split('@')[0];
    const now = new Date();
    const time = now.toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const date = now.toLocaleDateString("fr-FR");

    const infoMessage = `🛑 *Deleted Message Detected!*\n📩 *Sender:* ${senderName}\n🕒 *Deleted at:* ${time}, ${date}\n📥 *Group/Chat:* ${chatId}`;

    let messageOptions = {};
    
    if (mediaType === "text") {
      messageOptions = { text: `${infoMessage}\n\n💬 *Deleted Message:* ${message.text}` };
    } else if (mediaBuffer) {
      if (mediaType === "image") {
        messageOptions = { image: mediaBuffer, caption: infoMessage };
      } else if (mediaType === "video") {
        messageOptions = { video: mediaBuffer, caption: infoMessage, mimetype: 'video/mp4' };
      } else if (mediaType === "audio") {
        messageOptions = { audio: mediaBuffer, caption: infoMessage, mimetype: 'audio/mpeg' };
      }
    }

    // 🔹 Envoi en privé à l'Owner
    await conn.sendMessage(ownerJid, messageOptions);
  } catch (error) {
    console.error("Error in Anti-Delete command:", error);
  }
});*/
