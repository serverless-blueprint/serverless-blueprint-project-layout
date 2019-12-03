import {ProjectLayoutDefinitionElement} from "./ProjectLayoutDefinitionElement";
import {Path} from "../utils/Path";

import {Type} from "class-transformer";
import "reflect-metadata";

export class ProjectLayoutDefinition {

    public projectName: string;

    @Type(() => ProjectLayoutDefinitionElement)
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
                Path.create(this.projectName, projectLayoutDefinitionElement.name)
            );
        });
    }
}