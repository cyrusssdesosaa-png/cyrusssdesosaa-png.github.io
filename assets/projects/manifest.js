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
  "wally-wombats-games": {
    thumbs: true,
    images: [
      { src: "1.webp", caption: "Waddle, Whirl, and Wonder: a Wally Wombats game I helped maintain" },
      { src: "2.webp", caption: "Waddle, Whirl, and Wonder: a Wally Wombats game I helped maintain" },
      { src: "3.webp", caption: "Waddle, Whirl, and Wonder: a Wally Wombats game I helped maintain" },
      { src: "4.webp", caption: "Waddle, Whirl, and Wonder: a Wally Wombats game I helped maintain" },
      { src: "5.webp", caption: "Waddle, Whirl, and Wonder: a Wally Wombats game I helped maintain" },
      { src: "6.webp", caption: "Waddle, Whirl, and Wonder: a Wally Wombats game I helped maintain" },
      { src: "7.webp", caption: "Waddle, Whirl, and Wonder: a Wally Wombats game I helped maintain" },
      { src: "8.webp", caption: "Wally Wombats' Mix & Match: a Wally Wombats game I helped maintain" },
      { src: "9.webp", caption: "Wally Wombats' Mix & Match: a Wally Wombats game I helped maintain" },
      { src: "10.webp", caption: "Wally Wombats' Mix & Match: a Wally Wombats game I helped maintain" },
      { src: "11.webp", caption: "Wally Wombats' Mix & Match: a Wally Wombats game I helped maintain" },
      { src: "12.webp", caption: "Wally Wombats' Puzzle Mania: a Wally Wombats game I helped maintain" },
      { src: "13.webp", caption: "Wally Wombats' Puzzle Mania: a Wally Wombats game I helped maintain" },
      { src: "14.webp", caption: "Wally Wombats' Puzzle Mania: a Wally Wombats game I helped maintain" },
      { src: "15.webp", caption: "Wally Wombats' Puzzle Mania: a Wally Wombats game I helped maintain" }
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
  "ar-campus-navigation": { auto: true, autoCaptions: [] },
  "unity-mini-games":     { auto: true, autoCaptions: [] },
  "project-p":            { auto: true, autoCaptions: [] },
  "story-game":           { auto: true, autoCaptions: [] }
};
