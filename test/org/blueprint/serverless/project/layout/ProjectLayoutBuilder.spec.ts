import * as fs from 'fs';
import {expect} from 'chai';
import * as sinon from 'sinon';

import {ProjectLayoutBuilder} from "../../../../../../src/org/blueprint/serverless/project/layout/ProjectLayoutBuilder";
import {ProjectLayoutType} from "../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutType";
import {ProjectLayoutDefinitions} from "../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutDefinitions";
import {ProjectLayoutDefinition} from "../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutDefinition";

describe("Project Layout Builder", () => {

    it("should create a directory from layout definition", () => {

        let projectLayoutDefinition = new ProjectLayoutDefinition("serverless-blueprint");
        sinon.stub(ProjectLayoutDefinitions, 'findBy')
            .callsFake(() => projectLayoutDefinition);

        let projectLayoutBuilder = new ProjectLayoutBuilder(ProjectLayoutType.Nested);
        projectLayoutBuilder.buildIn(".");

        let directoryCreated = fs.existsSync(projectLayoutDefinition.projectName);
        expect(directoryCreated).to.be.true;

        fs.rmdirSync(projectLayoutDefinition.projectName);
    });
});