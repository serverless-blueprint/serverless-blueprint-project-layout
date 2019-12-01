import {ProjectLayoutDefinitionElement} from "./ProjectLayoutDefinitionElement";
import {DirectoryPath} from "../utils/DirectoryPath";

export class ProjectLayoutDefinition {

    public readonly projectName: string;
    public readonly projectLayoutDefinitionElements: ProjectLayoutDefinitionElement[];

    constructor(projectName: string, projectLayoutDefinitionElements: ProjectLayoutDefinitionElement[]) {
        this.projectName = projectName;
        this.projectLayoutDefinitionElements = projectLayoutDefinitionElements;
    }

    hierarchyPaths(): string[] {
        if (this.projectLayoutDefinitionElements.length == 0)
            return [this.projectName];

        return this.projectLayoutDefinitionElements.map(projectLayoutDefinitionElement => {
            return projectLayoutDefinitionElement.hierarchyPathStartingAt(
                DirectoryPath.create(this.projectName, projectLayoutDefinitionElement.name)
            );
        });
    }
}