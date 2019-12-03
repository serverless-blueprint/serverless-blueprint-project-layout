import {ProjectLayoutType} from './model/ProjectLayoutType';
import {ProjectLayoutDefinitions} from "./model/ProjectLayoutDefinitions";
import {Path} from "./utils/Path";

import * as Mkdirp from "mkdirp";

export class ProjectLayoutBuilder {

    private projectLayoutDefinitions: ProjectLayoutDefinitions;

    constructor(private layoutType: ProjectLayoutType) {
        this.projectLayoutDefinitions = new ProjectLayoutDefinitions();
    }

    buildIn(aDirectory: string) {
        let projectLayoutDefinition = this.projectLayoutDefinitions.findBy(this.layoutType);

        projectLayoutDefinition.hierarchyPaths().forEach(path => {
            Mkdirp.sync(`${Path.create(aDirectory, path)}`);
        });
    }
}