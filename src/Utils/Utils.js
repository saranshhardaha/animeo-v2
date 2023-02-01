export function RemoveHTMLTags(HTMLString) {
  const regex = /(<([^>]+)>)/gi;
  return HTMLString.replace(regex, "");
}