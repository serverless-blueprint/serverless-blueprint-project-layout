import {Path} from "../utils/Path";

import {Type} from "class-transformer";
import "reflect-metadata";

export class ProjectLayoutDefinitionElement {
    public name: string;

    @Type(() => ProjectLayoutDefinitionElement)
    public projectLayoutDefinitionElements: ProjectLayoutDefinitionElement[];

    static create(name: string, projectLayoutDefinitionElements: ProjectLayoutDefinitionElement[] = []): ProjectLayoutDefinitionElement {
        let element = new ProjectLayoutDefinitionElement();
        element.name = name;
        element.projectLayoutDefinitionElements = projectLayoutDefinitionElements;

        return element;
    }

    hierarchyPathStartingAt(path: string, paths: string[] = []): string[] {
        for (let projectLayoutDefinitionElement of this.projectLayoutDefinitionElements) {
            if (projectLayoutDefinitionElement.furtherHierarchyExists())
                return projectLayoutDefinitionElement.hierarchyPathStartingAt(
                    Path.create(path, projectLayoutDefinitionElement.name)
                );
            else
                paths = paths.concat(Path.create(path, projectLayoutDefinitionElement.name));
        }

        return paths.length == 0 ? [path] : paths;
    }

    private furtherHierarchyExists() {
        return this.projectLayoutDefinitionElements && this.projectLayoutDefinitionElements.length > 0;
    }
}