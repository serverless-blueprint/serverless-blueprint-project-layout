import {ProjectLayoutDefinition} from "./ProjectLayoutDefinition";
import {ProjectLayoutType} from "./ProjectLayoutType";
import {ProjectLayoutTemplates} from "./ProjectLayoutTemplates";

import "reflect-metadata";
import {plainToClass} from "class-transformer";

export class ProjectLayoutDefinitions {

    private projectLayoutTemplates: ProjectLayoutTemplates;

    constructor() {
        this.projectLayoutTemplates = ProjectLayoutTemplates.instance();
    }

    findBy(layoutType: ProjectLayoutType): ProjectLayoutDefinition {
        let template = this.projectLayoutTemplates.findProjectLayoutDefinitionTemplateBy(layoutType);
        return plainToClass(ProjectLayoutDefinition, template);
    }
}