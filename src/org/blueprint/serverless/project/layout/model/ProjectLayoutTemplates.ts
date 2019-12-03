import {ProjectLayoutType} from "./ProjectLayoutType";

import * as path from "path";
import * as fs from "fs";

export class ProjectLayoutTemplates {

    private static projectLayoutTemplates: ProjectLayoutTemplates;

    private static layoutTemplateLocationByType = {
        [ProjectLayoutType.Nested]: "../resources/nested_layout.json"
    };

    static instance(): ProjectLayoutTemplates {
        if (this.projectLayoutTemplates == null)
            this.projectLayoutTemplates = new ProjectLayoutTemplates();

        return this.projectLayoutTemplates;
    }

    public findProjectLayoutDefinitionTemplateBy(layoutType: ProjectLayoutType) {
        let filePath: string = path.join(__dirname, ProjectLayoutTemplates.layoutTemplateLocationByType[layoutType]);
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
}