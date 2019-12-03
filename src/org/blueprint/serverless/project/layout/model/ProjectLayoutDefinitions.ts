import {ProjectLayoutDefinition} from "./ProjectLayoutDefinition";
import {ProjectLayoutType} from "./ProjectLayoutType";
import {ProjectLayoutTemplateFinder} from "./ProjectLayoutTemplateFinder";

import "reflect-metadata";
import {plainToClass} from "class-transformer";

export class ProjectLayoutDefinitions {

    private projectLayoutTemplateFinder: ProjectLayoutTemplateFinder;

    constructor() {
        this.projectLayoutTemplateFinder = ProjectLayoutTemplateFinder.instance();
    }

    findBy(layoutType: ProjectLayoutType): ProjectLayoutDefinition {
        let template = this.projectLayoutTemplateFinder.findProjectLayoutDefinitionTemplateBy(layoutType);
        return plainToClass(ProjectLayoutDefinition, template);
    }
}