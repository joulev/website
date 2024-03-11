// @ts-check
import fs from "node:fs/promises";
import { XMLParser } from "fast-xml-parser";

async function main() {
  const inputFile = process.argv[2];
  const outputFile = ".ignored/out.json";

  if (!inputFile) {
    console.error("Usage: node parse-tcx-file.mjs <input-file>");
    process.exit(1);
  }

  const data = await fs.readFile(inputFile, "utf8");
  const parser = new XMLParser();
  const result = parser.parse(data);
  const coordinates = result.TrainingCenterDatabase.Activities.Activity.Lap.Track.Trackpoint.filter(
    point => point.Position,
  )
    .filter((_, index) => index % 10 === 0)
    .map(trackpoint => ({
      lat: Number.parseFloat(trackpoint.Position.LatitudeDegrees),
      lng: Number.parseFloat(trackpoint.Position.LongitudeDegrees),
    }));
  await fs.writeFile(outputFile, JSON.stringify(coordinates), "utf8");

  await fs.unlink(inputFile);
}

main();
