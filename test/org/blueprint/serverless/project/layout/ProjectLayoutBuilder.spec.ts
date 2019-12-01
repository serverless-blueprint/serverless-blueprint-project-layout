import * as fs from 'fs';
import {expect} from 'chai';
import {ProjectLayoutBuilder} from "../../../../../../src/org/blueprint/serverless/project/layout/ProjectLayoutBuilder";

describe("Project Layout Builder", () => {

    const directoryName = () => {
        return "directory_01"
    };

    beforeEach(() => {
        fs.existsSync(directoryName()) ? fs.rmdirSync(directoryName()) : null;
    });

    it("should create a directory given its name", () => {
        let projectLayoutBuilder = new ProjectLayoutBuilder();
        projectLayoutBuilder.build(directoryName());

        let directoryCreated = fs.existsSync(directoryName());
        expect(directoryCreated).to.be.true;

        fs.rmdirSync(directoryName());
    });
});