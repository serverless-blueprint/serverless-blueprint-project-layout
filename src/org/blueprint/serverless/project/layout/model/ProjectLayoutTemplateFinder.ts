import {ProjectLayoutType} from "./ProjectLayoutType";

import * as path from "path";
import * as fs from "fs";

export class ProjectLayoutTemplateFinder {

    private static projectLayoutTemplateFinder: ProjectLayoutTemplateFinder;

    private static layoutTemplateLocationByType = {
        [ProjectLayoutType.Nested]: "../resources/nested_layout.json"
    };

    static instance(): ProjectLayoutTemplateFinder {
        if (this.projectLayoutTemplateFinder == null)
            this.projectLayoutTemplateFinder = new ProjectLayoutTemplateFinder();

        return this.projectLayoutTemplateFinder;
    }

    public findProjectLayoutDefinitionTemplateBy(layoutType: ProjectLayoutType) {
        let filePath: string = path.join(__dirname, ProjectLayoutTemplateFinder.layoutTemplateLocationByType[layoutType]);
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
}