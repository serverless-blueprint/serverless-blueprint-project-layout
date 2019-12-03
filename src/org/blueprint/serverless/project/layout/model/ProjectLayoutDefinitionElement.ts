import {Path} from "../utils/Path";

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
                Path.create(path, projectLayoutDefinitionElement.name) :
                projectLayoutDefinitionElement.hierarchyPathStartingAt(
                    Path.create(path, projectLayoutDefinitionElement.name)
                );
        }
        return path;
    }

    private furtherHierarchyExists() {
        return this.projectLayoutDefinitionElements && this.projectLayoutDefinitionElements.length > 0;
    }
}