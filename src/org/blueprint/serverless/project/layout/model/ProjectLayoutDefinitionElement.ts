import {DirectoryPath} from "../utils/DirectoryPath";

export class ProjectLayoutDefinitionElement {
    public readonly name: string;
    public readonly projectLayoutDefinitionElements: ProjectLayoutDefinitionElement[];

    constructor(name: string, projectLayoutDefinitionElements: ProjectLayoutDefinitionElement[] = []) {
        this.name = name;
        this.projectLayoutDefinitionElements = projectLayoutDefinitionElements;
    }

    hierarchyPathStartingAt(path: string): string {
        // noinspection LoopStatementThatDoesntLoopJS
        for (let projectLayoutDefinitionElement of this.projectLayoutDefinitionElements) {
            return projectLayoutDefinitionElement.projectLayoutDefinitionElements.length == 0 ?
                DirectoryPath.create(path, projectLayoutDefinitionElement.name) :
                projectLayoutDefinitionElement.hierarchyPathStartingAt(
                    DirectoryPath.create(path, projectLayoutDefinitionElement.name)
                );
        }
        return path;
    }
}