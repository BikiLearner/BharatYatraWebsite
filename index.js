const express=require('express');
const path=require('path');
const mysql=require('mysql');
const nodemailer=require('nodemailer');
const app=express();
app.use(express.static(path.join(__dirname,'')))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:'login'
});
connection.connect((err)=>{
    if(err) throw err;
    console.log('Database connected....');
})
app.post('/submit', (req, res) => {
    const { name, email, password } = req.body;

    const sql = 'SELECT pass FROM users WHERE email=?';
    console.log(email);

    connection.query(sql, [email], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching password.' });
        } else if (results.length === 0) {
            res.status(500).json({ message: 'User not found.' });
        } else {
            const hashedPasswordFromDB =(results[0].pass);

            // Compare the hashed password from the database with the provided password
            console.log(hashedPasswordFromDB)
            console.log(`Given password is ${password}`);
            if(password==hashedPasswordFromDB)
            {
                res.sendFile(path.join(__dirname,'./FrontPage','FrontPage.html'));

                console.log('successfull...');
            }
            else{
                console.log('Access Denied......');
            }
        }
    });
});

app.post('/submit-val',(req,res)=>{
    const {name,email,password,con_password}=req.body;
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(con_password);
    if(password!==con_password)
    {
        alert('Invalid Password')
    }
    const sql='INSERT INTO users(name,email,pass) VALUES (?,?,?)';
    let query=[name,email,password];
    connection.query(sql,query,(err,result)=>{
        if(err) throw err;
        console.log('VAlue inserted...');
    }
    )
    res.sendFile(path.join(__dirname,'./FrontPage','FrontPage.html'));
});
app.post('/conect',(req,res)=>{
    const {name,email,message}=req.body;
    const sql='INSERT INTO contact(name,email,message) VALUES (?,?,?)';
    const query=[name,email,message];
    connection.query(sql,query,(err,result)=>{
        if(err) throw err;
        console.log('Contact get...');
    })
    const transporter=nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:'nathankita2003@gmail.com',
             pass:'Ankita@2020',

        },
    });
        // Query data from the database table
      /*  const sql1 = 'SELECT * FROM contact';
        connection.query(sql1, (err, results) => {
          if (err) {
            throw err;
          }
          const emailContent = `
      <h1>Data from Contact Form</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          ${results.map((row) => `
            <tr>
              <td>${row.name}</td>
              <td>${row.email}</td>
              <td>${row.message}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
// Configure email options
const mailOptions = {
    from: 'rs1220525@gmail,com',
    to: 'duttamriganko40@gmail.com', // Admin's email address
    subject: 'Contact Form Data',
    html: emailContent,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw error;
    }
    console.log('Email sent: ' + info.response);
  });

  res.send('Data sent via email');
});*/
res.send('Thanks for connecting with us');
})
app.post('/book',(req,res)=>{
    const {name,email,phone,location,date}=req.body;
    const sql='INSERT INTO booking(name,email,phone,location,date) VALUES (?,?,?,?,?)';
    const query=[name,email,phone,location,date];
    connection.query(sql,query,(err,result)=>{
        if(err) throw err;
        console.log('Contact get...');
    })
        res.redirect('https://razorpay.com/payment-link/plink_MfhqRGTDNyGYtc/test');
});

    
      
      
app.listen(3000,()=>console.log('Port started at 3000'))
