import {ProjectLayoutType} from './model/ProjectLayoutType';
import * as Mkdirp from "mkdirp";
import {ProjectLayoutDefinitions} from "./model/ProjectLayoutDefinitions";

export class ProjectLayoutBuilder {
    constructor(private layoutType: ProjectLayoutType) {
    }

    buildIn(aDirectory: string) {
        let projectLayoutDefinition = ProjectLayoutDefinitions.findBy(this.layoutType);
        let directoryPath;
        if (projectLayoutDefinition.projectLayoutDefinitionElements.length > 0)
            directoryPath = `${projectLayoutDefinition.projectName}/${projectLayoutDefinition.projectLayoutDefinitionElements[0].name}`;
        else
            directoryPath = `${projectLayoutDefinition.projectName}`;

        Mkdirp.sync(directoryPath);
    }
}