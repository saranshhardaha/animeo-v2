export function RemoveHTMLTags(value: string | null | undefined) {
  if (value !== undefined && value) {
    const regex = /(<([^>]+)>)/gi;
    return value?.replace(regex, "");
  } else return value;
}
