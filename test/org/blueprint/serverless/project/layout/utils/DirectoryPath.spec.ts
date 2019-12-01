import {DirectoryPath} from "../../../../../../../src/org/blueprint/serverless/project/layout/utils/DirectoryPath";
import {expect} from "chai";

describe("Directory Path", () => {

    it("should return a path", () => {
        let path = DirectoryPath.create("tmp", "file.txt");
        expect(path).to.equal("tmp/file.txt");
    });
});