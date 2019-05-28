const regexUuidPattern = /([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})+[^(?:\s*|\s*,)|\r\n]?/g

exports.parseRegexList = list => {
  const result = list.match(regexUuidPattern);
  return Array.isArray(result) ? result : [];
};
