
const customers = [
    {
        id: 1,
        name: 'admin',
        moviesRented: [
            { moviesId: 2, dateRented: new Date, returned: false },
            { moviesId: 5, dateRented: new Date, returned: true },
        ]
    },
    {
        id: 2,
        name: 'Deji',
        moviesRented: [
            { moviesId: 2, dateRented: new Date, returned: false },
            { moviesId: 4, dateRented: new Date, returned: true },
        ]
    },
    {
        id: 3,
        name: 'Ken',
        moviesRented: [
            { moviesId: 1, dateRented: new Date, returned: false },
            { moviesId: 3, dateRented: new Date, returned: true },
        ]
    },
    {
        id: 4,
        name: 'Okey',
        moviesRented: [
            { moviesId: 3, dateRented: new Date, returned: false },
            { moviesId: 5, dateRented: new Date, returned: true },
        ]
    },
    {
        id: 5,
        name: 'Adedeji',
        moviesRented: [
            { moviesId: 5, dateRented: new Date, returned: false },
            { moviesId: 4, dateRented: new Date, returned: true },
        ]
    },
    {
        id: 6,
        name: 'Emmanuel',
        moviesRented: [
            { moviesId: 1, dateRented: new Date, returned: false },
            { moviesId: 3, dateRented: new Date, returned: true },
        ]
    }
]

module.exports = customers;