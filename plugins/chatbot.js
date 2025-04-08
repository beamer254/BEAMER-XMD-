const fs = require("fs");
const path = require("path");
const { malvin } = require('../lee');
const settingsPath = path.join(__dirname, "../settings.js");

malvin({
  pattern: "chatbot",
  alias: ["chatbot", "togglechat"],
  desc: "Enable or disable the chatbot",
  category: "owner",
  filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {
  if (!isOwner) return reply("Only bot deployer or *Sang Lee* can do this.");

  const option = args[0]?.toLowerCase();
  if (!["on", "off"].includes(option)) {
    return reply("Use *chatbot on* or *chatbot off*");
  }

  try {
    const newValue = option === "on";
    const newSettings = `module.exports = {\n  chatbotEnabled: ${newValue}\n};\n`;

    fs.writeFileSync(settingsPath, newSettings);
    reply(`Chatbot has been turned *${option.toUpperCase()}* successfully!`);
  } catch (e) {
    console.error(e);
    reply("Error updating chatbot status.");
  }
});
