// Build-time relocation for the project-site subpath. The normal Arena preview
// continues to serve from /; only this static Pages artifact uses /MOONCREATIVE/.
import { readFileSync, writeFileSync } from 'node:fs';
const path='dist/index.html';
let html=readFileSync(path,'utf8');
for (const prefix of ['images','videos','documents']) html=html.replaceAll(`/${prefix}/`, `/MOONCREATIVE/${prefix}/`);
html=html.replace('</head>', '<meta name="robots" content="noindex,nofollow" /></head>');
writeFileSync(path,html);
writeFileSync('dist/.nojekyll','');
writeFileSync('dist/robots.txt','User-agent: *\nDisallow: /\n');
