import {ProjectLayoutType} from "./ProjectLayoutType";

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

    findProjectLayoutDefinitionTemplatePathBy(layoutType: ProjectLayoutType): string {
        return ProjectLayoutTemplates.layoutTemplateLocationByType[layoutType];
    }
}