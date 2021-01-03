// Create a new Entity Registration
async function registerCompany(
  registrationCompanyContract,
  companyCRN,
  companyName,
  location,
  organizationRole
) {
  console.log(".....Register then company");
  const companyBuffer = await registrationCompanyContract.submitTransaction(
    "registerCompany",
    companyCRN,
    companyName,
    location,
    organizationRole
  );

  // process response
  console.log(".....Processing Register Entity Transaction Response \n\n");
  let newCompany = JSON.parse(companyBuffer.toString());
  console.log(newCompany);
  console.log("\n\n.....Regiter Company Transaction Complete!");
  return newCompany;
}

module.exports.registerCompany = registerCompany;
