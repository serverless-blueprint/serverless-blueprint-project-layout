import {ProjectLayoutDefinitionElement} from "./ProjectLayoutDefinitionElement";

export class ProjectLayoutDefinition {
    public readonly projectName: string;
    public readonly projectLayoutDefinitionElements: ProjectLayoutDefinitionElement[];

    constructor(projectName: string, projectLayoutDefinitionElements: ProjectLayoutDefinitionElement[]) {
        this.projectName = projectName;
        this.projectLayoutDefinitionElements = projectLayoutDefinitionElements;
    }
}