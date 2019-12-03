import {Path} from "../../../../../../../src/org/blueprint/serverless/project/layout/utils/Path";
import {expect} from "chai";

describe("Path", () => {

    it("should return a path", () => {
        let path = Path.create("tmp", "file.txt");
        expect(path).to.equal("tmp/file.txt");
    });
});