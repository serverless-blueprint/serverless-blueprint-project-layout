import {ProjectLayoutDefinition} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutDefinition";
import {expect} from "chai";
import {ProjectLayoutDefinitionElement} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutDefinitionElement";

describe("Project Layout Definition", () => {

    it("should return a path containing project name given no definition elements", () => {

        let projectLayoutDefinition = ProjectLayoutDefinition.create("serverless-blueprint", []);
        let paths = projectLayoutDefinition.hierarchyPaths();

        expect(paths).to.eql(["serverless-blueprint"]);
    });

    it("should return a path containing project name and src directory name", () => {

        let projectLayoutDefinitionElementSrc = new ProjectLayoutDefinitionElement("src");
        let projectLayoutDefinition = ProjectLayoutDefinition.create("serverless-blueprint",
            [projectLayoutDefinitionElementSrc]);

        let paths = projectLayoutDefinition.hierarchyPaths();

        expect(paths).to.eql(["serverless-blueprint/src"]);
    });

    it("should return a path containing project name, src directory name and a module name", () => {

        let projectLayoutDefinitionElementModule = new ProjectLayoutDefinitionElement("serverless");
        let projectLayoutDefinitionElementSrc = new ProjectLayoutDefinitionElement("src", [projectLayoutDefinitionElementModule]);
        let projectLayoutDefinition = ProjectLayoutDefinition.create("serverless-blueprint",
            [projectLayoutDefinitionElementSrc]);

        let paths = projectLayoutDefinition.hierarchyPaths();

        expect(paths).to.deep.equal(["serverless-blueprint/src/serverless"]);
    });

    it("should return a path containing project name, src directory name, module name with a directory name", () => {

        let projectLayoutDefinitionElementRepository = new ProjectLayoutDefinitionElement("repository");
        let projectLayoutDefinitionElementModule = new ProjectLayoutDefinitionElement("serverless", [projectLayoutDefinitionElementRepository]);
        let projectLayoutDefinitionElementSrc = new ProjectLayoutDefinitionElement("src", [projectLayoutDefinitionElementModule]);
        let projectLayoutDefinition = ProjectLayoutDefinition.create("serverless-blueprint",
            [projectLayoutDefinitionElementSrc]);

        let paths = projectLayoutDefinition.hierarchyPaths();

        expect(paths).to.deep.equal(["serverless-blueprint/src/serverless/repository"]);
    });

    it("should return a path containing project name, src directory name, module name, directory name and a sub-directory name", () => {

        let projectLayoutDefinitionElementCode = new ProjectLayoutDefinitionElement("code");
        let projectLayoutDefinitionElementRepository = new ProjectLayoutDefinitionElement("repository", [projectLayoutDefinitionElementCode]);
        let projectLayoutDefinitionElementModule = new ProjectLayoutDefinitionElement("serverless", [projectLayoutDefinitionElementRepository]);
        let projectLayoutDefinitionElementSrc = new ProjectLayoutDefinitionElement("src", [projectLayoutDefinitionElementModule]);
        let projectLayoutDefinition = ProjectLayoutDefinition.create("serverless-blueprint",
            [projectLayoutDefinitionElementSrc]);

        let paths = projectLayoutDefinition.hierarchyPaths();

        expect(paths).to.deep.equal(["serverless-blueprint/src/serverless/repository/code"]);
    });

    it("should return multiple paths containing project name, src directory name, module name with a directory name and another parallel test directory", () => {

        let projectLayoutDefinitionElementRepository = new ProjectLayoutDefinitionElement("repository");
        let projectLayoutDefinitionElementModule = new ProjectLayoutDefinitionElement("serverless", [projectLayoutDefinitionElementRepository]);
        let projectLayoutDefinitionElementSrc = new ProjectLayoutDefinitionElement("src", [projectLayoutDefinitionElementModule]);
        let projectLayoutDefinitionElementTest = new ProjectLayoutDefinitionElement("test", [projectLayoutDefinitionElementModule]);

        let projectLayoutDefinition = ProjectLayoutDefinition.create("serverless-blueprint",
            [projectLayoutDefinitionElementSrc, projectLayoutDefinitionElementTest]);

        let paths = projectLayoutDefinition.hierarchyPaths();

        expect(paths).to.deep.equal(["serverless-blueprint/src/serverless/repository", "serverless-blueprint/test/serverless/repository"]);
    });
});