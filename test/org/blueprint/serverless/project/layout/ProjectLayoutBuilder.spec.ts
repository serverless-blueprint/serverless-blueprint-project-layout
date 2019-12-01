import * as fs from 'fs';
import {expect} from 'chai';
import {ProjectLayoutBuilder} from "../../../../../../src/org/blueprint/serverless/project/layout/ProjectLayoutBuilder";
import {ProjectLayoutType} from "../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutType";

describe("Project Layout Builder", () => {

    it("should create a directory given its name", () => {
        let directoryName = "directory_01";

        let projectLayoutBuilder = new ProjectLayoutBuilder(ProjectLayoutType.Nested);
        projectLayoutBuilder.build(directoryName);

        let directoryCreated = fs.existsSync(directoryName);
        expect(directoryCreated).to.be.true;

        fs.existsSync(directoryName) ? fs.rmdirSync(directoryName) : null;
    });

    it("should create a directory given its path", () => {
        let directoryName = "directory";
        fs.mkdirSync(directoryName);

        let directoryPath = `./${directoryName}/1.txt`;

        let projectLayoutBuilder = new ProjectLayoutBuilder(ProjectLayoutType.Nested);
        projectLayoutBuilder.build(directoryPath);

        let directoryCreated = fs.existsSync(directoryPath);
        expect(directoryCreated).to.be.true;

        fs.rmdirSync(directoryPath);
        fs.rmdirSync(directoryName);
    });
});