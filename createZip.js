const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const output = fs.createWriteStream('sv-worldz-website.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// Add files and directories
archive.directory('src/', 'src');
archive.directory('public/', 'public');
archive.file('package.json', { name: 'package.json' });
archive.file('vite.config.ts', { name: 'vite.config.ts' });
archive.file('tsconfig.json', { name: 'tsconfig.json' });
archive.file('tsconfig.node.json', { name: 'tsconfig.node.json' });
archive.file('index.html', { name: 'index.html' });

archive.finalize();