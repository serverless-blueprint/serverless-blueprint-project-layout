import {ProjectLayoutDefinition} from "./ProjectLayoutDefinition";
import {ProjectLayoutType} from "./ProjectLayoutType";
import {ProjectLayoutTemplates} from "./ProjectLayoutTemplates";

import "reflect-metadata";
import {plainToClass} from "class-transformer";
import {ProjectLayoutMetaData} from "./ProjectLayoutMetaData";
import {StringTemplate} from "serverless-blueprint-template-engine/src/org/blueprint/serverless/template/engine/StringTemplate";

export class ProjectLayoutDefinitions {

    private projectLayoutTemplates: ProjectLayoutTemplates;

    constructor() {
        this.projectLayoutTemplates = ProjectLayoutTemplates.instance();
    }

    findBy(layoutType: ProjectLayoutType, projectLayoutMetaData: ProjectLayoutMetaData): ProjectLayoutDefinition {
        let template = this.projectLayoutTemplates.findProjectLayoutDefinitionTemplateBy(layoutType);
        let mergedTemplate = new StringTemplate(template).mergeWith(projectLayoutMetaData);
        return plainToClass(ProjectLayoutDefinition, JSON.parse(mergedTemplate));
    }
}