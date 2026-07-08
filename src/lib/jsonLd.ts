/**
 * Serialize a JSON-LD schema object for injection via `dangerouslySetInnerHTML`.
 *
 * Escapes `<` to its unicode form so a value that contains `</script>` (or any
 * other markup) cannot break out of the surrounding
 * `<script type="application/ld+json">` block. `JSON.stringify` alone does not
 * escape `<`, so any string field driven from content (e.g. a post title) is a
 * script-injection vector without this.
 */
export function jsonLd(schema: unknown): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
