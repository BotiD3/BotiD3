import fs from "fs";
import Jarmu from "./jarmu";

export default class Megoldas {
    private _jarmuvek: Jarmu[] = [];

    public MunkaidoOraban(): number {
        const kezdes: number = this._jarmuvek[0].Idopont.getHours();
        let vege: number = this._jarmuvek[0].Idopont.getHours();

        for (const i of this._jarmuvek) {
            if (i.Idopont.getHours() > vege) {
                vege = i.Idopont.getHours();
            }
        }
        return vege - kezdes + 1;
    }

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
