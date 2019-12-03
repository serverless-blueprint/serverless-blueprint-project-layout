import {ProjectLayoutType} from "./ProjectLayoutType";

import * as path from "path";
import * as fs from "fs";

export class ProjectLayoutTemplateLocation {

    private static layoutTemplateLocationByType = {
        [ProjectLayoutType.Nested]: "../resources/nested_layout.json"
    };

    public static loadProjectLayoutDefinitionTemplateBy(layoutType: ProjectLayoutType) {
        let filePath: string = path.join(__dirname, ProjectLayoutTemplateLocation.layoutTemplateLocationByType[layoutType]);
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
}