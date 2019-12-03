import {ProjectLayoutType} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutType";
import {ProjectLayoutDefinitions} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutDefinitions";
import {ProjectLayoutDefinition} from "../../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutDefinition";

import {expect} from "chai";

describe("Project Layout Definitions (Integration)", () => {

    it("should load ProjectLayoutDefinition a nested layout type", () => {

        let projectLayoutDefinition: ProjectLayoutDefinition = new ProjectLayoutDefinitions().findBy(ProjectLayoutType.Nested);

        expect(projectLayoutDefinition.projectName).to.equal("serverless-blueprint");
        expect(projectLayoutDefinition.hierarchyPaths()).to.deep.equal([
            "serverless-blueprint/src/serverless/controller",
            "serverless-blueprint/test/serverless/controller"]);
    });

    it("should load ProjectLayoutDefinition a flat layout type", () => {

        let projectLayoutDefinition: ProjectLayoutDefinition = new ProjectLayoutDefinitions().findBy(ProjectLayoutType.Flat);

        expect(projectLayoutDefinition.projectName).to.equal("serverless-blueprint");
        expect(projectLayoutDefinition.hierarchyPaths()).to.deep.equal([
            "serverless-blueprint/src/controller",
            "serverless-blueprint/test/controller"]);
    });
});