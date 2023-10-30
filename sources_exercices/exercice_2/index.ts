import "./style.css";
import * as fs from "fs";
import { arrowCount } from "./arrow";

const inputFilePath = __dirname + "/arrows.txt";
const outputFilePath = __dirname + "/arrows_result.csv";

/**
 * prend en entrée un fichier et calcule la valeur de chaque ligne 
 * en utilisant la fonction arrowCount()
 * le résultat en sortie ira dans un fichier .csv
 * 
 * @param inputFilePath 
 * @param outputFilePath 
 */
const processArrowsFile = (
  inputFilePath: string,
  outputFilePath: string
): void => {
  // lecture du fichier .txt
  fs.readFile(inputFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(`erreur lors de la lecture du fichier arrows.txt : ${err}`);
      return;
    }

    // on découpe le fichier en lignes
    const lines = data.split("\n");

    // on calcule le score pour chaque ligne
    const results: { line: string; score: number }[] = [];
    lines.forEach((line) => {
      const trimmedLine = line.trim();
      const score = arrowCount(trimmedLine);
      results.push({ line: trimmedLine, score });
    });

    // on recrée les lignes pour le fichier .csv
    const csvData = results
      .map(({ line, score }) => `"${line}",${score}`)
      .join("\n");

    // écriture du fichier .csv
    fs.writeFile(outputFilePath, csvData, (err) => {
      if (err) {
        console.error(
          `erreur lors de l'écriture du fichier ${outputFilePath} :
          ${err}`
        );
      } else {
        console.log("fichier crée.");
      }
    });
  });
};

processArrowsFile(inputFilePath, outputFilePath);
