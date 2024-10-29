interface Asset {
  url: string;
  filePath: string;
  name: string;
}

const iaWriterMonoFonts: Asset[] = ["Bold", "BoldItalic", "Italic", "Regular"].map(variant => ({
  url: `https://github.com/iaolo/iA-Fonts/raw/master/iA%20Writer%20Mono/Webfonts/iAWriterMonoS-${variant}.woff2`,
  filePath: `.fonts/ia-writer-mono/${variant.toLowerCase()}.woff2`,
  name: `iA Writer Mono ${variant} font`,
}));

const assets: Asset[] = [
  {
    url: "https://l.joulev.dev/theme",
    filePath: ".theme/theme.json",
    name: "theme file",
  },
  {
    url: "https://github.com/jglim/IdentityFont/raw/main/font/LTAIdentity-Medium.woff2",
    filePath: ".fonts/lta-identity/font.woff2",
    name: "LTA Identity font",
  },
  ...iaWriterMonoFonts,
];

Promise.all(
  assets.map(async asset => {
    const response = await fetch(asset.url);
    await Bun.write(asset.filePath, response);
    console.log(`Done downloading and installing ${asset.name}.`);
  }),
);
