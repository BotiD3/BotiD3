import fs from "fs";
import Jarmu from "./jarmu";

export default class Megoldas {
    private _jarmuvek: Jarmu[] = [];

    constructor(file: string) {
        fs.readFileSync(file)
            .toString()
            .split("\n")
            .forEach((i) => {
                const aktSor = i.trim();
                if (aktSor.length > 0) this._jarmuvek.push(new Jarmu(aktSor));
            });
    }
}
