/*
  PROJECT IMAGE MANIFEST
  ----------------------
  Each project has a folder: assets/projects/<slug>/
  - "images": explicit list (file name + caption). A matching thumbnail in
    <slug>/thumb/<file> is used for the card if "thumbs: true".
  - "auto": true  -> the site probes <slug>/1.webp, 2.webp, 3.webp ... (up to 12)
    and shows every file it finds, in order. Just drop images in the folder.
    Optional captions for auto images go in "autoCaptions" (index 0 = 1.webp).
  To add a caption to a dropped image, add it to autoCaptions below.
*/
window.PROJECT_IMAGES = {
  "wally-wombats-website": {
    thumbs: true,
    images: [
      { src: "1.webp", caption: "Home page (live site, wallywombats.com)" },
      { src: "2.webp", caption: "Cookie consent banner with Google Consent Mode v2" },
      { src: "3.webp", caption: "Las Vegas booking / admission page" },
      { src: "4.webp", caption: "Character page: Meet Wally" },
      { src: "5.webp", caption: "Custom 404 page that returns a real 404 status" },
      { src: "6.webp", caption: "Mobile home page" }
    ]
  },
  "waddle-whirl-and-wonder": {
    thumbs: true,
    images: [
      { src: "1.webp", caption: "Waddle, Whirl, and Wonder (Google Play screenshot)" },
      { src: "2.webp", caption: "Waddle, Whirl, and Wonder (Google Play screenshot)" },
      { src: "3.webp", caption: "Waddle, Whirl, and Wonder (Google Play screenshot)" },
      { src: "4.webp", caption: "Waddle, Whirl, and Wonder (Google Play screenshot)" },
      { src: "5.webp", caption: "Waddle, Whirl, and Wonder (Google Play screenshot)" },
      { src: "6.webp", caption: "Waddle, Whirl, and Wonder (Google Play screenshot)" },
      { src: "7.webp", caption: "Waddle, Whirl, and Wonder (Google Play screenshot)" }
    ]
  },
  "rehab-directives": {
    thumbs: true,
    images: [
      { src: "1.webp", caption: "Home page (live site, rehabdirectives.com)" },
      { src: "2.webp", caption: "Info for new patients" },
      { src: "3.webp", caption: "Contact & map page" },
      { src: "4.webp", caption: "Mobile home page" }
    ]
  },
  "ar-campus-navigation": {
    images: [
      { video: "aura-demo-2.mp4", poster: "aura-demo-2.webp", caption: "AURA demo: navigating to the Library with an AR path line, turn prompts and a mini-map" },
      { video: "aura-demo-1.mp4", poster: "aura-demo-1.webp", caption: "AURA demo: the same indoor route with AR floor arrows, distance prompts and a mini-map" },
      { src: "1.webp", caption: "AR path line and arrows guiding toward the stairs, with a live distance prompt" },
      { src: "2.webp", caption: "\"Turn left\" prompt as the AR path bends around a corner" },
      { src: "3.webp", caption: "\"Arriving\" prompt with a destination marker" },
      { src: "4.webp", caption: "Distance prompt and floor arrow on the stairs, with the mini-map below" }
    ]
  },
  "project-p":            { auto: true, autoCaptions: ["Project-P title screen"] },
};
