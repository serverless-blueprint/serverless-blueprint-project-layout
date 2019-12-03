import {ProjectLayoutDefinition} from "./ProjectLayoutDefinition";
import {ProjectLayoutType} from "./ProjectLayoutType";
import {ProjectLayoutTemplateFinder} from "./ProjectLayoutTemplateFinder";

import "reflect-metadata";
import {plainToClass} from "class-transformer";

export class ProjectLayoutDefinitions {

    static findBy(layoutType: ProjectLayoutType): ProjectLayoutDefinition {
        let template = ProjectLayoutTemplateFinder.findProjectLayoutDefinitionTemplateBy(layoutType);
        return plainToClass(ProjectLayoutDefinition, template);
    }
}