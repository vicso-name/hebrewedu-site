// Preserve original bytes elsewhere; reject JSON object keys that JSON.parse would silently discard.
export function parseJSONBytes(bytes) {
  const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  const value = JSON.parse(text);
  const tokens = text.match(/"(?:\\[\s\S]|[^"\\])*"|[{}\[\]:,]|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|true|false|null/g) ?? [];
  const stack = [];
  for (const token of tokens) {
    const parent = stack.at(-1);
    if (token === '{' || token === '[') {
      if (parent?.kind === 'object' && parent.state === 'value') parent.state = 'done';
      stack.push({ kind: token === '{' ? 'object' : 'array', state: 'key', keys: new Set() });
    } else if (token === '}' || token === ']') stack.pop();
    else if (token === ':' && parent?.kind === 'object') parent.state = 'value';
    else if (token === ',' && parent?.kind === 'object') parent.state = 'key';
    else if (parent?.kind === 'object') {
      if (parent.state === 'key') {
        const key = JSON.parse(token);
        if (parent.keys.has(key)) throw new Error(`Duplicate JSON object key: ${key}`);
        parent.keys.add(key); parent.state = 'colon';
      } else if (parent.state === 'value') parent.state = 'done';
    }
  }
  return value;
}
