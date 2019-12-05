import {ProjectLayoutType} from "./ProjectLayoutType";

import * as path from "path";
import * as fs from "fs";

export class ProjectLayoutTemplates {

    private static projectLayoutTemplates: ProjectLayoutTemplates;

    private layoutTemplateLocationByType = {
        [ProjectLayoutType.Nested]: "../resources/nested_layout.json",
        [ProjectLayoutType.Flat]: "../resources/flat_layout.json"
    };

    static instance(): ProjectLayoutTemplates {
        if (this.projectLayoutTemplates == null)
            this.projectLayoutTemplates = new ProjectLayoutTemplates();

        return this.projectLayoutTemplates;
    }

    public findProjectLayoutDefinitionTemplateBy(layoutType: ProjectLayoutType) {
        let filePath: string = path.join(__dirname, this.layoutTemplateLocationByType[layoutType]);
        return fs.readFileSync(filePath, "utf8");
    }
}