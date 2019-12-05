import {ProjectLayoutType} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutType";
import {ProjectLayoutDefinitions} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutDefinitions";
import {ProjectLayoutDefinition} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutDefinition";
import {ProjectLayoutTemplates} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutTemplates";

import {expect} from "chai";
import * as sinon from "sinon";
import { StringTemplate } from "serverless-blueprint-template-engine/src/org/blueprint/serverless/template/engine/StringTemplate";

describe("Project Layout Definitions", () => {

    let projectLayoutTemplates;
    let mock;

    beforeEach(() => {
        projectLayoutTemplates = ProjectLayoutTemplates.instance();
        mock = sinon.mock(projectLayoutTemplates);
    });

    afterEach(() => {
        sinon.restore();
    });

    it("should load ProjectLayoutDefinition with project name given a nested layout type", () => {
        let layout = `{
            "projectName": "serverless-blueprint",
            "projectLayoutDefinitionElements": []
        }`;
        mock.expects( 'findProjectLayoutDefinitionTemplateBy').returns(layout);
        sinon.stub(StringTemplate.prototype, 'mergeWith').callsFake(() => layout);

        let projectLayoutDefinition: ProjectLayoutDefinition = new ProjectLayoutDefinitions().findBy(ProjectLayoutType.Nested, null);

        expect(projectLayoutDefinition.projectName).to.equal("serverless-blueprint");
    });

    it("should load ProjectLayoutDefinition with a single layout element given a nested layout type", () => {
        let layout = `{
            "projectName": "serverless-blueprint",
            "projectLayoutDefinitionElements": [{
                "name": "src",
                "projectLayoutDefinitionElements": []
            }]
        }`;
        mock.expects('findProjectLayoutDefinitionTemplateBy').returns(layout);
        sinon.stub(StringTemplate.prototype, 'mergeWith').callsFake(() => layout);

        let projectLayoutDefinition: ProjectLayoutDefinition = new ProjectLayoutDefinitions().findBy(ProjectLayoutType.Nested, null);

        expect(projectLayoutDefinition.hierarchyPaths()).to.deep.equal(["serverless-blueprint/src"]);
    });

    it("should load ProjectLayoutDefinition with a nested layout elements given a nested layout type", () => {
        let layout = `{
            "projectName": "serverless-blueprint",
            "projectLayoutDefinitionElements": [{
                "name": "src",
                "projectLayoutDefinitionElements": [{
                    "name": "controller",
                    "projectLayoutDefinitionElements": []
                }]
            }]
        }`;
        mock.expects('findProjectLayoutDefinitionTemplateBy').returns(layout);
        sinon.stub(StringTemplate.prototype, 'mergeWith').callsFake(() => layout);

        let projectLayoutDefinition: ProjectLayoutDefinition = new ProjectLayoutDefinitions().findBy(ProjectLayoutType.Nested, null);

        expect(projectLayoutDefinition.hierarchyPaths()).to.deep.equal(["serverless-blueprint/src/controller"]);
    });

    it("should load ProjectLayoutDefinition with multiple layout elements given a nested layout type", () => {
        let layout = `{
            "projectName": "serverless-blueprint",
            "projectLayoutDefinitionElements": [{
                    "name": "src",
                    "projectLayoutDefinitionElements": []
                }, {
                    "name": "test",
                    "projectLayoutDefinitionElements": []
                }
            ]
        }`;
        mock.expects('findProjectLayoutDefinitionTemplateBy').returns(layout);
        sinon.stub(StringTemplate.prototype, 'mergeWith').callsFake(() => layout);

        let projectLayoutDefinition: ProjectLayoutDefinition = new ProjectLayoutDefinitions().findBy(ProjectLayoutType.Nested, null);

        expect(projectLayoutDefinition.hierarchyPaths()).to.deep.equal(["serverless-blueprint/src", "serverless-blueprint/test"]);
    });
});