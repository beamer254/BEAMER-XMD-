const fetch = require("node-fetch");

malvin({
  pattern: "wadp",
  desc: "Download WhatsApp profile picture",
  react: "⏳",
  category: "owner",
  filename: __filename,
  async function ({ text, send }) {
    // Check if the user has provided a number
    if (!text) {
      return send("⚠️ *Error*: Please provide a WhatsApp number in international format (e.g., +1234567890).");
    }

    // Validate the phone number format (international format)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(text)) {
      return send("⚠️ *Error*: The number format is incorrect. Please use international format, e.g., +1234567890.");
    }

    try {
      const imageUrl = await fetchWhatsAppDP(text);

      // If profile picture URL is found, send the image
      if (imageUrl) {
        await send({
          image: { url: imageUrl },
          caption: "*Here is the WhatsApp profile picture!*",
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            externalAdReply: {
              title: 'WhatsApp Profile Picture',
              body: `Profile picture of ${text}`,
              mediaType: 1,
              sourceUrl: `https://wa.me/${text}`,
              thumbnailUrl: imageUrl,
            },
          },
        });
      } else {
        send("❌ *Failed*: Could not fetch the profile picture. The number might be incorrect, or the profile is private.");
      }
    } catch (error) {
      console.error("Error fetching WhatsApp DP:", error);
      send("⚠️ *Error*: Something went wrong while fetching the profile picture. Please try again later.");
    }
  }
});

async function fetchWhatsAppDP(number) {
  try {
    const apiUrl = `https://toolzin.com/tools/whatsapp-dp-downloader/api?number=${encodeURIComponent(number)}`;
    const response = await fetch(apiUrl);

    // Check if the HTTP response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // If successful response with image URL
    if (data.status === "success" && data.imageUrl) {
      return data.imageUrl;
    }

    return null;
  } catch (error) {
    console.error("Error fetching WhatsApp DP:", error);
    return null;
  }
}
