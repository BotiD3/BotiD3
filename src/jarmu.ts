export default class Jarmu {
    private _ora: number;
    private _perc: number;
    private _masodperc: number;
    private _rendszam: string;
    private _idopont: Date;

    public get Rendszam(): string {
        return this._rendszam;
    }

    public get Idopont(): Date {
        return this._idopont;
    }

    constructor(sor: string) {
        const seged: string[] = sor.split(" ");
        this._ora = parseInt(seged[0]);
        this._perc = parseInt(seged[1]);
        this._masodperc = parseInt(seged[2]);
        this._idopont = new Date(0, 0, 0, parseInt(seged[0]), parseInt(seged[1]), parseInt(seged[2]));

        this._rendszam = seged[3];
    }
}
