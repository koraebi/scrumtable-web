import { Moscow } from "../enum/moscow.enum";

export class Issue {
    readonly number: number;
    readonly name: string;
    selected: boolean = false;
    moscow?: Moscow;

    constructor(number: number, name: string, selected?: boolean, moscow?: Moscow) {
        this.number = number;
        this.name = name;
        if (selected)
            this.selected = selected;
        this.moscow = moscow;
    }
}
