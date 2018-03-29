const os = require('os');

const axios = require('axios');
const wrap = require('word-wrap');
const argv = require('minimist')(process.argv.slice(2));

const MAX_LINE_LENGTH = 80;

function main(options) {
  const narratives = axios.create({
    baseURL: 'https://platform-api.usa.gov/api/v1/usagov/narratives.json?terms_filter=language%3AEnglish%3A%3Astatus%3APublished',
  });

  writeHeader();
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
}

function writeNarrative(narrative, field, transform) {
  const f = typeof transform === 'function' ? transform : (x => x);

  writeChunk({
    reference: `https://platform-api.usa.gov:443/api/v1/usagov/narratives/${narrative.id}.json#${field}`,
    content: f(narrative[field]),
  });
  writeln(`msgstr ""`);
}


function writeln(data) {
  process.stdout.write(data + os.EOL);
}

function writeChunk(data) {
  writeln('');
  writeln(`#: ${data.reference}`);
  if (data.content.length <= MAX_LINE_LENGTH) {
    writeln(`msgid "${data.content}"`);
    return;
  }

  // Wrap long-form content
  writeln('msgid ""');
  for (let token of tokenizer(data.content)) {
    writeln(`"${token}"`);
  }
}

function* tokenizer(content) {
  let token;
  let rest = wrap(content, {indent: '', width: MAX_LINE_LENGTH}); // Insert line breaks
  while (rest) {
    [token] = rest.split(/\n/, 1); // Split the first/next line
    rest = rest.substr(token.length + 1); // Save the rest
    yield token; // yield the next line
  }
}

main(argv);
