export class Issue {
    readonly name: string;
    selected: boolean = false;

    constructor(name: string, selected?: boolean) {
        this.name = name;
        if (selected)
            this.selected = selected;
    }
}