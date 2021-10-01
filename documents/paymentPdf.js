module.exports=({payments:[]})=>{
    const today = new Date();

    return
    `<!DOCTYPE html>
    <html>
    <head>
    <style>
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    
    td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }
    
    tr:nth-child(even) {
      background-color: #dddddd;
    }
    </style>
    </head>
    <body>
    
    <h2>All Payments</h2>
    
    <table>
      <tr>
        <th>User Name</th>
        <th>Payment Date</th>
        <th>Payment Category</th>
        <th>Payment Description</th>
        <th>Payment Amount</th>
      </tr>
      <tr>
        <td>${userName}</td>
        <td>${paymentDate}</td>
        <td>${category}</td>
        <td>${description}</td>
        <td>${amount}</td>
      </tr>
      
    </table>
    
    </body>
    </html>








    
    
    
    
    
    `

}