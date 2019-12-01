import * as Mkdirp from "mkdirp";

export class ProjectLayoutBuilder {
    build(directorName: string) {
        Mkdirp.sync(directorName)
    }
}