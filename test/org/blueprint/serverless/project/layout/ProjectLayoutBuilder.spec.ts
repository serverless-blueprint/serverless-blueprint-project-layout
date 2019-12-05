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

    it("should create a directory in current directory by default", () => {

        let projectLayoutDefinition = ProjectLayoutDefinition.create("serverless-blueprint", []);
        sinon.stub(ProjectLayoutDefinitions.prototype, 'findBy')
            .callsFake(() => projectLayoutDefinition);

        let projectLayoutBuilder = new ProjectLayoutBuilder(null, ProjectLayoutType.Nested);
        projectLayoutBuilder.buildInCurrentDirectory();

        let directoryCreated = fs.existsSync(projectLayoutDefinition.projectName);
        expect(directoryCreated).to.be.true;

        fs.rmdirSync(projectLayoutDefinition.projectName);
    });

    it("should create a directory from layout definition containing just the project name", () => {

        let projectLayoutDefinition = ProjectLayoutDefinition.create("serverless-blueprint", []);
        sinon.stub(ProjectLayoutDefinitions.prototype, 'findBy')
            .callsFake(() => projectLayoutDefinition);

        let projectLayoutBuilder = new ProjectLayoutBuilder(null, ProjectLayoutType.Nested);
        projectLayoutBuilder.buildIn(".");

        let directoryCreated = fs.existsSync(projectLayoutDefinition.projectName);
        expect(directoryCreated).to.be.true;

        fs.rmdirSync(projectLayoutDefinition.projectName);
    });

    it("should create a directory from layout definition with project name and a module name", () => {

        let projectLayoutDefinitionElement = ProjectLayoutDefinitionElement.create("src");
        let projectLayoutDefinition = ProjectLayoutDefinition.create("serverless-blueprint", [projectLayoutDefinitionElement]);
        sinon.stub(ProjectLayoutDefinitions.prototype, 'findBy')
            .callsFake(() => projectLayoutDefinition);

        let projectLayoutBuilder = new ProjectLayoutBuilder(null, ProjectLayoutType.Nested);
        projectLayoutBuilder.buildIn(".");

        let directoryCreated = fs.existsSync(`${projectLayoutDefinition.projectName}/${projectLayoutDefinitionElement.name}`);
        expect(directoryCreated).to.be.true;

        let directoryPath = `${projectLayoutDefinition.projectName}/${projectLayoutDefinitionElement.name}`;
        fs.rmdirSync(directoryPath);
        fs.rmdirSync(projectLayoutDefinition.projectName);
    });

    it("should create a directory from layout definition with project name and a module name", () => {

        let projectLayoutDefinitionElementSrc = ProjectLayoutDefinitionElement.create("src");
        let projectLayoutDefinitionElementTest = ProjectLayoutDefinitionElement.create("test");
        let projectLayoutDefinition = ProjectLayoutDefinition.create("serverless-blueprint",
            [projectLayoutDefinitionElementSrc, projectLayoutDefinitionElementTest]);

        sinon.stub(ProjectLayoutDefinitions.prototype, 'findBy')
            .callsFake(() => projectLayoutDefinition);

        let projectLayoutBuilder = new ProjectLayoutBuilder(null, ProjectLayoutType.Nested);
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

    it("should create a directory from layout definition containing just the project name in specified directory", () => {
        let directory = "tmp";
        fs.mkdirSync(directory);

        let projectLayoutDefinition = ProjectLayoutDefinition.create("serverless-blueprint", []);
        sinon.stub(ProjectLayoutDefinitions.prototype, 'findBy')
            .callsFake(() => projectLayoutDefinition);

        let path = `${directory}/${projectLayoutDefinition.projectName}`;
        let projectLayoutBuilder = new ProjectLayoutBuilder(null, ProjectLayoutType.Nested);

        projectLayoutBuilder.buildIn(directory);

        let directoryCreated = fs.existsSync(path);
        expect(directoryCreated).to.be.true;

        fs.rmdirSync(path);
        fs.rmdirSync(directory);
    });
});