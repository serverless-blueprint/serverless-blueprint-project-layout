import {DirectoryPath} from "../utils/DirectoryPath";

export class ProjectLayoutDefinitionElement {
    public name: string;
    public projectLayoutDefinitionElements: ProjectLayoutDefinitionElement[];

    static create(name: string, projectLayoutDefinitionElements: ProjectLayoutDefinitionElement[] = []) : ProjectLayoutDefinitionElement {
        let element = new ProjectLayoutDefinitionElement();
        element.name = name;
        element.projectLayoutDefinitionElements = projectLayoutDefinitionElements;

        return element;
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