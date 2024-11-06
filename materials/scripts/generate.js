const faker = require("faker/locale/en_AU");
const path = require("path");
const fs = require("fs");

const employeeCount = 11;
const employeeAgeRange = { min: 17, max: 67 };

try {
    // Generate json data
    let employees = [];
    for (let i = 0; i <= employeeCount; i++) {
        const employee = {
            id: faker.random.uuid(),
            avatar: faker.image.avatar(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            jobTitle: faker.name.jobTitle(),
            contactNo: faker.phone.phoneNumber('04## ### ###'),
            address: `${faker.address.streetName()} ${faker.address.city()}, ${faker.address.state()}`,
            age: faker.random.number(employeeAgeRange),
            bio: faker.lorem.paragraph(3),
            dateJoined: faker.date.past(Math.round(Math.random() * 10 + 1)), // 1-10 years ago
        };
        employees.push(employee);
    }

    let companyInfo = {
        companyName: faker.company.companyName(),
        companyMotto: faker.company.bs(),
        companyEst: faker.date.past(Math.round(Math.random() * 20 + 1)), // 1-20 years ago
    };

    // Write object to sample-data.json file
    const sampleData = Object.assign({}, { companyInfo }, { employees });
    const sampleDataPath = path.join(__dirname, "..", "..", "code");
    const sampleDataFilePath = path.join(sampleDataPath, "sample-data.json");

    fs.writeFile(sampleDataFilePath, JSON.stringify(sampleData), err => {
        if (err) throw err;
        console.log("Sample data has been created in ", sampleDataFilePath);
        // exit
        process.exit(0);
    });
} catch (error) {
    throw error;
    process.exit(1);
}
