import {ProjectLayoutType} from './model/ProjectLayoutType';
import * as Mkdirp from "mkdirp";
import {ProjectLayoutDefinitions} from "./model/ProjectLayoutDefinitions";
import {DirectoryPath} from "./utils/DirectoryPath";

export class ProjectLayoutBuilder {
    constructor(private layoutType: ProjectLayoutType) {
    }

    buildIn(aDirectory: string) {
        let projectLayoutDefinition = ProjectLayoutDefinitions.findBy(this.layoutType);

        projectLayoutDefinition.hierarchyPaths().forEach(path => {
            Mkdirp.sync(`${DirectoryPath.create(aDirectory, path)}`);
        });
    }
}