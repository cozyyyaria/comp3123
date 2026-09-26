var http = require("http");
const { employees } = require('./Employee');

console.log("Lab 03 -  NodeJs");

const port = process.env.PORT || 8081

const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`)
    } else {
        if (req.url === '/') {
            res.setHeader('Content-Type', 'text/html');
            res.end('<h1>Welcome to Lab Exercise 03</h1>');
            return;
        }

        if (req.url === '/employee') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(employees));
            return;
        }

        if (req.url === '/employee/names') {
            res.setHeader('Content-Type', 'application/json');
            const names = employees.map(emp => `${emp.firstName} ${emp.lastName}`);
            names.sort();
            res.end(JSON.stringify(names));
            return;
        }

        if (req.url === '/employee/totalsalary') {
            res.setHeader('Content-Type', 'application/json');
            const totalSalary = employees.reduce((sum, emp) => sum + emp.Salary, 0);
            res.end(JSON.stringify({ total_salary: totalSalary }));
            return;
        }

        res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})