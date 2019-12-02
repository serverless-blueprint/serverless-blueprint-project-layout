import {ProjectLayoutType} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutType";
import {ProjectLayoutDefinitions} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutDefinitions";
import {ProjectLayoutDefinitionElement} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutDefinitionElement";
import {ProjectLayoutDefinition} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutDefinition";
import {ProjectLayoutTemplateLocation} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutTemplateLocation";

import {expect} from "chai";
import * as sinon from "sinon";

describe("Project Layout Definitions", () => {

    afterEach(() => {
        sinon.restore();
    });

    it("should load ProjectLayoutDefinition given a nested layout type", () => {

        sinon.stub(ProjectLayoutTemplateLocation, 'get')
            .callsFake(() => "../../../../../../../test/org/blueprint/serverless/project/layout/resources/mock_nested_layout.json");

        let projectLayoutDefinition: ProjectLayoutDefinition = ProjectLayoutDefinitions.findBy(ProjectLayoutType.Nested);

        expect(projectLayoutDefinition.projectName).to.equal("serverless-blueprint");
        expect(projectLayoutDefinition.hierarchyPaths()).to.deep.equal(
            ["serverless-blueprint/src/serverless/controller",
                "serverless-blueprint/test/serverless/controller"
            ]);
    });
});