import {ProjectLayoutDefinitionElement} from "./ProjectLayoutDefinitionElement";
import {DirectoryPath} from "../utils/DirectoryPath";

export class ProjectLayoutDefinition {

    public projectName: string;
    public projectLayoutDefinitionElements: ProjectLayoutDefinitionElement[];

    static create(projectName: string, projectLayoutDefinitionElements: ProjectLayoutDefinitionElement[]): ProjectLayoutDefinition {
        let definition = new ProjectLayoutDefinition();
        definition.projectName = projectName;
        definition.projectLayoutDefinitionElements = projectLayoutDefinitionElements;

        return definition;
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