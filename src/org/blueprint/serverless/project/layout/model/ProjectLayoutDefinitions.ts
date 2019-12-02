import {ProjectLayoutDefinition} from "./ProjectLayoutDefinition";
import {ProjectLayoutType} from "./ProjectLayoutType";
import {ProjectLayoutTemplateLocation} from "./ProjectLayoutTemplateLocation";

import * as path from "path";
import * as fs from "fs";
import "reflect-metadata";
import {plainToClass} from "class-transformer";

export class ProjectLayoutDefinitions {

    private static layoutDefinitionByTemplateType = {
        [ProjectLayoutType.Nested]: () => ProjectLayoutDefinitions.loadProjectLayoutDefinition()
    };

    static findBy(type): ProjectLayoutDefinition {
        return ProjectLayoutDefinitions.layoutDefinitionByTemplateType[type]()
    }

    private static loadProjectLayoutDefinition(): ProjectLayoutDefinition {
        let projectDefinitionAsString = this.loadProjectLayoutDefinitionTemplate();
        return plainToClass(ProjectLayoutDefinition, projectDefinitionAsString);
    }

    private static loadProjectLayoutDefinitionTemplate() {
        let filePath: string = path.join(__dirname, ProjectLayoutTemplateLocation.get());
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
}