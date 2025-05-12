const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cryptoConfig = require('../config/crypto.json');

// Fonction de déchiffrement
function decrypt(encryptedHex) {
  const key = Buffer.from(cryptoConfig.key, 'hex');
  const iv = Buffer.from(cryptoConfig.iv, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Lire les messages
const messagesPath = path.join(__dirname, '../logs/messages.json');
const messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));

console.log('\n🔓 MESSAGES DÉCHIFFRÉS :\n');
messages.forEach((entry, i) => {
  try {
    const plain = decrypt(entry.encrypted);
    console.log(`Message ${i + 1}:\n`, JSON.parse(plain), '\n');
  } catch (err) {
    console.error(`Erreur de déchiffrement du message ${i + 1}:`, err.message);
  }
});
