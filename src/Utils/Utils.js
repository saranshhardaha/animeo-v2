export function RemoveHTMLTags(HTMLString) {
  const regex = /(<([^>]+)>)/gi;
  return HTMLString?.replace(regex, "");
}

export function HyperFlexed() {
  const text = document.querySelector(".hyperflexed").onmousehover
}