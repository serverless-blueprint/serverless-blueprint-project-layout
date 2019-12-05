import {ProjectLayoutType} from './model/ProjectLayoutType';
import {ProjectLayoutDefinitions} from "./model/ProjectLayoutDefinitions";
import {Path} from "./utils/Path";

import * as Mkdirp from "mkdirp";
import {ProjectLayoutMetaData} from "./model/ProjectLayoutMetaData";

export class ProjectLayoutBuilder {

    private projectLayoutDefinitions: ProjectLayoutDefinitions;

    constructor(private readonly projectLayoutMetadata: ProjectLayoutMetaData, private readonly layoutType: ProjectLayoutType) {
        this.projectLayoutDefinitions = new ProjectLayoutDefinitions();
    }

    buildInCurrentDirectory() {
        this.buildIn(".")
    }

    buildIn(aDirectory: string) {
        let projectLayoutDefinition = this.projectLayoutDefinitions.findBy(this.layoutType, this.projectLayoutMetadata);

        projectLayoutDefinition.hierarchyPaths().forEach(path => {
            Mkdirp.sync(`${Path.create(aDirectory, path)}`);
        });
    }
}