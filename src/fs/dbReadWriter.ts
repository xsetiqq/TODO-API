import { writeFile, access, readFile } from "fs/promises";
import { constants } from "fs";
import path from "path";

const filePath = path.join(__dirname, "..", "db", "db.json");

export async function writeDB(arr: Array<any>) {
  try {
    await access(filePath, constants.F_OK);
    await writeFile(filePath, JSON.stringify(arr), "utf-8");
  } catch (err: unknown) {
    console.log("error");
  }
}

export async function readDB() {
  try {
    const text = await readFile(filePath, "utf-8");
    const parsed = JSON.parse(text);
    return parsed;
  } catch (err: unknown) {
    console.log("error");
  }
}
