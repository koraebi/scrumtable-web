import { Moscow } from "../enum/moscow.enum";

export class Issue {
    readonly number: number;
    readonly name: string;
    readonly description: string;
    selected: boolean = false;
    details: boolean = false;
    moscow?: Moscow;

    constructor(number: number, name: string, description: string, selected?: boolean, moscow?: Moscow) {
        this.number = number;
        this.name = name;
        this.description = description;
        if (selected)
            this.selected = selected;
        this.moscow = moscow;
    }
}
