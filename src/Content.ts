import fs, { createWriteStream } from "fs";
import http from "http";
import url from "url";
import Megoldas from "./megoldas";

interface InputInterface {
    name: string;
    age: number;
    male: boolean;
}

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Közuti Ellenőrzés</title>");
        res.write("</head>");
        res.write("<body><form><pre>");

        // Kezd a kódolást innen -->
        const megoldas = new Megoldas("jarmu.txt");
        res.write(`2.feladat: ${megoldas.MunkaidoOraban()} órát dolgoztak\n`);

        res.write("3.feladat:\n");
        megoldas.EllenorzottAutok().forEach((i) => res.write(i + "\n"));

        res.write("4.feladat:\n");
        res.write(`Személyautó: ${megoldas.Kategoriak()[0]}`);
        res.write(`Autóbusz: ${megoldas.Kategoriak()[1]}`);
        res.write(`Kamion: ${megoldas.Kategoriak()[2]}`);
        res.write(`Motor: ${megoldas.Kategoriak()[3]}`);

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
