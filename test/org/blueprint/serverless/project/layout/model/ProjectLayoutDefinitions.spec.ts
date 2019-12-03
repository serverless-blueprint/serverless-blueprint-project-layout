import {ProjectLayoutType} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutType";
import {ProjectLayoutDefinitions} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutDefinitions";
import {ProjectLayoutDefinition} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutDefinition";
import {ProjectLayoutTemplateFinder} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutTemplateFinder";

import {expect} from "chai";
import * as sinon from "sinon";

describe("Project Layout Definitions", () => {

    afterEach(() => {
        sinon.restore();
    });

    it("should load ProjectLayoutDefinition with project name given a nested layout type", () => {
        let layout = {
            "projectName": "serverless-blueprint",
            "projectLayoutDefinitionElements": []
        };
        sinon.stub(ProjectLayoutTemplateFinder, 'findProjectLayoutDefinitionTemplateBy')
            .callsFake(() => layout);

        let projectLayoutDefinition: ProjectLayoutDefinition = ProjectLayoutDefinitions.findBy(ProjectLayoutType.Nested);

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
        sinon.stub(ProjectLayoutTemplateFinder, 'findProjectLayoutDefinitionTemplateBy')
            .callsFake(() => layout);

        let projectLayoutDefinition: ProjectLayoutDefinition = ProjectLayoutDefinitions.findBy(ProjectLayoutType.Nested);

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
        sinon.stub(ProjectLayoutTemplateFinder, 'findProjectLayoutDefinitionTemplateBy')
            .callsFake(() => layout);

        let projectLayoutDefinition: ProjectLayoutDefinition = ProjectLayoutDefinitions.findBy(ProjectLayoutType.Nested);

        expect(projectLayoutDefinition.hierarchyPaths()).to.deep.equal(["serverless-blueprint/src/controller"]);
    });

    it("should load ProjectLayoutDefinition with multiple layout elements given a nested layout type", () => {
        let layout = {
            "projectName": "serverless-blueprint",
            "projectLayoutDefinitionElements": [
                {
                    "name": "src",
                    "projectLayoutDefinitionElements": []
                },{
                    "name": "test",
                    "projectLayoutDefinitionElements": []
                },
            ]
        };
        sinon.stub(ProjectLayoutTemplateFinder, 'findProjectLayoutDefinitionTemplateBy')
            .callsFake(() => layout);

        let projectLayoutDefinition: ProjectLayoutDefinition = ProjectLayoutDefinitions.findBy(ProjectLayoutType.Nested);

        expect(projectLayoutDefinition.hierarchyPaths()).to.deep.equal(["serverless-blueprint/src", "serverless-blueprint/test"]);
    });
});