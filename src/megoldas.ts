import fs from "fs";
import Jarmu from "./jarmu";
import { strict } from "assert";

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

    public EllenorzottAutok(): Array<string> {
        let ora = 0;
        const vizsgaltAutok: string[] = [];
        for (const i of this._jarmuvek) {
            if (i.Idopont.getHours() != ora) {
                ora = i.Idopont.getHours();
                vizsgaltAutok.push(ora + "óra :" + i.Rendszam);
            }
        }
        return vizsgaltAutok;
    }

    public Kategoriak(): Array<number> {
        const rendszamKategoriak: number[] = [0, 0, 0, 0]; //0- személy, 1- B, 2- K, 3- M
        for (const i of this._jarmuvek) {
            if (i.Rendszam[0] == "B") {
                rendszamKategoriak[1]++;
            } else if (i.Rendszam[0] == "K") {
                rendszamKategoriak[2]++;
            } else if (i.Rendszam[0] == "M") {
                rendszamKategoriak[3]++;
            } else {
                rendszamKategoriak[0]++;
            }
        }
        return rendszamKategoriak;
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
