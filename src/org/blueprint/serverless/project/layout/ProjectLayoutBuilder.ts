import {ProjectLayoutType} from './model/ProjectLayoutType';
import * as Mkdirp from "mkdirp";
import {ProjectLayoutDefinitions} from "./model/ProjectLayoutDefinitions";

export class ProjectLayoutBuilder {
    constructor(private layoutType: ProjectLayoutType) {
    }

    build(directorName: string) {
        let projectLayoutDefinition = ProjectLayoutDefinitions.findBy(this.layoutType);
        Mkdirp.sync(projectLayoutDefinition.projectName);
    }
}