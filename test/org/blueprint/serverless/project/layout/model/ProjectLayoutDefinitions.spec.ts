import {ProjectLayoutType} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutType";
import {ProjectLayoutDefinitions} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutDefinitions";
import {ProjectLayoutDefinition} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutDefinition";
import {ProjectLayoutTemplateFinder} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutTemplateFinder";

import {expect} from "chai";
import * as sinon from "sinon";

describe("Project Layout Definitions", () => {

    let projectLayoutTemplateFinder;
    let mock;

    beforeEach(() => {
        projectLayoutTemplateFinder = ProjectLayoutTemplateFinder.instance();
        mock = sinon.mock(projectLayoutTemplateFinder);
    });

    afterEach(() => {
        sinon.restore();
    });

    it("should load ProjectLayoutDefinition with project name given a nested layout type", () => {
        let layout = {
            "projectName": "serverless-blueprint",
            "projectLayoutDefinitionElements": []
        };
        mock.expects( 'findProjectLayoutDefinitionTemplateBy').returns(layout);

        let projectLayoutDefinition: ProjectLayoutDefinition = new ProjectLayoutDefinitions().findBy(ProjectLayoutType.Nested);

        expect(projectLayoutDefinition.projectName).to.equal("serverless-blueprint");
    });

    it("should load ProjectLayoutDefinition with a single layout element given a nested layout type", () => {
        let layout = {
            "projectName": "serverless-blueprint",
            "projectLayoutDefinitionElements": [{
                "name": "src",
                "projectLayoutDefinitionElements": []
            }]
        };
        mock.expects('findProjectLayoutDefinitionTemplateBy')
            .returns(layout);

        let projectLayoutDefinition: ProjectLayoutDefinition = new ProjectLayoutDefinitions().findBy(ProjectLayoutType.Nested);

        expect(projectLayoutDefinition.hierarchyPaths()).to.deep.equal(["serverless-blueprint/src"]);
    });

    it("should load ProjectLayoutDefinition with a nested layout elements given a nested layout type", () => {
        let layout = {
            "projectName": "serverless-blueprint",
            "projectLayoutDefinitionElements": [{
                "name": "src",
                "projectLayoutDefinitionElements": [{
                    "name": "controller",
                    "projectLayoutDefinitionElements": []
                }]
            }]
        };
        mock.expects('findProjectLayoutDefinitionTemplateBy')
            .returns(layout);

        let projectLayoutDefinition: ProjectLayoutDefinition = new ProjectLayoutDefinitions().findBy(ProjectLayoutType.Nested);

        expect(projectLayoutDefinition.hierarchyPaths()).to.deep.equal(["serverless-blueprint/src/controller"]);
    });

    it("should load ProjectLayoutDefinition with multiple layout elements given a nested layout type", () => {
        let layout = {
            "projectName": "serverless-blueprint",
            "projectLayoutDefinitionElements": [
                {
                    "name": "src",
                    "projectLayoutDefinitionElements": []
                }, {
                    "name": "test",
                    "projectLayoutDefinitionElements": []
                },
            ]
        };
        mock.expects('findProjectLayoutDefinitionTemplateBy')
            .returns(layout);

        let projectLayoutDefinition: ProjectLayoutDefinition = new ProjectLayoutDefinitions().findBy(ProjectLayoutType.Nested);

        expect(projectLayoutDefinition.hierarchyPaths()).to.deep.equal(["serverless-blueprint/src", "serverless-blueprint/test"]);
    });
});