const { execFile } = require('child_process');
const fs = require('fs');

const args = [
  '-t', 'ed25519',
  '-C', 'ai-assistant@paraguayreal.com',
  '-f', 'C:\\Users\\maten-portatil\\.ssh\\id_ed25519',
  '-N', ''
];

console.log('Running ssh-keygen with args:', args);

execFile('ssh-keygen', args, (error, stdout, stderr) => {
  if (error) {
    console.error('Error executing ssh-keygen:', error);
    console.error('stderr:', stderr);
    process.exit(1);
  }
  console.log('ssh-keygen stdout:', stdout);
  try {
    const pubKey = fs.readFileSync('C:\\Users\\maten-portatil\\.ssh\\id_ed25519.pub', 'utf8');
    console.log('--- PUBLIC KEY START ---');
    console.log(pubKey.trim());
    console.log('--- PUBLIC KEY END ---');
  } catch (err) {
    console.error('Error reading public key file:', err);
    process.exit(1);
  }
});
