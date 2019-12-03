import {ProjectLayoutType} from "./ProjectLayoutType";
import {ProjectLayoutTemplates} from "./ProjectLayoutTemplates";

import * as path from "path";
import * as fs from "fs";

//rename to loader?
//add tests for this class
export class ProjectLayoutTemplateFinder {

    private projectLayoutTemplates: ProjectLayoutTemplates;

    constructor() {
        this.projectLayoutTemplates = ProjectLayoutTemplates.instance();
    }

    public findProjectLayoutDefinitionTemplateBy(layoutType: ProjectLayoutType) {
        let filePath: string = path.join(__dirname, this.projectLayoutTemplates.findProjectLayoutDefinitionTemplatePathBy[layoutType]);
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
}