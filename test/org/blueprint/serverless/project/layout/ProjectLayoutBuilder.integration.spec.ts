import * as sinon from 'sinon';

import {ProjectLayoutBuilder} from "../../../../../../src/org/blueprint/serverless/project/layout/ProjectLayoutBuilder";
import {ProjectLayoutType} from "../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutType";
import {ProjectLayoutMetaData} from "../../../../../../src/org/blueprint/serverless/project/layout/model/ProjectLayoutMetaData";

import * as fs from "fs";
import {expect} from "chai";

describe("Project Layout Builder (Integration)", () => {

    afterEach(() => {
        sinon.restore();
    });

    it("should create a nested directory structure in current directory by default", () => {

        let projectLayoutBuilder = new ProjectLayoutBuilder(new ProjectLayoutMetaData("serverless-blueprint", "serverless"), ProjectLayoutType.Nested);
        projectLayoutBuilder.buildInCurrentDirectory();

        let paths = [
            "serverless-blueprint/src/serverless/controller",
            "serverless-blueprint/src/serverless/service",
            "serverless-blueprint/src/serverless/repository",
            "serverless-blueprint/test/serverless/controller",
            "serverless-blueprint/test/serverless/service",
            "serverless-blueprint/test/serverless/repository"
        ];

        expect(fs.existsSync(paths[0])).to.be.true;
        expect(fs.existsSync(paths[1])).to.be.true;
        expect(fs.existsSync(paths[2])).to.be.true;
        expect(fs.existsSync(paths[3])).to.be.true;
        expect(fs.existsSync(paths[4])).to.be.true;
        expect(fs.existsSync(paths[5])).to.be.true;

        fs.rmdirSync("serverless-blueprint", {
            recursive: true
        });
    });

    it("should create a flattened directory structure in current directory by default", () => {

        let projectLayoutBuilder = new ProjectLayoutBuilder(new ProjectLayoutMetaData("serverless-blueprint", "serverless"), ProjectLayoutType.Flat);
        projectLayoutBuilder.buildInCurrentDirectory();

        let paths = [
            "serverless-blueprint/src/controller",
            "serverless-blueprint/src/service",
            "serverless-blueprint/src/repository",
            "serverless-blueprint/test/controller",
            "serverless-blueprint/test/service",
            "serverless-blueprint/test/repository"
        ];

        expect(fs.existsSync(paths[0])).to.be.true;
        expect(fs.existsSync(paths[1])).to.be.true;
        expect(fs.existsSync(paths[2])).to.be.true;
        expect(fs.existsSync(paths[3])).to.be.true;
        expect(fs.existsSync(paths[4])).to.be.true;
        expect(fs.existsSync(paths[5])).to.be.true;

        fs.rmdirSync("serverless-blueprint", {
            recursive: true
        });
    });
});