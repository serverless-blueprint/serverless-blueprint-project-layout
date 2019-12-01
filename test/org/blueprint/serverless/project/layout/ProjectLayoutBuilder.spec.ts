import * as fs from 'fs';
import {expect} from 'chai';
import * as sinon from 'sinon';

import {ProjectLayoutBuilder} from "../../../../../../src/org/blueprint/serverless/project/layout/ProjectLayoutBuilder";
import {ProjectLayoutType} from "../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutType";
import {ProjectLayoutDefinitions} from "../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutDefinitions";
import {ProjectLayoutDefinition} from "../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutDefinition";
import {ProjectLayoutDefinitionElement} from "../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutDefinitionElement";

describe("Project Layout Builder", () => {

    afterEach(() => {
        sinon.restore();
    });

    it("should create a directory from layout definition containing just the project name", () => {

        let projectLayoutDefinition = new ProjectLayoutDefinition("serverless-blueprint", []);
        sinon.stub(ProjectLayoutDefinitions, 'findBy')
            .callsFake(() => projectLayoutDefinition);

        let projectLayoutBuilder = new ProjectLayoutBuilder(ProjectLayoutType.Nested);
        projectLayoutBuilder.buildIn(".");

        let directoryCreated = fs.existsSync(projectLayoutDefinition.projectName);
        expect(directoryCreated).to.be.true;

        fs.rmdirSync(projectLayoutDefinition.projectName);
    });

    it("should create a directory from layout definition with project name and a module name", () => {

        let projectLayoutDefinitionElement = new ProjectLayoutDefinitionElement("src");
        let projectLayoutDefinition = new ProjectLayoutDefinition("serverless-blueprint", [projectLayoutDefinitionElement]);
        sinon.stub(ProjectLayoutDefinitions, 'findBy')
            .callsFake(() => projectLayoutDefinition);

        let projectLayoutBuilder = new ProjectLayoutBuilder(ProjectLayoutType.Nested);
        projectLayoutBuilder.buildIn(".");

        let directoryCreated = fs.existsSync(`${projectLayoutDefinition.projectName}/${projectLayoutDefinitionElement.name}`);
        expect(directoryCreated).to.be.true;

        let directoryPath = `${projectLayoutDefinition.projectName}/${projectLayoutDefinitionElement.name}`;
        fs.rmdirSync(directoryPath);
        fs.rmdirSync(projectLayoutDefinition.projectName);
    });

    it("should create a directory from layout definition with project name and a module name", () => {

        let projectLayoutDefinitionElementSrc = new ProjectLayoutDefinitionElement("src");
        let projectLayoutDefinitionElementTest = new ProjectLayoutDefinitionElement("test");
        let projectLayoutDefinition = new ProjectLayoutDefinition("serverless-blueprint",
            [projectLayoutDefinitionElementSrc, projectLayoutDefinitionElementTest]);

        sinon.stub(ProjectLayoutDefinitions, 'findBy')
            .callsFake(() => projectLayoutDefinition);

        let projectLayoutBuilder = new ProjectLayoutBuilder(ProjectLayoutType.Nested);
        projectLayoutBuilder.buildIn(".");

        let srcDirectoryPath = `${projectLayoutDefinition.projectName}/${projectLayoutDefinitionElementSrc.name}`;
        let srcDirectoryCreated = fs.existsSync(srcDirectoryPath);
        expect(srcDirectoryCreated).to.be.true;

        let testDirectoryPath = `${projectLayoutDefinition.projectName}/${projectLayoutDefinitionElementTest.name}`;
        let testDirectoryCreated = fs.existsSync(testDirectoryPath);
        expect(testDirectoryCreated).to.be.true;

        fs.rmdirSync(srcDirectoryPath);
        fs.rmdirSync(testDirectoryPath);
        fs.rmdirSync(projectLayoutDefinition.projectName)
    });
});