import {ProjectLayoutDefinitionElement} from "./ProjectLayoutDefinitionElement";

export class ProjectLayoutDefinition {

    public readonly projectName: string;
    public readonly projectLayoutDefinitionElements: ProjectLayoutDefinitionElement[];

    constructor(projectName: string, projectLayoutDefinitionElements: ProjectLayoutDefinitionElement[]) {
        this.projectName = projectName;
        this.projectLayoutDefinitionElements = projectLayoutDefinitionElements;
    }

    layoutHierarchyPaths(): string[] {
        if (this.projectLayoutDefinitionElements.length == 0)
            return [this.projectName];

        let paths: string[] = [];
        for (let projectLayoutDefinitionElement of this.projectLayoutDefinitionElements) {
            let path = this.layoutHierarchyPathsInternal(
                projectLayoutDefinitionElement.projectLayoutDefinitionElements,
                ProjectLayoutDefinition.createPath(this.projectName, projectLayoutDefinitionElement.name));

            paths = paths.concat(path);
        }
        return paths;
    }

    private layoutHierarchyPathsInternal(projectLayoutDefinitionElements: ProjectLayoutDefinitionElement[],
                                         path: string): string {

        // noinspection LoopStatementThatDoesntLoopJS
        for (let projectLayoutDefinitionElement of projectLayoutDefinitionElements) {
            return projectLayoutDefinitionElement.projectLayoutDefinitionElements.length == 0 ?
                ProjectLayoutDefinition.createPath(path, projectLayoutDefinitionElement.name) :
                this.layoutHierarchyPathsInternal(
                    projectLayoutDefinitionElement.projectLayoutDefinitionElements,
                    ProjectLayoutDefinition.createPath(path, projectLayoutDefinitionElement.name)
                );
        }
        return path;
    }

    private static createPath(parent: string, child: string) {
        return parent + "/" + child;
    }
}