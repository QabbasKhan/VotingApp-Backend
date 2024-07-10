const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const secretKey = crypto.createHash('sha256').update('anasqabbass1234567890123456').digest('base64').substr(0, 32);
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = (hash) => {
    try{const parts = hash.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decrypted.toString();
    }catch (error) {
    console.error('Decryption error:', error);
    return null; // Handle decryption errors gracefully
}
};

module.exports = { encrypt, decrypt };