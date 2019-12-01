export class ProjectLayoutDefinitionElement {
    public readonly name: string;
    public readonly projectLayoutDefinitionElements: ProjectLayoutDefinitionElement[];

    constructor(name: string, projectLayoutDefinitionElements: ProjectLayoutDefinitionElement[] = []) {
        this.name = name;
        this.projectLayoutDefinitionElements = projectLayoutDefinitionElements;
    }
}