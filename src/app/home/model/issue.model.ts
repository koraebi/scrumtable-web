import { Moscow } from "../enum/moscow.enum";

export class Issue {
    readonly name: string;
    selected: boolean = false;
    moscow?: Moscow;

    constructor(name: string, selected?: boolean, moscow?: Moscow) {
        this.name = name;
        if (selected)
            this.selected = selected;
        this.moscow = moscow;
    }
}
