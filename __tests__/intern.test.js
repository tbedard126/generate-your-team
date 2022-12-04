const Intern = require('../lib/Intern');


test('creating an object for the intern', () => {
    const intern = new Intern('Tyler', 69, 'tylerbedard126@gmail.com', 'UNH')

    expect(intern.school).toEqual(expect.any(String));
});

test('gets the school of the intern', () => {
    const intern = new Intern('Tyler', 69, 'tylerbedard126@gmail.com', 'UNH')

    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));

});


test('gets what role the employee is', () => {
    const intern = new Intern('Tyler', 69, 'tylerbedard126@gmail.com', 'UNH');

    expect(intern.getRole()).toEqual("Intern");

});