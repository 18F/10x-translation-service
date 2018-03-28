const os = require('os');

const axios = require('axios');
const argv = require('minimist')(process.argv.slice(2));

function main(options) {
  const narratives = axios.create({
    baseURL: 'https://platform-api.usa.gov/api/v1/usagov/narratives.json?terms_filter=language%3AEnglish%3A%3Astatus%3APublished',
  });

  narratives
    .get()
    .then((response) => {
      response.data.results.forEach((narrative) => {
        writeNarrative(narrative, 'title');
        writeNarrative(narrative, 'summary');
        writeNarrative(narrative, 'html', unescapeHtml);
      });
    });
}

function unescapeHtml(str) {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rsquo;/g, '’')
    .replace(/&quot;/g, '\\"')
    .replace(/&#39;/g, "'");
}

function writeHeader() {
  writeln('msgid ""');
  writeln('msgstr ""');
  writeln('"Content-Type: text/plain; charset=UTF-8\n"');
}

function writeNarrative(narrative, field, transform) {
  const f = typeof transform === 'function' ? transform : (x => x);

  writeChunk({
    reference: `https://platform-api.usa.gov:443/api/v1/usagov/narratives/${narrative.id}.json#${field}`,
    content: f(narrative[field]),
  });
}


function writeln(data) {
  process.stdout.write(data + os.EOL);
}

function writeChunk(data) {
  writeln('');
  writeln(`#: ${data.reference}`);
  if (data.content.length <= 80) {
    writeln(`msgid "${data.content}"`);
    return;
  }

  // Wrap long-form content
  writeln('msgid ""');
  let i = 0;
  while (i < data.content.length) {
    writeln(`"${data.content.substr(i, 80)}"`);
    i += 80;
  }
}

main(argv);
