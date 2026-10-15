# Location-copy refinement

Mode: Experience. Preserve Wave's established composition while removing geographic mentions outside the Experience section.

The user requested removing Banjarmasin and Indonesia everywhere except Experience, followed by a layout adjustment. Scope means rendered interface and page metadata across Wave, including text interpolated from the original resume. The existing `#experience` section includes its education grid; retain those factual institution names. Do not mutate the sibling original portfolio's resume or supplied CV.

Remove the header location and center the single availability message across viewport sizes. Remove the About location badge and its icon/styles; its heading has no trailing badge gap. Remove the geographic Contact line and retain its open-to-opportunities sentence without an empty line. Shorten the shared footer caption to "Made with curiosity." Remove the geographic phrase from default description/Open Graph metadata. Preserve colors, type, shared navigation, existing contact links, and all previous features.

Verify every generated page for matching text/metadata outside `#experience`, confirm the Experience/education content remains exact, inspect the header/About/Contact/footer on desktop/tablet/mobile, and ensure the navigation and contact actions still work. Do not add tests that merely mirror these copy edits; use the existing regression suite plus a rendered-page audit.
