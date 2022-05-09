const { dbAddress, main } = require("../helloworldmongoRefactorisé");

test("L'Addresse de la DB doit contenir test mais pas dev ni prod", () => {
  expect(dbAddress).toMatch(/test/);
  expect(dbAddress).not.toMatch(/dev/);
  expect(dbAddress).not.toMatch(/prod/);
});

test("passe toujours -- juste pour constater l'ajout d'un document dans la DB de test", async () => {
  await main();
});
