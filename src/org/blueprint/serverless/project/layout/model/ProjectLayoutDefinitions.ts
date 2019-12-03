import {ProjectLayoutDefinition} from "./ProjectLayoutDefinition";
import {ProjectLayoutType} from "./ProjectLayoutType";
import {ProjectLayoutTemplateLocation} from "./ProjectLayoutTemplateLocation";

import "reflect-metadata";
import {plainToClass} from "class-transformer";

export class ProjectLayoutDefinitions {

    static findBy(layoutType: ProjectLayoutType): ProjectLayoutDefinition {
        let template = ProjectLayoutTemplateLocation.loadProjectLayoutDefinitionTemplateBy(layoutType);
        return plainToClass(ProjectLayoutDefinition, template);
    }
}