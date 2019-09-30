const auth = require("../auth");
decribe("auth",() =>{
    describe("auth user => get", () =>{
        var result = auth.get();
        expect(result)
    });
});