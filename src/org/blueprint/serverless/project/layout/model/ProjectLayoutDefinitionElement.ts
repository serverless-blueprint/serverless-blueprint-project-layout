import {DirectoryPath} from "../utils/DirectoryPath";

import {Type} from "class-transformer";
import "reflect-metadata";

export class ProjectLayoutDefinitionElement {
    public name: string;

    @Type(() => ProjectLayoutDefinitionElement)
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
            return !projectLayoutDefinitionElement.furtherHierarchyExists() ?
                DirectoryPath.create(path, projectLayoutDefinitionElement.name) :
                projectLayoutDefinitionElement.hierarchyPathStartingAt(
                    DirectoryPath.create(path, projectLayoutDefinitionElement.name)
                );
        }
        return path;
    }

    private furtherHierarchyExists() {
        return this.projectLayoutDefinitionElements && this.projectLayoutDefinitionElements.length > 0;
    }
}